import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Las portadas de los textos traídos de Substack viven en su CDN, no en
    // /public: next/image necesita el dominio en la lista blanca para
    // optimizarlas.
    remotePatterns: [{ protocol: "https", hostname: "substackcdn.com" }],
  },
  // Prototipo de Inferencia: HTML estático en public/inferencia/.
  // Prototipo privado: que los buscadores no lo indexen aunque el enlace circule.
  async headers() {
    return [
      {
        source: "/inferencia/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
  async rewrites() {
    return [
      { source: "/inferencia", destination: "/inferencia/index.html" },
      { source: "/inferencia/", destination: "/inferencia/index.html" },
    ];
  },
};

export default nextConfig;
