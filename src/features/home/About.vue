<script setup lang="ts">
import { useTranslations } from "@/i18n/useTranslations";
import TechIcon from "@/components/TechIcon.vue";

const { t } = useTranslations();

const stack = [
  "TypeScript",
  "Vue",
  "React",
  "Next.js",
  "Laravel",
  "Node.js",
  "PHP",
  "MySQL",
  "Tailwind",
  "GSAP / Three.js",
];
</script>

<template>
  <section id="about" class="about">
    <div class="about__inner container">
      <header class="about__head" v-reveal="{ x: -80 }">
        <p class="telemetry"><span class="crosshair">+</span> {{ t.about.label }} — 00</p>
        <h2 class="about__heading macro">{{ t.about.heading }}</h2>
      </header>

      <hr class="hr" />

      <div class="about__grid">
        <div class="about__body" v-reveal>
          <p v-for="(p, i) in t.about.body" :key="i">{{ p }}</p>
        </div>

        <aside class="about__stack">
          <p class="telemetry stack-label">{{ t.about.stackLabel }}</p>
          <ul v-reveal:stagger>
            <li v-for="item in stack" :key="item" class="telemetry">
              <TechIcon :name="item" />
              <span>{{ item }}</span>
            </li>
          </ul>
        </aside>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use "../../assets/styles/mixins" as *;

.about {
  padding-block: var(--section-pad);

  &__head {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    margin-bottom: 2rem;
  }

  &__heading {
    font-size: var(--fs-h2);
    max-width: 18ch;
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

  &__body {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    font-size: clamp(1.1rem, 1.6vw, 1.4rem);
    line-height: 1.6;
    max-width: 60ch;
  }

  &__stack {
    border-left: var(--border-w) solid var(--c-line-strong);
    padding-left: 1.5rem;

    @include below($bp-md) {
      border-left: none;
      border-top: var(--border-w) solid var(--c-line-strong);
      padding-left: 0;
      padding-top: 1.5rem;
    }

    .stack-label {
      color: var(--c-accent);
      margin-bottom: 1rem;
    }

    ul {
      display: flex;
      flex-direction: column;
      gap: 0.6rem;
    }

    li {
      color: var(--c-fg);
      display: flex;
      align-items: center;
      gap: 0.6rem;
    }

    .tech-icon {
      color: var(--c-accent);
    }
  }
}
</style>
