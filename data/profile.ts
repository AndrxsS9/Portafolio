import type { Lang } from "@/data/i18n";

/** Datos que no cambian con el idioma */
export const profile = {
  name: "Cristian Andrés",
  lastName: "Yela Parra",
  fullName: "Cristian Andrés Yela Parra",
  shortName: { first: "Andrés", last: "Yela" },
  email: "cristianyela.57@gmail.com",
  /** Déjalo vacío ("") si no quieres mostrar teléfono */
  phone: "",
  github: "https://github.com/AndrxsS9",
  githubUser: "@AndrxsS9",
  /** URL de LinkedIn; vacío = no se muestra */
  linkedin: "https://www.linkedin.com/in/cristian-yela-341835339",
  /** Tu foto: guarda una foto real en public/images/ (ej. foto.jpg) y cambia esta ruta */
  photo: "/images/avatar.svg",
  /** Foto de la sección "Sobre mí" */
  aboutPhoto: "/images/foto-perfil.webp",
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
    /** Bloque "Fuera del código" */
    offClock: string;
    /** Bloque "Idiomas" */
    languages: { name: string; level: string; note?: string }[];
  };
  services: { title: string; text: string }[];
  specialties: string[];
  /** label: etiqueta corta en lugar de fechas */
  timeline: { label: string; title: string; place: string; text: string }[];
  achievements: string[];
  seminars: string;
  references: { name: string; role: string; quote: string }[];
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
      p1: "Tengo 18 años y estudio Ingeniería de Software en la Universidad Cooperativa de Colombia, en Pasto. Desde niño me llamó la atención la tecnología: quería entender cómo se hacían los videojuegos que jugaba y cómo funcionaban por dentro las páginas web y las apps que usamos todos los días.",
      p2: "Hoy eso es justo lo que hago. He trabajado en apps móviles con React Native y Expo, APIs con Node.js y Express, una app de escritorio con Tauri y Rust, un videojuego en Unity y prototipos para smartwatch. En casi todos integro IA (Google Gemini) para que la app le resuelva algo real a quien la usa.",
      highlights: [
        { title: "Full-Stack", text: "React, Next.js, TypeScript, Node.js y Express" },
        { title: "Móvil y escritorio", text: "React Native, Expo, Tauri y Rust" },
        { title: "Inteligencia Artificial", text: "Google Gemini, análisis de imágenes y lenguaje natural" },
      ],
      offClock:
        "Lo que más practico es el microfútbol y el fútbol. También me gustan los videojuegos. Soy hincha del Barcelona, mis jugadores favoritos son Messi y Neymar, y no me pierdo los partidos de la Selección Colombia ni del Barça.",
      languages: [
        { name: "Español", level: "Nativo" },
        { name: "Inglés", level: "Básico", note: "Lo entiendo y lo leo, pero todavía no lo hablo con fluidez." },
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
        text: "Servicios REST tipados y seguros con Node.js, Express y Helmet, y bases de datos relacionales.",
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
        label: "Pregrado · Actualidad",
        title: "Ingeniería de Software",
        place: "Universidad Cooperativa de Colombia, Campus Pasto",
        text: "Arquitectura de software, microservicios, diseño de interfaces, APIs REST y desarrollo móvil.",
      },
      {
        label: "Experiencia",
        title: "Página web para un negocio de spa",
        place: "Proyecto para cliente",
        text: "Sitio web para un spa con agendamiento de citas por WhatsApp.",
      },
      {
        label: "Proyectos",
        title: "Proyectos de software web, móvil, escritorio y juegos",
        place: "Proyectos académicos y personales",
        text: "Diseño y desarrollo de FoodAI, CommandDeck, FocusPulse y Plomo y Paja, integrando servicios de Inteligencia Artificial y trabajando en equipo con Git.",
      },
      {
        label: "Bachiller",
        title: "Bachiller académico",
        place: "Institución Educativa Municipal Heraldo Romero Sánchez, Pasto",
        text: "Formación secundaria académica.",
      },
    ],
    achievements: [
      "FoodAI: app móvil (Expo) + backend en Express 5 con análisis de alimentos usando Gemini.",
      "CommandDeck: app de escritorio con Tauri y Rust que convierte lenguaje natural en comandos.",
      "Plomo y Paja: videojuego FPS en Unity desarrollado en equipo de tres personas.",
      "Buenas prácticas: TypeScript estricto, pruebas con Vitest y Git Flow.",
    ],
    seminars: "Asistí a 4 seminarios y conferencias de tecnología e ingeniería de software durante la carrera.",
    references: [
      {
        name: "Antony Rodríguez",
        role: "Estudiante de Ingeniería de Sistemas, Universidad de Nariño",
        quote:
          "Trabaja bien y, ante todo, busca dar lo mejor para sus clientes. Usa buenas prácticas en lo que desarrolla y siempre está intentando mejorar.",
      },
      {
        name: "Jesús Narváez",
        role: "Diseñador gráfico y de contenido digital",
        quote:
          "Es responsable con lo que se compromete. Explica lo que hace, pregunta cuando algo no está claro y no lo deja hasta que funciona bien.",
      },
      {
        name: "Johan Amaya",
        role: "Técnico en soporte informático",
        quote:
          "Lo que más destaco es lo rápido que aprende. Si no conoce una herramienta, la estudia y al poco tiempo ya la está usando. Es organizado y es fácil trabajar con él.",
      },
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
      p1: "I'm 18 and I study Software Engineering at Universidad Cooperativa de Colombia, in Pasto. Technology caught my attention ever since I was a kid: I wanted to understand how the video games I played were made and how the websites and apps we use every day work on the inside.",
      p2: "Today that's exactly what I do. I've worked on mobile apps with React Native and Expo, APIs with Node.js and Express, a desktop app with Tauri and Rust, a Unity video game and smartwatch prototypes. In almost all of them I integrate AI (Google Gemini) so the app solves something real for whoever uses it.",
      highlights: [
        { title: "Full-Stack", text: "React, Next.js, TypeScript, Node.js and Express" },
        { title: "Mobile & desktop", text: "React Native, Expo, Tauri and Rust" },
        { title: "Artificial Intelligence", text: "Google Gemini, image analysis and natural language" },
      ],
      offClock:
        "What I play the most is futsal and football. I also enjoy video games. I'm a Barcelona fan, my favorite players are Messi and Neymar, and I never miss a Colombia national team or Barça match.",
      languages: [
        { name: "Spanish", level: "Native" },
        { name: "English", level: "Basic", note: "I can read and understand it, but I'm not fluent speaking it yet." },
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
        text: "Typed, secure REST services with Node.js, Express and Helmet, plus relational databases.",
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
        label: "Undergraduate · Present",
        title: "Software Engineering",
        place: "Universidad Cooperativa de Colombia, Pasto Campus",
        text: "Software architecture, microservices, interface design, REST APIs and mobile development.",
      },
      {
        label: "Experience",
        title: "Website for a spa business",
        place: "Client project",
        text: "Website for a spa with appointment booking through WhatsApp.",
      },
      {
        label: "Projects",
        title: "Web, mobile, desktop and game software projects",
        place: "Academic and personal projects",
        text: "Designed and built FoodAI, CommandDeck, FocusPulse and Plomo y Paja, integrating AI services and working in teams with Git.",
      },
      {
        label: "High school",
        title: "Academic high school diploma",
        place: "Institución Educativa Municipal Heraldo Romero Sánchez, Pasto",
        text: "Academic secondary education.",
      },
    ],
    achievements: [
      "FoodAI: mobile app (Expo) + Express 5 backend that analyzes food with Gemini.",
      "CommandDeck: Tauri + Rust desktop app that turns natural language into terminal commands.",
      "Plomo y Paja: Unity FPS video game built by a team of three.",
      "Good practices: strict TypeScript, Vitest testing and Git Flow.",
    ],
    seminars: "I attended 4 technology and software engineering seminars and conferences during my degree.",
    references: [
      {
        name: "Antoby Rodríguez",
        role: "Systems Engineering student, Universidad de Nariño",
        quote:
          "He works well and, above all, strives to give his clients his best. He uses good practices in what he builds and is always trying to improve.",
      },
      {
        name: "Jesús Narváez",
        role: "Graphic and digital content designer",
        quote:
          "He's responsible with what he commits to. He explains what he's doing, asks when something isn't clear and doesn't let it go until it works properly.",
      },
      {
        name: "Johan Amaya",
        role: "IT support technician",
        quote:
          "What I value most is how quickly he learns. If he doesn't know a tool, he studies it and before long he's already using it. He's organized and easy to work with.",
      },
    ],
  },
};
