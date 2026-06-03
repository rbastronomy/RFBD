<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from "vue";
import { selectedProject, closeProject } from "@/content/state";
import { useTranslations } from "@/i18n/useTranslations";
import ArrowUpRight from "@/components/icons/ArrowUpRight.vue";
import DemoWindow from "@/components/DemoWindow.vue";
import DeviceShowcase from "@/components/DeviceShowcase.vue";
import TechIcon from "@/components/TechIcon.vue";

const { t, locale } = useTranslations();
const project = computed(() => selectedProject.value);

// Show the device showcase first; the interactive demo is revealed on demand.
const showDemo = ref(false);

const reduceMotion =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Hacker-style open/close sequence: boot (loading data) → ready → lost.
type Phase = "boot" | "ready" | "lost";
const phase = ref<Phase>("ready");
const bootLines = ref<string[]>([]);
let timers: number[] = [];

const clearTimers = () => {
  timers.forEach((id) => clearTimeout(id));
  timers = [];
};

// When a project is opened, run the boot sequence.
watch(project, (p, prev) => {
  if (p && !prev) startBoot(p.id);
});

const startBoot = (id: string) => {
  clearTimers();
  bootLines.value = [];
  showDemo.value = false;
  if (reduceMotion) {
    phase.value = "ready";
    return;
  }
  phase.value = "boot";
  const lines = t.value.boot.lines.map((l) => l.replace("{id}", id.toUpperCase()));
  const step = 240;
  lines.forEach((line, i) => {
    timers.push(window.setTimeout(() => bootLines.value.push(line), step * (i + 1)));
  });
  timers.push(window.setTimeout(() => (phase.value = "ready"), step * (lines.length + 1) + 320));
};

// Closing plays a brief "connection lost" glitch before unmounting.
const requestClose = () => {
  clearTimers();
  if (reduceMotion) {
    closeProject();
    phase.value = "ready";
    return;
  }
  phase.value = "lost";
  timers.push(
    window.setTimeout(() => {
      closeProject();
      phase.value = "ready";
    }, 720),
  );
};

const onKey = (e: KeyboardEvent) => {
  if (e.key === "Escape" && project.value) requestClose();
};

onMounted(() => window.addEventListener("keydown", onKey));
onUnmounted(() => {
  window.removeEventListener("keydown", onKey);
  clearTimers();
});
</script>

<template>
  <Teleport to="body">
    <Transition name="panel">
      <div v-if="project" class="detail" role="dialog" aria-modal="true" :aria-label="project.title">
        <div class="detail__bar">
          <p class="telemetry"><span class="crosshair">+</span> {{ project.id }} / {{ locale.toUpperCase() }}</p>
          <button
            class="detail__close"
            type="button"
            @click="requestClose"
            :aria-label="t.project.close"
          >
            <span class="detail__close-key" aria-hidden="true">ESC</span>
            <span class="detail__close-label">{{ t.project.close }}</span>
            <span class="detail__close-x" aria-hidden="true">✕</span>
          </button>
        </div>

        <div class="detail__scroll" data-lenis-prevent>
          <div class="detail__inner container">
            <header class="detail__head">
              <ul class="detail__tags">
                <li v-for="tag in project.tags" :key="tag" class="telemetry">{{ tag }}</li>
              </ul>
              <h2 class="detail__title macro">{{ project.title }}</h2>
              <p class="detail__tagline">{{ project.tagline[locale] }}</p>
            </header>

            <hr class="hr" />

            <template v-if="project.demo && project.demo.kind !== 'none'">
              <DeviceShowcase
                v-if="!showDemo"
                class="detail__demo"
                :preview="project.preview"
                :title="project.title"
                @launch="showDemo = true"
              />
              <div v-else class="detail__demo">
                <button type="button" class="detail__demo-back telemetry" @click="showDemo = false">
                  ← {{ t.project.hideDemo }}
                </button>
                <DemoWindow
                  :demo="project.demo"
                  :title="project.title"
                  :repo="project.links.repo"
                  :repo-private="project.links.private"
                />
              </div>
            </template>

            <div class="detail__grid">
              <div class="detail__desc">
                <p>{{ project.description[locale] }}</p>
              </div>

              <aside class="detail__meta">
                <div class="meta-block">
                  <p class="telemetry meta-label">{{ t.project.role }}</p>
                  <p>{{ project.role[locale] }}</p>
                </div>

                <div class="meta-block">
                  <p class="telemetry meta-label">{{ t.project.stack }}</p>
                  <ul class="stack">
                    <li v-for="tech in project.tech" :key="tech" class="telemetry">
                      <TechIcon :name="tech" :size="14" />
                      <span>{{ tech }}</span>
                    </li>
                  </ul>
                </div>

                <div class="meta-block">
                  <p class="telemetry meta-label">{{ t.project.links }}</p>
                  <div class="links">
                    <span v-if="project.links.private" class="telemetry private">[ {{ t.project.private }} ]</span>
                    <a
                      v-else-if="project.links.repo"
                      :href="project.links.repo"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="link"
                    >
                      {{ t.project.repo }} <ArrowUpRight />
                    </a>
                    <a
                      v-if="project.links.demo"
                      :href="project.links.demo"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="link"
                    >
                      {{ t.project.demo }} <ArrowUpRight />
                    </a>
                    <a
                      v-if="project.links.video"
                      :href="project.links.video"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="link"
                    >
                      {{ t.project.video }} <ArrowUpRight />
                    </a>
                  </div>
                </div>
              </aside>
            </div>

            <div v-if="project.media.length" class="detail__media">
              <img v-for="src in project.media" :key="src" :src="src" :alt="project.title" loading="lazy" />
            </div>
          </div>
        </div>

        <!-- Hacker boot overlay: "opening the box / loading data" -->
        <Transition name="boot">
          <div v-if="phase === 'boot'" class="boot" aria-hidden="true">
            <div class="boot__panel">
              <p class="boot__head telemetry">
                <span class="crosshair">+</span> RB-01 — {{ project.id.toUpperCase() }}
              </p>
              <div class="boot__log">
                <p v-for="(line, i) in bootLines" :key="i" class="boot__line">{{ line }}</p>
                <span class="boot__caret">█</span>
              </div>
            </div>
          </div>
        </Transition>

        <!-- Connection-lost glitch on close -->
        <div v-if="phase === 'lost'" class="lost" aria-hidden="true">
          <span class="lost__text" :data-text="`// ${t.boot.lost} — RB-01`">// {{ t.boot.lost }} — RB-01</span>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped lang="scss">
@use "../../assets/styles/mixins" as *;

.detail {
  position: fixed;
  inset: 0;
  z-index: var(--z-overlay);
  background: var(--c-bg);
  display: flex;
  flex-direction: column;

  &__bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem var(--gutter);
    border-bottom: var(--border-w) solid var(--c-line-strong);
    flex-shrink: 0;
  }

  // Prominent solid button — people instinctively hit the browser "back" gesture
  // and leave the site; a loud, obviously-clickable close target prevents that.
  &__close {
    display: inline-flex;
    align-items: center;
    gap: 0.55rem;
    font-family: var(--f-mono);
    font-size: var(--fs-mono);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--c-on-accent);
    background: var(--c-accent);
    border: var(--border-w) solid var(--c-accent);
    padding: 0.5rem 0.85rem;
    transition:
      background-color 0.2s,
      color 0.2s;

    &:hover,
    &:focus-visible {
      background: transparent;
      color: var(--c-accent);
    }
  }

  &__close-key {
    border: var(--hairline) solid currentColor;
    padding: 0.05rem 0.35rem;
    font-size: 0.72em;
    line-height: 1.4;
    opacity: 0.9;
  }

  &__close-x {
    font-size: 1.1em;
    line-height: 1;
  }

  &__scroll {
    overflow-y: auto;
    flex: 1;
  }

  &__inner {
    padding-block: clamp(2rem, 8vh, 6rem);
  }

  &__tags {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1.5rem;

    li {
      border: var(--hairline) solid var(--c-line-strong);
      padding: 0.25rem 0.5rem;
    }
  }

  &__title {
    font-size: var(--fs-h1);
  }

  &__tagline {
    font-size: clamp(1.1rem, 2vw, 1.5rem);
    color: var(--c-muted);
    margin-top: 1rem;
  }

  &__demo {
    margin-top: 2.5rem;
  }

  &__demo-back {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    margin-bottom: 1rem;
    color: var(--c-accent);
    cursor: pointer;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    transition: opacity 0.2s;

    &:hover {
      opacity: 0.7;
    }
  }

  &__grid {
    display: grid;
    grid-template-columns: 1.6fr 1fr;
    gap: var(--gutter);
    margin-top: 2.5rem;

    @include below($bp-md) {
      grid-template-columns: 1fr;
      gap: 2.5rem;
    }
  }

  &__desc {
    font-size: clamp(1.1rem, 1.6vw, 1.35rem);
    line-height: 1.6;
    max-width: 60ch;
  }

  &__meta {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    border-left: var(--border-w) solid var(--c-line-strong);
    padding-left: 1.5rem;

    @include below($bp-md) {
      border-left: none;
      padding-left: 0;
    }
  }

  .meta-label {
    color: var(--c-accent);
    margin-bottom: 0.75rem;
  }

  .stack {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;

    li {
      border: var(--hairline) solid var(--c-line-strong);
      padding: 0.25rem 0.5rem;
      color: var(--c-fg);
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
    }

    .tech-icon {
      color: var(--c-accent);
    }
  }

  .links {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .link {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-family: var(--f-mono);
    font-size: var(--fs-mono);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--c-fg);
    border-bottom: var(--border-w) solid var(--c-accent);
    padding-bottom: 0.25rem;
    width: fit-content;
    transition: color 0.2s;

    svg {
      width: 16px;
      height: 16px;
    }

    &:hover {
      color: var(--c-accent);
    }
  }

  .private {
    color: var(--c-muted);
  }

  &__media {
    display: grid;
    gap: 1px;
    margin-top: 3rem;
    background: var(--c-line-strong);

    img {
      width: 100%;
      border: none;
    }
  }
}

.panel-enter-active,
.panel-leave-active {
  transition:
    opacity 0.3s ease,
    transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.panel-enter-from,
.panel-leave-to {
  opacity: 0;
  transform: translateY(2rem);
}

/* ---- Hacker boot overlay ---- */
.boot {
  position: absolute;
  inset: 0;
  z-index: 2;
  background: var(--c-bg);
  display: grid;
  place-items: center;
  padding: var(--gutter);
}

.boot__panel {
  width: min(560px, 100%);
  border: var(--border-w) solid var(--c-line-strong);
  background: var(--c-bg-raised);
  padding: 1.25rem 1.5rem 1.5rem;
  position: relative;
  animation: boot-open 0.32s cubic-bezier(0.16, 1, 0.3, 1);

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: var(--border-w);
    width: 100%;
    background: var(--c-accent);
  }
}

.boot__head {
  color: var(--c-accent);
  margin-bottom: 1rem;
}

.boot__log {
  font-family: var(--f-mono);
  font-size: var(--fs-mono);
  line-height: 1.7;
  color: var(--c-fg);
  min-height: 9rem;
  white-space: pre-wrap;
  word-break: break-word;
}

.boot__line {
  animation: boot-line 0.18s ease-out;
}

.boot__caret {
  color: var(--c-accent);
  animation: boot-blink 0.9s steps(1) infinite;
}

@keyframes boot-open {
  from {
    opacity: 0;
    transform: scaleY(0.7) translateY(8px);
  }
  to {
    opacity: 1;
    transform: scaleY(1) translateY(0);
  }
}
@keyframes boot-line {
  from {
    opacity: 0;
    transform: translateX(-6px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
@keyframes boot-blink {
  0%,
  49% {
    opacity: 1;
  }
  50%,
  100% {
    opacity: 0;
  }
}

.boot-enter-active {
  transition: opacity 0.15s ease;
}
.boot-leave-active {
  transition: opacity 0.25s ease;
}
.boot-enter-from,
.boot-leave-to {
  opacity: 0;
}

/* ---- Connection-lost glitch ---- */
.lost {
  position: absolute;
  inset: 0;
  z-index: 3;
  background: var(--c-bg);
  display: grid;
  place-items: center;
  padding: var(--gutter);
  animation: lost-flicker 0.72s steps(2) 1;
}

.lost__text {
  position: relative;
  font-family: var(--f-mono);
  font-size: clamp(1rem, 4vw, 2rem);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--c-fg);

  &::before,
  &::after {
    content: attr(data-text);
    position: absolute;
    inset: 0;
    clip-path: inset(0 0 0 0);
  }
  &::before {
    color: var(--c-accent);
    animation: lost-shift 0.72s steps(3) infinite;
    transform: translateX(-2px);
  }
  &::after {
    color: #ff3b3b;
    animation: lost-shift 0.72s steps(2) reverse infinite;
    transform: translateX(2px);
  }
}

@keyframes lost-flicker {
  0%,
  100% {
    opacity: 1;
  }
  20% {
    opacity: 0.3;
  }
  40% {
    opacity: 0.9;
  }
  60% {
    opacity: 0.2;
  }
}
@keyframes lost-shift {
  0% {
    clip-path: inset(0 0 80% 0);
  }
  33% {
    clip-path: inset(40% 0 30% 0);
  }
  66% {
    clip-path: inset(75% 0 5% 0);
  }
  100% {
    clip-path: inset(10% 0 60% 0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .boot__panel,
  .boot__line,
  .boot__caret,
  .lost,
  .lost__text::before,
  .lost__text::after {
    animation: none;
  }
}
</style>
