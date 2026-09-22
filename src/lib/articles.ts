/**
 * EL ARCHIVO — el índice de La Bóveda.
 *
 * Una entrada por texto. De aquí salen el puesto, el índice, las fichas, el
 * sitemap y los enlaces anterior/siguiente. El orden del array manda.
 *
 * ────────────────────────────────────────────────────────────────────────────
 * QUÉ FALTA (estado actual)
 *
 * Los 18 textos de aquí son los que Tomás subió directamente —un PDF por
 * texto, en Bóveda/ y Bóveda/Covers/ del disco externo—, no la semilla
 * original de 26 que traía el repo. Cada uno tiene su `contenido/<slug>.md`
 * completo. Lo que sigue en blanco sigue en blanco a propósito, porque no se
 * puede inventar:
 *
 *   resumen  — se llenó donde el PDF traía subtítulo propio de Substack.
 *   porQue   — por qué ese texto está en la bóveda; pendiente de criterio
 *              editorial, no de dato.
 *   imagen   — sólo cinco tienen foto de portada real (ver Covers/); el resto
 *              usa la portada geométrica generada.
 *   url      — sólo se conoce uno; el resto no se puede adivinar sin abrir
 *              cada post en perpetuo.global.
 *
 * Siete de los dieciocho son poesía y llevan `forma: "verso"`, que le dice al
 * lector que conserve los versos en vez de rejuntarlos en párrafos. Se detectan
 * por la forma del .md: un texto con 34 bloques de 7 palabras cada uno es un
 * poema, no una crónica —así apareció «Fondo de Anáhuac», que estaba pasando
 * por prosa.
 *
 * El cuerpo completo NO vive aquí: cada texto va en `contenido/<slug>.md`.
 * Ver `contenido/README.md`.
 *
 * La sección sale del calendario editorial (lunes = Estelar, miércoles =
 * Anteojos, viernes = El Creativo), leído de la fecha real del PDF. Cuando la
 * fecha no cae en ninguno de los tres días —los tres poemas del 1 de enero y
 * el de Rosa Berbel, todos en jueves— la sección queda «Sin clasificar» en vez
 * de adivinar. La regla se validó sola: los dos textos cuyo cuerpo declara su
 * sección («volumen VI de El creativo», «el texto estelar de esta semana»)
 * caen exactamente en el día que les toca.
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
  /** "verso" para poesía: conserva los versos en vez de rejuntarlos en
   *  párrafos. La prosa no necesita declarar nada. */
  forma?: "verso";
  /** Cita textual opcional, sólo si está verificada palabra por palabra. */
  cita?: string;
  /** Quién lo trajo a la bóveda. */
  curador?: string;
};

export const articulos: Articulo[] = [
  {
    slug: "denuncia-vecinal",
    titulo: "Denuncia vecinal",
    autor: "David Blanc",
    fecha: "2026-08-21",
    seccion: "El Creativo",
    acceso: "abierto",
    url: "",
    imagen: "/portadas/denuncia-vecinal.jpg",
    resumen: "",
    porQue: "",
  },
  {
    slug: "anuncio-ganadores-del-concurso-de-ensayos",
    titulo: "ANUNCIO: Ganadores del concurso de ensayos",
    autor: "",
    fecha: "2026-08-03",
    seccion: "Estelar",
    acceso: "abierto",
    url: "",
    imagen: "/portadas/anuncio-ganadores-del-concurso-de-ensayos.jpg",
    resumen: "Primer Concurso de Ensayos Perpetuo.",
    porQue: "",
  },
  {
    slug: "la-ternura-no-ha-fracasado",
    titulo: "La ternura no ha fracasado",
    autor: "Luna Miguel",
    fecha: "2026-06-01",
    seccion: "Estelar",
    acceso: "suscriptores",
    url: "",
    imagen: "",
    resumen: "Lo que aprendí sobre la belleza viendo 1,155 capítulos de One Piece con mi hijo.",
    porQue: "",
  },
  {
    slug: "mon-president",
    titulo: "Mon Président",
    autor: "Franca Levin",
    fecha: "2026-05-25",
    seccion: "Estelar",
    acceso: "suscriptores",
    url: "",
    imagen: "",
    resumen: "El Burkina Faso de Ibrahim Traoré.",
    porQue: "",
  },
  {
    slug: "noticias-de-otro-gran-secuestro",
    titulo: "Noticias de otro gran secuestro",
    autor: "Sebastián Hoyos",
    fecha: "2026-05-11",
    seccion: "Estelar",
    acceso: "abierto",
    url: "https://www.perpetuo.global/p/noticias-de-otro-gran-secuestro",
    imagen: "",
    resumen:
      "A 30 años de lo ocurrido con Juan Carlos Gaviria, hermano del expresidente, se conocen nuevas verdades y confesiones.",
    porQue: "",
  },
  {
    slug: "fondo-de-anahuac",
    titulo: "Fondo de Anáhuac",
    autor: "Tomás Lemus",
    fecha: "2026-04-17",
    seccion: "El Creativo",
    acceso: "abierto",
    url: "",
    imagen: "/portadas/fondo-de-anahuac.jpg",
    resumen: "",
    porQue: "",
    forma: "verso",
  },
  {
    slug: "kairos",
    titulo: "Kairos",
    autor: "David Rubiano",
    fecha: "2026-04-03",
    seccion: "El Creativo",
    acceso: "abierto",
    url: "",
    imagen: "/portadas/kairos.jpg",
    resumen: "",
    porQue: "",
    forma: "verso",
  },
  {
    slug: "seleccion-de-poemas",
    titulo: "Selección de poemas",
    autor: "Samuel Lundy",
    fecha: "2026-03-20",
    seccion: "El Creativo",
    acceso: "abierto",
    url: "",
    imagen: "",
    resumen: "",
    porQue: "",
    forma: "verso",
  },
  {
    slug: "la-trampa",
    titulo: "La trampa",
    autor: "Aldo Yahuaca",
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
    autor: "Federico Perelmuter",
    fecha: "2026-02-16",
    seccion: "Estelar",
    acceso: "abierto",
    url: "",
    imagen: "",
    resumen: "Recuerdos del Paraguay.",
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
    resumen: "Edición 2025-26.",
    porQue: "",
  },
  {
    slug: "sobre-ser-ceo-a-los-16-anos",
    titulo: "Sobre ser CEO a los 16 años",
    autor: "Brunella Tipismana",
    fecha: "2026-01-12",
    seccion: "Estelar",
    acceso: "abierto",
    url: "",
    imagen: "",
    resumen: "Notas sobre la nueva meritocracia adolescente.",
    porQue: "",
  },
  {
    slug: "el-palacio-negro",
    titulo: "El palacio negro",
    autor: "Mateo Garcia Elizondo",
    fecha: "2026-01-05",
    seccion: "Estelar",
    acceso: "suscriptores",
    url: "",
    imagen: "",
    resumen: "Cultos y santería moderna en México.",
    porQue: "",
  },
  {
    slug: "alegoria-en-suenos",
    titulo: "Alegoría en sueños",
    autor: "Angelo Chacón Sequeira",
    fecha: "2026-01-01",
    seccion: "Sin clasificar",
    acceso: "abierto",
    url: "",
    imagen: "/portadas/alegoria-en-suenos.jpg",
    resumen: "",
    porQue: "",
    forma: "verso",
  },
  {
    slug: "machin",
    titulo: "Machín",
    autor: "Cielo Uscanga",
    fecha: "2026-01-01",
    seccion: "Sin clasificar",
    acceso: "abierto",
    url: "",
    imagen: "",
    resumen: "",
    porQue: "",
    forma: "verso",
  },
  {
    slug: "mexico-toluca",
    titulo: "México-Toluca",
    autor: "Ana Victoria Guevara",
    fecha: "2026-01-01",
    seccion: "Sin clasificar",
    acceso: "abierto",
    url: "",
    imagen: "",
    resumen: "",
    porQue: "",
    forma: "verso",
  },
  {
    slug: "un-pais-de-lineas-rectas",
    titulo: "[Un país de líneas rectas]",
    autor: "Rosa Berbel",
    fecha: "2025-11-20",
    seccion: "Sin clasificar",
    acceso: "abierto",
    url: "",
    imagen: "",
    resumen: "",
    porQue: "",
    forma: "verso",
  },
  {
    slug: "dialogos-por-la-modernidad",
    titulo: "Diálogos por la modernidad",
    autor: "Alonso Millet",
    fecha: "2025-08-22",
    seccion: "El Creativo",
    acceso: "abierto",
    url: "",
    imagen: "",
    resumen: "Era martes por la tarde, casi las cuatro, cuando discutía con Ernesto.",
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
