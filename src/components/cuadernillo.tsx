import type { CSSProperties } from "react";
import type { Articulo } from "@/lib/articles";
import { PALETAS, motivoDe } from "@/lib/covers";
import { Motivo } from "./motivo";

type Props = {
  articulo: Articulo;
  /** Ancho del cuadernillo, como longitud CSS. Todo lo demás se deriva de él,
   *  así que un `clamp()` aquí hace responsivo el objeto entero. */
  ancho?: string;
  /** Ángulo de reposo; el motor de scroll lo sobrescribe si hay JS. */
  giro?: number;
  /** Índice en la estantería — se imprime en el lomo, como un número de tomo. */
  numero?: number;
};

/** Los títulos largos bajan de cuerpo para no desbordar la portada. */
function cuerpoTitulo(titulo: string): string {
  if (titulo.length <= 22) return "2.35em";
  if (titulo.length <= 34) return "1.95em";
  if (titulo.length <= 48) return "1.62em";
  return "1.38em";
}

const IDIOMAS: Record<Articulo["idioma"], string> = {
  es: "Español",
  en: "Inglés",
  pt: "Portugués",
  fr: "Francés",
  it: "Italiano",
  de: "Alemán",
};

export function Cuadernillo({ articulo, ancho = "260px", giro = 24, numero }: Props) {
  const p = PALETAS[articulo.seccion];

  // Todo se deriva del ancho en CSS, no en JS: así un clamp() en `ancho` escala
  // el objeto entero —caras, grosor y tipografía— sin un solo media query.
  const vars = {
    "--ancho": ancho,
    "--alto": "calc(var(--ancho) * 1.46)",
    "--grosor": "max(14px, calc(var(--ancho) * 0.1))",
    "--canto": p.canto,
    "--giro": `${giro}deg`,
    fontSize: "calc(var(--ancho) / 20)",
  } as CSSProperties;

  const tapa: CSSProperties = { background: p.papel, color: p.tinta };

  return (
    <div className="libro" style={vars} data-libro>
      {/* PORTADA */}
      <div className="cara cara--tapa cara--portada" style={tapa}>
        <div className="flex h-full flex-col justify-between p-[1.6em]">
          <div>
            <div
              className="eyebrow"
              style={{ fontSize: "0.72em", color: p.tinta, opacity: 0.72 }}
            >
              {articulo.medio}
            </div>
            <div
              style={{
                height: 1,
                background: p.acento,
                opacity: 0.55,
                margin: "0.9em 0 0",
              }}
            />
          </div>

          <div style={{ height: "4.4em", margin: "0 auto", width: "4.4em" }}>
            <Motivo n={motivoDe(articulo.slug)} color={p.acento} />
          </div>

          <div>
            <h3
              className="display"
              style={{
                fontSize: cuerpoTitulo(articulo.titulo),
                fontVariationSettings: '"SOFT" 0, "WONK" 1, "opsz" 24',
                textWrap: "balance",
                marginBottom: "0.7em",
              }}
            >
              {articulo.titulo}
            </h3>
            <div
              style={{
                height: 1,
                background: p.acento,
                opacity: 0.4,
                marginBottom: "0.7em",
              }}
            />
            <div
              className="flex items-baseline justify-between gap-[0.6em]"
              style={{ fontSize: "0.78em" }}
            >
              <span style={{ fontWeight: 500 }}>{articulo.autor}</span>
              <span style={{ opacity: 0.62, fontVariantNumeric: "tabular-nums" }}>
                {articulo.anio}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* CONTRAPORTADA — el resumen, como en un libro de verdad */}
      <div className="cara cara--tapa cara--contra" style={tapa}>
        <div className="flex h-full flex-col justify-between p-[1.8em]">
          <p
            className="display"
            style={{ fontSize: "1.05em", lineHeight: 1.34, opacity: 0.92 }}
          >
            {articulo.resumen}
          </p>
          <div style={{ fontSize: "0.72em", opacity: 0.6 }} className="eyebrow">
            {articulo.seccion} · {IDIOMAS[articulo.idioma]}
          </div>
        </div>
      </div>

      {/* LOMO */}
      <div
        className="cara cara--lado cara--lomo"
        style={{ background: p.lomo, color: p.tinta }}
      >
        <div className="flex h-full flex-col items-center justify-between py-[1.1em]">
          <span style={{ fontSize: "0.62em", opacity: 0.7 }}>
            {numero !== undefined ? String(numero).padStart(2, "0") : ""}
          </span>
          <span
            style={{
              writingMode: "vertical-rl",
              fontFamily: "var(--font-display)",
              fontSize: "0.82em",
              letterSpacing: "0.02em",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxHeight: "70%",
            }}
          >
            {articulo.titulo}
          </span>
          <span
            style={{
              width: "0.5em",
              height: "0.5em",
              borderRadius: 999,
              background: p.acento,
              opacity: 0.85,
            }}
          />
        </div>
      </div>

      {/* CANTO Y CORTES — las hojas */}
      <div className="cara cara--lado cara--canto hojas" />
      <div className="cara cara--tope cara--cabeza hojas--horizontal" />
      <div className="cara cara--tope cara--pie hojas--horizontal" />
    </div>
  );
}
