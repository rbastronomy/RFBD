<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import { useTranslations } from "@/i18n/useTranslations";
import { scrollTo } from "@/composables/useScroll";
import LanguageToggle from "./LanguageToggle.vue";
import ThemeToggle from "./ThemeToggle.vue";
import Logo from "./Logo.vue";

const { t } = useTranslations();

const go = (id: string) => scrollTo(`#${id}`, -8);

const menuOpen = ref(false);
const goMobile = (id: string) => {
  menuOpen.value = false;
  go(id);
};

const scrolled = ref(false);
const onScroll = () => {
  scrolled.value = window.scrollY > 24;
};
const onKey = (e: KeyboardEvent) => {
  if (e.key === "Escape") menuOpen.value = false;
};
onMounted(() => {
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("keydown", onKey);
  onScroll();
});
onUnmounted(() => {
  window.removeEventListener("scroll", onScroll);
  window.removeEventListener("keydown", onKey);
});
</script>

<template>
  <header class="header" :class="{ 'is-scrolled': scrolled }">
    <div class="header__bar">
      <button class="logo" type="button" aria-label="RFBD — inicio" @click="scrollTo(0)">
        <Logo :size="20" />
        <span class="logo__word">RFBD<span class="accent">®</span></span>
      </button>

      <nav class="nav">
        <button type="button" @click="go('services')">{{ t.nav.services }}</button>
        <button type="button" @click="go('process')">{{ t.nav.process }}</button>
        <button type="button" @click="go('work')">{{ t.nav.work }}</button>
      </nav>

      <div class="header__actions">
        <div class="toggles">
          <LanguageToggle />
          <ThemeToggle />
        </div>
        <button class="btn btn--primary header__cta" type="button" @click="go('contact')">
          {{ t.nav.contact }}
        </button>

        <button
          class="menu-btn"
          type="button"
          :aria-expanded="menuOpen"
          aria-label="Menú"
          @click="menuOpen = !menuOpen"
        >
          <span class="menu-btn__box" :class="{ 'is-open': menuOpen }">
            <span /><span /><span />
          </span>
        </button>
      </div>
    </div>

    <!-- Mobile menu -->
    <div v-if="menuOpen" class="menu-backdrop" @click="menuOpen = false" />
    <transition name="menu">
      <div v-if="menuOpen" class="mobile-menu">
        <nav class="mobile-menu__nav">
          <button type="button" @click="goMobile('services')">{{ t.nav.services }}</button>
          <button type="button" @click="goMobile('process')">{{ t.nav.process }}</button>
          <button type="button" @click="goMobile('work')">{{ t.nav.work }}</button>
        </nav>
        <div class="mobile-menu__foot">
          <div class="toggles toggles--menu">
            <LanguageToggle />
            <ThemeToggle />
          </div>
          <button class="btn btn--primary" type="button" @click="goMobile('contact')">
            {{ t.nav.contact }}
          </button>
        </div>
      </div>
    </transition>
  </header>
</template>

<style scoped lang="scss">
@use "../assets/styles/mixins" as *;

.header {
  position: fixed;
  top: clamp(0.6rem, 1.6vw, 1.1rem);
  left: 50%;
  transform: translateX(-50%);
  z-index: var(--z-header);
  width: min(100% - 1.5rem, calc(var(--maxw) + 2rem));
}

.header__bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  height: 60px;
  padding: 0 0.7rem 0 1.1rem;
  border-radius: var(--radius-pill);
  background: var(--glass-bg);
  border: var(--hairline) solid var(--glass-line);
  backdrop-filter: blur(var(--glass-blur)) saturate(1.15);
  -webkit-backdrop-filter: blur(var(--glass-blur)) saturate(1.15);
  transition:
    box-shadow 0.3s ease,
    background-color 0.3s ease;

  .is-scrolled & {
    background: var(--glass-bg-strong);
    box-shadow: var(--glass-shadow);
  }
}

.logo {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  color: var(--c-fg);

  &__word {
    font-family: var(--f-wordmark);
    font-weight: 700;
    font-size: 0.98rem;
    letter-spacing: -0.01em;
  }

  @include below($bp-sm) {
    .logo__word {
      display: none;
    }
  }
}

.nav {
  display: flex;
  gap: 0.35rem;

  button {
    font-family: var(--f-body);
    font-weight: 500;
    font-size: 0.92rem;
    letter-spacing: -0.01em;
    color: var(--c-fg-soft);
    padding: 0.5rem 0.9rem;
    border-radius: var(--radius-pill);
    transition:
      color 0.2s,
      background-color 0.2s;

    &:hover {
      color: var(--c-fg);
      background: var(--c-accent-soft);
    }
  }

  @include below($bp-md) {
    display: none;
  }
}

.header__actions {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.toggles {
  display: flex;
  align-items: center;
  gap: 0.4rem;

  @include below($bp-sm) {
    display: none;
  }
}

.header__cta {
  padding: 0.6rem 1.15rem;
  font-size: 0.9rem;

  @include below($bp-sm) {
    display: none;
  }
}

/* --- Hamburger (mobile only) --- */
.menu-btn {
  display: none;
  width: 42px;
  height: 42px;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-pill);
  color: var(--c-fg);

  @include below($bp-md) {
    display: inline-flex;
  }
}

.menu-btn__box {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 20px;

  span {
    display: block;
    height: 2px;
    width: 100%;
    border-radius: 2px;
    background: currentColor;
    transition:
      transform 0.28s ease,
      opacity 0.2s ease;
  }

  &.is-open span:nth-child(1) {
    transform: translateY(7px) rotate(45deg);
  }
  &.is-open span:nth-child(2) {
    opacity: 0;
  }
  &.is-open span:nth-child(3) {
    transform: translateY(-7px) rotate(-45deg);
  }
}

/* --- Mobile dropdown menu --- */
.menu-backdrop {
  position: fixed;
  inset: 0;
  z-index: -1;
}

.mobile-menu {
  margin-top: 0.6rem;
  padding: 0.8rem;
  border-radius: var(--radius-lg);
  background: var(--glass-bg-strong);
  border: var(--hairline) solid var(--glass-line);
  backdrop-filter: blur(var(--glass-blur)) saturate(1.4);
  -webkit-backdrop-filter: blur(var(--glass-blur)) saturate(1.4);
  box-shadow: var(--glass-shadow);

  &__nav {
    display: flex;
    flex-direction: column;

    button {
      text-align: left;
      font-family: var(--f-body);
      font-weight: 600;
      font-size: 1.05rem;
      color: var(--c-fg);
      padding: 0.85rem 0.9rem;
      border-radius: var(--radius);
      transition: background-color 0.2s;

      &:hover {
        background: var(--c-accent-soft);
      }
    }
  }

  &__foot {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.8rem;
    margin-top: 0.6rem;
    padding-top: 0.8rem;
    border-top: var(--hairline) solid var(--c-line);

    .btn {
      flex: 1;
      justify-content: center;
    }
  }
}

.toggles--menu {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.menu-enter-active,
.menu-leave-active {
  transition:
    opacity 0.22s ease,
    transform 0.22s ease;
}
.menu-enter-from,
.menu-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

@media (prefers-reduced-motion: reduce) {
  .menu-btn__box span,
  .menu-enter-active,
  .menu-leave-active {
    transition: none;
  }
}
</style>
