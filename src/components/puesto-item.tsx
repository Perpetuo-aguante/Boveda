import type { CSSProperties } from "react";
import Link from "next/link";
import { Cuadernillo } from "./cuadernillo";
import { hash, claseAcentoSeccion } from "@/lib/covers";
import { fechaLarga, type Articulo } from "@/lib/articles";

const MESES = [
  "enero", "febrero", "marzo", "abril", "mayo", "junio",
  "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
];

/** "abril 2026" — lo justo para situar el texto sin repetir la portada. */
function mesYAnio(fecha: string): string {
  if (!fecha) return "";
  const [a, m] = fecha.split("-");
  return `${MESES[Number(m) - 1] ?? ""} ${a}`.trim();
}

/**
 * Un cuadernillo en el puesto. Se apoya con una inclinación y un asiento
 * propios —derivados del slug, así que son estables entre compilaciones— y al
 * pasar por encima se endereza, se levanta y revela su ficha corta.
 *
 * El título no se repite debajo: ya viene impreso en la portada, que es lo que
 * uno lee al acercarse a un puesto. Abajo va lo que la portada no dice (cuándo
 * salió) y al pasar por encima aparece lo que ninguna de las dos dice (de qué
 * va). Así cada capa añade algo en vez de repetir la anterior.
 */
export function PuestoItem({ articulo, indice }: { articulo: Articulo; indice: number }) {
  const h = hash(articulo.slug);
  // Entre -4.5° y +4.5°, y entre 0 y 10px de asiento. Suficiente para que la
  // fila respire sin que parezca que se cayó el puesto.
  const vars = {
    "--inclina": `${((h % 19) - 9) * 0.5}deg`,
    "--asienta": `${(h >>> 5) % 11}px`,
  } as CSSProperties;

  return (
    <div className="puesto-item estante-item aparece" style={vars}>
      <div className="escena relative">
        <div className="sombra" aria-hidden />
        <Link
          href={`/articulo/${articulo.slug}`}
          className="alza relative block rounded-sm"
          aria-label={`Abrir «${articulo.titulo}»`}
        >
          <Cuadernillo
            articulo={articulo}
            indice={indice}
            ancho="clamp(122px, 17vw, 172px)"
            prioridad={indice < 6}
          />
        </Link>
      </div>

      {/* Siempre visible, también sin ratón. */}
      <div className="pie-puesto">
        <p className="text-[0.8125rem] text-tenue-mas">
          {mesYAnio(articulo.fecha) || "sin fecha"}
          {articulo.acceso === "suscriptores" ? (
            <span title="Sólo para suscriptores" aria-label="Sólo para suscriptores">
              {" "}·{" "}◆
            </span>
          ) : null}
        </p>
      </div>

      {/* Se revela al pasar por encima: lo que ni la portada ni el pie dicen. */}
      <div className="revela" aria-hidden>
        <p className={`eyebrow ${claseAcentoSeccion(articulo.seccion)}`}>
          {articulo.seccion === "Sin clasificar" ? "Por clasificar" : articulo.seccion}
        </p>
        {articulo.resumen ? (
          <p className="display mt-2.5 text-[0.9375rem] leading-tight text-niebla">
            {articulo.resumen}
          </p>
        ) : null}
        {articulo.autor ? (
          <p className="mt-2 text-[0.8125rem] text-tenue">{articulo.autor}</p>
        ) : null}
        <p className="mt-2 text-[0.75rem] text-tenue-mas">
          {fechaLarga(articulo.fecha) || "Fecha por confirmar"}
          {articulo.acceso === "suscriptores" ? " · Suscriptores" : ""}
        </p>
      </div>
    </div>
  );
}
