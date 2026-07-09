<script setup lang="ts">
// Renato Barria brand glyph — recreated as vector from emails/Logo _ *.html.
// Lines + nodes use currentColor; the root node uses the brand accent (green).
withDefaults(defineProps<{ size?: number | string }>(), { size: 40 });

const nodes = [
  [48, 12],
  [17.28, 33.12],
  [78.72, 33.12],
  [19.2, 50.4],
  [76.8, 50.4],
  [19.2, 84.96],
  [76.8, 84.96],
] as const;

const lines = [
  [48, 12, 48, 108],
  [48, 12, 17.28, 33.12],
  [48, 12, 78.72, 33.12],
  [19.2, 50.4, 76.8, 84.96],
  [19.2, 84.96, 76.8, 50.4],
] as const;
</script>

<template>
  <svg
    class="logo-glyph"
    :width="size"
    :height="typeof size === 'number' ? size * 1.25 : size"
    viewBox="0 0 96 120"
    fill="none"
    role="img"
    aria-label="RFBD"
  >
    <line
      v-for="(l, i) in lines"
      :key="i"
      :x1="l[0]"
      :y1="l[1]"
      :x2="l[2]"
      :y2="l[3]"
      stroke="currentColor"
      stroke-width="3"
      stroke-linecap="round"
    />
    <circle v-for="(n, i) in nodes" :key="`n${i}`" :cx="n[0]" :cy="n[1]" r="4.5" fill="currentColor" />
    <circle cx="48" cy="108" r="5.175" :fill="'var(--c-accent)'" />
  </svg>
</template>

<style scoped lang="scss">
.logo-glyph {
  display: block;
}
</style>
