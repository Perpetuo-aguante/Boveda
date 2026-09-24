import Image from "next/image";
import Link from "next/link";
import { articulos, anioDe, fechaLarga } from "@/lib/articles";
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

  return (
    <>
      <MotorEstante />

      {/* ── El mural: el rótulo pintado a mano sobre la pared del puesto ────
          El logotipo y la navegación reales van en el header del layout; esto
          es solo el mural de entrada, de pared a pared. */}
      <section className="relative bg-[#fdf1e7]">
        <Image
          src="/marca/hero-boveda.webp"
          alt="Lo mejor del primer año: la bóveda de Perpetuo. Crónica, ensayo, reseñas y más."
          width={1672}
          height={889}
          priority
          className="block h-auto w-full"
        />
        <a
          href="#puesto"
          className="absolute inset-x-0 bottom-0 h-[6%]"
          aria-label="Acercarse al puesto"
        />
      </section>

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
