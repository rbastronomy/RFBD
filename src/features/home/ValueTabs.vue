<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations } from "@/i18n/useTranslations";

const { t } = useTranslations();
const active = ref(0);
const arts = ["/art/4.jpg", "/art/2.jpg", "/art/5.jpg"];

const section = ref<HTMLElement | null>(null);
const pinEl = ref<HTMLElement | null>(null);

const reduce =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const pinned = ref(false);
let st: ScrollTrigger | null = null;

onMounted(() => {
  const steps = t.value.valueTabs.items.length;
  pinned.value = !reduce && window.innerWidth >= 900;
  if (!pinned.value || !section.value) return;

  st = ScrollTrigger.create({
    trigger: section.value,
    start: "top top",
    end: `+=${steps * 88}%`,
    pin: pinEl.value,
    pinSpacing: true,
    anticipatePin: 1,
    onUpdate: (self) => {
      const i = Math.min(steps - 1, Math.floor(self.progress * steps));
      if (i !== active.value) active.value = i;
    },
  });

  // Recalculate once fonts/images settle.
  const refresh = () => ScrollTrigger.refresh();
  window.addEventListener("load", refresh);
  setTimeout(refresh, 600);
});

onUnmounted(() => {
  st?.kill();
  st = null;
});
</script>

<template>
  <section
    ref="section"
    id="services"
    class="values"
    :class="pinned ? 'is-pinned' : 'is-flow'"
  >
    <div ref="pinEl" class="values__pin">
      <div class="container">
        <header class="values__head" v-reveal>
          <span class="eyebrow">{{ t.valueTabs.label }}</span>
          <h2 class="section-title values__title">{{ t.valueTabs.heading }}</h2>
          <p class="values__lead">{{ t.valueTabs.lead }}</p>
        </header>

        <div class="values__tabs" role="tablist">
          <button
            v-for="(item, i) in t.valueTabs.items"
            :key="i"
            class="tab"
            :class="{ 'is-active': active === i, 'is-done': active > i }"
            type="button"
            role="tab"
            :aria-selected="active === i"
            @click="active = i"
          >
            <span class="tab__n">0{{ i + 1 }}</span>
            {{ item.tab }}
          </button>
        </div>

        <div class="values__stage">
          <div
            v-for="(item, i) in t.valueTabs.items"
            :key="i"
            class="scene"
            :class="{ 'is-active': active === i, 'is-past': pinned && active > i }"
            :style="{ backgroundImage: `url(${arts[i]})` }"
          >
            <div class="panel">
              <h3 class="panel__title">{{ item.title }}</h3>
              <p class="panel__body">{{ item.body }}</p>
              <ul class="panel__chips">
                <li v-for="b in item.bullets ?? []" :key="b">
                  <span class="chip-dot" aria-hidden="true" />{{ b }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use "../../assets/styles/mixins" as *;

.values {
  padding-top: var(--section-pad);
}

/* Pinned mode: the whole panel is held to one viewport height and vertically
   centered so nothing is clipped at the bottom while it is pinned. */
.is-pinned.values {
  padding-top: 0;
}
.is-pinned .values__pin {
  min-height: 100vh;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: clamp(5rem, 11vh, 7rem);
  padding-bottom: clamp(1.5rem, 4vh, 3rem);

  > .container {
    width: 100%;
  }
}
.is-pinned .values__head {
  margin-bottom: 1rem;
}
.is-pinned .values__tabs {
  margin-bottom: 1rem;
}

.values__head {
  max-width: 44ch;
  margin-bottom: 1.6rem;
}

.values__title {
  margin-top: 1rem;
}

.values__lead {
  margin-top: 1rem;
  color: var(--c-muted);
  font-size: var(--fs-lead);
  line-height: 1.55;
}

.values__tabs {
  display: flex;
  gap: 0.6rem;
  flex-wrap: wrap;
  margin-bottom: 1.4rem;
}

.tab {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.7rem 1.2rem;
  border-radius: var(--radius-pill);
  background: var(--glass-bg-strong);
  backdrop-filter: blur(var(--glass-blur)) saturate(1.15);
  -webkit-backdrop-filter: blur(var(--glass-blur)) saturate(1.15);
  border: var(--hairline) solid var(--glass-border);
  box-shadow: var(--glass-shadow);
  color: var(--c-fg-soft);
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition:
    transform 0.18s ease,
    background-color 0.22s ease,
    color 0.22s ease,
    border-color 0.22s ease,
    box-shadow 0.2s ease;

  &__n {
    font-family: var(--f-mono);
    font-size: 0.72rem;
    opacity: 0.6;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-pop), 0 1px 0 rgba(255, 255, 255, 0.5) inset;
  }
  &:active { transform: translateY(0); }

  &.is-active {
    background: var(--c-accent);
    color: var(--c-on-accent);
    border-color: var(--c-accent-strong);
    box-shadow: 0 8px 22px -8px color-mix(in srgb, var(--c-accent) 60%, transparent);
    .tab__n { opacity: 0.85; }
  }
}

/* painting stage holding the scenes */
.values__stage {
  position: relative;
  border-radius: var(--radius-lg);
  overflow: hidden;
  min-height: clamp(420px, 54vh, 560px);
  box-shadow: var(--shadow-card);
}

.scene {
  position: relative;
  border-radius: var(--radius-lg);
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: flex-end;
  padding: clamp(1.2rem, 3vw, 2.4rem);

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0.04), rgba(0, 0, 0, 0.16));
    pointer-events: none;
  }
}

/* pinned mode: scenes stacked absolutely, cross-fade from below */
.is-pinned .values__stage {
  position: relative;
  min-height: 0;
  height: clamp(280px, 46vh, 460px);
}
.is-pinned .scene {
  position: absolute;
  inset: 0;
  z-index: 1;
  opacity: 0;
  transform: translateY(42px);
  transition:
    opacity 0.55s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.55s cubic-bezier(0.22, 1, 0.36, 1);
  pointer-events: none;

  &.is-active { opacity: 1; transform: translateY(0); z-index: 2; pointer-events: auto; }
  &.is-past { opacity: 0; transform: translateY(-42px); }
}

/* flow mode (mobile / reduced-motion): scenes stacked in normal flow */
.is-flow .values__stage {
  display: flex;
  flex-direction: column;
  gap: clamp(1rem, 2.5vw, 1.6rem);
  min-height: 0;
  box-shadow: none;
  overflow: visible;
}
.is-flow .scene {
  z-index: 1;
  min-height: clamp(360px, 48vh, 460px);
  box-shadow: var(--shadow-card);
}

/* floating glass panel */
.panel {
  position: relative;
  z-index: 1;
  width: min(100%, 620px);
  @include glass;
  padding: clamp(1.4rem, 3vw, 2.2rem);

  &__title {
    font-family: var(--f-display);
    font-weight: 800;
    font-size: var(--fs-h3);
    letter-spacing: -0.02em;
    line-height: 1.08;
  }

  &__body {
    margin-top: 0.8rem;
    color: var(--c-fg-soft);
    font-size: var(--fs-body);
    line-height: 1.55;
  }

  &__chips {
    margin-top: 1.3rem;
    display: flex;
    flex-wrap: wrap;
    gap: 0.55rem;

    li {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.55rem 0.95rem;
      border-radius: var(--radius-pill);
      background: var(--c-ink);
      color: var(--c-on-ink);
      font-size: 0.85rem;
      font-weight: 500;
    }

    .chip-dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: var(--c-lime);
    }
  }
}
</style>
