# Portafolio — Cristian Andrés Yela Parra (Ax)

Portafolio web en negro y dorado hecho con **Next.js 15 (App Router)**, **TypeScript** y **Tailwind CSS v4**.

## ✨ Características

- 🌗 **Modo claro y oscuro** con botón sol/luna. Recuerda la elección y, la primera vez, usa el tema del sistema.
- 🌎 **Español / Inglés**: el botón ES/EN traduce toda la página, incluidos los proyectos y la hoja de vida que se descarga.
- 🎬 **Animaciones al hacer scroll**: las secciones y tarjetas aparecen con fade, desenfoque, zoom y deslizamiento. La línea de tiempo se dibuja mientras bajas.
- 🃏 **Tarjetas 3D**: las tarjetas de proyectos, habilidades y "Sobre mí" se inclinan siguiendo el mouse, con un foco de luz dorado.
- ⌨️ Hero con texto que se escribe solo, contadores animados y anillo dorado giratorio alrededor de la foto.
- 📱 **Responsive** revisado para celular (footer compacto, correo que no se desborda, menú móvil animado).
- ♿ Respeta la opción del sistema "reducir movimiento".

## 🚀 Ejecutar localmente

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # compilación de producción
```

## 📂 Dónde editar cada cosa

| Qué | Archivo |
| --- | --- |
| Datos personales, textos ES/EN, habilidades, trayectoria | `data/profile.ts` |
| Proyectos (textos ES/EN, links, imagen) | `data/projects.ts` |
| Textos de la interfaz (menú, botones, títulos) | `data/i18n.ts` |
| Colores de cada tema y animaciones | `app/globals.css` |
| Imágenes de los proyectos | `public/images/` |
| Foto de perfil | `public/images/` (y la ruta `photo` en `data/profile.ts`) |
| Hoja de vida (español / inglés) | `public/cv.pdf` / `public/cv-en.pdf` |

## 🧩 Proyectos incluidos

- **FoodAI** — App móvil con IA (React Native + Expo) y su backend en Express 5.
- **CommandDeck** — App de escritorio (Tauri + Rust + React) que convierte lenguaje natural en comandos.
- **FocusPulse** — App de smartwatch que detecta la modorra.
- **Plomo y Paja** — Videojuego FPS en Unity, hecho en equipo.

## 👤 Autor

**Cristian Andrés Yela Parra** · GitHub [@AndrxsS9](https://github.com/AndrxsS9) · `cristian.yela@campusucc.edu.co`
