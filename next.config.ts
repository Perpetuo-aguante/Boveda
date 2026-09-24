import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Las portadas de los textos traídos de Substack viven en su CDN, no en
    // /public: next/image necesita el dominio en la lista blanca para
    // optimizarlas.
    remotePatterns: [{ protocol: "https", hostname: "substackcdn.com" }],
  },
};

export default nextConfig;
