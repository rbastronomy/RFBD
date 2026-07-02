<script setup lang="ts">
import { reactive, ref } from "vue";
import { useTranslations } from "@/i18n/useTranslations";
import { projects } from "@/content/projects";
import { openProject } from "@/content/state";
import ArrowUpRight from "@/components/icons/ArrowUpRight.vue";

const { t, locale } = useTranslations();

const track = ref<HTMLElement | null>(null);
const failed = reactive<Record<string, boolean>>({});

const scrollByCard = (dir: 1 | -1) => {
  const el = track.value;
  if (!el) return;
  const card = el.querySelector<HTMLElement>(".wcard");
  const amount = card ? card.offsetWidth + 20 : el.clientWidth * 0.8;
  el.scrollBy({ left: amount * dir, behavior: "smooth" });
};
</script>

<template>
  <section id="work" class="works">
    <div class="container">
      <header class="works__head" v-reveal>
        <div>
          <span class="eyebrow">{{ t.work.label }}</span>
          <h2 class="section-title works__title">{{ t.work.heading }}</h2>
          <p class="works__lead">{{ t.work.lead }}</p>
        </div>

        <div class="works__ctrls">
          <button type="button" :aria-label="t.work.prev" @click="scrollByCard(-1)">←</button>
          <button type="button" :aria-label="t.work.next" @click="scrollByCard(1)">→</button>
        </div>
      </header>
    </div>

    <div ref="track" class="works__track">
      <article
        v-for="project in projects"
        :key="project.id"
        class="wcard"
        @click="openProject(project)"
      >
        <div class="wcard__frame">
          <div class="wcard__chrome" aria-hidden="true">
            <span /><span /><span />
            <div class="wcard__url">{{ project.id }}</div>
          </div>
          <div class="wcard__shot">
            <img
              v-if="project.preview?.desktop && !failed[project.id]"
              :src="project.preview.desktop"
              :alt="project.title"
              loading="lazy"
              @error="failed[project.id] = true"
            />
            <span v-else class="wcard__ph">{{ project.title }}</span>
          </div>
        </div>

        <div class="wcard__meta">
          <ul class="wcard__tags">
            <li v-for="tag in project.tags" :key="tag">{{ tag }}</li>
          </ul>
          <h3 class="wcard__name">{{ project.title }}</h3>
          <p class="wcard__tagline">{{ project.tagline[locale] }}</p>
          <span class="wcard__cta">{{ t.work.open }} <ArrowUpRight /></span>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use "../../assets/styles/mixins" as *;

.works {
  padding-top: var(--section-pad);
  overflow: hidden;
}

.works__head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 2rem;
  margin-bottom: 2.4rem;
}

.works__title {
  margin-top: 1rem;
}

.works__lead {
  margin-top: 1rem;
  color: var(--c-muted);
  font-size: var(--fs-lead);
  line-height: 1.55;
  max-width: 46ch;
}

.works__ctrls {
  display: flex;
  gap: 0.6rem;
  flex-shrink: 0;

  button {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    border: var(--hairline) solid var(--c-line-strong);
    background: var(--c-bg-raised);
    color: var(--c-fg);
    font-size: 1.1rem;
    cursor: pointer;
    transition:
      background-color 0.2s,
      border-color 0.2s,
      transform 0.15s;

    &:hover {
      background: var(--c-accent-soft);
      border-color: var(--c-accent);
    }
    &:active {
      transform: scale(0.94);
    }
  }

  @include below($bp-sm) {
    display: none;
  }
}

.works__track {
  display: flex;
  gap: 1.25rem;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  padding-inline: var(--gutter);
  padding-bottom: 1.5rem;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
}

.wcard {
  flex: 0 0 min(78vw, 460px);
  scroll-snap-align: start;
  cursor: pointer;
  border-radius: var(--radius-lg);
  background: var(--c-bg-raised);
  border: var(--hairline) solid var(--c-line);
  box-shadow: var(--shadow-soft);
  overflow: hidden;
  transition:
    transform 0.28s cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 0.28s;

  &:hover {
    transform: translateY(-6px);
    box-shadow: var(--shadow-pop);
  }

  &__frame {
    background: var(--c-bg-sunken);
    border-bottom: var(--hairline) solid var(--c-line);
  }

  &__chrome {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.7rem 0.9rem;

    span {
      width: 9px;
      height: 9px;
      border-radius: 50%;
      background: var(--c-line-strong);
    }
  }

  &__url {
    margin-left: 0.6rem;
    flex: 1;
    height: 22px;
    border-radius: var(--radius-pill);
    background: var(--c-bg-raised);
    border: var(--hairline) solid var(--c-line);
    display: flex;
    align-items: center;
    padding-inline: 0.7rem;
    font-family: var(--f-mono);
    font-size: 0.66rem;
    color: var(--c-muted);
  }

  &__shot {
    position: relative;
    aspect-ratio: 16 / 10;
    overflow: hidden;
    background: var(--c-bg-sunken);

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: top center;
      display: block;
      transition: transform 0.5s ease;
    }
  }

  &:hover &__shot img {
    transform: scale(1.04);
  }

  &__ph {
    position: absolute;
    inset: 0;
    display: grid;
    place-items: center;
    text-align: center;
    padding: 1rem;
    font-family: var(--f-display);
    font-size: 1.4rem;
    color: var(--c-muted);
  }

  &__meta {
    padding: 1.4rem 1.5rem 1.6rem;
  }

  &__tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
    margin-bottom: 0.8rem;

    li {
      font-family: var(--f-mono);
      font-size: 0.66rem;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: var(--c-accent);
      background: var(--c-accent-soft);
      padding: 0.25rem 0.6rem;
      border-radius: var(--radius-pill);
    }
  }

  &__name {
    font-family: var(--f-display);
    font-weight: 600;
    font-size: 1.5rem;
    letter-spacing: -0.015em;
  }

  &__tagline {
    margin-top: 0.4rem;
    color: var(--c-muted);
    line-height: 1.5;
  }

  &__cta {
    margin-top: 1.1rem;
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    font-weight: 600;
    color: var(--c-fg);

    svg {
      width: 16px;
      height: 16px;
      transition: transform 0.2s;
    }
  }

  &:hover &__cta svg {
    transform: translate(2px, -2px);
  }
}
</style>
