<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";
import { useTranslations } from "@/i18n/useTranslations";
import { locale } from "@/i18n/store";
import { scrollTo } from "@/composables/useScroll";
import { projects } from "@/content/projects";
import TechIcon from "@/components/TechIcon.vue";

const { t } = useTranslations();

const trust = ["Vue", "React", "Laravel", "Node", "MySQL", "TypeScript"];

// --- Rotating showcase of real systems already built ---
const reduce =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const shots = projects
  .filter((p) => p.preview?.desktop)
  .map((p) => ({
    id: p.id,
    title: p.title,
    tag: p.tags[0] ?? "",
    img: p.preview!.desktop!,
    tagline: p.tagline,
  }));

// Start on ContainerOS (the container system) to match the previous default.
const startIdx = Math.max(0, shots.findIndex((s) => s.id === "container-os"));
const idx = ref(startIdx === -1 ? 0 : startIdx);
const current = computed(() => shots[idx.value]!);

const DELAY = 6000;
let timer: number | null = null;
const stop = () => {
  if (timer !== null) {
    clearInterval(timer);
    timer = null;
  }
};
const play = () => {
  if (reduce || shots.length < 2) return;
  stop();
  timer = window.setInterval(() => {
    idx.value = (idx.value + 1) % shots.length;
  }, DELAY);
};
const go = (i: number) => {
  idx.value = (i + shots.length) % shots.length;
  play(); // reset the timer after a manual change
};
const prev = () => go(idx.value - 1);
const next = () => go(idx.value + 1);

onMounted(play);
onUnmounted(stop);
</script>

<template>
  <section id="top" class="hero">
    <div class="hero__grid" aria-hidden="true" />

    <div class="hero__inner container">
      <span class="hero__badge">
        <span class="dot" aria-hidden="true" />
        {{ t.hero.badge }}
      </span>

      <h1 class="hero__title">
        {{ t.hero.title }}<br />
        <span class="hero__title-accent">{{ t.hero.titleEm }}</span>
      </h1>

      <p class="hero__lead">{{ t.hero.lead }}</p>

      <div class="hero__cta">
        <button class="btn btn--primary" type="button" @click="scrollTo('#contact', -8)">
          {{ t.hero.ctaPrimary }}
        </button>
        <button class="btn btn--ghost" type="button" @click="scrollTo('#work', -8)">
          {{ t.hero.ctaSecondary }}
        </button>
      </div>
    </div>

    <!-- Rotating showcase of real systems, floating on an oil-painting backdrop -->
    <div class="hero__stage container">
      <div class="paint" v-parallax="0.06" @pointerenter="stop" @pointerleave="play">
        <div class="window">
          <div class="window__bar">
            <span class="dotr" /><span class="dotr" /><span class="dotr" />
            <span class="window__url">rfbd.cl — {{ current.title }}</span>
          </div>
          <div class="window__body">
            <img
              v-for="(s, i) in shots"
              :key="s.id"
              class="shot"
              :class="{ 'is-active': i === idx }"
              :src="s.img"
              :alt="s.title"
              :loading="i === startIdx ? 'eager' : 'lazy'"
            />

            <!-- Brief description overlay in the corner -->
            <div class="shot__caption">
              <span class="shot__tag">{{ current.tag }}</span>
              <strong class="shot__title">{{ current.title }}</strong>
              <p class="shot__desc">{{ current.tagline[locale] }}</p>
            </div>

            <!-- Manual, transparent-gradient navigation -->
            <button class="shot__nav shot__nav--prev" type="button" aria-label="Anterior" @click="prev">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M15 6l-6 6 6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </button>
            <button class="shot__nav shot__nav--next" type="button" aria-label="Siguiente" @click="next">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9 6l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </button>

            <div class="shot__dots" role="tablist">
              <button
                v-for="(s, i) in shots"
                :key="`d${s.id}`"
                type="button"
                class="shot__dot"
                :class="{ 'is-active': i === idx }"
                :aria-label="s.title"
                :aria-selected="i === idx"
                @click="go(i)"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="hero__trust">
        <span class="hero__trust-label">{{ t.hero.trust }}</span>
        <ul>
          <li v-for="tech in trust" :key="tech"><TechIcon :name="tech" :size="22" /></li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use "../../assets/styles/mixins" as *;

.hero {
  position: relative;
  padding-top: clamp(7rem, 15vh, 10rem);
  padding-bottom: var(--section-pad);
  overflow: hidden;
}

.hero__grid {
  position: absolute;
  inset: 0;
  z-index: 0;
  background-image:
    linear-gradient(to right, var(--c-line) 1px, transparent 1px),
    linear-gradient(to bottom, var(--c-line) 1px, transparent 1px);
  background-size: clamp(64px, 8vw, 116px) clamp(64px, 8vw, 116px);
  mask-image: radial-gradient(ellipse 80% 60% at 50% 22%, #000 35%, transparent 78%);
  opacity: 0.7;
}

.hero__inner {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.hero__badge {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.5rem 1rem;
  border-radius: var(--radius-pill);
  @include glass;
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--c-fg-soft);

  .dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--c-accent);
    box-shadow: 0 0 0 4px var(--c-accent-soft);
    animation: pulse 2.4s ease-in-out infinite;
  }
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.45; }
}

.hero__title {
  margin-top: 1.6rem;
  font-family: var(--f-display);
  font-weight: 900;
  font-size: var(--fs-hero);
  line-height: 1;
  letter-spacing: -0.04em;
  max-width: 16ch;
  color: var(--c-fg);

  &-accent {
    color: var(--c-accent);
  }
}

.hero__lead {
  margin-top: 1.5rem;
  max-width: 56ch;
  font-size: var(--fs-lead);
  line-height: 1.55;
  color: var(--c-muted);
}

.hero__cta {
  margin-top: 2.1rem;
  display: flex;
  gap: 0.8rem;
  flex-wrap: wrap;
  justify-content: center;
}

/* --- App mockup on a painting --- */
.hero__stage {
  position: relative;
  z-index: 1;
  margin-top: clamp(3rem, 6vw, 5rem);
}

.paint {
  @include paint-card("/art/1.jpg");
  padding: clamp(1.5rem, 5vw, 4rem) clamp(1rem, 4vw, 3.5rem) 0;
  box-shadow: var(--shadow-pop);
}

.window {
  position: relative;
  z-index: 1;
  width: min(100%, 980px);
  margin: 0 auto;
  border-radius: 14px 14px 0 0;
  overflow: hidden;
  background: var(--c-bg-raised);
  box-shadow: 0 -2px 40px rgba(0, 0, 0, 0.25);

  &__bar {
    display: flex;
    align-items: center;
    gap: 0.45rem;
    padding: 0.7rem 0.95rem;
    border-bottom: var(--hairline) solid var(--c-line);
    background: var(--c-bg-raised);

    .dotr {
      width: 11px;
      height: 11px;
      border-radius: 50%;
      background: var(--c-line-strong);
    }
  }

  &__url {
    margin-left: 0.7rem;
    font-family: var(--f-mono);
    font-size: 0.72rem;
    color: var(--c-muted);
  }

  &__body {
    position: relative;
    background: var(--c-bg-sunken);
    aspect-ratio: 16 / 10;
    overflow: hidden;
  }
}

/* stacked screenshots that cross-fade */
.shot {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
  opacity: 0;
  transform: scale(1.015);
  transition:
    opacity 0.7s ease,
    transform 0.9s ease;
  pointer-events: none;

  &.is-active {
    opacity: 1;
    transform: scale(1);
  }
}

/* brief description in the corner, over a legible semi-transparent panel */
.shot__caption {
  position: absolute;
  left: clamp(0.7rem, 1.5vw, 1.1rem);
  top: clamp(0.7rem, 1.5vw, 1.1rem);
  z-index: 3;
  max-width: min(78%, 340px);
  padding: 0.7rem 0.9rem;
  border-radius: 14px;
  background: color-mix(in srgb, #0c0c0c 62%, transparent);
  backdrop-filter: blur(10px) saturate(1.3);
  -webkit-backdrop-filter: blur(10px) saturate(1.3);
  border: var(--hairline) solid rgba(255, 255, 255, 0.14);
  box-shadow: 0 8px 24px -12px rgba(0, 0, 0, 0.5);
  color: #fff;
  text-align: left;
}

.shot__tag {
  display: inline-block;
  font-family: var(--f-mono);
  font-size: 0.66rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--c-lime);
}

.shot__title {
  display: block;
  margin-top: 0.15rem;
  font-family: var(--f-display);
  font-weight: 800;
  font-size: 1.02rem;
  letter-spacing: -0.02em;
  line-height: 1.1;
}

.shot__desc {
  margin-top: 0.25rem;
  font-size: 0.78rem;
  line-height: 1.4;
  color: rgba(255, 255, 255, 0.82);
}

/* transparent gradient nav arrows */
.shot__nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 52px;
  color: #fff;
  border-radius: 12px;
  border: var(--hairline) solid rgba(255, 255, 255, 0.2);
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.22),
    rgba(255, 255, 255, 0.06)
  );
  backdrop-filter: blur(8px) saturate(1.3);
  -webkit-backdrop-filter: blur(8px) saturate(1.3);
  box-shadow: 0 6px 18px -8px rgba(0, 0, 0, 0.45);
  opacity: 0.55;
  transition:
    opacity 0.2s ease,
    transform 0.2s ease,
    background-color 0.2s ease;

  svg {
    width: 20px;
    height: 20px;
  }

  &:hover {
    opacity: 1;
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.34),
      rgba(255, 255, 255, 0.12)
    );
  }
  &--prev {
    left: clamp(0.5rem, 1.2vw, 0.9rem);
  }
  &--next {
    right: clamp(0.5rem, 1.2vw, 0.9rem);
  }
  &:hover.shot__nav--prev {
    transform: translateY(-50%) translateX(-2px);
  }
  &:hover.shot__nav--next {
    transform: translateY(-50%) translateX(2px);
  }
}

.shot__dots {
  position: absolute;
  bottom: 0.7rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 3;
  display: flex;
  gap: 0.4rem;
  padding: 0.35rem 0.5rem;
  border-radius: var(--radius-pill);
  background: color-mix(in srgb, #0c0c0c 45%, transparent);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
}

.shot__dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.45);
  transition:
    width 0.25s ease,
    background-color 0.25s ease;

  &.is-active {
    width: 20px;
    border-radius: var(--radius-pill);
    background: var(--c-lime);
  }
}

@media (prefers-reduced-motion: reduce) {
  .shot {
    transition: opacity 0.2s ease;
    transform: none;
    &.is-active {
      transform: none;
    }
  }
}

.hero__trust {
  position: relative;
  z-index: 1;
  margin-top: 2.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  &-label {
    font-family: var(--f-mono);
    font-size: var(--fs-mono);
    letter-spacing: 0.03em;
    color: var(--c-muted);
  }

  ul {
    display: flex;
    align-items: center;
    gap: clamp(1.1rem, 3vw, 2.2rem);
    flex-wrap: wrap;
    justify-content: center;
    color: var(--c-fg-soft);
    opacity: 0.85;
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero__badge .dot {
    animation: none;
  }
}
</style>
