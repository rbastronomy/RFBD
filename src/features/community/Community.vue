<script setup lang="ts">
import { onUnmounted, ref } from "vue";
import { useTranslations } from "@/i18n/useTranslations";
import Discord from "@/components/icons/Discord.vue";

const { t } = useTranslations();

const ADDRESS = "rfbd.aternos.me";
const DISCORD_URL = "https://discord.gg/5MsD5syMPm";

const copied = ref(false);
let timer: ReturnType<typeof setTimeout> | undefined;

const copyAddress = async () => {
  try {
    await navigator.clipboard.writeText(ADDRESS);
  } catch {
    return;
  }
  copied.value = true;
  clearTimeout(timer);
  timer = setTimeout(() => (copied.value = false), 1500);
};

onUnmounted(() => clearTimeout(timer));
</script>

<template>
  <section id="community" class="community">
    <div class="container">
      <span class="eyebrow" v-reveal>{{ t.community.label }}</span>
      <h2 class="section-title community__title" v-reveal>{{ t.community.heading }}</h2>
      <p class="community__lead" v-reveal>{{ t.community.lead }}</p>

      <div class="community__grid">
        <div class="community__server" v-reveal>
          <div class="community__address">
            <span class="telemetry">{{ t.community.addressLabel }}</span>
            <p class="community__host">{{ ADDRESS }}</p>
            <button class="btn btn--glass community__copy" type="button" @click="copyAddress">
              {{ copied ? t.community.copied : t.community.copy }}
            </button>
          </div>

          <dl class="community__specs">
            <div v-for="spec in t.community.specs" :key="spec.label" class="community__spec">
              <dt class="telemetry">{{ spec.label }}</dt>
              <dd>{{ spec.value }}</dd>
            </div>
          </dl>
        </div>

        <div class="community__side">
          <div class="community__panel" v-reveal>
            <h3 class="community__panel-title">{{ t.community.joinTitle }}</h3>
            <p class="community__panel-body">{{ t.community.joinBody }}</p>
            <a
              class="btn btn--primary community__discord"
              :href="DISCORD_URL"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Discord /> {{ t.community.discordCta }}
            </a>
          </div>

          <div class="community__panel" v-reveal>
            <h3 class="community__panel-title">{{ t.community.rulesTitle }}</h3>
            <ul class="community__rules">
              <li v-for="rule in t.community.rules" :key="rule">{{ rule }}</li>
            </ul>
          </div>
        </div>
      </div>

      <p class="community__note telemetry" v-reveal>{{ t.community.note }}</p>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use "../../assets/styles/mixins" as *;

.community {
  padding-top: var(--section-pad);
}

.community__title {
  margin-top: 0.9rem;
  max-width: 20ch;
}

.community__lead {
  margin-top: 1.1rem;
  max-width: 62ch;
  font-size: var(--fs-lead);
  line-height: 1.55;
  color: var(--c-muted);
}

.community__grid {
  margin-top: 2.5rem;
  display: grid;
  grid-template-columns: 1.15fr 1fr;
  gap: 1rem;
  align-items: start;

  @include below($bp-md) {
    grid-template-columns: 1fr;
  }
}

.community__server {
  @include glass;
  border-radius: var(--radius-lg);
  padding: clamp(1.5rem, 3vw, 2.25rem);
}

.community__address {
  padding-bottom: 1.5rem;
  border-bottom: var(--hairline) solid var(--c-line);
}

.community__host {
  margin-top: 0.5rem;
  font-family: var(--f-mono);
  font-size: clamp(1.5rem, 4vw, 2.1rem);
  letter-spacing: -0.02em;
  color: var(--c-fg);
  overflow-wrap: anywhere;
}

.community__copy {
  margin-top: 1.1rem;
  padding: 0.7rem 1.25rem;
  font-size: 0.9rem;
}

.community__specs {
  margin-top: 1.5rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.25rem 1rem;

  @include below($bp-sm) {
    grid-template-columns: 1fr;
  }
}

.community__spec dd {
  margin-top: 0.35rem;
  font-family: var(--f-display);
  font-weight: 600;
  font-size: 1.05rem;
  letter-spacing: -0.02em;
  color: var(--c-fg);
}

.community__side {
  display: grid;
  gap: 1rem;
}

.community__panel {
  background: var(--c-bg-raised);
  border: var(--hairline) solid var(--c-line);
  border-radius: var(--radius-lg);
  padding: clamp(1.4rem, 2.6vw, 1.9rem);
}

.community__panel-title {
  font-family: var(--f-display);
  font-weight: 700;
  font-size: 1.15rem;
  letter-spacing: -0.02em;
  color: var(--c-fg);
}

.community__panel-body {
  margin-top: 0.7rem;
  line-height: 1.55;
  color: var(--c-muted);
}

.community__discord {
  margin-top: 1.3rem;
}

.community__rules {
  margin-top: 0.9rem;
  display: grid;
  gap: 0.6rem;

  li {
    position: relative;
    padding-left: 1.1rem;
    line-height: 1.5;
    color: var(--c-fg-soft);

    &::before {
      content: "";
      position: absolute;
      left: 0;
      top: 0.6em;
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background: var(--c-accent);
    }
  }
}

.community__note {
  margin-top: 1.5rem;
}
</style>
