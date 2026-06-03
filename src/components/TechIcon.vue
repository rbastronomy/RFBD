<script setup lang="ts">
import { computed } from "vue";
import { techMeta } from "@/content/tech";

const props = withDefaults(defineProps<{ name: string; size?: number }>(), {
  size: 16,
});

const meta = computed(() => techMeta(props.name));
</script>

<template>
  <svg
    class="tech-icon"
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    focusable="false"
  >
    <!-- Brand icon when known -->
    <path v-if="meta.path" :d="meta.path" />
    <!-- Generic fallback glyph (code chevrons) -->
    <path
      v-else
      d="M9.4 16.6 4.8 12l4.6-4.6L8 6l-6 6 6 6zM14.6 16.6 19.2 12l-4.6-4.6L16 6l6 6-6 6z"
    />
  </svg>
</template>

<style scoped lang="scss">
.tech-icon {
  display: block;
  flex-shrink: 0;
}
</style>
