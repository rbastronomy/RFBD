<script setup lang="ts">
import { computed } from "vue";
import type { Project } from "@/content/types";
import { useTranslations } from "@/i18n/useTranslations";
import { openProject } from "@/content/state";
import ArrowUpRight from "@/components/icons/ArrowUpRight.vue";
import TechIcon from "@/components/TechIcon.vue";

const props = defineProps<{ project: Project; index: number }>();
const { t, locale } = useTranslations();

const num = String(props.index + 1).padStart(2, "0");

// Show the main languages/frameworks on the card; collapse the rest into "+N".
const MAX_TECH = 4;
const shownTech = computed(() => props.project.tech.slice(0, MAX_TECH));
const extraTech = computed(() => Math.max(0, props.project.tech.length - MAX_TECH));
</script>

<template>
  <button class="card" type="button" @click="openProject(project)" :aria-label="`${t.work.open}: ${project.title}`">
    <span class="card__num telemetry">{{ num }}</span>

    <span class="card__main">
      <span class="card__title macro">{{ project.title }}</span>
      <span class="card__tagline">{{ project.tagline[locale] }}</span>
      <span class="card__tech">
        <span v-for="tech in shownTech" :key="tech" class="tech telemetry">
          <TechIcon :name="tech" :size="13" />
          <span>{{ tech }}</span>
        </span>
        <span v-if="extraTech" class="tech tech--more telemetry">+{{ extraTech }}</span>
      </span>
    </span>

    <span class="card__tags">
      <span v-for="tag in project.tags" :key="tag" class="telemetry tag">{{ tag }}</span>
    </span>

    <span class="card__arrow" aria-hidden="true"><ArrowUpRight /></span>
  </button>
</template>

<style scoped lang="scss">
@use "../../assets/styles/mixins" as *;

.card {
  width: 100%;
  display: grid;
  grid-template-columns: 4rem 1fr auto 3rem;
  align-items: center;
  gap: var(--gutter);
  padding: clamp(1.25rem, 3vw, 2.5rem) 1.5rem;
  text-align: left;
  color: var(--c-fg);
  background: var(--c-bg);
  transition:
    background-color 0.25s,
    color 0.25s;

  &:hover {
    background: var(--c-accent);
    color: #fff;

    .card__num,
    .card__tagline,
    .tag,
    .card__tech .tech,
    .card__tech .tech-icon {
      color: #fff;
    }

    .card__arrow {
      transform: translate(4px, -4px);
    }
  }

  &__num {
    align-self: start;
  }

  &__main {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    min-width: 0;
  }

  &__title {
    font-size: clamp(1.75rem, 5vw, 4rem);
  }

  &__tagline {
    font-size: 1rem;
    color: var(--c-muted);
    max-width: 44ch;
  }

  &__tech {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem 0.6rem;
    margin-top: 0.5rem;

    .tech {
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
      color: var(--c-muted);

      .tech-icon {
        color: var(--c-accent);
      }
    }

    .tech--more {
      align-self: center;
    }
  }

  &__tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    justify-content: flex-end;

    .tag {
      border: var(--hairline) solid currentColor;
      padding: 0.25rem 0.5rem;
      color: var(--c-muted);
    }

    @include below($bp-md) {
      display: none;
    }
  }

  &__arrow {
    display: grid;
    place-items: center;
    transition: transform 0.25s;
  }

  @include below($bp-sm) {
    grid-template-columns: 2.5rem 1fr 2rem;
    .card__tags {
      display: none;
    }
  }
}
</style>
