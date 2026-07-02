<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import { useTranslations } from "@/i18n/useTranslations";

const { t } = useTranslations();

const root = ref<HTMLElement | null>(null);
const display = ref<string[]>(t.value.stats.items.map(() => "0"));
const arts = ["/art/1.jpg", "/art/5.jpg", "/art/4.jpg", "/art/3.jpg"];
let observer: IntersectionObserver | null = null;
let done = false;

const reduce =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const parse = (v: string) => {
  const m = v.match(/^(\d+)(.*)$/);
  return m ? { num: Number(m[1]), suffix: m[2] ?? "" } : { num: 0, suffix: v };
};

const run = () => {
  if (done) return;
  done = true;
  const items = t.value.stats.items.map((i) => parse(i.value));
  if (reduce) {
    display.value = items.map((i) => `${i.num}${i.suffix}`);
    return;
  }
  const start = performance.now();
  const dur = 1100;
  const frame = (now: number) => {
    const p = Math.min(1, (now - start) / dur);
    const eased = 1 - Math.pow(1 - p, 3);
    display.value = items.map((i) => `${Math.round(i.num * eased)}${i.suffix}`);
    if (p < 1) requestAnimationFrame(frame);
  };
  requestAnimationFrame(frame);
};

onMounted(() => {
  if (!root.value) return;
  observer = new IntersectionObserver(
    (entries) => {
      if (entries.some((e) => e.isIntersecting)) run();
    },
    { threshold: 0.35 },
  );
  observer.observe(root.value);
});

onUnmounted(() => observer?.disconnect());
</script>

<template>
  <section class="stats">
    <div class="container">
      <div ref="root" class="stats__wrap">
        <header class="stats__head">
          <span class="eyebrow eyebrow--on-dark">{{ t.stats.label }}</span>
        </header>
        <div class="stats__grid">
          <article
            v-for="(item, i) in t.stats.items"
            :key="i"
            class="stat"
            :style="{ backgroundImage: `url(${arts[i % arts.length]})` }"
          >
            <span class="stat__value">{{ display[i] }}</span>
            <span class="stat__label">{{ item.label }}</span>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use "../../assets/styles/mixins" as *;

.stats {
  padding-top: var(--section-pad);
}

.stats__wrap {
  background: var(--c-ink);
  border-radius: var(--radius-lg);
  padding: clamp(1.2rem, 3vw, 2rem);
}

.stats__head {
  padding: 0.4rem 0.6rem 1.2rem;
}

.eyebrow--on-dark {
  color: color-mix(in srgb, var(--c-on-ink) 65%, transparent);
}

.stats__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: clamp(0.8rem, 1.6vw, 1.2rem);

  @include below($bp-md) {
    grid-template-columns: repeat(2, 1fr);
  }
}

.stat {
  position: relative;
  border-radius: var(--radius);
  overflow: hidden;
  background-size: cover;
  background-position: center;
  min-height: clamp(190px, 22vw, 250px);
  padding: 1.4rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0.05) 30%, rgba(0, 0, 0, 0.55));
  }

  &__value {
    position: relative;
    z-index: 1;
    font-family: var(--f-display);
    font-weight: 900;
    font-size: clamp(2.4rem, 5vw, 3.4rem);
    line-height: 1;
    letter-spacing: -0.03em;
    color: var(--c-lime);
    text-shadow: 0 2px 14px rgba(0, 0, 0, 0.35);
  }

  &__label {
    position: relative;
    z-index: 1;
    margin-top: 0.5rem;
    color: #fff;
    font-weight: 600;
    font-size: 0.98rem;
    text-shadow: 0 1px 8px rgba(0, 0, 0, 0.4);
  }
}
</style>
