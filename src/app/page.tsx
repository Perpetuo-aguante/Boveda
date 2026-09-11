import Link from "next/link";
import { articulos, anioDe, fechaLarga, seccionesEnUso } from "@/lib/articles";
import { PuestoItem } from "@/components/puesto-item";
import { MotorEstante } from "@/components/motor-estante";

export default function Inicio() {
  const secciones = seccionesEnUso().filter((s) => s !== "Sin clasificar");
  const fechas = articulos.map((a) => a.fecha).filter(Boolean).sort();
  const desde = fechas[0]?.slice(0, 4);
  const hasta = fechas[fechas.length - 1]?.slice(0, 4);
  const rango = desde && hasta ? (desde === hasta ? desde : `${desde}–${hasta}`) : "";

  return (
    <>
      <MotorEstante />

      {/* ── Entrada ───────────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-6 pt-20 pb-8 sm:px-10 sm:pt-28">
        <p className="eyebrow text-tenue-mas">La Bóveda</p>

        <h1 className="display mt-8 max-w-4xl text-[clamp(2.5rem,6.5vw,5rem)] text-balance">
          Todo lo que hemos escrito, extendido sobre la mesa.
        </h1>

        <p className="mt-10 max-w-xl text-[1.0625rem] leading-relaxed text-niebla/70">
          El archivo de Perpetuo, puesto como en un tianguis: los Estelares de
          los lunes, los Anteojos de los miércoles y El Creativo de los viernes.
          Levanta cualquiera y léelo completo.
        </p>

        <div className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-linea pt-6 text-[0.8125rem] text-tenue-mas">
          <span className="tabular-nums">
            {articulos.length} {articulos.length === 1 ? "texto" : "textos"}
          </span>
          {rango ? <span className="tabular-nums">{rango}</span> : null}
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {secciones.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>

        <a
          href="#puesto"
          className="eyebrow mt-14 inline-flex items-center gap-3 text-tenue-mas transition-colors hover:text-niebla"
        >
          Acercarse al puesto
          <span aria-hidden>↓</span>
        </a>
      </section>

      {/* ── El puesto ─────────────────────────────────────────────────────── */}
      <section
        id="puesto"
        className="relative mx-auto max-w-6xl scroll-mt-16 px-6 pt-20 pb-10 sm:px-10"
        aria-label="El puesto"
      >
        <div className="luz-puesto" aria-hidden />
        <div className="puesto relative">
          {articulos.map((a, i) => (
            <PuestoItem key={a.slug} articulo={a} indice={i} />
          ))}
        </div>
      </section>

      {/* ── Índice ────────────────────────────────────────────────────────── */}
      <section
        id="indice"
        className="mx-auto mt-28 max-w-6xl scroll-mt-24 px-6 sm:px-10"
        aria-labelledby="indice-titulo"
      >
        <div className="flex items-baseline justify-between border-b border-linea pb-5">
          <h2 id="indice-titulo" className="display text-3xl">
            Índice
          </h2>
          <span className="eyebrow text-tenue-mas tabular-nums">{articulos.length}</span>
        </div>

        <ul>
          {articulos.map((a, i) => (
            <li key={a.slug} className="border-b border-linea-tenue">
              <Link
                href={`/articulo/${a.slug}`}
                className="group grid grid-cols-[2.5rem_1fr] items-baseline gap-x-4 gap-y-1 py-5 sm:grid-cols-[2.5rem_1fr_9rem_9rem] sm:gap-x-8"
              >
                <span className="tabular-nums text-[0.8125rem] text-tenue-mas">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>
                  <span className="display block text-lg transition-colors group-hover:text-brasa">
                    {a.titulo}
                  </span>
                  {a.autor ? (
                    <span className="mt-1 block text-[0.875rem] text-tenue">{a.autor}</span>
                  ) : null}
                </span>
                <span className="col-start-2 text-[0.875rem] text-tenue-mas sm:col-start-3">
                  {a.seccion === "Sin clasificar" ? "—" : a.seccion}
                  {a.acceso === "suscriptores" ? (
                    <span className="ml-2 text-[0.75rem] opacity-70">· suscriptores</span>
                  ) : null}
                </span>
                <span className="col-start-2 text-[0.875rem] text-tenue-mas tabular-nums sm:col-start-4 sm:text-right">
                  {fechaLarga(a.fecha) || anioDe(a) || "—"}
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <p className="mt-10 max-w-lg text-[0.9375rem] leading-relaxed text-tenue-mas">
          Los textos se añaden en <code className="text-tenue">src/lib/articles.ts</code>;
          el cuerpo completo de cada uno va en{" "}
          <code className="text-tenue">contenido/&lt;slug&gt;.md</code>.
        </p>
      </section>
    </>
  );
}
