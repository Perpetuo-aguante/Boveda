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

/**
 * Las ocho salen del brandbook: sólo tinta (#15161a), papel (#f7f1e6), añil
 * (#2a55ac) y brasa (#e0552f), viradas a claro/oscuro. Antes había verdes,
 * morados y un ocre que no salían de ahí; el puesto sigue surtido —ninguna
 * paleta se repite entre vecinos— pero ahora cada cuadernillo es
 * reconocibles como Perpetuo incluso tapando el logo.
 */
export const PALETAS: Paleta[] = [
  { papel: "#e0552f", tinta: "#fbeee0", acento: "#f3a67e", lomo: "#b43e20", canto: "#f4ead8" },
  { papel: "#2a55ac", tinta: "#f0f3fa", acento: "#90b3e0", lomo: "#1c3d80", canto: "#f1ecdf" },
  { papel: "#15161a", tinta: "#f7f1e6", acento: "#e0552f", lomo: "#0b0b0d", canto: "#ede4d3" },
  { papel: "#efe4cd", tinta: "#221d12", acento: "#2a55ac", lomo: "#cbbd9a", canto: "#f6f0e2" },
  { papel: "#16305e", tinta: "#eef2f8", acento: "#7c9fd6", lomo: "#0e2145", canto: "#f1ecdf" },
  { papel: "#8a3320", tinta: "#f7e7e0", acento: "#d89572", lomo: "#672414", canto: "#f2e8d9" },
  { papel: "#1c1d21", tinta: "#f2ece0", acento: "#6f97d6", lomo: "#101114", canto: "#ece3d2" },
  { papel: "#e3d0a8", tinta: "#2b2011", acento: "#c9502b", lomo: "#c1af80", canto: "#f6f0e2" },
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

/**
 * Los dos acentos de marca alternan por sección en vez de repetir siempre
 * brasa: Estelar y El Creativo se leen en coral, Anteojos en añil — así el
 * puesto usa las dos tintas del brandbook, no sólo una.
 */
export function claseAcentoSeccion(seccion: string): string {
  return seccion === "Anteojos" ? "text-anil" : seccion === "Sin clasificar" ? "text-tenue" : "text-brasa";
}

/**
 * El papel de lectura. La vitrina del puesto es de noche a propósito —ahí el
 * color vive en las portadas— pero un texto de 4.000 palabras sobre fondo
 * casi negro es agotador. La ficha cambia a papel claro: crema y las dos
 * tintas de marca en versión pálida, para que dé variedad sin pelear con el
 * cuerpo del texto. Nunca colores puros de portada —esos son para mirarse un
 * segundo, no para leer un rato largo encima.
 */
export type PapelLectura = {
  fondo: string;
  tinta: string;
  tenue: string;
  tenueMas: string;
  linea: string;
  lineaTenue: string;
  acento: string;
};

export const PAPELES_LECTURA: PapelLectura[] = [
  // Crema — el papel base, el más neutro de los cuatro.
  {
    fondo: "#f7f1e6", tinta: "#221d12", tenue: "#57503f", tenueMas: "#948c79",
    linea: "rgba(34, 29, 18, 0.13)", lineaTenue: "rgba(34, 29, 18, 0.07)", acento: "#c9502b",
  },
  // Coral pálido.
  {
    fondo: "#f8e9e0", tinta: "#2b1712", tenue: "#6b4b3e", tenueMas: "#a3826f",
    linea: "rgba(43, 23, 18, 0.13)", lineaTenue: "rgba(43, 23, 18, 0.07)", acento: "#c9502b",
  },
  // Verde salvia pálido — el tercer color pide algo que no sea ni papel ni
  // marca directa; un verde apagado, cercano al musgo, hace de puente.
  {
    fondo: "#e9efe1", tinta: "#182417", tenue: "#48573f", tenueMas: "#889478",
    linea: "rgba(24, 36, 23, 0.13)", lineaTenue: "rgba(24, 36, 23, 0.07)", acento: "#3c6b45",
  },
  // Añil pálido.
  {
    fondo: "#e7ecf6", tinta: "#171b2b", tenue: "#454f6e", tenueMas: "#8891ac",
    linea: "rgba(23, 27, 43, 0.13)", lineaTenue: "rgba(23, 27, 43, 0.07)", acento: "#2a55ac",
  },
];

/** Cicla igual que `paletaDe`: por posición, no por hash, así ningún vecino
 *  en anterior/siguiente repite papel. */
export function papelLecturaDe(indice: number): PapelLectura {
  return PAPELES_LECTURA[indice % PAPELES_LECTURA.length];
}

/** Número de motivos disponibles en <Motivo />. */
export const MOTIVOS = 6;

/**
 * Se desplaza el hash para que color y motivo no queden correlacionados, y se
 * suma la "vuelta" de paleta (índice / 8) para que dos cuadernillos que caen
 * en la misma paleta —sólo se repite cada 8 puestos— nunca compartan además
 * el mismo motivo. Sin el `indice`, dos paletas iguales podían salir con el
 * mismo ícono encima: parecían el mismo cuadernillo dos veces.
 */
export function motivoDe(slug: string, indice = 0): number {
  const vuelta = Math.floor(indice / PALETAS.length);
  return ((hash(slug) >>> 3) + vuelta) % MOTIVOS;
}
