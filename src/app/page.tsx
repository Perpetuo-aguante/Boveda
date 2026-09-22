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

      {/* ── El toldo: el rótulo del puesto ───────────────────────────────────
          No es un hero de landing page, es la lona rotulada de la entrada. El
          logotipo va sobre su tabla, el título se grita, y el sticker de
          «LO MEJOR DEL PRIMER AÑO» va pegado de lado, como una calcomanía que
          alguien clavó encima del toldo. */}
      <section className="toldo px-6 pb-14 pt-12 sm:px-10 sm:pb-16 sm:pt-14">
        <div className="relative mx-auto max-w-6xl">
          <div className="flex flex-wrap items-end justify-between gap-y-8">
            <div className="max-w-3xl">
              <span className="placa-marca placa-marca--toldo">
                <Image
                  src="/marca/perpetuo-wordmark.png"
                  alt="Perpetuo"
                  width={2048}
                  height={348}
                  priority
                  className="block h-[26px] w-auto sm:h-[34px]"
                />
              </span>

              <h1 className="display mt-7 text-[clamp(2.7rem,8vw,6.6rem)] uppercase text-balance">
                La bóveda de Perpetuo
              </h1>

              <p className="pregon mt-6 max-w-2xl">
                Llévele, llévele, lo mejor de la bóveda de Perpetuo, de nuevo
                para usted. Crónica, ensayo, poesía, reseñas y más.
              </p>
            </div>

            <div className="sticker sticker--anio">
              <b>Lo mejor</b>
              <span>del primer</span>
              <span>año</span>
            </div>
          </div>

          <div className="mt-11 flex flex-wrap items-center gap-x-7 gap-y-3">
            <ul className="eyebrow flex flex-wrap items-center gap-x-6 gap-y-2" style={{ opacity: 0.9 }}>
              {secciones.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
            <span className="eyebrow tabular-nums" style={{ opacity: 0.65 }}>
              {articulos.length} textos{rango ? ` · ${rango}` : ""}
            </span>
          </div>

          <a
            href="#puesto"
            className="eyebrow mt-9 inline-flex items-center gap-3 transition-opacity hover:opacity-70"
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
