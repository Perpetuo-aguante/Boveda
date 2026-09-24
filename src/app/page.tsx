import Image from "next/image";
import Link from "next/link";
import { articulos, anioDe, fechaLarga, seccionesEnUso } from "@/lib/articles";
import { leerTexto, minutosDe } from "@/lib/texto";
import { Tianguis } from "@/components/tianguis";
import { MotorEstante } from "@/components/motor-estante";

export default function Inicio() {
  // Los minutos se cuentan aquí, en el servidor, porque leer `contenido/` es
  // acceso a disco: el puesto es un componente de cliente y no puede. Es el
  // «precio» que el cartelito enseña cuando el texto no trae copete.
  const minutosPorSlug = new Map(
    articulos.map((a) => {
      const bloques = leerTexto(a.slug, a.forma === "verso");
      return [a.slug, bloques ? minutosDe(bloques) : undefined];
    }),
  );

  const secciones = seccionesEnUso().filter((s) => s !== "Sin clasificar");
  const fechas = articulos.map((a) => a.fecha).filter(Boolean).sort();
  const desde = fechas[0]?.slice(0, 4);
  const hasta = fechas[fechas.length - 1]?.slice(0, 4);
  const rango = desde && hasta ? (desde === hasta ? desde : `${desde}–${hasta}`) : "";

  return (
    <>
      <MotorEstante />

      {/* ── El rótulo: la pared de la entrada ────────────────────────────────
          Ya no hay lona roja con el título montado encima: la pared rotulada
          a mano ES el toldo, a sangre, de borde a borde. Título, calcomanía
          del primer año y pregón ya vienen pintados en la propia foto. */}
      <section className="relative">
        <Image
          src="/marca/rotulo-primer-anio.webp"
          alt="Lo mejor del primer año. Bóveda de Perpetuo: crónica, poesía, ensayos y más."
          width={1672}
          height={843}
          priority
          sizes="100vw"
          className="block h-auto w-full"
        />
      </section>

      {/* Lo que el rótulo no puede decir —cuántos textos hay y de qué
          secciones— vive debajo, en la barra de siempre. */}
      <section className="px-6 py-8 sm:px-10 sm:py-10">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-5">
          <div className="flex flex-wrap items-center gap-x-7 gap-y-3">
            <ul className="eyebrow flex flex-wrap items-center gap-x-6 gap-y-2 text-tenue">
              {secciones.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
            <span className="eyebrow tabular-nums text-tenue-mas">
              {articulos.length} textos{rango ? ` · ${rango}` : ""}
            </span>
          </div>

          <a
            href="#puesto"
            className="eyebrow inline-flex items-center gap-3 text-tenue transition-colors hover:text-niebla"
          >
            Acercarse al puesto
            <span aria-hidden>↓</span>
          </a>
        </div>
      </section>
      <div className="valance" aria-hidden />

      {/* ── El puesto: la mesa con las lonas encima ───────────────────────── */}
      <section
        id="puesto"
        className="scroll-mt-16 px-4 pb-24 pt-14 sm:px-6"
        aria-label="El puesto"
      >
        <div className="mesa relative mx-auto max-w-6xl px-4 pb-16 pt-12 sm:px-8">
          <Tianguis
            puestos={articulos.map((a) => ({ articulo: a, minutos: minutosPorSlug.get(a.slug) }))}
          />
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
