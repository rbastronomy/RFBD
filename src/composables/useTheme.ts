import { ref, watch } from "vue";

export type Theme = "dark" | "light";

const KEY = "renato-theme";

const stored =
  typeof localStorage !== "undefined" ? (localStorage.getItem(KEY) as Theme | null) : null;

export const theme = ref<Theme>(stored === "light" ? "light" : "dark");

const reduceMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

let animTimer: ReturnType<typeof setTimeout> | undefined;

watch(
  theme,
  (value, prev) => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;

    // Briefly enable a global cross-fade transition when the user toggles.
    if (prev && value !== prev && !reduceMotion()) {
      root.classList.add("theme-anim");
      clearTimeout(animTimer);
      animTimer = setTimeout(() => root.classList.remove("theme-anim"), 450);
    }

    root.dataset.theme = value;
    if (typeof localStorage !== "undefined") localStorage.setItem(KEY, value);
  },
  { immediate: true },
);

export const toggleTheme = () => {
  theme.value = theme.value === "dark" ? "light" : "dark";
};
