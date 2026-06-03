<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";
import { useTranslations } from "@/i18n/useTranslations";

// Full-screen "hacker terminal on an old CRT" preloader shown on page load.
// Types a boot sequence, fills a progress bar, flashes "ACCESS GRANTED",
// then powers off and reveals the site. Skippable; degrades for reduced motion.

const { t } = useTranslations();

const reduceMotion =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const visible = ref(true);
const revealing = ref(false); // CRT "opens" into a window onto the live page
const entering = ref(false); // zoom-in, as if we move into the page
const granted = ref(false);
const shownLines = ref<string[]>([]);
const progress = ref(0);

let timers: number[] = [];
const clear = () => {
  timers.forEach((id) => clearTimeout(id));
  timers = [];
};

const finish = () => {
  if (revealing.value) return;
  clear();
  shownLines.value = t.value.intro.lines.slice();
  granted.value = true;
  progress.value = 100;
  // Beat 1: hold "ACCESS GRANTED", then open the CRT into a window onto the
  // live page (the site appears inside the same screen hole).
  timers.push(
    window.setTimeout(() => {
      revealing.value = true;
      // Beat 2: zoom in through the screen, as if entering the page.
      timers.push(
        window.setTimeout(() => {
          entering.value = true;
          document.documentElement.classList.remove("boot-lock");
          document.documentElement.classList.add("boot-reveal");
          timers.push(window.setTimeout(() => (visible.value = false), 850));
        }, 640),
      );
    }, 700),
  );
};

const run = () => {
  const lines = t.value.intro.lines;
  const step = 360;
  lines.forEach((line, i) => {
    timers.push(
      window.setTimeout(() => {
        shownLines.value.push(line);
        progress.value = Math.round(((i + 1) / lines.length) * 100);
      }, step * (i + 1)),
    );
  });
  // After the last line, show ACCESS GRANTED and power off.
  timers.push(window.setTimeout(finish, step * (lines.length + 1) + 200));
};

onMounted(() => {
  document.documentElement.classList.add("boot-lock");
  if (reduceMotion) {
    // Minimal: show the granted frame briefly, then reveal.
    shownLines.value = t.value.intro.lines.slice();
    granted.value = true;
    progress.value = 100;
    timers.push(
      window.setTimeout(() => {
        document.documentElement.classList.remove("boot-lock");
        visible.value = false;
      }, 650),
    );
    return;
  }
  run();
});

onBeforeUnmount(() => {
  clear();
  document.documentElement.classList.remove("boot-lock", "boot-reveal");
});
</script>

<template>
  <Teleport to="body">
    <div
      v-if="visible"
      class="boot"
      :class="{ 'is-reveal': revealing, 'is-enter': entering }"
      role="status"
      aria-label="Cargando"
      @click="finish"
      @keydown="finish"
    >
      <div class="boot__screen">
        <div class="boot__content">
          <p class="boot__head">RFBD//OS · SECURE TERMINAL — rfbd.cl</p>

          <div class="boot__log">
            <p v-for="(line, i) in shownLines" :key="i" class="boot__line">{{ line }}</p>
            <p v-if="!granted" class="boot__line boot__cursor">▋</p>
          </div>

          <div class="boot__bar" aria-hidden="true">
            <span class="boot__fill" :style="{ width: progress + '%' }" />
          </div>
          <p class="boot__pct">{{ progress }}%</p>

          <Transition name="grant">
            <div v-if="granted" class="boot__granted">
              <span class="boot__granted-text" :data-text="t.intro.granted">{{ t.intro.granted }}</span>
              <span class="boot__welcome">{{ t.intro.welcome }}</span>
            </div>
          </Transition>
        </div>

        <span class="boot__skip">{{ t.intro.skip }}</span>
        <div class="boot__scanlines" aria-hidden="true" />
        <div class="boot__glow" aria-hidden="true" />
      </div>
    </div>
  </Teleport>
</template>

<style scoped lang="scss">
$phosphor: #44ff9e;

.boot {
  position: fixed;
  inset: 0;
  z-index: 100000;
  display: grid;
  place-items: center;
  background: #010402;
  cursor: pointer;
  user-select: none;
  animation: boot-flicker 4s infinite steps(60);
}

// CRT "tube": rounded, slightly vignetted phosphor screen.
.boot__screen {
  position: relative;
  width: min(92vw, 980px);
  height: min(84vh, 620px);
  padding: clamp(1.4rem, 4vw, 3rem);
  overflow: hidden;
  border-radius: 26px / 34px;
  background:
    radial-gradient(120% 120% at 50% 50%, rgba(20, 60, 38, 0.35), #020a06 72%),
    #020a06;
  box-shadow:
    inset 0 0 8rem rgba(0, 0, 0, 0.95),
    inset 0 0 1.2rem rgba(68, 255, 158, 0.12),
    0 0 4rem rgba(40, 161, 90, 0.25);
  color: $phosphor;
  font-family: var(--f-mono, "JetBrains Mono", monospace);
  text-shadow: 0 0 6px rgba(68, 255, 158, 0.55);
}

.boot__content {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  height: 100%;
}

.boot__head {
  font-size: 0.72rem;
  letter-spacing: 0.28em;
  color: rgba(68, 255, 158, 0.65);
  border-bottom: 1px solid rgba(68, 255, 158, 0.22);
  padding-bottom: 0.7rem;
  text-transform: uppercase;
}

.boot__log {
  flex: 1;
  font-size: clamp(0.8rem, 1.7vw, 1.05rem);
  line-height: 1.9;
}

.boot__line {
  white-space: pre-wrap;
  word-break: break-word;
}

.boot__cursor {
  animation: boot-blink 1s steps(2) infinite;
}

.boot__bar {
  height: 12px;
  border: 1px solid rgba(68, 255, 158, 0.4);
  background: rgba(68, 255, 158, 0.06);
  padding: 2px;
}

.boot__fill {
  display: block;
  height: 100%;
  background: repeating-linear-gradient(90deg, $phosphor 0 6px, rgba(68, 255, 158, 0.4) 6px 10px);
  box-shadow: 0 0 10px rgba(68, 255, 158, 0.7);
  transition: width 0.3s ease;
}

.boot__pct {
  font-size: 0.75rem;
  letter-spacing: 0.2em;
  color: rgba(68, 255, 158, 0.7);
}

.boot__granted {
  margin-top: 0.4rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.boot__granted-text {
  position: relative;
  font-family: var(--f-display, "Archivo Black", sans-serif);
  font-size: clamp(1.8rem, 6vw, 3.4rem);
  letter-spacing: 0.04em;
  line-height: 1;
  color: #c7ffe6;
  text-shadow: 0 0 14px rgba(68, 255, 158, 0.85);
  animation: boot-glitch 0.5s steps(2) 3;
}

// Chromatic glitch echoes.
.boot__granted-text::before,
.boot__granted-text::after {
  content: attr(data-text);
  position: absolute;
  inset: 0;
  opacity: 0.7;
}
.boot__granted-text::before {
  color: #ff4d6d;
  transform: translate(-2px, 0);
  mix-blend-mode: screen;
}
.boot__granted-text::after {
  color: #4dd2ff;
  transform: translate(2px, 0);
  mix-blend-mode: screen;
}

.boot__welcome {
  font-size: clamp(0.8rem, 1.8vw, 1rem);
  letter-spacing: 0.12em;
  color: rgba(199, 255, 230, 0.8);
}

.boot__skip {
  position: absolute;
  bottom: 1rem;
  right: 1.4rem;
  z-index: 2;
  font-family: var(--f-mono, monospace);
  font-size: 0.62rem;
  letter-spacing: 0.18em;
  color: rgba(68, 255, 158, 0.45);
  animation: boot-blink 2s steps(2) infinite;
}

// Scanlines + moving sweep.
.boot__scanlines {
  position: absolute;
  inset: 0;
  z-index: 3;
  pointer-events: none;
  background:
    repeating-linear-gradient(0deg, rgba(0, 0, 0, 0.32) 0 1px, transparent 1px 3px);
}
.boot__scanlines::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent, rgba(68, 255, 158, 0.08), transparent);
  height: 24%;
  animation: boot-sweep 5s linear infinite;
}

// Subtle screen-edge curvature darkening.
.boot__glow {
  position: absolute;
  inset: 0;
  z-index: 4;
  pointer-events: none;
  border-radius: inherit;
  box-shadow: inset 0 0 6rem rgba(0, 0, 0, 0.8);
}

// Beat 1 — the CRT "opens" into a window onto the live page: the terminal log
// clears and the screen background turns transparent, so the real site shows
// through the same rounded screen hole (dark bezel still around it).
.boot.is-reveal {
  animation: none;
}
.boot.is-reveal .boot__content {
  opacity: 0;
  transition: opacity 0.4s ease;
}
.boot.is-reveal .boot__screen {
  background: transparent;
  box-shadow:
    inset 0 0 5rem rgba(0, 0, 0, 0.55),
    0 0 4rem rgba(40, 161, 90, 0.3);
  transition:
    background 0.5s ease,
    box-shadow 0.5s ease;
}

// Beat 2 — zoom in: the screen rushes toward us and the dark bezel fades, as if
// we move through the glass into the page, which warms in to fill the viewport.
.boot.is-enter {
  background: transparent;
  transition: background 0.7s ease;
}
.boot.is-enter .boot__screen {
  animation: crt-enter 0.85s cubic-bezier(0.6, 0, 0.2, 1) forwards;
}
.boot.is-enter .boot__scanlines,
.boot.is-enter .boot__glow {
  opacity: 0;
  transition: opacity 0.55s ease;
}

@keyframes crt-enter {
  0% {
    transform: scale(1);
    border-radius: 26px / 34px;
    filter: brightness(1);
  }
  28% {
    filter: brightness(1.25);
  }
  100% {
    transform: scale(2.6);
    border-radius: 0;
    filter: brightness(1.1);
    opacity: 0;
  }
}

@keyframes boot-sweep {
  0% {
    transform: translateY(-120%);
  }
  100% {
    transform: translateY(520%);
  }
}

@keyframes boot-blink {
  0%,
  50% {
    opacity: 1;
  }
  50.01%,
  100% {
    opacity: 0.15;
  }
}

@keyframes boot-flicker {
  0%,
  96%,
  100% {
    opacity: 1;
  }
  97% {
    opacity: 0.82;
  }
  98% {
    opacity: 0.96;
  }
}

@keyframes boot-glitch {
  0%,
  100% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(-1px, 1px);
  }
}

@media (prefers-reduced-motion: reduce) {
  .boot,
  .boot__cursor,
  .boot__skip,
  .boot__scanlines::after,
  .boot__granted-text {
    animation: none !important;
  }
}
</style>
