/**
 * EL ARCHIVO — el índice de La Bóveda.
 *
 * Una entrada por texto. De aquí salen el puesto, el índice, las fichas, el
 * sitemap y los enlaces anterior/siguiente. El orden del array manda.
 *
 * ────────────────────────────────────────────────────────────────────────────
 * QUÉ FALTA (estado actual)
 *
 * Los 26 textos son reales: título, fecha, sección y acceso salen de la
 * exportación de Substack. Lo que está en blanco está en blanco a propósito,
 * porque no se puede inventar:
 *
 *   autor    — no venía en la exportación.
 *   resumen  — la línea que acompaña al cuadernillo en el puesto.
 *   porQue   — por qué ese texto está en la bóveda.
 *   imagen   — la foto de portada, en /public/portadas/<slug>.(jpg|webp).
 *   url      — sólo se conocen tres; Substack recorta los slugs y el resto no
 *              se puede adivinar sin abrir cada post.
 *
 * El cuerpo completo NO vive aquí: cada texto va en `contenido/<slug>.md`.
 * Ver `contenido/README.md`. La ficha muestra el texto en cuanto aparece el
 * archivo; mientras no exista, enseña lo que haya y ya.
 *
 * La sección sale del calendario editorial (lunes = Estelar, miércoles =
 * Anteojos, viernes = El Creativo), igual que en Analytics. Los tres «3,2,1»
 * caen en viernes y por eso son El Creativo.
 * ────────────────────────────────────────────────────────────────────────────
 */
import { SECCIONES, type Seccion, type Acceso } from "./articulos-tipos";

export { SECCIONES };
export type { Seccion, Acceso };

export type Articulo = {
  /** Identificador en la URL: /articulo/<slug>. */
  slug: string;
  titulo: string;
  /** Vacío mientras no se sepa; la portada y la ficha lo omiten sin romperse. */
  autor: string;
  /** ISO corta, "2026-04-13". Vacía si no se conoce. */
  fecha: string;
  seccion: Seccion;
  acceso: Acceso;
  /** Enlace al original en perpetuo.global. Vacío si no se conoce. */
  url: string;
  /** Ruta bajo /public, p. ej. "/portadas/casa-de-rescate.jpg". */
  imagen: string;
  /** Una línea. Es lo que se revela al pasar por encima del cuadernillo. */
  resumen: string;
  /** Uno o dos párrafos: por qué está en la bóveda. Se lee en la ficha. */
  porQue: string;
  /** Cita textual opcional, sólo si está verificada palabra por palabra. */
  cita?: string;
  /** Quién lo trajo a la bóveda. */
  curador?: string;
};

export const articulos: Articulo[] = [
  {
    slug: "anuncio-ganadores-del-concurso-de-ensayos",
    titulo: "ANUNCIO: Ganadores del concurso de ensayos",
    autor: "",
    fecha: "2026-08-03",
    seccion: "Estelar",
    acceso: "abierto",
    url: "",
    imagen: "",
    resumen: "",
    porQue: "",
  },
  {
    slug: "gestar-a-un-hijo-ajeno",
    titulo: "Gestar a un hijo ajeno",
    autor: "",
    fecha: "2026-06-29",
    seccion: "Estelar",
    acceso: "suscriptores",
    url: "",
    imagen: "",
    resumen: "",
    porQue: "",
  },
  {
    slug: "para-contar-una-historia-de-aventuras",
    titulo: "Para contar una historia de aventuras",
    autor: "",
    fecha: "2026-06-22",
    seccion: "Estelar",
    acceso: "suscriptores",
    url: "",
    imagen: "",
    resumen: "",
    porQue: "",
  },
  {
    slug: "la-ternura-no-ha-fracasado",
    titulo: "La ternura no ha fracasado",
    autor: "",
    fecha: "2026-06-01",
    seccion: "Estelar",
    acceso: "suscriptores",
    url: "",
    imagen: "",
    resumen: "",
    porQue: "",
  },
  {
    slug: "mon-president",
    titulo: "Mon Président",
    autor: "",
    fecha: "2026-05-25",
    seccion: "Estelar",
    acceso: "suscriptores",
    url: "",
    imagen: "",
    resumen: "",
    porQue: "",
  },
  {
    slug: "noche-de-latex",
    titulo: "Noche de látex",
    autor: "",
    fecha: "2026-05-18",
    seccion: "Estelar",
    acceso: "suscriptores",
    url: "",
    imagen: "",
    resumen: "",
    porQue: "",
  },
  {
    slug: "casa-de-rescate",
    titulo: "Casa de rescate",
    autor: "",
    fecha: "2026-05-04",
    seccion: "Estelar",
    acceso: "suscriptores",
    url: "",
    imagen: "",
    resumen: "",
    porQue: "",
  },
  {
    slug: "dos-formas-de-narrar-la-violencia",
    titulo: "Dos formas de narrar la violencia",
    autor: "",
    fecha: "2026-04-27",
    seccion: "Estelar",
    acceso: "suscriptores",
    url: "https://www.perpetuo.global/p/dos-formas-de-narrar-la-violencia",
    imagen: "",
    resumen: "",
    porQue: "",
  },
  {
    slug: "yo-fui-el-guardaespaldas-de-camilo-torres",
    titulo: "Yo fui el guardaespaldas de Camilo Torres",
    autor: "",
    fecha: "2026-04-13",
    seccion: "Estelar",
    acceso: "suscriptores",
    url: "https://www.perpetuo.global/p/yo-fui-el-guardaespaldas-de-camilo",
    imagen: "",
    resumen: "",
    porQue: "",
  },
  {
    slug: "buscando-a-la-michoacana",
    titulo: "Buscando a La Michoacana",
    autor: "",
    fecha: "2026-04-06",
    seccion: "Estelar",
    acceso: "suscriptores",
    url: "",
    imagen: "",
    resumen: "",
    porQue: "",
  },
  {
    slug: "la-constante-insatisfaccion-de-no-aparecer-en-wikipedia",
    titulo: "La constante insatisfacción de no aparecer en Wikipedia",
    autor: "",
    fecha: "2026-03-30",
    seccion: "Estelar",
    acceso: "suscriptores",
    url: "",
    imagen: "",
    resumen: "",
    porQue: "",
  },
  {
    slug: "las-siete-vidas-de-el-mencho",
    titulo: "Las siete vidas de El Mencho",
    autor: "",
    fecha: "2026-03-23",
    seccion: "Estelar",
    acceso: "suscriptores",
    url: "",
    imagen: "",
    resumen: "",
    porQue: "",
  },
  {
    slug: "de-bielorrusia-con-amor",
    titulo: "De Bielorrusia con amor",
    autor: "",
    fecha: "2026-03-16",
    seccion: "Estelar",
    acceso: "suscriptores",
    url: "",
    imagen: "",
    resumen: "",
    porQue: "",
  },
  {
    slug: "el-mundo-nos-paso-de-largo",
    titulo: "El mundo nos pasó de largo",
    autor: "",
    fecha: "2026-03-02",
    seccion: "Estelar",
    acceso: "suscriptores",
    url: "",
    imagen: "",
    resumen: "",
    porQue: "",
  },
  {
    slug: "castillos-en-la-tierra",
    titulo: "Castillos en la tierra",
    autor: "",
    fecha: "2026-02-23",
    seccion: "Estelar",
    acceso: "suscriptores",
    url: "",
    imagen: "",
    resumen: "",
    porQue: "",
  },
  {
    slug: "3-2-1-febrero-20-2026",
    titulo: "3,2,1 - Febrero 20, 2026",
    autor: "",
    fecha: "2026-02-20",
    seccion: "El Creativo",
    acceso: "abierto",
    url: "",
    imagen: "",
    resumen: "",
    porQue: "",
  },
  {
    slug: "el-pais-de-los-secretos",
    titulo: "El país de los secretos",
    autor: "",
    fecha: "2026-02-16",
    seccion: "Estelar",
    acceso: "abierto",
    url: "",
    imagen: "",
    resumen: "",
    porQue: "",
  },
  {
    slug: "cuando-leer-mucho-no-significa-leer-mejor",
    titulo: "Cuando leer mucho no significa leer mejor",
    autor: "",
    fecha: "2026-02-09",
    seccion: "Estelar",
    acceso: "suscriptores",
    url: "",
    imagen: "",
    resumen: "",
    porQue: "",
  },
  {
    slug: "3-2-1-febrero-6-2026",
    titulo: "3,2,1 - Febrero 6, 2026",
    autor: "",
    fecha: "2026-02-06",
    seccion: "El Creativo",
    acceso: "abierto",
    url: "",
    imagen: "",
    resumen: "",
    porQue: "",
  },
  {
    slug: "ganadores-del-concurso-de-cuentos",
    titulo: "Ganadores del concurso de cuentos",
    autor: "",
    fecha: "2026-02-02",
    seccion: "Estelar",
    acceso: "abierto",
    url: "",
    imagen: "",
    resumen: "",
    porQue: "",
  },
  {
    slug: "relatos-de-la-frontera",
    titulo: "Relatos de la frontera",
    autor: "",
    fecha: "2026-01-26",
    seccion: "Estelar",
    acceso: "abierto",
    url: "",
    imagen: "",
    resumen: "",
    porQue: "",
  },
  {
    slug: "morrison-gorbachov-y-lo-que-se-nos-perdio-en-el-camino",
    titulo: "Morrison, Gorbachov y lo que se nos perdió en el camino",
    autor: "",
    fecha: "2026-01-19",
    seccion: "Estelar",
    acceso: "abierto",
    url: "",
    imagen: "",
    resumen: "",
    porQue: "",
  },
  {
    slug: "sobre-ser-ceo-a-los-16-anos",
    titulo: "Sobre ser CEO a los 16 años",
    autor: "",
    fecha: "2026-01-12",
    seccion: "Estelar",
    acceso: "abierto",
    url: "",
    imagen: "",
    resumen: "",
    porQue: "",
  },
  {
    slug: "3-2-1-enero-9-2026",
    titulo: "3,2,1 - Enero 9, 2026",
    autor: "",
    fecha: "2026-01-09",
    seccion: "El Creativo",
    acceso: "abierto",
    url: "",
    imagen: "",
    resumen: "",
    porQue: "",
  },
  {
    slug: "el-palacio-negro",
    titulo: "El palacio negro",
    autor: "",
    fecha: "2026-01-05",
    seccion: "Estelar",
    acceso: "suscriptores",
    url: "",
    imagen: "",
    resumen: "",
    porQue: "",
  },
  {
    slug: "noticias-de-otro-gran-secuestro",
    titulo: "Noticias de otro gran secuestro",
    autor: "",
    fecha: "",
    seccion: "Sin clasificar",
    acceso: "abierto",
    url: "https://www.perpetuo.global/p/noticias-de-otro-gran-secuestro",
    imagen: "",
    resumen: "",
    porQue: "",
  },
];

export function buscarArticulo(slug: string): Articulo | undefined {
  return articulos.find((a) => a.slug === slug);
}

/** El año, para las portadas y el índice. Cadena vacía si no hay fecha. */
export function anioDe(a: Articulo): string {
  return a.fecha ? a.fecha.slice(0, 4) : "";
}

const MESES = [
  "enero", "febrero", "marzo", "abril", "mayo", "junio",
  "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
];

/** "13 de abril de 2026". Se formatea a mano para no depender de la zona
 *  horaria del servidor: `new Date("2026-04-13")` se interpreta en UTC y en
 *  México puede retroceder un día. */
export function fechaLarga(fecha: string): string {
  if (!fecha) return "";
  const [a, m, d] = fecha.split("-");
  const mes = MESES[Number(m) - 1];
  if (!mes) return fecha;
  return `${Number(d)} de ${mes} de ${a}`;
}

/** Secciones realmente usadas, en el orden canónico. */
export function seccionesEnUso(): Seccion[] {
  return SECCIONES.filter((s) => articulos.some((a) => a.seccion === s));
}
