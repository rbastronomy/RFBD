<script setup lang="ts">
import { useTranslations } from "@/i18n/useTranslations";
import { scrollTo } from "@/composables/useScroll";
import AsciiShark from "./AsciiShark.vue";

const { t } = useTranslations();
</script>

<template>
  <section id="top" class="hero">
    <div class="hero__grain" v-parallax="0.15" aria-hidden="true">2026</div>
    <AsciiShark />

    <div class="hero__inner container">
      <p class="hero__tag telemetry">
        <span class="crosshair">+</span> RFBD — REV 2026 / UNIT&nbsp;RB-01
      </p>

      <h1 class="hero__title macro">RFBD<span class="accent">.</span></h1>

      <div class="hero__meta">
        <ul class="roles">
          <li v-for="role in t.hero.roles" :key="role" class="telemetry">
            <span class="accent">[</span> {{ role }} <span class="accent">]</span>
          </li>
        </ul>
        <p class="hero__intro">{{ t.hero.intro }}</p>
      </div>
    </div>

    <div class="hero__footer container">
      <button class="hero__cue telemetry" type="button" @click="scrollTo('#about', -1)">
        <span>{{ t.hero.scrollCue }}</span>
        <span class="cue-line" aria-hidden="true" />
      </button>

      <p class="hero__coords telemetry" aria-hidden="true">LAT -20.214 / LON -70.152 — IQUIQUE, CL</p>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use "../../assets/styles/mixins" as *;

.hero {
  position: relative;
  min-height: 100svh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-bottom: var(--border-w) solid var(--c-line-strong);

  &__grain {
    position: absolute;
    top: 50%;
    right: 2vw;
    transform: translateY(-50%);
    font-family: var(--f-display);
    font-size: clamp(14rem, 38vw, 40rem);
    line-height: 0.8;
    letter-spacing: -0.03em;
    // Outlined "blueprint" watermark instead of a solid block — reads as an
    // intentional backdrop behind the title rather than a clipped slab.
    color: transparent;
    -webkit-text-stroke: 1px var(--c-line);
    opacity: 0.5;
    z-index: 0;
    user-select: none;
    pointer-events: none;

    @include below($bp-md) {
      font-size: clamp(10rem, 46vw, 26rem);
      right: -4vw;
      opacity: 0.4;
    }
  }

  &__inner {
    position: relative;
    z-index: 1;
    margin-top: auto;
    padding-top: 120px;
  }

  // Keep the title block from crowding the fixed header on short viewports.
  @media (max-height: 760px) {
    &__inner {
      margin-top: 0;
    }
  }

  &__tag {
    margin-bottom: 0.75rem;
  }

  &__title {
    // Single-line wordmark sized to always fit the viewport (no clipping/cut-off).
    font-size: clamp(3rem, 15vw, 15rem);
    white-space: nowrap;
    margin-bottom: 2rem;
  }

  &__meta {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--gutter);
    align-items: end;
    border-top: var(--hairline) solid var(--c-line);
    padding-top: 1.5rem;

    @include below($bp-md) {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }
  }

  .roles {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  &__intro {
    font-size: clamp(1.1rem, 2vw, 1.5rem);
    max-width: 38ch;
    color: var(--c-fg);
  }

  &__footer {
    position: relative;
    z-index: 1;
    margin-top: auto;
    padding-top: 2rem;
    padding-bottom: 2rem;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 1rem;
  }

  &__cue {
    display: flex;
    align-items: center;
    gap: 1rem;
    color: var(--c-muted);
    transition: color 0.2s;

    &:hover {
      color: var(--c-accent);
    }

    .cue-line {
      width: 64px;
      height: var(--border-w);
      background: var(--c-accent);
      animation: cue 2s ease-in-out infinite;
    }
  }

  &__coords {
    color: var(--c-muted);

    @include below($bp-sm) {
      display: none;
    }
  }
}

@keyframes cue {
  0%,
  100% {
    transform: scaleX(0.4);
    transform-origin: left;
  }
  50% {
    transform: scaleX(1);
    transform-origin: left;
  }
}
</style>
