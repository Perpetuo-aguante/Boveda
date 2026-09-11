/**
 * Paletas de portada.
 *
 * Al principio el color dependía de la sección, pero con el archivo real eso no
 * funciona: 22 de los 26 textos son Estelares (los lunes), así que el puesto
 * entero saldría del mismo color. La sección se queda como dato —se lee en la
 * ficha— y el color se reparte por hash del slug, que además es lo que se
 * parece a un puesto de verdad: cuadernillos distintos, no una colección
 * uniforme.
 *
 * El reparto es estable entre compilaciones: nada de Math.random, que rompería
 * la hidratación.
 */
export type Paleta = {
  /** Fondo de la portada. */
  papel: string;
  /** Color del texto sobre la portada. */
  tinta: string;
  /** Filetes, motivo y detalles. */
  acento: string;
  /** Fondo del lomo — siempre más profundo que la portada. */
  lomo: string;
  /** Canto de las hojas. Papel, no blanco puro. */
  canto: string;
};

export const PALETAS: Paleta[] = [
  { papel: "#b0432a", tinta: "#fbeee0", acento: "#e8a87c", lomo: "#8a3320", canto: "#f3e9d8" },
  { papel: "#14335c", tinta: "#eef2f8", acento: "#7fa8d8", lomo: "#0e2544", canto: "#f1ecdf" },
  { papel: "#d19a2a", tinta: "#241a08", acento: "#6b4a0e", lomo: "#a8781c", canto: "#f6efdd" },
  { papel: "#1f4536", tinta: "#eaf1e9", acento: "#84b39b", lomo: "#163227", canto: "#f0ecdd" },
  { papel: "#6b2029", tinta: "#f7e7e4", acento: "#c98a86", lomo: "#4f151d", canto: "#f2e8d9" },
  { papel: "#e3d5b7", tinta: "#2b2418", acento: "#8a6c34", lomo: "#c4b492", canto: "#f6f0e2" },
  { papel: "#17151a", tinta: "#f4ede2", acento: "#ff5a36", lomo: "#0c0b0e", canto: "#ece3d2" },
  { papel: "#3c2a52", tinta: "#efe9f5", acento: "#b198d1", lomo: "#2a1c3b", canto: "#f1ebdc" },
];

/** Hash estable de una cadena. */
export function hash(texto: string): number {
  let h = 0;
  for (let i = 0; i < texto.length; i++) {
    h = (h * 31 + texto.charCodeAt(i)) >>> 0;
  }
  return h;
}

/**
 * La paleta se reparte por posición en el archivo, no por hash del slug.
 * Con hash salía a suerte y en la práctica se agrupaba: tres rojos seguidos y
 * ni un ocre en toda la primera fila. Ciclando por índice queda garantizado que
 * ningún vecino repite color y que las ocho paletas aparecen por igual, que es
 * justo lo que hace que un puesto parezca surtido.
 *
 * El precio es que insertar un texto a media lista recolorea los de abajo. Para
 * un puesto de tianguis eso da igual; nadie memoriza de qué color era cada uno.
 */
export function paletaDe(indice: number): Paleta {
  return PALETAS[indice % PALETAS.length];
}

/** Número de motivos disponibles en <Motivo />. */
export const MOTIVOS = 6;

/** Se desplaza el hash para que color y motivo no queden correlacionados. */
export function motivoDe(slug: string): number {
  return (hash(slug) >>> 3) % MOTIVOS;
}
