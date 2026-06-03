import type { Locale } from "./store";

export interface Messages {
  nav: { about: string; work: string; contact: string };
  hero: {
    roles: string[];
    intro: string;
    scrollCue: string;
  };
  about: {
    label: string;
    heading: string;
    body: string[];
    stackLabel: string;
  };
  work: {
    label: string;
    heading: string;
    countLabel: string;
    open: string;
  };
  project: {
    role: string;
    stack: string;
    tags: string;
    links: string;
    repo: string;
    demo: string;
    video: string;
    private: string;
    close: string;
    launch: string;
    openLive: string;
    openRepo: string;
    fullscreen: string;
    demoDisclaimer: string;
    demoLabel: string;
    preview: string;
    previewHint: string;
    viewDemo: string;
    hideDemo: string;
  };
  contact: {
    label: string;
    heading: string;
    body: string;
    emailLabel: string;
  };
  boot: {
    lines: string[];
    lost: string;
  };
  footer: {
    builtWith: string;
    rights: string;
  };
  intro: {
    lines: string[];
    granted: string;
    welcome: string;
    skip: string;
  };
}

export const messages: Record<Locale, Messages> = {
  es: {
    nav: { about: "Sobre mí", work: "Proyectos", contact: "Contacto" },
    hero: {
      roles: ["Desarrollador Full Stack", "Diseñador Web", "Diseñador de SaaS"],
      intro: "Construyo sistemas a medida donde la tecnología se siente cómoda.",
      scrollCue: "Desliza",
    },
    about: {
      label: "Perfil",
      heading: "Sistemas que se sienten cómodos.",
      body: [
        "Soy Renato, desarrollador full stack y diseñador de productos web y SaaS. Mi especialidad es hacer que los sistemas se sientan cómodos: traducir la visión de cada cliente en plataformas claras, rápidas y a la medida.",
        "Diseño y construyo de extremo a extremo —del primer boceto al despliegue— cuidando que cada decisión técnica esté al servicio de las personas que usan el producto. La tecnología desaparece; solo queda una experiencia que simplemente funciona.",
      ],
      stackLabel: "Stack principal",
    },
    work: {
      label: "Trabajo seleccionado",
      heading: "Proyectos",
      countLabel: "Total",
      open: "Ver caso",
    },
    project: {
      role: "Rol",
      stack: "Stack",
      tags: "Categorías",
      links: "Enlaces",
      repo: "Repositorio",
      demo: "Demo en vivo",
      video: "Video",
      private: "Repositorio privado",
      close: "Cerrar",
      launch: "Iniciar demo",
      openLive: "Abrir en vivo",
      openRepo: "Abrir repositorio",
      fullscreen: "Pantalla completa",
      demoDisclaimer: "Demo frontend — no se guardan datos",
      demoLabel: "Modelo funcional",
      preview: "Cómo se ve",
      previewHint: "Vista en computador, tablet y celular",
      viewDemo: "Ver demo interactiva",
      hideDemo: "Ocultar demo",
    },
    contact: {
      label: "Contacto",
      heading: "¿Construimos algo?",
      body: "Cuéntame tu visión y la convertimos en un sistema a la medida.",
      emailLabel: "Escríbeme",
    },
    boot: {
      lines: [
        "> ESTABLECIENDO ENLACE SEGURO…",
        "> DESCIFRANDO PAQUETE [{id}]",
        "> MONTANDO MÓDULO FUNCIONAL",
        "> CARGANDO DATOS  ████████  100%",
        "> ACCESO CONCEDIDO",
      ],
      lost: "CONEXIÓN PERDIDA",
    },
    footer: {
      builtWith: "Hecho con Vue · GSAP · Lenis",
      rights: "Todos los derechos reservados.",
    },
    intro: {
      lines: [
        "> RFBD//OS v2.6 — INICIANDO TERMINAL",
        "> ESTABLECIENDO ENLACE SEGURO… [OK]",
        "> AUTENTICANDO CREDENCIALES … [OK]",
        "> DESCIFRANDO PORTAFOLIO  ████████  100%",
        "> MONTANDO INTERFAZ // UNIT RB-01",
      ],
      granted: "ACCESO CONCEDIDO",
      welcome: "Bienvenido al sistema — RENATO F.",
      skip: "[ pulsa o haz clic para saltar ]",
    },
  },
  en: {
    nav: { about: "About", work: "Work", contact: "Contact" },
    hero: {
      roles: ["Full Stack Developer", "Web Designer", "SaaS Designer"],
      intro: "I build tailor-made systems where technology feels comfortable.",
      scrollCue: "Scroll",
    },
    about: {
      label: "Profile",
      heading: "Systems that feel comfortable.",
      body: [
        "I'm Renato, a full-stack developer and web & SaaS product designer. My specialty is making systems feel comfortable: turning each client's vision into clear, fast, tailor-made platforms.",
        "I design and build end to end —from the first sketch to deployment— making sure every technical decision serves the people who use the product. The technology fades away; only an experience that simply works remains.",
      ],
      stackLabel: "Core stack",
    },
    work: {
      label: "Selected work",
      heading: "Projects",
      countLabel: "Total",
      open: "View case",
    },
    project: {
      role: "Role",
      stack: "Stack",
      tags: "Categories",
      links: "Links",
      repo: "Repository",
      demo: "Live demo",
      video: "Video",
      private: "Private repository",
      close: "Close",
      launch: "Launch demo",
      openLive: "Open live",
      openRepo: "Open repository",
      fullscreen: "Fullscreen",
      demoDisclaimer: "Frontend demo — no data is saved",
      demoLabel: "Functional model",
      preview: "How it looks",
      previewHint: "Preview on desktop, tablet and mobile",
      viewDemo: "View interactive demo",
      hideDemo: "Hide demo",
    },
    contact: {
      label: "Contact",
      heading: "Shall we build something?",
      body: "Tell me your vision and we'll turn it into a tailor-made system.",
      emailLabel: "Email me",
    },
    boot: {
      lines: [
        "> ESTABLISHING SECURE LINK…",
        "> DECRYPTING PACKAGE [{id}]",
        "> MOUNTING FUNCTIONAL MODULE",
        "> LOADING DATA  ████████  100%",
        "> ACCESS GRANTED",
      ],
      lost: "CONNECTION LOST",
    },
    footer: {
      builtWith: "Built with Vue · GSAP · Lenis",
      rights: "All rights reserved.",
    },
    intro: {
      lines: [
        "> RFBD//OS v2.6 — BOOTING TERMINAL",
        "> ESTABLISHING SECURE LINK… [OK]",
        "> AUTHENTICATING CREDENTIALS … [OK]",
        "> DECRYPTING PORTFOLIO  ████████  100%",
        "> MOUNTING INTERFACE // UNIT RB-01",
      ],
      granted: "ACCESS GRANTED",
      welcome: "Welcome to the system — RENATO F.",
      skip: "[ tap or click to skip ]",
    },
  },
};
