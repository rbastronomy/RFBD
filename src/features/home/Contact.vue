<script setup lang="ts">
import { useTranslations } from "@/i18n/useTranslations";
import Github from "@/components/icons/Github.vue";
import Instagram from "@/components/icons/Instagram.vue";
import Mail from "@/components/icons/Mail.vue";

const { t } = useTranslations();

const EMAIL = "rfbdsistemas@hotmail.com";
</script>

<template>
  <section id="contact" class="contact">
    <div class="contact__inner container" v-reveal="{ x: -80 }">
      <p class="telemetry"><span class="crosshair">+</span> {{ t.contact.label }}</p>

      <h2 class="contact__heading macro">{{ t.contact.heading }}</h2>
      <p class="contact__body">{{ t.contact.body }}</p>

      <a class="contact__email" :href="`mailto:${EMAIL}`">
        <Mail /> <span>{{ EMAIL }}</span>
      </a>

      <hr class="hr" />

      <ul class="contact__social">
        <li>
          <a href="https://github.com/rbastronomy" target="_blank" rel="noopener noreferrer">
            <Github /> <span class="telemetry">GitHub / rbastronomy</span>
          </a>
        </li>
        <li>
          <a href="https://instagram.com/rb_astronomy" target="_blank" rel="noopener noreferrer">
            <Instagram /> <span class="telemetry">Instagram / rb_astronomy</span>
          </a>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use "../../assets/styles/mixins" as *;

.contact {
  padding-block: var(--section-pad);

  &__heading {
    font-size: var(--fs-h1);
    margin-top: 1.5rem;
    max-width: 14ch;
  }

  &__body {
    font-size: clamp(1.1rem, 2vw, 1.5rem);
    color: var(--c-muted);
    max-width: 44ch;
    margin-top: 1.5rem;
  }

  &__email {
    display: inline-flex;
    align-items: center;
    gap: 1rem;
    margin-block: 2.5rem;
    font-family: var(--f-display);
    font-size: clamp(1.25rem, 4vw, 3rem);
    letter-spacing: -0.03em;
    color: var(--c-fg);
    border-bottom: var(--border-w) solid var(--c-accent);
    padding-bottom: 0.5rem;
    transition: color 0.2s;
    word-break: break-all;

    svg {
      width: clamp(24px, 3vw, 40px);
      height: clamp(24px, 3vw, 40px);
      flex-shrink: 0;
    }

    &:hover {
      color: var(--c-accent);
    }
  }

  &__social {
    display: flex;
    gap: 2.5rem;
    margin-top: 2rem;
    flex-wrap: wrap;

    a {
      display: inline-flex;
      align-items: center;
      gap: 0.75rem;
      color: var(--c-muted);
      transition: color 0.2s;

      svg {
        width: 20px;
        height: 20px;
      }

      &:hover {
        color: var(--c-accent);
      }
    }
  }
}
</style>
