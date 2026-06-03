<script setup lang="ts">
import { ref, computed, onUnmounted } from "vue";
import type { ProjectDemo } from "@/content/types";
import { useTranslations } from "@/i18n/useTranslations";
import ArrowUpRight from "./icons/ArrowUpRight.vue";

const props = defineProps<{
  demo: ProjectDemo;
  title: string;
  repo?: string;
  repoPrivate?: boolean;
}>();

const { t } = useTranslations();

const launched = ref(false);
const loaded = ref(false);
const errored = ref(false);
let timer: ReturnType<typeof setTimeout> | undefined;

// The embedded apps are now responsive (each has its own mobile layout), so the
// iframe renders at the real device width — no logical-viewport scaling — and the
// demo's own mobile mode kicks in on phones.

const embedSrc = computed(() => {
  if (props.demo.kind === "embed") return props.demo.src;
  if (props.demo.kind === "live") return props.demo.live ?? props.demo.src;
  return undefined;
});

const canEmbed = computed(() => !!embedSrc.value);
const liveUrl = computed(() => props.demo.live ?? (props.demo.kind === "live" ? props.demo.src : undefined));

// Brutalist fake URL bar text
const urlText = computed(() => {
  if (props.demo.kind === "live" && liveUrl.value) return liveUrl.value.replace(/^https?:\/\//, "");
  return `localhost/demos/${props.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
});

const launch = () => {
  if (!canEmbed.value) return;
  launched.value = true;
  timer = setTimeout(() => {
    if (!loaded.value) errored.value = true;
  }, 9000);
};

const onLoad = () => {
  loaded.value = true;
  clearTimeout(timer);
};

onUnmounted(() => {
  clearTimeout(timer);
});
</script>

<template>
  <figure class="dw">
    <!-- Title bar -->
    <figcaption class="dw__bar">
      <span class="dw__dots" aria-hidden="true">
        <i></i><i></i><i></i>
      </span>
      <span class="dw__url telemetry">{{ urlText }}</span>
      <span class="dw__label telemetry">{{ t.project.demoLabel }}</span>
    </figcaption>

    <!-- Screen -->
    <div class="dw__screen">
      <!-- Pre-launch poster / launch button -->
      <button
        v-if="canEmbed && !launched"
        type="button"
        class="dw__launch"
        :style="demo.poster ? { backgroundImage: `url(${demo.poster})` } : undefined"
        @click="launch"
      >
        <span class="dw__play">▶</span>
        <span class="dw__launch-text">{{ t.project.launch }}</span>
      </button>

      <!-- Live iframe -->
      <iframe
        v-else-if="canEmbed && launched && !errored"
        :src="embedSrc"
        :title="title"
        class="dw__iframe"
        loading="lazy"
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
        @load="onLoad"
      />

      <!-- Fallback (no embed possible, or iframe failed) -->
      <div v-else class="dw__fallback">
        <img v-if="demo.poster" :src="demo.poster" :alt="title" />
        <p class="telemetry">{{ canEmbed ? "// EMBED BLOCKED — OPEN EXTERNALLY" : "// NO LIVE DEMO" }}</p>
      </div>

      <span v-if="launched && !loaded && !errored" class="dw__loading telemetry">// LOADING…</span>
    </div>

    <!-- Actions -->
    <div class="dw__actions">
      <a v-if="liveUrl" :href="liveUrl" target="_blank" rel="noopener noreferrer" class="dw__btn">
        {{ t.project.openLive }} <ArrowUpRight />
      </a>
      <a
        v-if="canEmbed && demo.kind === 'embed'"
        :href="embedSrc"
        target="_blank"
        rel="noopener noreferrer"
        class="dw__btn dw__btn--fs"
      >
        {{ t.project.fullscreen }} <ArrowUpRight />
      </a>
      <a
        v-if="repo && !repoPrivate"
        :href="repo"
        target="_blank"
        rel="noopener noreferrer"
        class="dw__btn"
      >
        {{ t.project.openRepo }} <ArrowUpRight />
      </a>
      <span class="dw__disclaimer telemetry">{{ t.project.demoDisclaimer }}</span>
    </div>
  </figure>
</template>

<style scoped lang="scss">
.dw {
  border: var(--border-w) solid var(--c-line-strong);
  background: var(--c-bg-raised);
  margin: 0;

  &__bar {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.6rem 0.9rem;
    border-bottom: var(--border-w) solid var(--c-line-strong);
  }

  &__dots {
    display: inline-flex;
    gap: 0.4rem;

    i {
      width: 9px;
      height: 9px;
      border: var(--hairline) solid var(--c-muted);
      display: block;

      &:last-child {
        background: var(--c-accent);
        border-color: var(--c-accent);
      }
    }
  }

  &__url {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: var(--c-muted);
  }

  &__label {
    color: var(--c-accent);

    @media (max-width: 640px) {
      display: none;
    }
  }

  &__screen {
    position: relative;
    aspect-ratio: 16 / 10;
    background: var(--c-bg);
    overflow: hidden;
  }

  &__iframe {
    width: 100%;
    height: 100%;
    border: 0;
    display: block;
    background: #fff;
  }

  &__launch {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    background-size: cover;
    background-position: center;
    color: var(--c-fg);
    transition: background-color 0.2s;

    &::before {
      content: "";
      position: absolute;
      inset: 0;
      background: color-mix(in srgb, var(--c-bg) 55%, transparent);
    }

    &:hover .dw__play {
      background: var(--c-accent);
      color: var(--c-on-accent);
    }
  }

  &__play {
    position: relative;
    width: 64px;
    height: 64px;
    display: grid;
    place-items: center;
    border: var(--border-w) solid var(--c-accent);
    color: var(--c-accent);
    font-size: 1.25rem;
    transition:
      background-color 0.2s,
      color 0.2s;
  }

  &__launch-text {
    position: relative;
    font-family: var(--f-mono);
    font-size: var(--fs-mono);
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }

  &__fallback {
    width: 100%;
    height: 100%;
    display: grid;
    place-items: center;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    p {
      position: absolute;
      color: var(--c-muted);
    }
  }

  &__loading {
    position: absolute;
    bottom: 0.75rem;
    left: 0.9rem;
    color: var(--c-accent);
  }

  &__actions {
    display: flex;
    align-items: center;
    gap: 1.25rem;
    flex-wrap: wrap;
    padding: 0.9rem;
    border-top: var(--border-w) solid var(--c-line-strong);
  }

  &__btn {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    font-family: var(--f-mono);
    font-size: var(--fs-mono);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--c-fg);
    border-bottom: var(--border-w) solid var(--c-accent);
    padding-bottom: 0.2rem;
    transition: color 0.2s;

    svg {
      width: 14px;
      height: 14px;
    }

    &:hover {
      color: var(--c-accent);
    }
  }

  &__disclaimer {
    margin-left: auto;
    color: var(--c-muted);
  }
}

// On phones, give the scaled desktop viewport more vertical room and make the
// fullscreen action easy to reach.
@media (max-width: 760px) {
  .dw__screen {
    aspect-ratio: 3 / 4;
  }

  .dw__disclaimer {
    margin-left: 0;
    flex-basis: 100%;
  }
}
</style>
