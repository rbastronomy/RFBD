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
    color: var(--c-accent);
  }

  .sep {
    color: var(--c-line-strong);
  }
}
</style>
