<script setup lang="ts">
import { useTranslations } from "@/i18n/useTranslations";
import Logo from "./Logo.vue";

const { t } = useTranslations();
const year = new Date().getFullYear();
</script>

<template>
  <footer class="footer">
    <div class="footer__inner container">
      <p class="telemetry footer__copy">
        <Logo :size="18" /> © {{ year }} RENATO BARRIA — {{ t.footer.rights }}
      </p>
      <p class="telemetry">{{ t.footer.builtWith }}</p>
    </div>
  </footer>
</template>

<style scoped lang="scss">
@use "../assets/styles/mixins" as *;

.footer {
  border-top: var(--border-w) solid var(--c-line-strong);
  padding-block: 2rem;

  &__inner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    flex-wrap: wrap;
  }

  &__copy {
    display: inline-flex;
    align-items: center;
    gap: 0.6rem;
  }

  @include below($bp-md) {
    &__inner {
      flex-direction: column;
      align-items: flex-start;
    }
  }
}
</style>
