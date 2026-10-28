export type Project = {
  id: string;
  title: string;
  category: string;
  year: number;
  description: string;
  tags: string[];
  github?: string;
  demo?: string;
  /** Ruta dentro de /public, por ejemplo "/images/foodai.png" */
  image?: string;
};

export const projects: Project[] = [
  {
    id: "foodai",
    title: "FoodAI — Ecosistema Móvil & Backend IA",
    category: "Full-Stack & Inteligencia Artificial",
    year: 2026,
    description:
      "Aplicación multiplataforma (Android e iOS) en React Native/Expo con API REST en Node.js, Express y TypeScript. Integra Google Gemini para analizar fotografías de alimentos e ingredientes en la despensa, recomendando recetas inteligentes optimizadas según el presupuesto disponible.",
    tags: [
      "React Native",
      "Expo",
      "TypeScript",
      "Express 5",
      "Google Gemini API",
      "Supabase",
      "Vitest",
    ],
    github: "https://github.com/AndrxsS9/FoodAI-Backend",
  },
  {
    id: "sistema-gestion-documental",
    title: "Sistema Inteligente de Gestión Documental",
    category: "Arquitectura de Software & OCR",
    year: 2026,
    description:
      "Plataforma empresarial orientada a centralizar y organizar grandes volúmenes de documentos físicos y digitales. Incorpora un motor de extracción de texto OCR, clasificación automática por área mediante Inteligencia Artificial y un esquema de control de acceso basado en roles (RBAC).",
    tags: [
      "TypeScript",
      "OCR",
      "Inteligencia Artificial",
      "Control de Acceso (RBAC)",
      "PostgreSQL",
    ],
  },
  {
    id: "cambia-ya",
    title: "CambiaYa — Plataforma de Trueque y Economía Colaborativa",
    category: "Desarrollo Web",
    year: 2026,
    description:
      "Aplicación web enfocada en el intercambio y trueque colaborativo de bienes y servicios. Facilita la publicación de productos, negociación entre miembros de la comunidad y acuerdos seguros sin intermediarios.",
    tags: ["React", "Next.js", "Tailwind CSS", "Node.js", "Express"],
    github: "https://github.com/AndrxsS9/CambiaYa",
  },
  {
    id: "commanddeck",
    title: "CommandDeck — Control y Automatización Dev",
    category: "Herramientas de Desarrollador",
    year: 2026,
    description:
      "Herramienta de escritorio diseñada para agilizar comandos, scripts y flujos locales frecuentes de desarrollo de software, proporcionando una interfaz rápida y centralizada para monitoreo de tareas.",
    tags: ["TypeScript", "Desktop App", "Productivity", "DevTools"],
  },
];
