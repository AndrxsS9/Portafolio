import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // La raíz es esta carpeta: evita que Next tome otro package-lock.json de una carpeta superior
  outputFileTracingRoot: __dirname,
};

export default nextConfig;
