import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { articulos, buscarArticulo, fechaLarga, anioDe } from "@/lib/articles";
import type { CSSProperties } from "react";
import { paletaDe, claseAcentoSeccion, papelLecturaDe } from "@/lib/covers";
import { leerTexto, tramos, minutosDe } from "@/lib/texto";
import { Cuadernillo } from "@/components/cuadernillo";
import { MotorEstante } from "@/components/motor-estante";

// Toda la bóveda es estática: se prerenderiza una ficha por texto.
export function generateStaticParams() {
  return articulos.map((a) => ({ slug: a.slug }));
}

// En Next 16 `params` es una promesa: el acceso síncrono se eliminó.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const a = buscarArticulo(slug);
  if (!a) return { title: "Texto no encontrado" };

  const descripcion = a.resumen || `${a.titulo}, publicado en Perpetuo.`;
  return {
    title: a.titulo,
    description: descripcion,
    openGraph: {
      title: a.autor ? `${a.titulo} · ${a.autor}` : a.titulo,
      description: descripcion,
      type: "article",
      images: a.imagen ? [a.imagen] : undefined,
    },
  };
}

export default async function Ficha({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const articulo = buscarArticulo(slug);
  if (!articulo) notFound();

  const bloques = leerTexto(articulo.slug);
  const i = articulos.findIndex((a) => a.slug === slug);
  const p = paletaDe(i);
  const anterior = i > 0 ? articulos[i - 1] : undefined;
  const siguiente = i < articulos.length - 1 ? articulos[i + 1] : undefined;

  // El papel de lectura: fondo claro, tinta oscura. La vitrina de la portada
  // es de noche; la ficha larga no lo es —4.000 palabras sobre casi negro
  // cansa la vista. Se cicla por índice, igual que la paleta de portada, así
  // que anterior/siguiente casi nunca repiten papel.
  const papel = papelLecturaDe(i);
  const vars = {
    "--noche": papel.fondo,
    "--noche-alta": papel.fondo,
    "--niebla": papel.tinta,
    "--tenue": papel.tenue,
    "--tenue-mas": papel.tenueMas,
    "--linea": papel.linea,
    "--linea-tenue": papel.lineaTenue,
  } as CSSProperties;

  const datos: Array<[string, string]> = [
    ...(articulo.autor ? ([["Autor", articulo.autor]] as Array<[string, string]>) : []),
    ["Sección", articulo.seccion === "Sin clasificar" ? "Por clasificar" : articulo.seccion],
    ...(articulo.fecha
      ? ([["Publicado", fechaLarga(articulo.fecha)]] as Array<[string, string]>)
      : []),
    ["Acceso", articulo.acceso === "abierto" ? "Abierto" : "Suscriptores"],
    ...(bloques ? ([["Lectura", `${minutosDe(bloques)} min`]] as Array<[string, string]>) : []),
    ...(articulo.curador ? ([["Lo trajo", articulo.curador]] as Array<[string, string]>) : []),
  ];

  return (
    <div
      className="tema-lectura min-h-screen"
      style={{ ...vars, background: "var(--noche)", color: "var(--niebla)", colorScheme: "light" }}
    >
      <MotorEstante />

      <div className="mx-auto max-w-6xl px-6 pt-10 sm:px-10">
        <Link
          href="/"
          className="eyebrow inline-flex items-center gap-2 text-tenue-mas transition-colors hover:text-niebla"
        >
          <span aria-hidden>←</span> El puesto
        </Link>
      </div>

      <article className="mx-auto max-w-6xl px-6 pt-12 sm:px-10 sm:pt-20">
        <div className="estante-item grid gap-16 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <div className="flex justify-center">
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
                    indice={i}
                    ancho="clamp(200px, 30vw, 310px)"
                    prioridad
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <p className={`eyebrow ${claseAcentoSeccion(articulo.seccion)}`}>
              {articulo.seccion === "Sin clasificar" ? "Por clasificar" : articulo.seccion}
            </p>

            <h1 className="display mt-6 text-[clamp(2.1rem,5vw,3.5rem)] text-balance">
              {articulo.titulo}
            </h1>

            <p className="mt-6 text-lg text-tenue">
              {[
                articulo.autor,
                articulo.seccion === "Sin clasificar" ? null : articulo.seccion,
                articulo.fecha ? fechaLarga(articulo.fecha) : null,
              ]
                .filter(Boolean)
                .join(" · ")}
            </p>

            {articulo.resumen ? (
              /* El copete es prosa, no rótulo: va en la serif. En la
                 condensada se leía como un titular a gritos y las tres líneas
                 se le venían encima unas a otras. */
              <p className="mt-9 text-[1.5rem] leading-[1.38] text-niebla/90 text-balance">
                {articulo.resumen}
              </p>
            ) : null}

            {articulo.porQue ? (
              <div className="mt-10 border-t border-linea pt-10">
                <h2 className="eyebrow text-tenue-mas">Por qué está en la bóveda</h2>
                <p className="mt-5 max-w-prose text-[1.0625rem] leading-[1.75] text-niebla/80">
                  {articulo.porQue}
                </p>
              </div>
            ) : null}

            <dl className="mt-12 grid grid-cols-2 gap-x-10 gap-y-5 border-t border-linea pt-10">
              {datos.map(([etiqueta, valor]) => (
                <div key={etiqueta}>
                  <dt className="eyebrow text-tenue-mas">{etiqueta}</dt>
                  <dd className="mt-1.5 text-[0.9375rem] text-niebla/85">{valor}</dd>
                </div>
              ))}
            </dl>

            {articulo.url ? (
              <a
                href={articulo.url}
                className="eyebrow mt-10 inline-flex items-center gap-2 border-b border-brasa/40 pb-1.5 text-brasa transition-colors hover:border-niebla hover:text-niebla"
              >
                Ver en perpetuo.global
                <span aria-hidden>↗</span>
              </a>
            ) : null}
          </div>
        </div>

        {/* ── El texto ────────────────────────────────────────────────────── */}
        {bloques ? (
          <div className="mx-auto mt-28 max-w-[38rem] border-t border-linea pt-16">
            {bloques.map((b, n) => {
              if (b.tipo === "separador") {
                return (
                  <div
                    key={n}
                    className="my-12 text-center text-tenue-mas"
                    aria-hidden
                  >
                    ❊
                  </div>
                );
              }
              if (b.tipo === "subtitulo") {
                return (
                  <h2 key={n} className="display mt-14 mb-6 text-2xl text-niebla">
                    {tramos(b.texto).map((t, k) =>
                      t.cursiva ? <em key={k}>{t.texto}</em> : <span key={k}>{t.texto}</span>,
                    )}
                  </h2>
                );
              }
              if (b.tipo === "cita") {
                return (
                  <blockquote
                    key={n}
                    className="my-12 border-l-[3px] pl-7"
                    style={{ borderColor: p.acento }}
                  >
                    {/* La cita destacada se queda en la serif, no en la
                        condensada: es la voz del autor subida de cuerpo, no
                        un rótulo del puesto. */}
                    <p className="text-[1.375rem] italic leading-[1.45] text-niebla/90">
                      {/* La cita entera ya va en cursiva, así que un *así* de
                          dentro se marca al revés: en redonda. Es la
                          convención de imprenta, y además evita que los
                          asteriscos salgan impresos. */}
                      {tramos(b.texto).map((t, k) =>
                        t.cursiva ? (
                          <span key={k} className="not-italic">
                            {t.texto}
                          </span>
                        ) : (
                          <span key={k}>{t.texto}</span>
                        ),
                      )}
                    </p>
                  </blockquote>
                );
              }
              return (
                <p
                  key={n}
                  className="mb-8 text-[1.125rem] leading-[1.75] text-niebla/85"
                >
                  {tramos(b.texto).map((t, k) =>
                    t.cursiva ? <em key={k}>{t.texto}</em> : <span key={k}>{t.texto}</span>,
                  )}
                </p>
              );
            })}
          </div>
        ) : (
          <div className="mx-auto mt-24 max-w-[38rem] border-t border-linea pt-12">
            <p className="text-[0.9375rem] leading-relaxed text-tenue-mas">
              El texto completo todavía no está en la bóveda. Se añade creando{" "}
              <code className="text-tenue">contenido/{articulo.slug}.md</code> y
              pegando el cuerpo dentro; el resto de la ficha ya funciona.
            </p>
          </div>
        )}
      </article>

      <nav
        className="mx-auto mt-28 grid max-w-6xl gap-px border-t border-linea px-6 sm:grid-cols-2 sm:px-10"
        aria-label="Otros textos de la bóveda"
      >
        {anterior ? (
          <Link href={`/articulo/${anterior.slug}`} className="group py-10 sm:pr-10">
            <span className="eyebrow text-tenue-mas">← Anterior</span>
            <span className="display mt-3 block text-xl transition-colors group-hover:text-brasa">
              {anterior.titulo}
            </span>
            <span className="mt-1.5 block text-[0.875rem] text-tenue">
              {anterior.autor || anioDe(anterior)}
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
              {siguiente.autor || anioDe(siguiente)}
            </span>
          </Link>
        ) : null}
      </nav>
    </div>
  );
}
