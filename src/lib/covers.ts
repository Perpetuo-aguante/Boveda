import type { Seccion } from "./articulos-tipos";

/**
 * La paleta de cada cuadernillo depende de su sección, para que la estantería
 * se lea de un vistazo. Se mezclan portadas claras y oscuras a propósito: una
 * estantería real nunca es monocroma.
 */
export type Paleta = {
  /** Fondo de la portada. */
  papel: string;
  /** Color del texto sobre la portada. */
  tinta: string;
  /** Filetes, número y detalles. */
  acento: string;
  /** Fondo del lomo — siempre un tono más profundo que la portada. */
  lomo: string;
  /** Canto de las hojas. Papel, no blanco puro. */
  canto: string;
};

export const PALETAS: Record<Seccion, Paleta> = {
  "Crónica": {
    papel: "#b0432a",
    tinta: "#fbeee0",
    acento: "#e8a87c",
    lomo: "#8a3320",
    canto: "#f3e9d8",
  },
  "Ensayo": {
    papel: "#14335c",
    tinta: "#eef2f8",
    acento: "#7fa8d8",
    lomo: "#0e2544",
    canto: "#f1ecdf",
  },
  "Perfil": {
    papel: "#d19a2a",
    tinta: "#241a08",
    acento: "#6b4a0e",
    lomo: "#a8781c",
    canto: "#f6efdd",
  },
  "Literatura": {
    papel: "#1f4536",
    tinta: "#eaf1e9",
    acento: "#84b39b",
    lomo: "#163227",
    canto: "#f0ecdd",
  },
  "Reportaje": {
    papel: "#6b2029",
    tinta: "#f7e7e4",
    acento: "#c98a86",
    lomo: "#4f151d",
    canto: "#f2e8d9",
  },
  "Discurso": {
    papel: "#e3d5b7",
    tinta: "#2b2418",
    acento: "#8a6c34",
    lomo: "#c4b492",
    canto: "#f6f0e2",
  },
  "Manifiesto": {
    papel: "#17151a",
    tinta: "#f4ede2",
    acento: "#ff5a36",
    lomo: "#0c0b0e",
    canto: "#ece3d2",
  },
};

/**
 * Hash estable de un slug. Sirve para repartir los motivos de portada sin que
 * cambien entre compilaciones (nada de Math.random: rompería la hidratación).
 */
export function hash(slug: string): number {
  let h = 0;
  for (let i = 0; i < slug.length; i++) {
    h = (h * 31 + slug.charCodeAt(i)) >>> 0;
  }
  return h;
}

/** Número de motivos disponibles en <Motivo />. */
export const MOTIVOS = 6;

export function motivoDe(slug: string): number {
  return hash(slug) % MOTIVOS;
}
