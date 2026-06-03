<script setup lang="ts">
import { useTranslations } from "@/i18n/useTranslations";
import { scrollTo } from "@/composables/useScroll";
import LanguageToggle from "./LanguageToggle.vue";
import ThemeToggle from "./ThemeToggle.vue";
import Logo from "./Logo.vue";

const { t } = useTranslations();

const go = (id: string) => scrollTo(`#${id}`, -1);
</script>

<template>
  <header class="header">
    <div class="header__inner container">
      <button class="logo" type="button" aria-label="Renato Barria — top" @click="scrollTo(0)">
        <Logo :size="22" />
        <span class="logo__word">RENATO BARRIA<span class="accent">®</span></span>
      </button>

      <nav class="nav">
        <button type="button" @click="go('about')">{{ t.nav.about }}</button>
        <button type="button" @click="go('work')">{{ t.nav.work }}</button>
        <button type="button" @click="go('contact')">{{ t.nav.contact }}</button>
      </nav>

      <div class="toggles">
        <ThemeToggle />
        <LanguageToggle />
      </div>
    </div>
  </header>
</template>

<style scoped lang="scss">
@use "../assets/styles/mixins" as *;

.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: var(--z-header);
  border-bottom: var(--hairline) solid var(--c-line);
  background: color-mix(in srgb, var(--c-bg) 80%, transparent);
  backdrop-filter: blur(6px);

  &__inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 64px;
  }
}

.logo {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  color: var(--c-fg);

  &__word {
    font-family: var(--f-wordmark);
    font-weight: 700;
    font-size: 1.05rem;
    letter-spacing: 0.02em;
  }

  @include below($bp-sm) {
    .logo__word {
      display: none;
    }
  }
}

.toggles {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.nav {
  display: flex;
  gap: 2rem;

  button {
    font-family: var(--f-mono);
    font-size: var(--fs-mono);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--c-muted);
    transition: color 0.2s;

    &:hover {
      color: var(--c-accent);
    }
  }

  @include below($bp-md) {
    display: none;
  }
}
</style>
