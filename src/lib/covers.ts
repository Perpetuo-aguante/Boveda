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
 * Las ocho del tianguis. Antes salían del brandbook viradas a claro/oscuro, y
 * el puesto entero quedaba en la misma familia tonal: elegante, pero era un
 * portafolio. Ahora son los cinco colores saturados de la lona —azul, rojo,
 * amarillo, verde y rosa mexicano— más los dos neutros, y los acentos se
 * eligen para CHOCAR con su fondo, no para armonizar: amarillo sobre rosa,
 * rosa sobre azul, verde sobre rosa. Un puesto de verdad no combina.
 *
 * La tinta de cada paleta se mantiene con contraste suficiente para el título
 * de la portada, que es lo único que se lee encima. El cuerpo de los ensayos
 * nunca usa estos colores: para eso están PAPELES_LECTURA, más abajo.
 */
export const PALETAS: Paleta[] = [
  { papel: "#e01b13", tinta: "#ffe9c4", acento: "#ffd100", lomo: "#a20f08", canto: "#f5ead2" },
  { papel: "#1536c4", tinta: "#f4f0dd", acento: "#ef0d7c", lomo: "#0c2189", canto: "#f2ecdb" },
  { papel: "#ffd100", tinta: "#15161a", acento: "#ef0d7c", lomo: "#d4a800", canto: "#f7f1e6" },
  { papel: "#ef0d7c", tinta: "#fff0cf", acento: "#009046", lomo: "#b00a5b", canto: "#f5e9dd" },
  { papel: "#009046", tinta: "#fff0cf", acento: "#ffd100", lomo: "#00642f", canto: "#f2ecdb" },
  { papel: "#15161a", tinta: "#f7f1e6", acento: "#ffd100", lomo: "#000000", canto: "#ede4d3" },
  { papel: "#f7f1e6", tinta: "#15161a", acento: "#e01b13", lomo: "#d5c9b0", canto: "#fffbf2" },
  { papel: "#0b2a9e", tinta: "#ffd100", acento: "#ef0d7c", lomo: "#061a6c", canto: "#f2ecdb" },
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
 * casi negro es agotador. La ficha cambia a papel claro: crema y los colores
 * de la lona rebajados hasta que son papel, para que dé variedad sin pelear
 * con el cuerpo del texto. Nunca los colores saturados de la portada —esos
 * son para mirarse un segundo, no para leer un rato largo encima.
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
    fondo: "#f7f1e6", tinta: "#1b1710", tenue: "#544d3d", tenueMas: "#8a8270",
    linea: "rgba(27, 23, 16, 0.14)", lineaTenue: "rgba(27, 23, 16, 0.07)", acento: "#e01b13",
  },
  // Rosa mexicano, rebajado hasta que sea papel. El acento sí va a tope.
  {
    fondo: "#fdeaf1", tinta: "#2a0a19", tenue: "#6b3149", tenueMas: "#a8798c",
    linea: "rgba(42, 10, 25, 0.14)", lineaTenue: "rgba(42, 10, 25, 0.07)", acento: "#ef0d7c",
  },
  // Azul lona pálido.
  {
    fondo: "#e8edfb", tinta: "#0d1330", tenue: "#3c4570", tenueMas: "#7f88ab",
    linea: "rgba(13, 19, 48, 0.14)", lineaTenue: "rgba(13, 19, 48, 0.07)", acento: "#1536c4",
  },
  // Amarillo pálido — el más cercano al papel de estraza de los cartelitos.
  {
    fondo: "#fdf4d9", tinta: "#241d02", tenue: "#5c5017", tenueMas: "#948a52",
    linea: "rgba(36, 29, 2, 0.14)", lineaTenue: "rgba(36, 29, 2, 0.07)", acento: "#009046",
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
