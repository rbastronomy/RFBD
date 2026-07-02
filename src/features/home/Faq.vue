<script setup lang="ts">
import { ref } from "vue";
import { useTranslations } from "@/i18n/useTranslations";

const { t } = useTranslations();
const open = ref(0);

const toggle = (i: number) => {
  open.value = open.value === i ? -1 : i;
};
</script>

<template>
  <section id="faq" class="faq">
    <div class="container faq__inner">
      <header class="faq__head" v-reveal>
        <span class="eyebrow">{{ t.faq.label }}</span>
        <h2 class="section-title faq__title">{{ t.faq.heading }}</h2>
      </header>

      <ul class="faq__list">
        <li v-for="(item, i) in t.faq.items" :key="i" class="qa" :class="{ 'is-open': open === i }">
          <button class="qa__q" type="button" :aria-expanded="open === i" @click="toggle(i)">
            <span class="qa__n">{{ String(i + 1).padStart(2, "0") }}</span>
            <span class="qa__text">{{ item.q }}</span>
            <span class="qa__icon" aria-hidden="true" />
          </button>
          <div class="qa__a">
            <p>{{ item.a }}</p>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use "../../assets/styles/mixins" as *;

.faq {
  padding-top: var(--section-pad);
}

.faq__inner {
  display: grid;
  grid-template-columns: 0.7fr 1.3fr;
  gap: clamp(2rem, 5vw, 4rem);
  align-items: start;

  @include below($bp-md) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}

.faq__head {
  position: sticky;
  top: 120px;

  @include below($bp-md) {
    position: static;
  }
}

.faq__title {
  margin-top: 1rem;
}

.faq__list {
  display: flex;
  flex-direction: column;
}

.qa {
  border-top: var(--hairline) solid var(--c-line);

  &:last-child {
    border-bottom: var(--hairline) solid var(--c-line);
  }

  &__q {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1.4rem 0.25rem;
    text-align: left;
    cursor: pointer;
    color: var(--c-fg);
  }

  &__n {
    font-family: var(--f-mono);
    font-size: 0.75rem;
    color: var(--c-accent);
  }

  &__text {
    flex: 1;
    font-family: var(--f-display);
    font-weight: 500;
    font-size: clamp(1.1rem, 2vw, 1.35rem);
    letter-spacing: -0.01em;
  }

  &__icon {
    position: relative;
    width: 18px;
    height: 18px;
    flex-shrink: 0;

    &::before,
    &::after {
      content: "";
      position: absolute;
      background: var(--c-fg-soft);
      transition: transform 0.28s ease;
    }
    &::before {
      top: 8px;
      left: 0;
      width: 18px;
      height: 2px;
    }
    &::after {
      top: 0;
      left: 8px;
      width: 2px;
      height: 18px;
    }
  }

  &.is-open &__icon::after {
    transform: scaleY(0);
  }

  &__a {
    display: grid;
    grid-template-rows: 0fr;
    transition: grid-template-rows 0.32s cubic-bezier(0.22, 1, 0.36, 1);

    p {
      overflow: hidden;
      color: var(--c-muted);
      font-size: var(--fs-body);
      line-height: 1.65;
      max-width: 62ch;
    }
  }

  &.is-open &__a {
    grid-template-rows: 1fr;
  }

  &.is-open &__a p {
    padding-bottom: 1.4rem;
  }
}
</style>
