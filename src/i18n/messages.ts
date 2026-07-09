import type { Locale } from "./store";

export interface ValueItem {
  tab: string;
  title: string;
  body: string;
  bullets: string[];
}

export interface ProcessStep {
  title: string;
  body: string;
}

export interface StatItem {
  value: string;
  label: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface BuildItem {
  label: string;
  title: string;
  desc: string;
  features: string[];
}

export interface Messages {
  nav: { services: string; process: string; work: string; contact: string };
  hero: {
    badge: string;
    title: string;
    titleEm: string;
    lead: string;
    ctaPrimary: string;
    ctaSecondary: string;
    trust: string;
    // legacy (kept for compatibility with unused components)
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
  valueTabs: {
    label: string;
    heading: string;
    lead: string;
    items: ValueItem[];
  };
  process: {
    label: string;
    heading: string;
    lead: string;
    steps: ProcessStep[];
  };
  work: {
    label: string;
    heading: string;
    lead: string;
    countLabel: string;
    open: string;
    prev: string;
    next: string;
  };
  stack: {
    label: string;
    heading: string;
    lead: string;
    hint: string;
  };
  stats: {
    label: string;
    items: StatItem[];
  };
  faq: {
    label: string;
    heading: string;
    items: FaqItem[];
  };
  showcase: {
    label: string;
    heading: string;
    lead: string;
    open: string;
  };
  builds: {
    label: string;
    heading: string;
    lead: string;
    items: BuildItem[];
  };
  globe: {
    label: string;
    heading: string;
    body: string;
    cta: string;
    hint: string;
  };
  newsletter: {
    heading: string;
    body: string;
    placeholder: string;
    cta: string;
    note: string;
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
    kicker: string;
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
    nav: { services: "Servicios", process: "Proceso", work: "Trabajos", contact: "Contacto" },
    hero: {
      badge: "Disponible para nuevos proyectos",
      title: "Sistemas a medida,",
      titleEm: "construidos a tu visión.",
      lead: "En RFBD diseño y construyo software a medida, plataformas SaaS y sistemas de gestión que se sienten claros, rápidos y hechos para tu operación.",
      ctaPrimary: "Conversemos tu idea",
      ctaSecondary: "Ver trabajos",
      trust: "Construido con",
      roles: ["Desarrollador Full Stack", "Diseñador Web", "Diseñador de SaaS"],
      intro: "Construyo sistemas a medida donde la tecnología se siente cómoda.",
      scrollCue: "Desliza",
    },
    about: {
      label: "Perfil",
      heading: "Sistemas que se sienten cómodos.",
      body: [
        "Soy Renato, desarrollador full stack y diseñador de productos web y SaaS. Mi especialidad es hacer que los sistemas se sientan cómodos: traducir la visión de cada cliente en plataformas claras, rápidas y a la medida.",
        "Diseño y construyo de extremo a extremo —del primer boceto al despliegue— cuidando que cada decisión técnica esté al servicio de las personas que usan el producto.",
      ],
      stackLabel: "Stack principal",
    },
    valueTabs: {
      label: "Lo que hago",
      heading: "De la idea al sistema funcionando",
      lead: "Un solo responsable de extremo a extremo: diseño, código y despliegue trabajando juntos.",
      items: [
        {
          tab: "Sistemas a medida",
          title: "Software hecho para tu operación",
          body: "Construyo sistemas de gestión, paneles y plataformas internas que se adaptan exactamente a cómo trabaja tu equipo — no al revés.",
          bullets: ["Paneles y dashboards", "Roles y permisos", "Reportes exportables (PDF / Excel)"],
        },
        {
          tab: "Full-Stack de punta a punta",
          title: "Del backend al último pixel",
          body: "Me encargo de todo el ciclo: base de datos, API, frontend e infraestructura de despliegue. Un solo responsable, sin cabos sueltos.",
          bullets: ["Frontend moderno (React / Vue)", "Backend robusto (Laravel / Node)", "Despliegue y mantenimiento"],
        },
        {
          tab: "Diseño + Producto",
          title: "Tecnología que desaparece",
          body: "Cuido la experiencia tanto como el código: interfaces claras, motion medido y detalles que hacen que el producto se sienta premium.",
          bullets: ["Diseño de interfaz (UI)", "Experiencia de usuario (UX)", "Identidad y motion"],
        },
      ],
    },
    process: {
      label: "Cómo trabajamos",
      heading: "De la idea a la entrega, sin fricción",
      lead: "Un proceso claro en cuatro pasos para que siempre sepas dónde estamos.",
      steps: [
        { title: "Brief", body: "Conversamos tu idea, objetivos y alcance. Defino qué construir y por qué, con un estimado claro." },
        { title: "Diseño", body: "Bocetos y prototipo navegable. Acordamos cómo se ve y cómo se usa antes de escribir una línea de código." },
        { title: "Desarrollo", body: "Construyo el sistema en iteraciones, con avances visibles y revisiones frecuentes para que nada se desvíe." },
        { title: "Entrega", body: "Despliegue, pruebas y traspaso. Te dejo todo funcionando, documentado y listo para crecer." },
      ],
    },
    work: {
      label: "Trabajos seleccionados",
      heading: "Sistemas que ya están en producción",
      lead: "Una selección de plataformas y sistemas a medida que he diseñado y construido.",
      countLabel: "Total",
      open: "Ver caso",
      prev: "Anterior",
      next: "Siguiente",
    },
    stack: {
      label: "Stack",
      heading: "Las herramientas con las que construyo",
      lead: "Tecnologías probadas que elijo según cada proyecto. Arrastra las piezas — tienen gravedad real.",
      hint: "Arrastra y suelta las piezas",
    },
    stats: {
      label: "En números",
      items: [
        { value: "5+", label: "Sistemas entregados" },
        { value: "4+", label: "Años construyendo" },
        { value: "15+", label: "Tecnologías en el stack" },
        { value: "100%", label: "Hecho a medida" },
      ],
    },
    faq: {
      label: "Preguntas frecuentes",
      heading: "Lo que sueles preguntarme",
      items: [
        {
          q: "¿Cuánto tarda un proyecto?",
          a: "Depende del alcance, pero un sistema de gestión típico toma entre 4 y 10 semanas. En el brief te doy un estimado claro antes de empezar.",
        },
        {
          q: "¿Cómo se cobra?",
          a: "Por proyecto con hitos, o por iteración para trabajos continuos. Siempre acordamos precio y alcance por escrito antes de arrancar.",
        },
        {
          q: "¿Qué tecnologías usas?",
          a: "Elijo según el caso: React o Vue en el frontend; Laravel o Node en el backend; MySQL o PostgreSQL. Lo importante es que sea mantenible y rápido.",
        },
        {
          q: "¿Das mantenimiento después de entregar?",
          a: "Sí. Puedo dejarte todo documentado para tu equipo, o seguir contigo con soporte y nuevas funciones por iteración.",
        },
        {
          q: "¿Trabajas con clientes fuera de Chile?",
          a: "Sí, trabajo de forma remota. Coordinamos por videollamada y mensajería; la distancia no es problema.",
        },
      ],
    },
    showcase: {
      label: "Qué construyo",
      heading: "Sistemas reales, en producción",
      lead: "Explora algunos de los sistemas que he diseñado y construido. Cambia entre proyectos en la barra.",
      open: "Abrir caso",
    },
    builds: {
      label: "Lo que construyo",
      heading: "¿Qué puedo construir para ti?",
      lead: "Elige un tipo y mira de qué hablamos. Diseño y programo cada uno de extremo a extremo.",
      items: [
        {
          label: "SaaS",
          title: "Plataformas SaaS",
          desc: "Productos web multiusuario con suscripciones, paneles y datos en tiempo real. Listos para escalar.",
          features: ["Multi-tenant", "Suscripciones", "Dashboard analítico"],
        },
        {
          label: "Aplicación web",
          title: "Aplicaciones web a medida",
          desc: "Apps rápidas y modernas para tu negocio: del formulario simple a flujos complejos con autenticación.",
          features: ["Auth & roles", "Tiempo real", "Responsive"],
        },
        {
          label: "Sistema de gestión",
          title: "Sistemas de gestión",
          desc: "Paneles internos para administrar tu operación: inventario, clientes, pagos, reportes y permisos.",
          features: ["CRUD completo", "Reportes PDF / Excel", "Control de acceso"],
        },
        {
          label: "SPA",
          title: "Single-Page Apps",
          desc: "Interfaces fluidas sin recargas, con navegación instantánea y animaciones cuidadas.",
          features: ["Navegación instantánea", "Motion", "PWA opcional"],
        },
        {
          label: "ERP",
          title: "ERP a medida",
          desc: "Integro tus áreas en un solo sistema: ventas, inventario, finanzas y recursos, conectados.",
          features: ["Módulos conectados", "Flujos de aprobación", "Trazabilidad"],
        },
        {
          label: "E-commerce",
          title: "Tiendas online",
          desc: "Catálogo, carrito, pagos y panel de administración. Una tienda que vende y es fácil de gestionar.",
          features: ["Pagos online", "Catálogo & stock", "Panel de ventas"],
        },
      ],
    },
    globe: {
      label: "Alcance",
      heading: "Desde Iquique, Chile — construyo para todo el mundo",
      body: "Trabajo de forma remota con clientes de cualquier país. Mi stack viaja conmigo: las mismas herramientas, el mismo cuidado, en cualquier huso horario.",
      cta: "Conversemos",
      hint: "Mi stack, orbitando",
    },
    newsletter: {
      heading: "¿Hablamos de tu proyecto?",
      body: "Déjame tu correo y te escribo para entender tu idea, o escríbeme directo. Sin compromiso.",
      placeholder: "tu@correo.com",
      cta: "Enviar",
      note: "Te respondo personalmente — nada de spam.",
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
      kicker: "¿Tienes una idea en la cabeza?",
      heading: "Construyámosla juntos.",
      body: "Cuéntame qué necesitas y te respondo con un plan claro y un estimado — sin compromiso.",
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
    nav: { services: "Services", process: "Process", work: "Work", contact: "Contact" },
    hero: {
      badge: "Available for new projects",
      title: "Tailor-made systems,",
      titleEm: "built to your vision.",
      lead: "At RFBD I design and build custom software, SaaS platforms and management systems that feel clear, fast and made for the way you actually work.",
      ctaPrimary: "Let's talk about your idea",
      ctaSecondary: "See work",
      trust: "Built with",
      roles: ["Full Stack Developer", "Web Designer", "SaaS Designer"],
      intro: "I build tailor-made systems where technology feels comfortable.",
      scrollCue: "Scroll",
    },
    about: {
      label: "Profile",
      heading: "Systems that feel comfortable.",
      body: [
        "I'm Renato, a full-stack developer and web & SaaS product designer. My specialty is making systems feel comfortable: turning each client's vision into clear, fast, tailor-made platforms.",
        "I design and build end to end —from the first sketch to deployment— making sure every technical decision serves the people who use the product.",
      ],
      stackLabel: "Core stack",
    },
    valueTabs: {
      label: "What I do",
      heading: "From the idea to a system that works",
      lead: "A single owner end to end: design, code and deployment working together.",
      items: [
        {
          tab: "Custom systems",
          title: "Software built for your operation",
          body: "I build management systems, dashboards and internal platforms that adapt exactly to how your team works — not the other way around.",
          bullets: ["Panels & dashboards", "Roles & permissions", "Exportable reports (PDF / Excel)"],
        },
        {
          tab: "End-to-end full-stack",
          title: "From the backend to the last pixel",
          body: "I own the whole cycle: database, API, frontend and deployment infrastructure. One person responsible, no loose ends.",
          bullets: ["Modern frontend (React / Vue)", "Solid backend (Laravel / Node)", "Deployment & maintenance"],
        },
        {
          tab: "Design + Product",
          title: "Technology that disappears",
          body: "I care about the experience as much as the code: clear interfaces, measured motion and the details that make a product feel premium.",
          bullets: ["Interface design (UI)", "User experience (UX)", "Identity & motion"],
        },
      ],
    },
    process: {
      label: "How we work",
      heading: "From idea to delivery, without friction",
      lead: "A clear four-step process so you always know where we stand.",
      steps: [
        { title: "Brief", body: "We talk through your idea, goals and scope. I define what to build and why, with a clear estimate." },
        { title: "Design", body: "Sketches and a clickable prototype. We agree how it looks and works before writing a single line of code." },
        { title: "Development", body: "I build the system in iterations, with visible progress and frequent reviews so nothing drifts." },
        { title: "Delivery", body: "Deployment, testing and handover. I leave everything running, documented and ready to grow." },
      ],
    },
    work: {
      label: "Selected work",
      heading: "Systems already in production",
      lead: "A selection of platforms and tailor-made systems I've designed and built.",
      countLabel: "Total",
      open: "View case",
      prev: "Previous",
      next: "Next",
    },
    stack: {
      label: "Stack",
      heading: "The tools I build with",
      lead: "Battle-tested technologies I pick per project. Drag the pieces around — they have real gravity.",
      hint: "Drag and drop the pieces",
    },
    stats: {
      label: "By the numbers",
      items: [
        { value: "5+", label: "Systems delivered" },
        { value: "4+", label: "Years building" },
        { value: "15+", label: "Technologies in the stack" },
        { value: "100%", label: "Made to measure" },
      ],
    },
    faq: {
      label: "Frequently asked",
      heading: "What you usually ask me",
      items: [
        {
          q: "How long does a project take?",
          a: "It depends on scope, but a typical management system takes 4 to 10 weeks. I give you a clear estimate in the brief before we start.",
        },
        {
          q: "How do you charge?",
          a: "Per project with milestones, or per iteration for ongoing work. We always agree price and scope in writing before kicking off.",
        },
        {
          q: "What technologies do you use?",
          a: "I pick per case: React or Vue on the frontend; Laravel or Node on the backend; MySQL or PostgreSQL. What matters is that it's maintainable and fast.",
        },
        {
          q: "Do you provide maintenance after delivery?",
          a: "Yes. I can leave everything documented for your team, or stay on with support and new features per iteration.",
        },
        {
          q: "Do you work with clients outside Chile?",
          a: "Yes, I work remotely. We coordinate over video calls and messaging; distance is not a problem.",
        },
      ],
    },
    showcase: {
      label: "What I build",
      heading: "Real systems, in production",
      lead: "Explore some of the systems I've designed and built. Switch between projects in the toolbar.",
      open: "Open case",
    },
    builds: {
      label: "What I build",
      heading: "What can I build for you?",
      lead: "Pick a type and see what we're talking about. I design and code each one end to end.",
      items: [
        {
          label: "SaaS",
          title: "SaaS platforms",
          desc: "Multi-user web products with subscriptions, dashboards and real-time data. Ready to scale.",
          features: ["Multi-tenant", "Subscriptions", "Analytics dashboard"],
        },
        {
          label: "Web app",
          title: "Custom web apps",
          desc: "Fast, modern apps for your business: from a simple form to complex flows with authentication.",
          features: ["Auth & roles", "Real-time", "Responsive"],
        },
        {
          label: "Management system",
          title: "Management systems",
          desc: "Internal panels to run your operation: inventory, customers, payments, reports and permissions.",
          features: ["Full CRUD", "PDF / Excel reports", "Access control"],
        },
        {
          label: "SPA",
          title: "Single-Page Apps",
          desc: "Fluid interfaces with no reloads, instant navigation and crafted animations.",
          features: ["Instant navigation", "Motion", "Optional PWA"],
        },
        {
          label: "ERP",
          title: "Custom ERP",
          desc: "I bring your areas into one system: sales, inventory, finance and resources, connected.",
          features: ["Connected modules", "Approval flows", "Traceability"],
        },
        {
          label: "E-commerce",
          title: "Online stores",
          desc: "Catalog, cart, payments and admin panel. A store that sells and is easy to manage.",
          features: ["Online payments", "Catalog & stock", "Sales panel"],
        },
      ],
    },
    globe: {
      label: "Reach",
      heading: "From Iquique, Chile — I build for the whole world",
      body: "I work remotely with clients in any country. My stack travels with me: the same tools, the same care, in any time zone.",
      cta: "Let's talk",
      hint: "My stack, orbiting",
    },
    newsletter: {
      heading: "Shall we talk about your project?",
      body: "Leave me your email and I'll reach out to understand your idea, or write to me directly. No commitment.",
      placeholder: "you@email.com",
      cta: "Send",
      note: "I reply personally — no spam.",
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
      kicker: "Got an idea in your head?",
      heading: "Let's build it together.",
      body: "Tell me what you need and I'll reply with a clear plan and an estimate — no commitment.",
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
