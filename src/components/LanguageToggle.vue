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
  font-size: var(--fs-mono);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--c-muted);
  border: var(--border-w) solid var(--c-line-strong);
  padding: 0.5rem 0.75rem;
  transition: border-color 0.2s;

  &:hover {
    border-color: var(--c-accent);
  }

  span.active {
    color: var(--c-fg);
  }

  .sep {
    color: var(--c-line-strong);
  }
}
</style>
