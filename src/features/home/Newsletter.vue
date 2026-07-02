<script setup lang="ts">
import { ref } from "vue";
import { useTranslations } from "@/i18n/useTranslations";

const { t } = useTranslations();
const email = ref("");
const EMAIL = "rfbdsistemas@hotmail.com";

const submit = () => {
  const from = email.value.trim();
  const subject = encodeURIComponent("Quiero conversar un proyecto");
  const body = encodeURIComponent(from ? `Hola Renato, mi correo es ${from}.\n\n` : "");
  window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
};
</script>

<template>
  <section class="news">
    <div class="container news__inner">
      <div class="news__text" v-reveal>
        <h2 class="section-title">{{ t.newsletter.heading }}</h2>
        <p class="news__body">{{ t.newsletter.body }}</p>
      </div>

      <form class="news__form" @submit.prevent="submit">
        <div class="news__field">
          <input
            v-model="email"
            type="email"
            :placeholder="t.newsletter.placeholder"
            aria-label="Email"
          />
          <button class="btn btn--primary" type="submit">{{ t.newsletter.cta }}</button>
        </div>
        <p class="news__note">{{ t.newsletter.note }}</p>
      </form>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use "../../assets/styles/mixins" as *;

.news {
  padding-top: var(--section-pad);
}

.news__inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(2rem, 5vw, 4rem);
  align-items: center;

  @include below($bp-md) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}

.news__body {
  margin-top: 1rem;
  color: var(--c-muted);
  font-size: var(--fs-lead);
  line-height: 1.55;
  max-width: 42ch;
}

.news__field {
  display: flex;
  gap: 0.6rem;
  flex-wrap: wrap;

  input {
    flex: 1;
    min-width: 220px;
    padding: 0.95rem 1.3rem;
    border-radius: var(--radius-pill);
    border: var(--hairline) solid var(--c-line-strong);
    background: var(--c-bg-raised);
    color: var(--c-fg);
    font-family: var(--f-body);
    font-size: 1rem;
    transition: border-color 0.2s;

    &:focus {
      outline: none;
      border-color: var(--c-accent);
    }
  }

  .btn {
    padding: 0.95rem 1.6rem;
  }
}

.news__note {
  margin-top: 0.9rem;
  font-size: 0.85rem;
  color: var(--c-muted);
}
</style>
