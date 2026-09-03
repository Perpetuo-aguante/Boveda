import Link from "next/link";
import { articulos, seccionesEnUso } from "@/lib/articles";
import { PALETAS } from "@/lib/covers";
import { EstanteItem } from "@/components/estante-item";
import { MotorEstante } from "@/components/motor-estante";

export default function Inicio() {
  const secciones = seccionesEnUso();

  return (
    <>
      <MotorEstante />

      {/* ── Entrada ───────────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-6 pt-20 pb-8 sm:px-10 sm:pt-32">
        <p className="eyebrow text-tenue-mas">Biblioteca</p>

        <h1 className="display mt-8 max-w-4xl text-[clamp(2.6rem,7vw,5.5rem)] text-balance">
          Los textos que nos enseñaron a hacer una revista.
        </h1>

        <p className="mt-10 max-w-xl text-[1.0625rem] leading-relaxed text-niebla/70">
          Cada tanto aparece un artículo que cambia la forma de leer todo lo demás.
          Aquí guardamos los nuestros: crónicas, ensayos, perfiles y manifiestos a
          los que volvemos cuando no sabemos cómo escribir algo.
        </p>

        <div className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-linea pt-6 text-[0.8125rem] text-tenue-mas">
          <span className="tabular-nums">
            {articulos.length} {articulos.length === 1 ? "título" : "títulos"}
          </span>
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {secciones.map((s) => (
              <li key={s} className="flex items-center gap-2">
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{
                    background: PALETAS[s].papel === "#17151a" ? PALETAS[s].acento : PALETAS[s].papel,
                  }}
                  aria-hidden
                />
                {s}
              </li>
            ))}
          </ul>
        </div>

        <a
          href="#estanteria"
          className="eyebrow mt-16 inline-flex items-center gap-3 text-tenue-mas transition-colors hover:text-niebla"
        >
          Bajar a la estantería
          <span aria-hidden>↓</span>
        </a>
      </section>

      {/* ── La estantería ─────────────────────────────────────────────────── */}
      <section
        id="estanteria"
        className="mx-auto max-w-6xl scroll-mt-16 px-6 sm:px-10"
        aria-label="La estantería"
      >
        {articulos.map((a, i) => (
          <EstanteItem key={a.slug} articulo={a} indice={i} />
        ))}
      </section>

      {/* ── Índice ────────────────────────────────────────────────────────── */}
      <section
        id="indice"
        className="mx-auto mt-24 max-w-6xl scroll-mt-24 px-6 sm:px-10"
        aria-labelledby="indice-titulo"
      >
        <div className="flex items-baseline justify-between border-b border-linea pb-5">
          <h2 id="indice-titulo" className="display text-3xl">
            Índice
          </h2>
          <span className="eyebrow text-tenue-mas tabular-nums">
            {articulos.length}
          </span>
        </div>

        <ul>
          {articulos.map((a, i) => (
            <li key={a.slug} className="border-b border-linea-tenue">
              <Link
                href={`/articulo/${a.slug}`}
                className="group grid grid-cols-[2.5rem_1fr] items-baseline gap-x-4 gap-y-1 py-5 sm:grid-cols-[2.5rem_1fr_13rem_4rem] sm:gap-x-8"
              >
                <span className="tabular-nums text-[0.8125rem] text-tenue-mas">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>
                  <span className="display block text-lg transition-colors group-hover:text-brasa">
                    {a.titulo}
                  </span>
                  <span className="mt-1 flex flex-wrap items-center gap-x-3 text-[0.875rem] text-tenue">
                    {a.autor}
                    <span className="flex items-center gap-1.5 text-tenue-mas">
                      <span
                        className="h-1 w-1 rounded-full"
                        style={{
                          background:
                            PALETAS[a.seccion].papel === "#17151a"
                              ? PALETAS[a.seccion].acento
                              : PALETAS[a.seccion].papel,
                        }}
                        aria-hidden
                      />
                      {a.seccion}
                    </span>
                  </span>
                </span>
                <span className="col-start-2 text-[0.875rem] text-tenue-mas italic sm:col-start-3">
                  {a.medio}
                </span>
                <span className="col-start-2 text-[0.875rem] text-tenue-mas tabular-nums sm:col-start-4 sm:text-right">
                  {a.anio}
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <p className="mt-10 max-w-lg text-[0.9375rem] leading-relaxed text-tenue-mas">
          ¿Falta uno? Se añaden en{" "}
          <code className="text-tenue">src/lib/articles.ts</code>: una entrada por
          artículo y la estantería se reordena sola.
        </p>
      </section>
    </>
  );
}
