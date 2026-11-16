import type { Lang } from "@/data/i18n";

/** Datos que no cambian con el idioma */
export const profile = {
  name: "Cristian Andrés",
  lastName: "Yela Parra",
  fullName: "Cristian Andrés Yela Parra",
  shortName: { first: "Andrés", last: "Yela" },
  email: "cristian.yela@campusucc.edu.co",
  /** Déjalo vacío ("") si no quieres mostrar teléfono */
  phone: "",
  github: "https://github.com/AndrxsS9",
  githubUser: "@AndrxsS9",
  /** Pon aquí la URL de tu LinkedIn; vacío = no se muestra */
  linkedin: "",
  /** Tu foto: guarda una foto real en public/images/ (ej. foto.jpg) y cambia esta ruta */
  photo: "/images/avatar.svg",
  /** Hojas de vida en /public */
  cv: { es: "/cv.pdf", en: "/cv-en.pdf" } satisfies Record<Lang, string>,
  tech: [
    "TypeScript",
    "JavaScript",
    "React",
    "React Native",
    "Next.js",
    "Expo",
    "Node.js",
    "Express",
    "Tauri",
    "Rust",
    "Unity",
    "C#",
    "Tailwind CSS",
    "Google Gemini API",
    "PostgreSQL",
    "Supabase",
    "Zod",
    "Vitest",
    "Git & GitHub",
  ],
};

type LocalizedProfile = {
  role: string;
  badge: string;
  tagline: string;
  location: string;
  university: string;
  stats: { value: number; suffix?: string; label: string }[];
  about: {
    semester: string;
    p1: string;
    p2: string;
    highlights: { title: string; text: string }[];
  };
  services: { title: string; text: string }[];
  specialties: string[];
  timeline: { period: string; title: string; place: string; text: string }[];
  achievements: string[];
};

export const profileText: Record<Lang, LocalizedProfile> = {
  es: {
    role: "Desarrollador de Software",
    badge: "Disponible para proyectos · UCC Pasto",
    tagline:
      "Desarrollador de software con 2 años de experiencia creando aplicaciones web, móviles, de escritorio y videojuegos, con integración de Inteligencia Artificial.",
    location: "Pasto, Nariño, Colombia",
    university: "Universidad Cooperativa de Colombia, Campus Pasto",
    stats: [
      { value: 2, label: "Años de experiencia" },
      { value: 8, suffix: "+", label: "Proyectos creados" },
      { value: 15, suffix: "+", label: "Tecnologías" },
    ],
    about: {
      semester: "5.º semestre",
      p1: "Soy estudiante de Ingeniería de Software en la Universidad Cooperativa de Colombia (Campus Pasto) y llevo 2 años construyendo proyectos reales: me gusta resolver problemas concretos y ver el producto funcionando en manos de alguien.",
      p2: "He trabajado en apps móviles con React Native y Expo, APIs con Node.js y Express, una app de escritorio con Tauri y Rust, un videojuego en Unity y prototipos para smartwatch. En casi todos integro IA (Google Gemini) para que la app haga algo útil por el usuario.",
      highlights: [
        { title: "Full-Stack", text: "React, Next.js, TypeScript, Node.js y Express" },
        { title: "Móvil y escritorio", text: "React Native, Expo, Tauri y Rust" },
        { title: "Inteligencia Artificial", text: "Google Gemini, análisis de imágenes y lenguaje natural" },
      ],
    },
    services: [
      {
        title: "Desarrollo Web Full-Stack",
        text: "Aplicaciones web rápidas y escalables con React, Next.js, TypeScript y Tailwind CSS.",
      },
      {
        title: "Apps Móviles Multiplataforma",
        text: "Apps para Android e iOS con React Native y Expo, con interfaces claras y conexión a servicios en la nube.",
      },
      {
        title: "Integración de IA",
        text: "Uso de Google Gemini para analizar imágenes, generar recomendaciones y convertir lenguaje natural en acciones.",
      },
      {
        title: "APIs y Backend",
        text: "Servicios REST tipados y seguros con Node.js, Express, Zod y Helmet, y bases de datos relacionales.",
      },
      {
        title: "Escritorio y Videojuegos",
        text: "Apps de escritorio con Tauri + Rust y desarrollo de videojuegos en Unity con C#.",
      },
      {
        title: "Trabajo en equipo y Git",
        text: "Scrum, ramas por funcionalidad, pull requests y trabajo por fases con entregas incrementales.",
      },
    ],
    specialties: [
      "Desarrollo Web (Next.js y React)",
      "Desarrollo Móvil (React Native y Expo)",
      "Integración de IA (Gemini)",
      "APIs REST con TypeScript y Express",
    ],
    timeline: [
      {
        period: "2024 – Presente",
        title: "Proyectos de software web, móvil, escritorio y juegos",
        place: "Proyectos académicos y personales",
        text: "Diseño y desarrollo de FoodAI, CommandDeck, FocusPulse y Plomo y Paja, integrando servicios de Inteligencia Artificial y trabajando en equipo con Git.",
      },
      {
        period: "2025 – 2026",
        title: "Ingeniería de Software — 5.º semestre",
        place: "Universidad Cooperativa de Colombia",
        text: "Arquitectura de software, microservicios, diseño de interfaces, APIs REST y desarrollo móvil.",
      },
      {
        period: "2024",
        title: "Fundamentos de programación",
        place: "Universidad Cooperativa de Colombia",
        text: "Estructuras de datos, algoritmos, programación orientada a objetos, bases de datos relacionales y Scrum.",
      },
    ],
    achievements: [
      "FoodAI: app móvil (Expo) + backend en Express 5 con análisis de alimentos usando Gemini.",
      "CommandDeck: app de escritorio con Tauri y Rust que convierte lenguaje natural en comandos.",
      "Plomo y Paja: videojuego FPS en Unity desarrollado en equipo de tres personas.",
      "Buenas prácticas: TypeScript estricto, validación con Zod, pruebas con Vitest y Git Flow.",
    ],
  },
  en: {
    role: "Software Developer",
    badge: "Open to projects · UCC Pasto",
    tagline:
      "Software developer with 2 years of experience building web, mobile and desktop apps and video games, with Artificial Intelligence integrations.",
    location: "Pasto, Nariño, Colombia",
    university: "Universidad Cooperativa de Colombia, Pasto Campus",
    stats: [
      { value: 2, label: "Years of experience" },
      { value: 8, suffix: "+", label: "Projects built" },
      { value: 15, suffix: "+", label: "Technologies" },
    ],
    about: {
      semester: "5th semester",
      p1: "I'm a Software Engineering student at Universidad Cooperativa de Colombia (Pasto Campus) and I've spent the last 2 years building real projects: I enjoy solving concrete problems and seeing the product working in someone's hands.",
      p2: "I've worked on mobile apps with React Native and Expo, APIs with Node.js and Express, a desktop app with Tauri and Rust, a Unity video game and smartwatch prototypes. In most of them I integrate AI (Google Gemini) so the app does something genuinely useful for the user.",
      highlights: [
        { title: "Full-Stack", text: "React, Next.js, TypeScript, Node.js and Express" },
        { title: "Mobile & desktop", text: "React Native, Expo, Tauri and Rust" },
        { title: "Artificial Intelligence", text: "Google Gemini, image analysis and natural language" },
      ],
    },
    services: [
      {
        title: "Full-Stack Web Development",
        text: "Fast, scalable web apps with React, Next.js, TypeScript and Tailwind CSS.",
      },
      {
        title: "Cross-Platform Mobile Apps",
        text: "Android and iOS apps with React Native and Expo, with clear interfaces and cloud services.",
      },
      {
        title: "AI Integration",
        text: "Google Gemini to analyze images, generate recommendations and turn natural language into actions.",
      },
      {
        title: "APIs & Backend",
        text: "Typed, secure REST services with Node.js, Express, Zod and Helmet, plus relational databases.",
      },
      {
        title: "Desktop & Games",
        text: "Desktop apps with Tauri + Rust and video game development in Unity with C#.",
      },
      {
        title: "Teamwork & Git",
        text: "Scrum, feature branches, pull requests and phased, incremental deliveries.",
      },
    ],
    specialties: [
      "Web Development (Next.js & React)",
      "Mobile Development (React Native & Expo)",
      "AI Integration (Gemini)",
      "REST APIs with TypeScript & Express",
    ],
    timeline: [
      {
        period: "2024 – Present",
        title: "Web, mobile, desktop and game software projects",
        place: "Academic and personal projects",
        text: "Designed and built FoodAI, CommandDeck, FocusPulse and Plomo y Paja, integrating AI services and working in teams with Git.",
      },
      {
        period: "2025 – 2026",
        title: "Software Engineering — 5th semester",
        place: "Universidad Cooperativa de Colombia",
        text: "Software architecture, microservices, interface design, REST APIs and mobile development.",
      },
      {
        period: "2024",
        title: "Programming fundamentals",
        place: "Universidad Cooperativa de Colombia",
        text: "Data structures, algorithms, object-oriented programming, relational databases and Scrum.",
      },
    ],
    achievements: [
      "FoodAI: mobile app (Expo) + Express 5 backend that analyzes food with Gemini.",
      "CommandDeck: Tauri + Rust desktop app that turns natural language into terminal commands.",
      "Plomo y Paja: Unity FPS video game built by a team of three.",
      "Good practices: strict TypeScript, Zod validation, Vitest testing and Git Flow.",
    ],
  },
};
