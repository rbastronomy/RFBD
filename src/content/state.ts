import { ref } from "vue";
import type { Project } from "./types";
import { lenis } from "@/composables/useScroll";

export const selectedProject = ref<Project | null>(null);

export const openProject = (project: Project) => {
  selectedProject.value = project;
  // Pause Lenis so it stops intercepting wheel/touch — the detail overlay
  // scrolls natively via its own [data-lenis-prevent] container.
  lenis.value?.stop();
  document.documentElement.style.overflow = "hidden";
};

export const closeProject = () => {
  selectedProject.value = null;
  document.documentElement.style.overflow = "";
  lenis.value?.start();
};
