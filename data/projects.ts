import type { Lang } from "@/data/i18n";

export type ProjectLink = {
  kind: "github" | "demo" | "download";
  href: string;
  label: Record<Lang, string>;
};

export type Project = {
  id: string;
  year: number;
  /** Ruta dentro de /public */
  image: string;
  /** Nombres de tecnologías (iguales en ambos idiomas) o etiquetas traducidas */
  tags: (string | Record<Lang, string>)[];
  links: ProjectLink[];
  text: Record<
    Lang,
    {
      title: string;
      category: string;
      description: string;
      /** Qué hice yo en el proyecto */
      role: string;
      features: string[];
    }
  >;
};

export const projects: Project[] = [
  {
    id: "foodai",
    year: 2026,
    image: "/images/foodai.webp",
    tags: ["React Native", "Expo Router", "TypeScript", "Express 5", "Zod", "Google Gemini API"],
    links: [
      {
        kind: "github",
        href: "https://github.com/AndrxsS9/FoodAI-FrontEnd",
        label: { es: "Repo Frontend", en: "Frontend repo" },
      },
      {
        kind: "github",
        href: "https://github.com/AndrxsS9/FoodAI-Backend",
        label: { es: "Repo Backend", en: "Backend repo" },
      },
    ],
    text: {
      es: {
        title: "FoodAI",
        category: "App móvil · Full-Stack + IA",
        description:
          "App para Android e iOS que analiza fotos de tus ingredientes y te recomienda recetas según lo que tienes, tu presupuesto y las preferencias del hogar. Tiene su propia API en Node.js que se conecta con Google Gemini.",
        role: "Desarrollo del frontend móvil y del backend.",
        features: ["Escáner de ingredientes con IA", "Recetas según presupuesto", "API REST validada con Zod"],
      },
      en: {
        title: "FoodAI",
        category: "Mobile app · Full-Stack + AI",
        description:
          "Android and iOS app that analyzes photos of your ingredients and recommends recipes based on what you have, your budget and household preferences. It has its own Node.js API connected to Google Gemini.",
        role: "Built the mobile frontend and the backend.",
        features: ["AI ingredient scanner", "Budget-aware recipes", "REST API validated with Zod"],
      },
    },
  },
  {
    id: "commanddeck",
    year: 2026,
    image: "/images/commanddeck.webp",
    tags: ["Tauri 2", "Rust", "React 19", "TypeScript", "Vite", "Gemini API", "Vitest"],
    links: [
      {
        kind: "github",
        href: "https://github.com/AndrxsS9/CommandDeck",
        label: { es: "Repositorio", en: "Repository" },
      },
    ],
    text: {
      es: {
        title: "CommandDeck",
        category: "App de escritorio · Herramienta para devs",
        description:
          "Asistente de terminal de escritorio: le escribes lo que quieres hacer en español y te propone el comando para tu sistema (Linux, PowerShell, CMD, Git o Docker), con un motor local que evalúa qué tan riesgoso es antes de usarlo.",
        role: "Diseño y desarrollo completo (frontend React + backend Rust).",
        features: ["Lenguaje natural → comando", "Motor de riesgo local", "Atajo global Alt+Space"],
      },
      en: {
        title: "CommandDeck",
        category: "Desktop app · Developer tool",
        description:
          "Desktop terminal assistant: describe what you want to do in plain language and it suggests the right command for your system (Linux, PowerShell, CMD, Git or Docker), with a local engine that rates how risky it is before you run it.",
        role: "Full design and development (React frontend + Rust backend).",
        features: ["Natural language → command", "Local risk engine", "Global Alt+Space hotkey"],
      },
    },
  },
  {
    id: "focuspulse",
    year: 2026,
    image: "/images/focuspulse.webp",
    tags: [
      "Smartwatch",
      { es: "UI para wearables", en: "Wearable UI" },
      { es: "Sensores IMU", en: "IMU sensors" },
      { es: "Alertas hápticas", en: "Haptic alerts" },
      "Garmin",
    ],
    links: [
      {
        kind: "github",
        href: "https://github.com/AndrxsS9/FocusPulse",
        label: { es: "Repositorio", en: "Repository" },
      },
    ],
    text: {
      es: {
        title: "FocusPulse",
        category: "App de smartwatch · Wearables",
        description:
          "Alarma para smartwatch que detecta la modorra y los micro-sueños a partir del movimiento (datos IMU) y te despierta con vibraciones. Primero se construyó como simulador web y luego se lleva a relojes Garmin.",
        role: "Diseño de la interfaz del reloj y desarrollo del prototipo.",
        features: ["Detección de micro-sueño", "Alertas hápticas", "Interfaz para pantalla redonda"],
      },
      en: {
        title: "FocusPulse",
        category: "Smartwatch app · Wearables",
        description:
          "Smartwatch alarm that detects drowsiness and micro-sleeps from motion (IMU data) and wakes you up with vibrations. It started as a web simulator and is being ported to Garmin watches.",
        role: "Watch interface design and prototype development.",
        features: ["Micro-sleep detection", "Haptic alerts", "Round-screen interface"],
      },
    },
  },
  {
    id: "plomo-y-paja",
    year: 2026,
    image: "/images/plomo-y-paja.webp",
    tags: ["Unity 2022 LTS", "C#", "URP", "NavMesh", { es: "Diseño de niveles", en: "Level design" }, "Audio"],
    links: [
      {
        kind: "github",
        href: "https://github.com/EdedArt/Plomo_Y_Paja",
        label: { es: "Repositorio", en: "Repository" },
      },
      {
        kind: "download",
        href: "https://github.com/EdedArt/Plomo_Y_Paja/releases/latest",
        label: { es: "Descargar juego", en: "Download game" },
      },
    ],
    text: {
      es: {
        title: "Plomo y Paja",
        category: "Videojuego · Proyecto en equipo",
        description:
          "Shooter de detective en primera persona con estilo de caricatura de los años 30: Los Tres Cerditos contado desde el hermano mayor. Recoges pistas, interrogas enemigos y tus decisiones llevan a uno de tres finales.",
        role: "Equipo de 3. Mi parte: niveles 1 y 2, NavMesh, pistas, HUD, pantallas de final, iluminación y audio.",
        features: ["3 finales según tus decisiones", "Voz interior con IA", "Estética cartoon de los 30"],
      },
      en: {
        title: "Plomo y Paja",
        category: "Video game · Team project",
        description:
          "First-person detective shooter with a 1930s cartoon style: The Three Little Pigs told by the eldest brother. Collect clues, interrogate enemies and let your choices lead to one of three endings.",
        role: "Team of 3. My part: levels 1 and 2, NavMesh, clues, HUD, ending screens, lighting and audio.",
        features: ["3 choice-driven endings", "AI inner voice", "1930s cartoon look"],
      },
    },
  },
];
