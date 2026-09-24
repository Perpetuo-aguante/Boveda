"use client";

import { useRef, useState, type CSSProperties } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";

/**
 * LA NAVEGACIÓN DEL TEXTO — va arriba, no al final.
 *
 * Al final sólo sirve a quien terminó de leer. Arriba sirve a quien está
 * leyendo, que es el caso normal: se llega a un texto, se lee un rato y se
 * quiere saltar. Por eso además es pegajosa.
 *
 * Tres formas de moverse, de la más corta a la más larga:
 *
 *   1. ANTERIOR / SIGUIENTE — el paso de uno en uno, siempre a la vista.
 *   2. LA BARRA DE PALOS — un palo por texto de la colección. Es la pieza
 *      clave: permite escanear los dieciocho sin salir del que se está
 *      leyendo, y llegar al principio o al final de un jalón.
 *   3. EL ÍNDICE COMPLETO — se despliega aquí mismo, en un panel. Mandar a la
 *      portada para ver el índice sería justo lo contrario de lo que se pide:
 *      obligar a salir del texto.
 *
 * ────────────────────────────────────────────────────────────────────────────
 * EL EQUIVALENTE TÁCTIL
 *
 * «Hover para revelar el título» no existe en una pantalla táctil, y un palo
 * de 3px de ancho tampoco es un blanco que un dedo pueda acertar. Así que:
 *
 *   · El título revelado no es un globo flotante por palo, sino UN renglón
 *     fijo debajo de la barra. En un teléfono un tooltip junto al borde se
 *     sale de la pantalla; un renglón fijo no tiene dónde salirse.
 *   · SE DESLIZA. Con dieciocho palos en 390px cada blanco de toque queda en
 *     14px de ancho, muy por debajo de lo que un dedo acierta. Así que el
 *     gesto táctil no es apuntar: es arrastrar el dedo por la barra —los
 *     títulos se van revelando bajo el dedo— y soltar sobre el que se quiere.
 *     Eso conserva lo que hace útil a la barra (los dieciocho a la vista de un
 *     golpe) en vez de sacrificarlo a una barra con scroll horizontal.
 *   · Un toque seco sin arrastre sigue funcionando: lo atiende el <Link> de
 *     siempre. Sólo cuando el dedo SE MUEVE toma el control el arrastre, y
 *     entonces el navegador ya no dispara click sobre ningún palo —el ancestro
 *     común del pointerdown y el pointerup es la barra—, así que no hay
 *     navegación doble.
 *   · `touch-action: pan-y` en la barra: la vertical se la queda el navegador
 *     para hacer scroll de la página, la horizontal es nuestra.
 *   · Y el foco del teclado revela igual que el ratón, así que tabular por la
 *     barra la va narrando.
 * ────────────────────────────────────────────────────────────────────────────
 */

export type Escala = { slug: string; titulo: string; autor: string; seccion: string };

/** El abanico: los palos no cuelgan en fila recta, se apoyan unos en otros
 *  como las varillas de un abanico o los rayos de una rueda. El ángulo total
 *  se reparte entre todos —cuantos más textos, más cerrado el abanico— y no
 *  por palo, para que dieciocho o cuarenta se vean igual de apretados. */
const ABANICO_GRADOS = 34;

function anguloDe(i: number, n: number): number {
  if (n <= 1) return 0;
  return (i / (n - 1) - 0.5) * ABANICO_GRADOS;
}

/** El imán del cursor: cuanto más cerca pasa el ratón de un palo, más crece
 *  —como el dock que se abre al acercarse—. El radio va en píxeles porque los
 *  palos, ahora pegados, son angostos y un radio en índices los haría crecer
 *  todos a la vez. */
const RADIO_IMAN = 46;
const ESCALA_MAX = 1.9;

function escalaIman(centroPx: number, cursorPx: number): number {
  const distancia = Math.abs(cursorPx - centroPx);
  const t = Math.max(0, 1 - distancia / RADIO_IMAN);
  // Cuadrático: el crecimiento se siente en los palos cercanos, no en toda
  // la fila por igual —un imán, no una ola.
  return 1 + t * t * (ESCALA_MAX - 1);
}

export function NavegacionTexto({
  coleccion,
  actual,
}: {
  coleccion: Escala[];
  /** Posición del texto que se está leyendo, base 0. */
  actual: number;
}) {
  const router = useRouter();
  const quieto = useReducedMotion();
  const [previsto, setPrevisto] = useState<number | null>(null);
  const [indiceAbierto, setIndiceAbierto] = useState(false);

  const barraRef = useRef<HTMLOListElement>(null);
  const arrastrando = useRef(false);
  const seMovio = useRef(false);

  // Posición del cursor relativa a la barra, en píxeles, para el imán del
  // abanico. `null` cuando el ratón no está encima: ahí el CSS se queda con
  // su propio :hover/:focus-visible, que no necesita saber dónde cae cada
  // palo.
  const [cursorEnBarra, setCursorEnBarra] = useState<number | null>(null);
  const anchoBarra = useRef(0);
  const rafPendiente = useRef(false);

  function rastrearCursor(clientX: number) {
    const barra = barraRef.current;
    if (!barra || rafPendiente.current) return;
    rafPendiente.current = true;
    requestAnimationFrame(() => {
      rafPendiente.current = false;
      const r = barra.getBoundingClientRect();
      anchoBarra.current = r.width;
      setCursorEnBarra(clientX - r.left);
    });
  }

  /** Qué palo cae bajo una x de pantalla. Se calcula de la geometría de la
   *  barra y no del elemento bajo el dedo, porque durante un arrastre con
   *  captura de puntero el `target` se queda congelado en el primero. */
  function paloEn(clientX: number): number | null {
    const barra = barraRef.current;
    if (!barra) return null;
    const r = barra.getBoundingClientRect();
    if (r.width === 0) return null;
    const t = (clientX - r.left) / r.width;
    return Math.max(0, Math.min(coleccion.length - 1, Math.floor(t * coleccion.length)));
  }

  const anterior = actual > 0 ? coleccion[actual - 1] : undefined;
  const siguiente = actual < coleccion.length - 1 ? coleccion[actual + 1] : undefined;

  // Sin nada señalado, el renglón habla del texto que se está leyendo: la
  // barra nunca queda muda ni salta de alto al revelar algo.
  const mostrado = coleccion[previsto ?? actual];
  const mostradoN = (previsto ?? actual) + 1;

  return (
    <nav className="nav-texto" aria-label="Navegación de la colección">
      <div className="nav-texto-caja">
        {/* ── 1. El paso de uno en uno ─────────────────────────────────── */}
        <div className="nav-pasos">
          {anterior ? (
            <Link href={`/articulo/${anterior.slug}`} className="nav-paso nav-paso--atras">
              <span className="eyebrow nav-paso-etiqueta">← Anterior</span>
              <span className="nav-paso-titulo">{anterior.titulo}</span>
            </Link>
          ) : (
            <span className="nav-paso nav-paso--vacio">
              <span className="eyebrow nav-paso-etiqueta">Principio de la bóveda</span>
            </span>
          )}

          <Link href="/" className="eyebrow nav-volver">
            El puesto
          </Link>

          {siguiente ? (
            <Link href={`/articulo/${siguiente.slug}`} className="nav-paso nav-paso--adelante">
              <span className="eyebrow nav-paso-etiqueta">Siguiente →</span>
              <span className="nav-paso-titulo">{siguiente.titulo}</span>
            </Link>
          ) : (
            <span className="nav-paso nav-paso--vacio nav-paso--adelante">
              <span className="eyebrow nav-paso-etiqueta">Final de la bóveda</span>
            </span>
          )}
        </div>

        {/* ── 2. La barra de palos ─────────────────────────────────────── */}
        <div className="nav-barra-fila">
          <ol
            ref={barraRef}
            className="nav-barra"
            aria-label={`Los ${coleccion.length} textos de la bóveda`}
            onPointerDown={(e) => {
              arrastrando.current = true;
              seMovio.current = false;
              setPrevisto(paloEn(e.clientX));
              rastrearCursor(e.clientX);
              // Con captura, los movimientos siguen llegando aunque el dedo se
              // salga de la barra: si no, escanear se cortaría en los bordes.
              e.currentTarget.setPointerCapture(e.pointerId);
            }}
            onPointerMove={(e) => {
              // El imán vive fuera del `if`: a diferencia del escaneo táctil,
              // que sólo cuenta arrastrando, el abanico responde a CUALQUIER
              // ratón que pase por encima, se presione o no.
              rastrearCursor(e.clientX);
              if (!arrastrando.current) return;
              seMovio.current = true;
              setPrevisto(paloEn(e.clientX));
            }}
            onPointerUp={(e) => {
              if (!arrastrando.current) return;
              arrastrando.current = false;
              const destino = paloEn(e.clientX);
              // Sólo si el dedo se movió: un toque seco lo atiende el <Link>.
              if (seMovio.current && destino !== null && destino !== actual) {
                router.push(`/articulo/${coleccion[destino].slug}`);
              }
              if (seMovio.current) setPrevisto(null);
            }}
            onPointerCancel={() => {
              arrastrando.current = false;
              setPrevisto(null);
              setCursorEnBarra(null);
            }}
            onPointerLeave={() => {
              if (!arrastrando.current) setPrevisto(null);
              setCursorEnBarra(null);
            }}
          >
            {coleccion.map((t, i) => {
              // El ángulo es fijo —el abanico en reposo—; la escala sólo
              // existe mientras el ratón anda encima de la barra, y se
              // calcula contra la posición de este palo en ese ancho.
              const angulo = anguloDe(i, coleccion.length);
              const escala =
                cursorEnBarra !== null
                  ? escalaIman(((i + 0.5) / coleccion.length) * anchoBarra.current, cursorEnBarra)
                  : null;
              return (
                <li
                  key={t.slug}
                  className="nav-palo-celda"
                  style={{ "--rot": `${angulo}deg` } as CSSProperties}
                >
                  <Link
                    href={`/articulo/${t.slug}`}
                    className={`nav-palo${i === actual ? " nav-palo--actual" : ""}`}
                    aria-current={i === actual ? "page" : undefined}
                    aria-label={`${i + 1}. ${t.titulo}${t.autor ? `, de ${t.autor}` : ""}`}
                    onPointerEnter={() => setPrevisto(i)}
                    onFocus={() => setPrevisto(i)}
                    onBlur={() => setPrevisto(null)}
                  >
                    {/* La línea es fina a propósito; el blanco de toque no. */}
                    <span
                      className="nav-palo-linea"
                      aria-hidden
                      style={escala !== null ? ({ "--mag": escala } as CSSProperties) : undefined}
                    />
                  </Link>
                </li>
              );
            })}
          </ol>

          <button
            type="button"
            className="eyebrow nav-abrir-indice"
            onClick={() => setIndiceAbierto((v) => !v)}
            aria-expanded={indiceAbierto}
          >
            {indiceAbierto ? "Cerrar" : "Índice"}
            <span aria-hidden>{indiceAbierto ? " ↑" : " ↓"}</span>
          </button>
        </div>

        {/* El renglón que narra la barra. `aria-live` lo dice en voz alta al
            tabular, y `aria-hidden` en el número evita leer «06» suelto. */}
        <p className="nav-revelado" aria-live="polite">
          <span className="nav-revelado-n" aria-hidden>
            {String(mostradoN).padStart(2, "0")}
          </span>
          <span className="nav-revelado-titulo">{mostrado.titulo}</span>
          {mostrado.autor ? <span className="nav-revelado-autor">{mostrado.autor}</span> : null}
        </p>

        {/* ── 3. El índice completo, sin salir del texto ────────────────── */}
        <AnimatePresence initial={false}>
          {indiceAbierto ? (
            <motion.div
              className="nav-indice"
              initial={quieto ? undefined : { height: 0, opacity: 0 }}
              animate={quieto ? undefined : { height: "auto", opacity: 1 }}
              exit={quieto ? undefined : { height: 0, opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              <ol className="nav-indice-lista">
                {coleccion.map((t, i) => (
                  <li key={t.slug}>
                    <Link
                      href={`/articulo/${t.slug}`}
                      className={`nav-indice-fila${i === actual ? " nav-indice-fila--actual" : ""}`}
                      aria-current={i === actual ? "page" : undefined}
                      onClick={() => setIndiceAbierto(false)}
                    >
                      <span className="nav-indice-n">{String(i + 1).padStart(2, "0")}</span>
                      <span className="nav-indice-titulo">{t.titulo}</span>
                      <span className="nav-indice-autor">{t.autor || "—"}</span>
                      <span className="nav-indice-seccion eyebrow">{t.seccion}</span>
                    </Link>
                  </li>
                ))}
              </ol>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </nav>
  );
}
