import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { articulos, buscarArticulo } from "@/lib/articles";
import { PALETAS } from "@/lib/covers";
import { Cuadernillo } from "@/components/cuadernillo";
import { MotorEstante } from "@/components/motor-estante";

// Toda la bóveda es estática: se prerenderiza una ficha por artículo.
export function generateStaticParams() {
  return articulos.map((a) => ({ slug: a.slug }));
}

const IDIOMAS: Record<string, string> = {
  es: "Español",
  en: "Inglés",
  pt: "Portugués",
  fr: "Francés",
  it: "Italiano",
  de: "Alemán",
};

// En Next 16 `params` es una promesa: el acceso síncrono se eliminó.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const a = buscarArticulo(slug);
  if (!a) return { title: "Artículo no encontrado" };

  return {
    title: a.titulo,
    description: a.resumen,
    openGraph: {
      title: `${a.titulo} · ${a.autor}`,
      description: a.resumen,
      type: "article",
    },
  };
}

export default async function Ficha({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const articulo = buscarArticulo(slug);
  if (!articulo) notFound();

  const p = PALETAS[articulo.seccion];
  const i = articulos.findIndex((a) => a.slug === slug);
  const anterior = i > 0 ? articulos[i - 1] : undefined;
  const siguiente = i < articulos.length - 1 ? articulos[i + 1] : undefined;

  const datos: Array<[string, string]> = [
    ["Autor", articulo.autor],
    ["Publicado en", articulo.medio],
    ["Año", String(articulo.anio)],
    ["Sección", articulo.seccion],
    ["Idioma original", IDIOMAS[articulo.idioma] ?? articulo.idioma],
    ...(articulo.curador ? ([["Lo trajo", articulo.curador]] as Array<[string, string]>) : []),
  ];

  return (
    <>
      <MotorEstante />

      <div className="mx-auto max-w-6xl px-6 pt-10 sm:px-10">
        <Link
          href="/"
          className="eyebrow inline-flex items-center gap-2 text-tenue-mas transition-colors hover:text-niebla"
        >
          <span aria-hidden>←</span> La estantería
        </Link>
      </div>

      <article className="mx-auto max-w-6xl px-6 pt-12 sm:px-10 sm:pt-20">
        <div className="estante-item grid gap-16 lg:grid-cols-12 lg:gap-20">
          {/* El objeto, y debajo los datos duros */}
          <div className="lg:col-span-5">
            <div className="flex justify-center lg:sticky lg:top-16">
              <div className="escena relative">
                <div
                  className="halo"
                  style={{ ["--halo-color" as string]: `${p.papel}45` }}
                  aria-hidden
                />
                <div className="sombra" aria-hidden />
                <div className="alza relative">
                  <Cuadernillo
                    articulo={articulo}
                    numero={i + 1}
                    ancho="clamp(200px, 30vw, 320px)"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* El texto */}
          <div className="lg:col-span-6 lg:col-start-7">
            <div className="flex items-center gap-3">
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: p.papel === "#17151a" ? p.acento : p.papel }}
                aria-hidden
              />
              <span className="eyebrow text-tenue">{articulo.seccion}</span>
            </div>

            <h1 className="display mt-6 text-[clamp(2.2rem,5.5vw,3.75rem)] text-balance">
              {articulo.titulo}
            </h1>

            <p className="mt-6 text-lg text-tenue">
              {articulo.autor} · <span className="italic">{articulo.medio}</span> ·{" "}
              <span className="tabular-nums">{articulo.anio}</span>
            </p>

            <p className="display mt-12 text-[1.5rem] leading-snug text-niebla/90 text-balance">
              {articulo.resumen}
            </p>

            <div className="mt-10 border-t border-linea pt-10">
              <h2 className="eyebrow text-tenue-mas">Por qué está aquí</h2>
              <p className="mt-5 max-w-prose text-[1.0625rem] leading-[1.75] text-niebla/80">
                {articulo.porQue}
              </p>
            </div>

            {articulo.cita ? (
              <blockquote
                className="mt-12 border-l-2 pl-7"
                style={{ borderColor: p.acento }}
              >
                <p className="display text-[1.375rem] leading-snug text-niebla/90">
                  «{articulo.cita}»
                </p>
              </blockquote>
            ) : null}

            {articulo.url ? (
              <a
                href={articulo.url}
                className="eyebrow mt-14 inline-flex items-center gap-2 border-b border-brasa/40 pb-1.5 text-brasa transition-colors hover:border-niebla hover:text-niebla"
              >
                Leer el original
                <span aria-hidden>↗</span>
              </a>
            ) : (
              <p className="mt-14 text-[0.875rem] text-tenue-mas">
                Sin enlace estable al original. Búscalo en una biblioteca o en la
                antología donde se recogió.
              </p>
            )}

            <dl className="mt-16 grid grid-cols-1 gap-x-10 gap-y-5 border-t border-linea pt-10 sm:grid-cols-2">
              {datos.map(([etiqueta, valor]) => (
                <div key={etiqueta}>
                  <dt className="eyebrow text-tenue-mas">{etiqueta}</dt>
                  <dd className="mt-1.5 text-[0.9375rem] text-niebla/85">{valor}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </article>

      {/* Anterior / siguiente */}
      <nav
        className="mx-auto mt-28 grid max-w-6xl gap-px border-t border-linea px-6 sm:grid-cols-2 sm:px-10"
        aria-label="Otros títulos de la bóveda"
      >
        {anterior ? (
          <Link href={`/articulo/${anterior.slug}`} className="group py-10 sm:pr-10">
            <span className="eyebrow text-tenue-mas">← Anterior</span>
            <span className="display mt-3 block text-xl transition-colors group-hover:text-brasa">
              {anterior.titulo}
            </span>
            <span className="mt-1.5 block text-[0.875rem] text-tenue">
              {anterior.autor}
            </span>
          </Link>
        ) : (
          <span />
        )}
        {siguiente ? (
          <Link
            href={`/articulo/${siguiente.slug}`}
            className="group py-10 sm:border-l sm:border-linea sm:pl-10 sm:text-right"
          >
            <span className="eyebrow text-tenue-mas">Siguiente →</span>
            <span className="display mt-3 block text-xl transition-colors group-hover:text-brasa">
              {siguiente.titulo}
            </span>
            <span className="mt-1.5 block text-[0.875rem] text-tenue">
              {siguiente.autor}
            </span>
          </Link>
        ) : null}
      </nav>
    </>
  );
}
