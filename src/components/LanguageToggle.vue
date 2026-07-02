<script setup lang="ts">
import { useTranslations } from "@/i18n/useTranslations";

const { locale, toggleLocale } = useTranslations();
</script>

<template>
  <button class="lang" type="button" :aria-label="`Switch language, current ${locale}`" @click="toggleLocale">
    <span :class="{ active: locale === 'es' }">ES</span>
    <span class="sep">/</span>
    <span :class="{ active: locale === 'en' }">EN</span>
  </button>
</template>

<style scoped lang="scss">
.lang {
  display: inline-flex;
  gap: 0.4em;
  align-items: center;
  font-family: var(--f-mono);
  font-size: 0.68rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--c-muted);
  border: var(--hairline) solid var(--c-line);
  border-radius: var(--radius-pill);
  padding: 0.42rem 0.7rem;
  transition:
    border-color 0.2s,
    background-color 0.2s;

  &:hover {
    border-color: var(--c-line-strong);
    background: var(--c-accent-soft);
  }

  span.active {
    color: var(--c-accent);
  }

  .sep {
    color: var(--c-line-strong);
  }
}
</style>
