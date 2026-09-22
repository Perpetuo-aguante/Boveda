"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import type { CSSProperties } from "react";
import { lonaDe } from "@/lib/covers";
import { anioDe, type Articulo } from "@/lib/articles";

/**
 * UN PUESTO DEL TIANGUIS
 *
 * Una lona con el título rotulado encima y un cartelito de cartón colgando con
 * el copete. Nada va quemado en una imagen: la foto, cuando existe, es sólo
 * fondo, y todo el texto es HTML —así se puede añadir un texto nuevo sin
 * regenerar nada.
 *
 * ────────────────────────────────────────────────────────────────────────────
 * POR QUÉ EL DESORDEN SALE DEL ÍNDICE Y NO DE Math.random
 *
 * El servidor pinta el HTML una vez y el navegador lo rehidrata. Si el giro
 * saliera de Math.random, las dos pasadas darían números distintos y los
 * puestos brincarían de golpe al hidratar. Derivándolo del índice, el mismo
 * puesto cae siempre en el mismo ángulo y el desorden es estable.
 *
 * Los multiplicadores son primos que no comparten periodo con el número de
 * columnas del grid (2 a 5 según el ancho), para que no se formen diagonales
 * ni filas que repitan el mismo ángulo.
 * ────────────────────────────────────────────────────────────────────────────
 *
 * LA FÍSICA DEL HOVER
 *
 * Todo entra por resorte, no por transición lineal: un puesto tiene peso.
 *   · se levanta Y se endereza a la vez —como cuando acomodas algo en la mesa
 *   · la sombra dura crece y se DESPLAZA, no sólo se oscurece
 *   · un foco cálido aparece encima, como si le pegara el sol al alzar la lona
 *   · el cartelito llega 50 ms tarde: eso es lo que se siente como peso
 *   · cada puesto gira distinto y escala distinto; nada uniforme
 */

const RESORTE = { type: "spring" as const, stiffness: 320, damping: 26, mass: 0.9 };
const RESORTE_CARTEL = { type: "spring" as const, stiffness: 260, damping: 20, mass: 1, delay: 0.05 };
/* El acercamiento no es un resorte: un resorte rebota al llegar, y aquí no
   llegamos —seguimos hacia el texto—. Va en un ease-in, porque caminar hacia
   algo lo hace crecer cada vez más rápido.
   Medido: con una curva más cargada al final ([0.5,0,0.75,0.2]) a mitad del
   gesto sólo se había recorrido el 12% del zoom, y eso no se lee como
   acercarse —se lee como un salto al final. */
const ACERCAMIENTO = { duration: 0.5, ease: [0.42, 0, 1, 1] as const };

/** El reposo y el destino de cada puesto, derivados de su posición. */
function gestoDe(indice: number) {
  const i = indice + 1;
  return {
    // Reposo: entre -3.2° y +3.2°, saltando de signo para que dos vecinos
    // nunca se inclinen igual.
    giro: (((i * 7) % 13) - 6) * 0.53,
    // Asiento: hasta 16px. Un tianguis se acumula, no se alinea.
    asiento: ((i * 11) % 17) - 8,
    // Al levantarlo no se endereza del todo: queda un residuo propio, porque
    // una mano tampoco deja nada perfecto.
    giroAlzado: (((i * 5) % 7) - 3) * 0.18,
    // Cada uno crece distinto.
    escala: 1.035 + (((i * 3) % 5) * 0.011),
    // Y se levanta distinto.
    alza: -14 - ((i * 13) % 9),
  };
}

export function Puesto({
  articulo,
  indice,
  minutos,
  acercando = false,
  alFondo = false,
  onAcercarse,
}: {
  articulo: Articulo;
  indice: number;
  /** Minutos de lectura, contados en el servidor. Es el «precio» del puesto:
   *  lo que el cartelito dice cuando el texto no trae copete. */
  minutos?: number;
  /** Este es el puesto al que nos estamos acercando. */
  acercando?: boolean;
  /** Otro puesto se llevó la cámara: este se apaga y se va atrás. */
  alFondo?: boolean;
  onAcercarse?: (slug: string, href: string) => void;
}) {
  const quieto = useReducedMotion();
  const g = gestoDe(indice);
  const lona = lonaDe(indice);
  const conFoto = Boolean(articulo.imagen);

  const vars = {
    "--lona": lona.tela,
    "--lona-honda": lona.costura,
    "--lona-tinta": lona.tinta,
    "--lona-acento": lona.acento,
    // La sombra dura de una lona no es negra: es un tono más hondo de su
    // propio color. Un negro puro sobre azul lona abre un hoyo.
    "--dura-color": lona.sombra,
    // El escalón de entrada: cada puesto aparece un poco después del anterior,
    // como si alguien los fuera acomodando de izquierda a derecha.
    transitionDelay: `${Math.min(indice, 11) * 55}ms`,
  } as CSSProperties;

  const seccion = articulo.seccion === "Sin clasificar" ? "Por clasificar" : articulo.seccion;

  const href = `/articulo/${articulo.slug}`;

  // El estado manda sobre el hover: si ya vamos caminando hacia un puesto, el
  // ratón deja de tener voz.
  const estado = acercando ? "acercando" : alFondo ? "alFondo" : "reposo";

  return (
    <div
      className={`puesto-celda aparece${acercando ? " puesto-celda--acercando" : ""}`}
      style={vars}
    >
      {/* Las variantes van por NOMBRE, no por objeto: así el padre las
          propaga a la sombra, al foco y al cartelito, y cada hijo les pone su
          propio tiempo. Con objetos inline no se propagarían y el cartelito
          nunca llegaría tarde. */}
      <motion.div
        className="puesto-pila"
        initial="reposo"
        animate={estado}
        whileHover={quieto || acercando || alFondo ? undefined : "alzado"}
        whileFocus={quieto || acercando || alFondo ? undefined : "alzado"}
        whileTap={quieto || acercando ? undefined : { scale: 0.99 }}
        variants={{
          reposo: { rotate: g.giro, y: g.asiento, scale: 1, opacity: 1 },
          alzado: { rotate: g.giroAlzado, y: g.asiento + g.alza, scale: g.escala, opacity: 1 },
          // La cámara baja y se aproxima: el puesto crece y sube en el
          // encuadre, y se endereza del todo porque ya lo tenemos de frente.
          acercando: { rotate: 0, y: -72, scale: 2.35, opacity: 1 },
          // Los demás se van hacia atrás y se apagan.
          alFondo: { rotate: g.giro, y: g.asiento, scale: 0.94, opacity: 0.25 },
        }}
        transition={acercando ? ACERCAMIENTO : RESORTE}
      >
        {/* El foco cálido: el sol que entra al alzar la lona. */}
        <motion.span
          className="foco-puesto"
          aria-hidden
          variants={{ reposo: { opacity: 0 }, alzado: { opacity: 1 } }}
          transition={{ duration: 0.34, ease: "easeOut" }}
        />

        {/* La sombra dura vive en su propia capa y no en box-shadow del enlace:
            así puede crecer y DESPLAZARSE por resorte mientras la lona hace su
            propio giro, sin que los dos transforms se peleen. */}
        <motion.span
          className="sombra-dura"
          aria-hidden
          variants={{
            reposo: { x: 6, y: 6, opacity: 0.95 },
            alzado: { x: 16, y: 21, opacity: 1 },
          }}
          transition={RESORTE}
        />

        <Link
          href={href}
          className="lona-puesto"
          aria-label={`Abrir «${articulo.titulo}»${articulo.autor ? `, de ${articulo.autor}` : ""}`}
          onClick={(e) => {
            // Ctrl/cmd/shift/medio: es «abrir en otra pestaña». No se toca,
            // porque interceptarlo rompería una expectativa del navegador.
            if (!onAcercarse || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) {
              return;
            }
            e.preventDefault();
            onAcercarse(articulo.slug, href);
          }}
        >
          {conFoto ? (
            <span className="lona-foto" aria-hidden>
              <Image
                src={articulo.imagen}
                alt=""
                fill
                sizes="(max-width: 640px) 46vw, (max-width: 1024px) 30vw, 260px"
                priority={indice < 5}
                style={{ objectFit: "cover" }}
              />
            </span>
          ) : null}

          <span className="lona-ojal" aria-hidden />

          {/* La sección va en el acento de SU lona, no en el color de marca de
              la sección: el rojo de Estelar sobre azul lona no se leía, y el
              añil de Anteojos sobre azul desaparecía. El color aquí lo manda
              la tela, y la sección la dice la palabra. */}
          <span className="lona-seccion eyebrow">{seccion}</span>

          {/* El rótulo. Texto real, nunca dentro de una imagen. */}
          <span className="lona-titulo display">{articulo.titulo}</span>

          <span className="lona-pie">
            {articulo.autor ? <span className="lona-autor">{articulo.autor}</span> : <span />}
            <span className="lona-fecha">
              {anioDe(articulo) || "—"}
              {articulo.acceso === "suscriptores" ? (
                <span title="Sólo para suscriptores" aria-label="Sólo para suscriptores">
                  {" ◆"}
                </span>
              ) : null}
            </span>
          </span>
        </Link>

        {/* El cartelito de cartón. Llega 50 ms después que la lona: peso. */}
        <motion.span
          className="cartelito"
          variants={{
            reposo: { rotate: -g.giro * 1.5 - 1.4, y: 0, opacity: 1 },
            alzado: { rotate: -g.giro * 0.5, y: 5, opacity: 1 },
            // Al acercarnos el cartelito se queda atrás y se va: es el letrero
            // del puesto, no lo que venimos a leer.
            acercando: { rotate: -g.giro * 1.5 - 1.4, y: 14, opacity: 0 },
            alFondo: { rotate: -g.giro * 1.5 - 1.4, y: 0, opacity: 1 },
          }}
          transition={RESORTE_CARTEL}
        >
          <span className="cartelito-alambre" aria-hidden />
          {/* El cartelito nunca repite lo que ya dice la lona. Si el texto
              trae copete, va el copete; si no, va el tiempo de lectura, que
              es el precio del puesto y el único dato que la lona no lleva.
              Antes caía al nombre del autor y salía dos veces en el mismo
              puesto, en nueve de los dieciocho. */}
          <span className="cartelito-texto cartelito-letra">
            {articulo.resumen || (minutos ? `${minutos} min de lectura` : seccion)}
          </span>
        </motion.span>
      </motion.div>
    </div>
  );
}
