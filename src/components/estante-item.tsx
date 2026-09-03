import Link from "next/link";
import { Cuadernillo } from "./cuadernillo";
import { PALETAS } from "@/lib/covers";
import type { Articulo } from "@/lib/articles";

/**
 * Una fila de la estantería: el objeto a un lado, la ficha corta al otro,
 * alternando el lado en cada artículo para que el ojo no se acomode.
 */
export function EstanteItem({ articulo, indice }: { articulo: Articulo; indice: number }) {
  const p = PALETAS[articulo.seccion];
  const derecha = indice % 2 === 1;

  return (
    <article
      className="estante-item aparece grid items-center gap-10 py-14 sm:py-20 lg:grid-cols-12 lg:gap-16"
      id={articulo.slug}
    >
      {/* Objeto */}
      <div
        className={`flex justify-center lg:col-span-5 ${
          derecha ? "lg:order-2 lg:col-start-8" : "lg:col-start-1"
        }`}
      >
        <div className="escena relative">
          <div
            className="halo"
            style={{ ["--halo-color" as string]: `${p.papel}38` }}
            aria-hidden
          />
          <div className="sombra" aria-hidden />
          <Link
            href={`/articulo/${articulo.slug}`}
            className="alza relative block rounded-sm"
            aria-label={`Abrir la ficha de «${articulo.titulo}», de ${articulo.autor}`}
          >
            <Cuadernillo
              articulo={articulo}
              numero={indice + 1}
              ancho="clamp(200px, 44vw, 292px)"
            />
          </Link>
        </div>
      </div>

      {/* Ficha corta */}
      <div
        className={`lg:col-span-5 ${derecha ? "lg:order-1 lg:col-start-2" : "lg:col-start-7"}`}
      >
        <div className="flex items-center gap-3">
          <span className="text-tenue-mas tabular-nums text-[0.8125rem]">
            {String(indice + 1).padStart(2, "0")}
          </span>
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{ background: p.papel === "#17151a" ? p.acento : p.papel }}
            aria-hidden
          />
          <span className="eyebrow text-tenue">{articulo.seccion}</span>
        </div>

        <h2 className="display mt-5 text-[clamp(1.9rem,4vw,3rem)] text-balance">
          <Link
            href={`/articulo/${articulo.slug}`}
            className="transition-colors hover:text-brasa"
          >
            {articulo.titulo}
          </Link>
        </h2>

        <p className="mt-4 text-[0.9375rem] text-tenue">
          {articulo.autor} · <span className="italic">{articulo.medio}</span> ·{" "}
          <span className="tabular-nums">{articulo.anio}</span>
        </p>

        <p className="mt-6 max-w-md text-[1.0625rem] leading-relaxed text-niebla/80">
          {articulo.resumen}
        </p>

        <Link
          href={`/articulo/${articulo.slug}`}
          className="eyebrow mt-8 inline-flex items-center gap-2 text-brasa transition-colors hover:text-niebla"
        >
          Ver la ficha
          <span aria-hidden>→</span>
        </Link>
      </div>
    </article>
  );
}
