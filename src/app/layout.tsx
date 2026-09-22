import type { Metadata } from "next";
import localFont from "next/font/local";
import Image from "next/image";
import Link from "next/link";
import "./globals.css";

// Cuatro voces, cuatro oficios. Los .woff2 viven en el repo (subconjunto
// latino, que ya cubre todo el español) para no depender de un tercero en
// tiempo de carga.

// Anton — el rótulo pintado. Un solo peso: cualquier `font-weight` distinto
// de 400 lo engordaría sintéticamente, así que el sistema no lo pide nunca.
const rotulo = localFont({
  src: "../fuentes/anton-latin.woff2",
  weight: "400",
  style: "normal",
  variable: "--fuente-rotulo",
  display: "swap",
  fallback: ["Arial Narrow", "Impact", "sans-serif"],
});

// Caveat — la letra del cartelito de cartón. Variable, 400 a 700.
const manuscrita = localFont({
  src: "../fuentes/caveat-latin.woff2",
  weight: "400 700",
  style: "normal",
  variable: "--fuente-manuscrita",
  display: "swap",
  fallback: ["Bradley Hand", "cursive"],
});

// Permanent Marker — el plumón sobre la calcomanía y los precios. Ilegible en
// párrafo, perfecto en tres palabras a gritos.
const marcador = localFont({
  src: "../fuentes/permanent-marker-latin.woff2",
  weight: "400",
  style: "normal",
  variable: "--fuente-marcador",
  display: "swap",
  fallback: ["Bradley Hand", "cursive"],
});

// Newsreader — el cuerpo de los ensayos. Serif de pantalla con carácter, con
// cursiva de verdad (el parser de `contenido/` traduce *así* a <em>) y eje
// óptico: el mismo archivo afina el trazo a 18px y lo abre en un destacado.
const lectura = localFont({
  src: [
    { path: "../fuentes/newsreader-latin.woff2", weight: "200 800", style: "normal" },
    { path: "../fuentes/newsreader-italica-latin.woff2", weight: "200 800", style: "italic" },
  ],
  variable: "--fuente-lectura",
  display: "swap",
  fallback: ["Georgia", "Times New Roman", "serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://boveda.perpetuo.global"),
  title: {
    default: "La Bóveda de Perpetuo",
    template: "%s · La Bóveda de Perpetuo",
  },
  description:
    "El archivo de Perpetuo: crónicas, ensayos y creativos, puestos como en un tianguis para leerlos completos.",
  openGraph: {
    title: "La Bóveda de Perpetuo",
    description:
      "El archivo de Perpetuo: crónicas, ensayos y creativos, puestos como en un tianguis para leerlos completos.",
    locale: "es",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es"
      className={`${rotulo.variable} ${manuscrita.variable} ${marcador.variable} ${lectura.variable}`}
    >
      <body className="grano min-h-screen">
        <header className="relative z-10">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6 sm:px-10">
            <Link href="/" className="group flex items-center gap-3">
              {/* El wordmark real va sobre una placa clara: la tinta del
                  logotipo es negra y el tianguis es oscuro, así que la placa
                  es lo que lo hace visible —y además es como se rotula un
                  puesto de verdad, pintado sobre una tabla. */}
              <span className="placa-marca">
                <Image
                  src="/marca/perpetuo-wordmark.png"
                  alt="Perpetuo"
                  width={2048}
                  height={348}
                  priority
                  className="block h-[15px] w-auto sm:h-[18px]"
                />
              </span>
              <span className="eyebrow whitespace-nowrap text-tenue transition-colors group-hover:text-niebla">
                La Bóveda
              </span>
            </Link>
            <nav className="flex items-center gap-6 text-[0.8125rem] text-tenue">
              <Link href="/#indice" className="transition-colors hover:text-niebla">
                Índice
              </Link>
              {/* En móvil no cabe junto al wordmark y partía «La Bóveda» en
                  dos líneas. El pie lleva el mismo enlace, así que no se
                  pierde nada al esconderlo aquí. */}
              <a
                href="https://www.perpetuo.global"
                className="hidden transition-colors hover:text-niebla sm:inline"
              >
                perpetuo.global&nbsp;↗
              </a>
            </nav>
          </div>
        </header>

        <main className="relative z-10">{children}</main>

        <footer className="relative z-10 mt-32 border-t border-linea">
          <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-10 text-[0.8125rem] text-tenue-mas sm:flex-row sm:items-center sm:justify-between sm:px-10">
            <p>
              La bóveda de <span className="text-tenue">Perpetuo</span>. Todos los textos
              son de sus autores; salieron primero en perpetuo.global.
            </p>
            <a
              href="https://www.perpetuo.global"
              className="transition-colors hover:text-niebla"
            >
              perpetuo.global
            </a>
          </div>
        </footer>
      </body>
    </html>
  );
}
