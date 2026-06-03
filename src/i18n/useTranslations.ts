import { computed } from "vue";
import { locale, toggleLocale } from "./store";
import { messages } from "./messages";

export const useTranslations = () => {
  const t = computed(() => messages[locale.value]);
  return { t, locale, toggleLocale };
};
