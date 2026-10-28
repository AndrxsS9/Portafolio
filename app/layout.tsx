import type { Metadata } from "next";
import { Bricolage_Grotesque, DM_Sans } from "next/font/google";
import { profile } from "@/data/profile";
import "./globals.css";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  weight: ["500", "600", "700", "800"],
});

const sans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: `${profile.fullName} (Ax) — Portafolio`,
  description: `Portafolio profesional de ${profile.fullName}, ${profile.role} con 2 años de experiencia. Proyectos en desarrollo web, móvil e inteligencia artificial.`,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`dark ${display.variable} ${sans.variable}`}>
      <body className="bg-[#09090b] text-zinc-100 antialiased selection:bg-[#d4af37] selection:text-black">{children}</body>
    </html>
  );
}
