import { ref, watch } from "vue";

export type Locale = "es" | "en";

const KEY = "renato-locale";

const stored =
  typeof localStorage !== "undefined" ? (localStorage.getItem(KEY) as Locale | null) : null;

export const locale = ref<Locale>(stored === "en" ? "en" : "es");

watch(
  locale,
  (value) => {
    if (typeof localStorage !== "undefined") localStorage.setItem(KEY, value);
    if (typeof document !== "undefined") document.documentElement.lang = value;
  },
  { immediate: true },
);

export const toggleLocale = () => {
  locale.value = locale.value === "es" ? "en" : "es";
};
