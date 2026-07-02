<script setup lang="ts">
import { ref } from "vue";
import { useTranslations } from "@/i18n/useTranslations";
import { usePhysics } from "@/composables/usePhysics";
import TechIcon from "@/components/TechIcon.vue";

const { t } = useTranslations();

type Item = { type: "icon"; name: string } | { type: "text"; label: string };

const items: Item[] = [
  { type: "icon", name: "React" },
  { type: "icon", name: "Vue" },
  { type: "icon", name: "Next.js" },
  { type: "icon", name: "TypeScript" },
  { type: "icon", name: "JavaScript" },
  { type: "icon", name: "Node" },
  { type: "icon", name: "Laravel" },
  { type: "icon", name: "PHP" },
  { type: "icon", name: "MySQL" },
  { type: "icon", name: "Tailwind" },
  { type: "icon", name: "Vite" },
  { type: "icon", name: "GSAP" },
  { type: "icon", name: "Three.js" },
  { type: "icon", name: "Framer" },
  { type: "icon", name: "TanStack" },
  { type: "icon", name: "HTML" },
  { type: "icon", name: "CSS" },
  { type: "icon", name: "Nuxt" },
  { type: "icon", name: "Express" },
  { type: "icon", name: "Python" },
  { type: "icon", name: "Go" },
  { type: "icon", name: "PostgreSQL" },
  { type: "icon", name: "MongoDB" },
  { type: "icon", name: "Redis" },
  { type: "icon", name: "GraphQL" },
  { type: "icon", name: "Docker" },
  { type: "icon", name: "Prisma" },
  { type: "icon", name: "Sass" },
  { type: "icon", name: "Figma" },
  { type: "icon", name: "Git" },
  { type: "text", label: "npm" },
  { type: "text", label: "API REST" },
  { type: "text", label: "SQL" },
  { type: "text", label: "JSON" },
  { type: "text", label: "CI/CD" },
  { type: "text", label: "Linux" },
  { type: "text", label: "Nginx" },
  { type: "text", label: "WebSockets" },
  { type: "text", label: "Vitest" },
  { type: "text", label: "Zod" },
  { type: "text", label: "Pinia" },
  { type: "text", label: "AWS" },
  { type: "text", label: "OOP" },
  { type: "text", label: "REST" },
  { type: "text", label: "JWT" },
  { type: "text", label: "OAuth" },
  { type: "text", label: "PWA" },
  { type: "text", label: "Vercel" },
  { type: "text", label: "Bash" },
  { type: "text", label: "</>" },
  { type: "text", label: "{ }" },
];

const reduce =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const stage = ref<HTMLElement | null>(null);
const boxes = ref<HTMLElement[]>([]);
const setBox = (el: Element | null, i: number) => {
  if (el) boxes.value[i] = el as HTMLElement;
};

if (!reduce) {
  usePhysics({ container: stage, boxes, size: 72 });
}
</script>

<template>
  <section id="stack" class="stack">
    <div class="container">
      <header class="stack__head" v-reveal>
        <span class="eyebrow">{{ t.stack.label }}</span>
        <h2 class="section-title stack__title">{{ t.stack.heading }}</h2>
        <p class="stack__lead">{{ t.stack.lead }}</p>
      </header>

      <div ref="stage" class="stack__stage" :class="{ 'is-static': reduce }">
        <span v-if="!reduce" class="stack__hint">{{ t.stack.hint }}</span>
        <div
          v-for="(item, i) in items"
          :key="i"
          :ref="(el) => setBox(el as Element | null, i)"
          class="chip"
          :class="item.type === 'text' ? 'chip--text' : 'chip--icon'"
          :title="item.type === 'icon' ? item.name : item.label"
        >
          <TechIcon v-if="item.type === 'icon'" :name="item.name" :size="34" />
          <span v-else>{{ item.label }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use "../../assets/styles/mixins" as *;

.stack {
  padding-top: var(--section-pad);
}

.stack__head {
  max-width: 42ch;
  margin-bottom: 2rem;
}

.stack__title {
  margin-top: 1rem;
}

.stack__lead {
  margin-top: 1rem;
  color: var(--c-muted);
  font-size: var(--fs-lead);
  line-height: 1.55;
}

.stack__stage {
  position: relative;
  width: 100%;
  height: clamp(500px, 66vh, 640px);
  border-radius: var(--radius-lg);
  background:
    radial-gradient(120% 80% at 50% 0%, var(--c-accent-soft), transparent 60%),
    var(--c-bg-sunken);
  border: var(--hairline) solid var(--c-line);
  overflow: hidden;
  cursor: grab;

  &:active {
    cursor: grabbing;
  }

  &.is-static {
    display: flex;
    flex-wrap: wrap;
    align-content: center;
    justify-content: center;
    gap: 0.8rem;
    padding: 2rem;
    cursor: default;
    height: auto;
    min-height: 300px;
  }
}

.stack__hint {
  position: absolute;
  top: 1rem;
  left: 1.1rem;
  z-index: 5;
  font-family: var(--f-mono);
  font-size: var(--fs-mono);
  letter-spacing: 0.03em;
  color: var(--c-muted);
  pointer-events: none;

  .is-static & { display: none; }
}

.chip {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--glass-bg-strong);
  backdrop-filter: blur(var(--glass-blur)) saturate(1.15);
  -webkit-backdrop-filter: blur(var(--glass-blur)) saturate(1.15);
  border: var(--hairline) solid var(--glass-border);
  box-shadow: var(--glass-shadow);
  color: var(--c-fg);
  will-change: transform;
  user-select: none;

  .is-static & {
    position: static;
    will-change: auto;
  }
}

.chip--icon {
  width: 72px;
  height: 72px;
  border-radius: 18px;
}

.chip--text {
  height: 56px;
  padding: 0 1.1rem;
  border-radius: 16px;
  font-family: var(--f-mono);
  font-weight: 600;
  font-size: 0.95rem;
  color: var(--c-fg-soft);
  white-space: nowrap;
}
</style>
