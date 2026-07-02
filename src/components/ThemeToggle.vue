<script setup lang="ts">
import { theme, toggleTheme } from "@/composables/useTheme";
</script>

<template>
  <button
    class="theme"
    type="button"
    :aria-label="theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'"
    @click="toggleTheme"
  >
    <span :class="{ active: theme === 'dark' }">DARK</span>
    <span class="sep" aria-hidden="true">/</span>
    <span :class="{ active: theme === 'light' }">LIGHT</span>
  </button>
</template>

<style scoped lang="scss">
.theme {
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
