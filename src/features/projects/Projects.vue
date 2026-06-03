<script setup lang="ts">
import { useTranslations } from "@/i18n/useTranslations";
import { projects } from "@/content/projects";
import ProjectCard from "./ProjectCard.vue";

const { t } = useTranslations();
const count = String(projects.length).padStart(2, "0");
</script>

<template>
  <section id="work" class="work">
    <div class="work__inner container">
      <header class="work__head" v-reveal="{ x: -80 }">
        <p class="telemetry"><span class="crosshair">+</span> {{ t.work.label }}</p>
        <div class="work__title-row">
          <h2 class="work__heading macro">{{ t.work.heading }}</h2>
          <p class="telemetry">{{ t.work.countLabel }} / {{ count }}</p>
        </div>
      </header>
    </div>

    <div class="work__list">
      <ProjectCard
        v-for="(project, i) in projects"
        :key="project.id"
        v-reveal="{ y: 40, x: i % 2 ? 60 : -60, duration: 0.7 }"
        :project="project"
        :index="i"
      />
    </div>
  </section>
</template>

<style scoped lang="scss">
.work {
  padding-top: var(--section-pad);

  &__head {
    margin-bottom: 2.5rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  &__title-row {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    border-bottom: var(--border-w) solid var(--c-accent);
    padding-bottom: 1rem;
  }

  &__heading {
    font-size: var(--fs-h1);
  }

  // gap:1px over a strong-line background = razor-thin dividers between rows
  &__list {
    display: flex;
    flex-direction: column;
    gap: var(--hairline);
    background: var(--c-line-strong);
    border-block: var(--border-w) solid var(--c-line-strong);
  }
}
</style>
