<script setup lang="ts">
import { useTranslations } from "@/i18n/useTranslations";
import { scrollTo } from "@/composables/useScroll";
import Github from "@/components/icons/Github.vue";
import Instagram from "@/components/icons/Instagram.vue";
import Mail from "@/components/icons/Mail.vue";

const { t } = useTranslations();
const year = new Date().getFullYear();
const EMAIL = "rfbdsistemas@hotmail.com";

const go = (id: string) => scrollTo(`#${id}`, -8);
</script>

<template>
  <footer class="footer">
    <div class="container">
      <div class="footer__cols">
        <div class="footer__brand">
          <p class="footer__name">Renato Barria<span class="accent">®</span></p>
          <p class="footer__tag">{{ t.hero.intro }}</p>
          <ul class="footer__social">
            <li><a :href="`mailto:${EMAIL}`" aria-label="Email"><Mail /></a></li>
            <li>
              <a href="https://github.com/rbastronomy" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><Github /></a>
            </li>
            <li>
              <a href="https://instagram.com/rb_astronomy" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><Instagram /></a>
            </li>
          </ul>
        </div>

        <nav class="footer__links">
          <span class="footer__links-title">Menú</span>
          <button type="button" @click="go('services')">{{ t.nav.services }}</button>
          <button type="button" @click="go('process')">{{ t.nav.process }}</button>
          <button type="button" @click="go('work')">{{ t.nav.work }}</button>
          <button type="button" @click="go('contact')">{{ t.nav.contact }}</button>
        </nav>

        <div class="footer__links">
          <span class="footer__links-title">Contacto</span>
          <a :href="`mailto:${EMAIL}`">{{ EMAIL }}</a>
          <a href="https://github.com/rbastronomy" target="_blank" rel="noopener noreferrer">github.com/rbastronomy</a>
          <span class="footer__loc">Iquique, Chile</span>
        </div>
      </div>

      <div class="footer__bottom">
        <p>© {{ year }} Renato Barria — {{ t.footer.rights }}</p>
        <p>{{ t.footer.builtWith }}</p>
      </div>
    </div>

    <p class="footer__wordmark" aria-hidden="true">Renato Barria<span>.</span></p>
  </footer>
</template>

<style scoped lang="scss">
@use "../assets/styles/mixins" as *;

.footer {
  border-top: var(--hairline) solid var(--c-line);
  padding-top: clamp(2.5rem, 6vw, 4rem);
  margin-top: var(--section-pad);
  overflow: hidden;
}

.footer__cols {
  display: grid;
  grid-template-columns: 1.4fr 1fr 1fr;
  gap: 2rem;
  padding-bottom: 2.5rem;

  @include below($bp-md) {
    grid-template-columns: 1fr;
    gap: 1.75rem;
  }
}

.footer__name {
  font-family: var(--f-display);
  font-weight: 800;
  font-size: 1.3rem;
  letter-spacing: -0.02em;
}

.footer__tag {
  margin-top: 0.7rem;
  color: var(--c-muted);
  max-width: 32ch;
  line-height: 1.5;
}

.footer__social {
  display: flex;
  gap: 0.6rem;
  margin-top: 1.2rem;

  a {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: var(--hairline) solid var(--c-line);
    color: var(--c-fg-soft);
    transition: color 0.2s, border-color 0.2s, background-color 0.2s;

    svg { width: 18px; height: 18px; }

    &:hover {
      color: var(--c-accent);
      border-color: var(--c-accent);
      background: var(--c-accent-soft);
    }
  }
}

.footer__links {
  display: flex;
  flex-direction: column;
  gap: 0.55rem;

  &-title {
    font-family: var(--f-mono);
    font-size: var(--fs-mono);
    letter-spacing: 0.03em;
    color: var(--c-muted);
    margin-bottom: 0.4rem;
  }

  button,
  a {
    text-align: left;
    color: var(--c-fg-soft);
    font-size: 0.95rem;
    transition: color 0.2s;
    word-break: break-word;

    &:hover { color: var(--c-accent); }
  }
}

.footer__loc {
  color: var(--c-muted);
  font-size: 0.95rem;
}

.footer__bottom {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
  padding: 1.5rem 0;
  border-top: var(--hairline) solid var(--c-line);
  font-family: var(--f-mono);
  font-size: var(--fs-mono);
  color: var(--c-muted);
}

.footer__wordmark {
  font-family: var(--f-display);
  font-weight: 900;
  font-size: clamp(3rem, 16vw, 15rem);
  line-height: 0.9;
  letter-spacing: -0.04em;
  text-align: center;
  color: var(--c-fg);
  white-space: nowrap;
  margin-top: 1rem;

  span { color: var(--c-accent); }
}
</style>
