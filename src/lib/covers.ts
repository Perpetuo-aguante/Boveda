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

/** Hash estable de una cadena. */
export function hash(texto: string): number {
  let h = 0;
  for (let i = 0; i < texto.length; i++) {
    h = (h * 31 + texto.charCodeAt(i)) >>> 0;
  }
  return h;
}

/**
 * LA PORTADA SALE DE LA LONA, Y ESO NO ES UN DETALLE.
 *
 * Antes había dos tablas de color independientes: una para las lonas del
 * puesto y otra para las portadas de la ficha. Con la transición de cámara eso
 * se volvió un error visible —caminabas hacia una lona azul y llegabas a un
 * cuadernillo rosa—, porque el mismo texto tenía dos colores según dónde lo
 * mirabas. Ahora la lona es la única fuente: el objeto que se ve de cerca es
 * el mismo que estaba en la mesa, y el acercamiento se lee como continuo.
 *
 * El canto es lo único que no viene de la lona: son las hojas, y las hojas son
 * de papel en todos los casos. Se alterna un poco para que dos cuadernillos
 * vecinos no tengan el corte idéntico.
 *
 * Se reparte por posición y no por hash del slug: con hash salía a suerte y en
 * la práctica se agrupaba —tres rojos seguidos y ni un amarillo en toda la
 * primera fila—. Ciclando queda garantizado que ningún vecino repite.
 */
const CANTOS = ["#f5ead2", "#f2ecdb", "#f7f1e6", "#f5e9dd", "#ede4d3", "#fffbf2"];

export function paletaDe(indice: number): Paleta {
  const l = lonaDe(indice);
  return {
    papel: l.tela,
    tinta: l.tinta,
    acento: l.acento,
    lomo: l.costura,
    canto: CANTOS[indice % CANTOS.length],
  };
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

/**
 * LAS LONAS DEL PUESTO
 *
 * La portada del cuadernillo y la lona del puesto son dos cosas distintas y
 * por eso tienen tablas distintas: la portada es un objeto de papel que se
 * mira de cerca en la ficha, y la lona es tela de plástico tensada que se ve
 * de lejos y en fila.
 *
 * Cada lona lleva su propia `sombra`, que no es negra: es un tono más hondo de
 * su propio color. Una sombra dura negra sobre azul lona no se lee como
 * sombra, se lee como un agujero.
 */
export type Lona = {
  /** El color de la tela. */
  tela: string;
  /** La costura y el dobladillo: un paso más oscuro que la tela. */
  costura: string;
  /** La tinta del rótulo. */
  tinta: string;
  /** El acento: ojales, filetes, la sección. */
  acento: string;
  /** El color de la sombra dura a 45°. */
  sombra: string;
};

export const LONAS: Lona[] = [
  { tela: "#1536c4", costura: "#0c2189", tinta: "#fff6dc", acento: "#ffd100", sombra: "#08165c" },
  { tela: "#e01b13", costura: "#a20f08", tinta: "#fff2d2", acento: "#ffd100", sombra: "#6d0a04" },
  { tela: "#ffd100", costura: "#d4a800", tinta: "#15161a", acento: "#ef0d7c", sombra: "#8a6c00" },
  { tela: "#009046", costura: "#00642f", tinta: "#fff4d8", acento: "#ffd100", sombra: "#004a23" },
  { tela: "#ef0d7c", costura: "#b00a5b", tinta: "#fff0cf", acento: "#ffd100", sombra: "#75063c" },
  { tela: "#15161a", costura: "#000000", tinta: "#f7f1e6", acento: "#ffd100", sombra: "#000000" },
];

/** Cicla por posición, igual que las portadas: ningún vecino repite lona. */
export function lonaDe(indice: number): Lona {
  return LONAS[indice % LONAS.length];
}

/** Número de motivos disponibles en <Motivo />. */
export const MOTIVOS = 6;

/**
 * Se desplaza el hash para que color y motivo no queden correlacionados, y se
 * suma la "vuelta" de lona para que dos cuadernillos que caen en el mismo
 * color —se repite cada seis— nunca compartan además el mismo motivo. Sin el
 * `indice`, dos lonas iguales podían salir con el mismo ícono encima:
 * parecían el mismo cuadernillo dos veces.
 */
export function motivoDe(slug: string, indice = 0): number {
  const vuelta = Math.floor(indice / LONAS.length);
  return ((hash(slug) >>> 3) + vuelta) % MOTIVOS;
}
