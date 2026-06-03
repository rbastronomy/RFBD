# Renato — Portafolio (2026)

Portafolio personal de **Renato — Desarrollador Full Stack, Diseñador Web y de SaaS**.
Single-page con scroll cinemático, estética **brutalist / tactical-telemetry** (alto
contraste, tipografía masiva, grids rígidos) y contenido **bilingüe ES/EN**.

Construido con **Vue 3** + **TypeScript** + **Vite**. Motion con **GSAP** (ScrollTrigger)
y scroll suave con **Lenis**. Estilos en **SCSS**.

## Scripts

| Comando            | Descripción                              |
| ------------------ | ---------------------------------------- |
| `npm run dev`      | Servidor de desarrollo en el puerto 3000 |
| `npm run build`    | `vue-tsc` + bundle de producción a `dist/` |
| `npm run preview`  | Sirve el build de producción             |
| `npm run typecheck`| Solo chequeo de tipos (`vue-tsc -b`)     |

## Estructura

- `src/content/projects.ts` — datos de los proyectos (bilingües, data-driven).
- `src/i18n/` — sistema de traducciones ES/EN (`store`, `messages`, `useTranslations`).
- `src/composables/useScroll.ts` — scroll suave (Lenis + GSAP).
- `src/directives/scroll.ts` — directivas `v-reveal` y `v-parallax`.
- `src/features/` — secciones (`home/`, `projects/`).
- `src/assets/styles/` — tokens y estilos brutalist.
- `public/demos/` — modelos funcionales (mock data) embebidos de cada proyecto.
- `obs/`, `emails/` — trabajo real (overlays de Twitch y plantillas de correo).

## Demos embebidas

Cada proyecto puede incluir un **modelo funcional** embebido (`public/demos/<id>/`):
una versión simplificada de frontend con datos ficticios, solo para portafolio. No
son los sistemas de producción y no contienen datos reales de clientes.

## Licencia

Código y diseño © 2026 Renato Barria. Ver [`license.md`](license.md).
