"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Puesto } from "./puesto";
import type { Articulo } from "@/lib/articles";

/**
 * EL TIANGUIS — la reja de puestos y la cámara.
 *
 * Existe por una sola razón: la transición al texto necesita saber qué puesto
 * se tocó, y eso es estado compartido entre los dieciocho. Un puesto no puede
 * oscurecer a sus vecinos por su cuenta.
 *
 * ────────────────────────────────────────────────────────────────────────────
 * ACERCARSE AL PUESTO
 *
 * Al hacer clic no cambiamos de página: caminamos hacia el puesto. El que se
 * tocó crece y sube en el encuadre —la cámara baja y se aproxima— mientras los
 * demás se apagan y se van hacia atrás. Cuando el gesto termina, recién ahí se
 * navega, así que la ficha entra cuando el ojo ya está encima del objeto.
 *
 * El velo oscuro vive AQUÍ y no dentro del puesto: Motion le escribe un
 * `transform` a cada puesto, y un ancestro con transform se vuelve el bloque
 * contenedor de cualquier `position: fixed` que lleve dentro —el velo se
 * habría posicionado respecto a la tarjeta en vez de respecto a la ventana.
 * ────────────────────────────────────────────────────────────────────────────
 */

/** Lo que se camina antes de navegar. Va un pelo por debajo de los 500ms que
 *  dura el gesto en `puesto.tsx`: así la ficha entra cuando el zoom todavía
 *  tiene inercia, en vez de dejar una pausa muerta al final. */
const DURACION = 470;

export function Tianguis({
  puestos,
}: {
  puestos: Array<{ articulo: Articulo; minutos?: number }>;
}) {
  const router = useRouter();
  const quieto = useReducedMotion();
  const [saliendo, setSaliendo] = useState<string | null>(null);

  function acercarse(slug: string, href: string) {
    // Sin movimiento por preferencia del sistema: se navega y ya.
    if (quieto) {
      router.push(href);
      return;
    }
    if (saliendo) return;
    setSaliendo(slug);
    window.setTimeout(() => router.push(href), DURACION);
  }

  return (
    <>
      <div className="puesto relative">
        {puestos.map(({ articulo, minutos }, i) => (
          <Puesto
            key={articulo.slug}
            articulo={articulo}
            indice={i}
            minutos={minutos}
            acercando={saliendo === articulo.slug}
            alFondo={saliendo !== null && saliendo !== articulo.slug}
            onAcercarse={acercarse}
          />
        ))}
      </div>

      <AnimatePresence>
        {saliendo ? (
          <motion.span
            className="velo-camara"
            aria-hidden
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: DURACION / 1000, ease: "easeIn" }}
          />
        ) : null}
      </AnimatePresence>
    </>
  );
}
