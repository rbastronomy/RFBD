import type { Project } from "./types";

// NOTE: Most repos are private (links.private = true) — the UI renders a
// "private repository" label instead of a broken link. Replace media paths
// with real screenshots placed under /public/projects/<id>/.

export const projects: Project[] = [
  {
    id: "la-isla-digital",
    title: "La Isla Digital",
    tagline: {
      es: "Sitio inmersivo para un sello musical.",
      en: "Immersive site for a music label.",
    },
    description: {
      es: "Frontend del sello musical La Isla Digital: una experiencia inmersiva con 3D en tiempo real, scroll cinemático y motion cuidado para presentar lanzamientos y artistas.",
      en: "Frontend for the La Isla Digital music label: an immersive experience with real-time 3D, cinematic scroll and crafted motion to showcase releases and artists.",
    },
    tech: ["Next.js 14", "React Three Fiber", "drei", "GSAP", "Lenis", "Framer Motion", "Tailwind", "Playwright"],
    role: { es: "Diseño y desarrollo frontend", en: "Frontend design & development" },
    tags: ["Web", "Música", "3D"],
    links: { repo: "https://github.com/rbastronomy/La_Isla_Digital", private: true },
    media: [],
    preview: {
      desktop: "/projects/la-isla-digital/desktop.png",
      tablet: "/projects/la-isla-digital/tablet.png",
      mobile: "/projects/la-isla-digital/mobile.png",
    },
    demo: { kind: "embed", src: "/demos/la-isla/index.html" },
  },
  {
    id: "container-os",
    title: "ContainerOS",
    tagline: {
      es: "SaaS de gestión logística de containers.",
      en: "Container logistics management SaaS.",
    },
    description: {
      es: "Sistema de gestión de containers para operación logística portuaria: autenticación por roles, CRUD, dashboard, mapa de patios, detección IA, gate-in/gate-out, alertas, permisos granulares y reportes exportables a XLSX/PDF. Endurecido con tests y paquete de despliegue.",
      en: "Container management system for port logistics: role-based authentication, CRUD, dashboard, yard map, AI detection, gate-in/gate-out, alerts, granular permissions and exportable XLSX/PDF reports. Hardened with tests and a deploy package.",
    },
    tech: [
      "React 18",
      "Vite",
      "Tailwind",
      "TanStack Query",
      "Laravel 11",
      "Sanctum",
      "Spatie Permission",
      "MySQL 8",
      "Dompdf",
      "PhpSpreadsheet",
    ],
    role: { es: "Full Stack (diseño, frontend y backend)", en: "Full stack (design, frontend & backend)" },
    tags: ["SaaS", "Logística", "Full Stack"],
    links: { private: true },
    media: [],
    preview: {
      desktop: "/projects/container-os/desktop.png",
      tablet: "/projects/container-os/tablet.png",
      mobile: "/projects/container-os/mobile.png",
    },
    demo: { kind: "embed", src: "/demos/container-os/index.html" },
  },
  {
    id: "gestion-sindicato",
    title: "Gestión de Sindicato",
    tagline: {
      es: "Plataforma de gestión de cuotas sindicales.",
      en: "Union dues management platform.",
    },
    description: {
      es: "Sistema para administrar cuotas de un sindicato: dashboard, planilla, importación de datos, historial y devoluciones, con foco en claridad y rapidez para el día a día administrativo.",
      en: "System to manage a union's membership dues: dashboard, payroll sheet, data import, history and refunds, focused on clarity and speed for everyday administrative work.",
    },
    tech: ["React", "Laravel", "PHP", "MySQL"],
    role: { es: "Full Stack", en: "Full stack" },
    tags: ["SaaS", "Gestión"],
    links: { repo: "https://github.com/rbastronomy/gestion-de-sindicato", private: true },
    media: [],
    preview: {
      desktop: "/projects/gestion-sindicato/desktop.png",
      tablet: "/projects/gestion-sindicato/tablet.png",
      mobile: "/projects/gestion-sindicato/mobile.png",
    },
    demo: { kind: "embed", src: "/demos/gestion-sindicato/index.html" },
  },
  {
    id: "ashley-lips",
    title: "Ashley Lips · El Aquelarre",
    tagline: {
      es: "Web temática de comunidad y contenido.",
      en: "Themed community & content website.",
    },
    description: {
      es: "Sitio temático para la comunidad de Ashley Lips: música, foro, tarot, horóscopo, hechizos y comunidad, con una identidad visual fuerte y navegación clara.",
      en: "Themed site for the Ashley Lips community: music, forum, tarot, horoscope, spells and community, with a strong visual identity and clear navigation.",
    },
    tech: ["HTML", "CSS", "JavaScript"],
    role: { es: "Diseño y desarrollo web", en: "Web design & development" },
    tags: ["Web", "Landing", "Comunidad"],
    links: { repo: "https://github.com/rbastronomy/Ashleylips-pagina", private: true },
    media: [],
    preview: {
      desktop: "/projects/ashley-lips/desktop.png",
      tablet: "/projects/ashley-lips/tablet.png",
      mobile: "/projects/ashley-lips/mobile.png",
    },
    demo: { kind: "embed", src: "/demos/ashley-lips/index.html", live: "https://ashleylips.cl" },
  },
  {
    id: "studio-gym",
    title: "Studio Gym",
    tagline: {
      es: "Sistema de gestión para gimnasios.",
      en: "Gym management system.",
    },
    description: {
      es: "Sistema de administración para gimnasios: socios, planes de membresía, pagos y vencimientos, control de acceso, inventario y ventas, caja diaria y reportes. Interfaz oscura, atajos de teclado y flujo pensado para recepción y administración.",
      en: "Management system for gyms: members, membership plans, payments and expirations, access control, inventory and sales, daily cash and reports. Dark interface, keyboard shortcuts and a flow built for front-desk and admin work.",
    },
    tech: ["React", "Tailwind", "Vite"],
    role: { es: "Diseño y desarrollo", en: "Design & development" },
    tags: ["Web", "SaaS", "Fitness"],
    links: { private: true },
    media: [],
    preview: {
      desktop: "/projects/studio-gym/desktop.png",
      tablet: "/projects/studio-gym/tablet.png",
      mobile: "/projects/studio-gym/mobile.png",
    },
    demo: { kind: "embed", src: "/demos/studio-gym/index.html" },
  },
];
