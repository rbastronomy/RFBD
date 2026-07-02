<script setup lang="ts">
import { useTranslations } from "@/i18n/useTranslations";
import Mail from "@/components/icons/Mail.vue";
import Github from "@/components/icons/Github.vue";

const { t } = useTranslations();
const EMAIL = "rfbdsistemas@hotmail.com";
</script>

<template>
  <section id="contact" class="contact">
    <div class="container">
      <div class="contact__card" v-reveal :style="{ backgroundImage: `url(/art/5.jpg)` }">
        <div class="contact__inner">
          <span class="contact__kicker">{{ t.contact.kicker }}</span>
          <h2 class="contact__heading">{{ t.contact.heading }}</h2>
          <p class="contact__body">{{ t.contact.body }}</p>

          <div class="contact__actions">
            <a class="btn btn--primary" :href="`mailto:${EMAIL}`">
              <Mail /> {{ t.contact.emailLabel }}
            </a>
            <a
              class="btn btn--ghost contact__ghost"
              href="https://github.com/rbastronomy"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github /> GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use "../../assets/styles/mixins" as *;

.contact {
  padding-top: var(--section-pad);
}

.contact__card {
  position: relative;
  border-radius: var(--radius-lg);
  overflow: hidden;
  background-size: cover;
  background-position: center;
  box-shadow: var(--shadow-card);

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.55), rgba(255, 255, 255, 0.78));
  }
}

.contact__inner {
  position: relative;
  z-index: 1;
  text-align: center;
  padding: clamp(3rem, 8vw, 6.5rem) clamp(1.5rem, 5vw, 5rem);
}

.contact__kicker {
  display: inline-flex;
  align-items: center;
  font-family: var(--f-mono);
  font-size: var(--fs-mono);
  letter-spacing: 0.03em;
  color: var(--c-accent-strong);
}

.contact__heading {
  margin-top: 1.1rem;
  font-family: var(--f-display);
  font-weight: 900;
  font-size: var(--fs-h1);
  letter-spacing: -0.035em;
  line-height: 1.02;
  color: #141414;
}

.contact__body {
  margin: 1.1rem auto 0;
  max-width: 48ch;
  font-size: var(--fs-lead);
  line-height: 1.55;
  color: #333;
}

.contact__actions {
  margin-top: 2.1rem;
  display: flex;
  gap: 0.8rem;
  justify-content: center;
  flex-wrap: wrap;
}

.contact__ghost {
  background: rgba(255, 255, 255, 0.7);
  border-color: rgba(20, 20, 15, 0.25);
  color: #141414;

  &:hover {
    border-color: #141414;
  }
}
</style>
