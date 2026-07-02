<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations } from "@/i18n/useTranslations";

const { t } = useTranslations();
const active = ref(0);

const section = ref<HTMLElement | null>(null);
const pinEl = ref<HTMLElement | null>(null);

const reduce =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const pinned = ref(false);
let st: ScrollTrigger | null = null;

onMounted(() => {
  const steps = t.value.process.steps.length;
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
    id="process"
    class="process"
    :class="pinned ? 'is-pinned' : 'is-flow'"
  >
    <div ref="pinEl" class="process__pin">
      <div class="container process__inner">
        <aside class="process__rail">
          <span class="eyebrow">{{ t.process.label }}</span>
          <h2 class="section-title process__title">{{ t.process.heading }}</h2>
          <p class="process__lead">{{ t.process.lead }}</p>

          <ol class="process__nav">
            <li
              v-for="(step, i) in t.process.steps"
              :key="i"
              class="nav-step"
              :class="{ 'is-active': active === i, 'is-done': active > i }"
            >
              <span class="nav-step__n">{{ String(i + 1).padStart(2, "0") }}</span>
              <span class="nav-step__label">{{ step.title }}</span>
            </li>
          </ol>
        </aside>

        <div class="stage">
          <div
            v-for="(step, i) in t.process.steps"
            :key="i"
            class="scene"
            :class="{
              'is-active': active === i,
              'is-past': pinned && active > i,
            }"
          >
            <div class="panel">
              <span class="panel__pill">Paso {{ i + 1 }}</span>
              <h3 class="panel__title">{{ step.title }}</h3>
              <p class="panel__body">{{ step.body }}</p>
            </div>

            <!-- intuitive floating props per step -->
            <div class="props" aria-hidden="true">
              <!-- 1 Brief: client idea chat -->
              <div v-if="i === 0" class="chat">
                <span class="chat__av" />
                <span class="chat__txt">"Quiero un sistema para gestionar mi negocio"</span>
              </div>

              <!-- 2 Diseño: design tokens -->
              <div v-else-if="i === 1" class="design">
                <span class="dpill">Color</span>
                <span class="dpill">Tipografía</span>
                <span class="dpill">Layout</span>
                <span class="dpill">Componentes</span>
                <div class="swatches"><b /><b /><b /><b /></div>
              </div>

              <!-- 3 Desarrollo: code editor -->
              <div v-else-if="i === 2" class="editor">
                <div class="editor__bar"><i /><i /><i /></div>
                <div class="editor__code">
                  <span class="cl"><em class="k" />&nbsp;<em class="v" /></span>
                  <span class="cl indent"><em class="t" />&nbsp;<em class="s" /></span>
                  <span class="cl indent"><em class="s" /></span>
                  <span class="cl"><em class="k" /></span>
                  <span class="term">$ deploy ✓</span>
                </div>
              </div>

              <!-- 4 Entrega: deployed -->
              <div v-else class="deploy">
                <div class="deploy__bar"><i /><i /><i /><span class="deploy__url" /></div>
                <div class="deploy__body"><span class="deploy__badge">EN LÍNEA ✓</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use "../../assets/styles/mixins" as *;

.process {
  padding-top: var(--section-pad);
}

.process__inner {
  display: grid;
  grid-template-columns: 0.8fr 1.2fr;
  gap: clamp(2rem, 5vw, 5rem);
  align-items: center;

  @include below($bp-md) {
    grid-template-columns: 1fr;
    align-items: start;
  }
}

.process__title { margin-top: 1rem; }

.process__lead {
  margin-top: 1rem;
  color: var(--c-muted);
  font-size: var(--fs-lead);
  line-height: 1.55;
  max-width: 36ch;
}

.process__nav {
  margin-top: 2.2rem;
  display: flex;
  flex-direction: column;

  @include below($bp-md) { display: none; }
}

.nav-step {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.85rem 0;
  border-top: var(--hairline) solid var(--c-line);
  color: var(--c-muted);
  transition: color 0.25s;

  &__n { font-family: var(--f-mono); font-size: 0.78rem; }
  &__label { font-weight: 700; font-size: 1.15rem; letter-spacing: -0.01em; }

  &.is-done { color: var(--c-fg-soft); .nav-step__n { color: var(--c-accent); } }
  &.is-active {
    color: var(--c-fg);
    .nav-step__n { color: var(--c-accent); }
    .nav-step__label { color: var(--c-fg); }
  }
}

/* painting stage holding the scenes */
.stage {
  @include paint-card("/art/2.jpg");
  box-shadow: var(--shadow-card);
  min-height: clamp(440px, 64vh, 600px);
}

.scene {
  padding: clamp(1.3rem, 3vw, 2.4rem);
}

/* pinned mode: scenes stacked absolutely, cross-fade from below */
.is-pinned .stage { position: relative; }
.is-pinned .scene {
  position: absolute;
  inset: 0;
  z-index: 1;
  opacity: 0;
  transform: translateY(42px);
  transition: opacity 0.55s cubic-bezier(0.22, 1, 0.36, 1), transform 0.55s cubic-bezier(0.22, 1, 0.36, 1);
  pointer-events: none;

  &.is-active { opacity: 1; transform: translateY(0); z-index: 2; pointer-events: auto; }
  &.is-past { opacity: 0; transform: translateY(-42px); }
}

/* flow mode (mobile / reduced-motion): scenes stacked in normal flow */
.is-flow .stage {
  display: flex;
  flex-direction: column;
  gap: clamp(1rem, 2.5vw, 1.6rem);
  padding: clamp(1rem, 2.5vw, 1.6rem);
  min-height: 0;
}
.is-flow .scene {
  position: relative;
  z-index: 1;
}

/* white panel */
.panel {
  position: relative;
  z-index: 2;
  width: min(100%, 540px);
  background: color-mix(in srgb, var(--c-bg-raised) 95%, transparent);
  backdrop-filter: blur(4px);
  border-radius: var(--radius);
  box-shadow: var(--shadow-soft);
  padding: clamp(1.2rem, 2.6vw, 1.8rem);

  &__pill {
    display: inline-flex;
    align-items: center;
    padding: 0.4rem 0.95rem;
    border-radius: var(--radius-pill);
    background: var(--c-ink);
    color: var(--c-lime);
    font-family: var(--f-mono);
    font-size: 0.74rem;
    font-weight: 700;
    letter-spacing: 0.03em;
  }
  &__title {
    margin-top: 1rem;
    font-family: var(--f-display);
    font-weight: 800;
    font-size: var(--fs-h3);
    letter-spacing: -0.02em;
  }
  &__body {
    margin-top: 0.6rem;
    color: var(--c-fg-soft);
    font-size: var(--fs-body);
    line-height: 1.55;
    max-width: 48ch;
  }
}

/* floating props */
.props { position: relative; z-index: 1; }
.is-pinned .props {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
}
.is-flow .props { margin-top: 1rem; }

/* chat bubble */
.chat {
  position: absolute;
  right: clamp(0.8rem, 3vw, 2.4rem);
  bottom: clamp(1rem, 5vw, 3rem);
  max-width: 320px;
  display: flex;
  align-items: center;
  gap: 0.7rem;
  background: var(--c-bg-raised);
  border-radius: var(--radius);
  box-shadow: var(--shadow-pop);
  padding: 0.9rem 1.1rem;

  .is-flow & { position: static; max-width: none; }

  &__av {
    width: 28px; height: 28px; border-radius: 50%; flex-shrink: 0;
    background: var(--c-accent);
    box-shadow: 0 0 0 4px var(--c-accent-soft);
  }
  &__txt { font-weight: 600; font-size: 0.92rem; color: var(--c-fg); line-height: 1.35; }
}

/* design tokens */
.design {
  position: absolute;
  right: clamp(0.8rem, 3vw, 2.4rem);
  bottom: clamp(1rem, 4vw, 2.4rem);
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  max-width: 300px;
  justify-content: flex-end;

  .is-flow & { position: static; max-width: none; justify-content: flex-start; }

  .dpill {
    background: var(--c-bg-raised);
    box-shadow: var(--shadow-soft);
    border-radius: var(--radius-pill);
    padding: 0.5rem 0.95rem;
    font-size: 0.82rem;
    font-weight: 600;
    color: var(--c-fg-soft);
  }
  .swatches {
    display: flex; gap: 0.4rem; width: 100%; justify-content: flex-end;
    b { width: 26px; height: 26px; border-radius: 8px; box-shadow: var(--shadow-soft); }
    b:nth-child(1){ background:#1fa64c } b:nth-child(2){ background:#2b6cb0 }
    b:nth-child(3){ background:#e2b400 } b:nth-child(4){ background:#1a1a1a }
  }
  .is-flow & .swatches { justify-content: flex-start; }
}

/* code editor */
.editor {
  position: absolute;
  right: clamp(0.8rem, 3vw, 2.2rem);
  bottom: clamp(1rem, 4vw, 2.2rem);
  width: min(58%, 340px);
  background: #14151a;
  border-radius: 12px;
  box-shadow: var(--shadow-pop);
  overflow: hidden;

  .is-flow & { position: static; width: 100%; max-width: 360px; }

  &__bar {
    display: flex; gap: 0.35rem; padding: 0.55rem 0.7rem;
    background: #1c1d24;
    i { width: 9px; height: 9px; border-radius: 50%; background: #3a3b44; }
  }
  &__code {
    padding: 0.8rem 0.9rem;
    display: flex; flex-direction: column; gap: 0.5rem;
  }
  .cl {
    display: flex; align-items: center; height: 9px;
    &.indent { padding-left: 1.1rem; }
    em { display: block; height: 8px; border-radius: 3px; }
    .k { width: 34px; background: #c678dd; }
    .v { width: 80px; background: #98c379; }
    .t { width: 46px; background: #61afef; }
    .s { width: 64px; background: #5c6370; }
  }
  .term {
    margin-top: 0.4rem;
    font-family: var(--f-mono);
    font-size: 0.72rem;
    color: var(--c-lime);
  }
}

/* deploy window */
.deploy {
  position: absolute;
  right: clamp(0.8rem, 3vw, 2.2rem);
  bottom: clamp(1rem, 4vw, 2.2rem);
  width: min(56%, 320px);
  background: var(--c-bg-raised);
  border-radius: 12px;
  box-shadow: var(--shadow-pop);
  overflow: hidden;

  .is-flow & { position: static; width: 100%; max-width: 340px; }

  &__bar {
    display: flex; align-items: center; gap: 0.35rem;
    padding: 0.55rem 0.7rem; border-bottom: var(--hairline) solid var(--c-line);
    i { width: 9px; height: 9px; border-radius: 50%; background: var(--c-line-strong); }
  }
  &__url { margin-left: 0.5rem; flex: 1; height: 14px; border-radius: 7px; background: var(--c-bg-sunken); }
  &__body { display: grid; place-items: center; padding: 1.6rem 1rem; }
  &__badge {
    display: inline-flex; align-items: center;
    padding: 0.5rem 1rem; border-radius: var(--radius-pill);
    background: var(--c-accent-soft); color: var(--c-accent-strong);
    font-weight: 700; font-size: 0.85rem; letter-spacing: 0.02em;
  }
}
</style>
