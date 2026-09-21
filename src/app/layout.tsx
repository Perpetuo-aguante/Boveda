import type { Metadata } from "next";
import { Fraunces, Poppins } from "next/font/google";
import Link from "next/link";
import "./globals.css";

// Fraunces para todo lo que se lee como "editorial": títulos y portadas. Los
// ejes SOFT/WONK/opsz se usan en globals.css y en las portadas.
const fraunces = Fraunces({
  subsets: ["latin"],
  axes: ["SOFT", "WONK", "opsz"],
  variable: "--font-fraunces",
  display: "swap",
});

// Poppins es la tipografía de Perpetuo; aquí sostiene la micro-tipografía.
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-poppins",
  display: "swap",
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
    <html lang="es" className={`${fraunces.variable} ${poppins.variable}`}>
      <body className="grano min-h-screen">
        <header className="relative z-10">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6 sm:px-10">
            <Link href="/" className="group flex items-baseline gap-2.5">
              <span className="marca text-lg text-niebla">Perpetuo</span>
              <span className="text-tenue-mas">/</span>
              <span className="eyebrow text-tenue transition-colors group-hover:text-niebla">
                La Bóveda
              </span>
            </Link>
            <nav className="flex items-center gap-6 text-[0.8125rem] text-tenue">
              <Link href="/#indice" className="transition-colors hover:text-niebla">
                Índice
              </Link>
              <a
                href="https://www.perpetuo.global"
                className="transition-colors hover:text-niebla"
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
