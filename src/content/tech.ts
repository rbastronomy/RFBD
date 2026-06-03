// Single source of truth for mapping a free-form tech/language label
// (e.g. "Next.js 14", "GSAP / Three.js", "MySQL 8") to a monochrome brand icon.
// Icons come from `simple-icons` and are painted with `currentColor` so they fit
// the terminal/brutalist look. Unknown techs (drei, Lenis, Playwright, Sanctum…)
// fall back to a generic glyph in TechIcon.vue.
import {
  siTypescript,
  siJavascript,
  siVuedotjs,
  siReact,
  siNextdotjs,
  siLaravel,
  siNodedotjs,
  siPhp,
  siMysql,
  siTailwindcss,
  siVite,
  siGreensock,
  siThreedotjs,
  siHtml5,
  siCss,
  siFramer,
  siReactquery,
} from "simple-icons";

interface SimpleIcon {
  title: string;
  slug: string;
  hex: string;
  path: string;
}

const ICONS: Record<string, SimpleIcon> = {
  typescript: siTypescript,
  javascript: siJavascript,
  vue: siVuedotjs,
  react: siReact,
  next: siNextdotjs,
  laravel: siLaravel,
  node: siNodedotjs,
  php: siPhp,
  mysql: siMysql,
  tailwind: siTailwindcss,
  vite: siVite,
  gsap: siGreensock,
  three: siThreedotjs,
  html: siHtml5,
  css: siCss,
  framer: siFramer,
  tanstack: siReactquery,
};

// Ordered rules: the first regex that matches the (lowercased) tech name wins.
// Order matters — more specific rules go first (e.g. "react three" before "react").
const RULES: [RegExp, string][] = [
  [/typescript/, "typescript"],
  [/react three|three\.?js|\bdrei\b|\br3f\b/, "three"],
  [/react query|tanstack/, "tanstack"],
  [/next/, "next"],
  [/react/, "react"],
  [/vue/, "vue"],
  [/laravel|sanctum|spatie/, "laravel"],
  [/node/, "node"],
  [/tailwind/, "tailwind"],
  [/vite/, "vite"],
  [/gsap|greensock/, "gsap"],
  [/framer|motion/, "framer"],
  [/mysql/, "mysql"],
  [/dompdf|phpspreadsheet|\bphp\b/, "php"],
  [/javascript|(^|\s)js(\s|$)/, "javascript"],
  [/html/, "html"],
  [/(^|\s)css(\s|$|3)/, "css"],
];

export interface TechMeta {
  /** Original label, kept verbatim for display. */
  label: string;
  /** SVG path (24×24 viewBox) for the brand icon, or undefined when unknown. */
  path?: string;
}

/** Resolve a tech/language label to its display label + optional icon path. */
export function techMeta(name: string): TechMeta {
  const lower = name.toLowerCase();
  for (const [re, key] of RULES) {
    if (re.test(lower)) return { label: name, path: ICONS[key]?.path };
  }
  return { label: name };
}
