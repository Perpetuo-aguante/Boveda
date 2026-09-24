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
  /** Quién ilustró la portada, cuando no es una foto sino un dibujo encargado. */
  ilustrador?: string;
  /** Una nota sobre el autor. Va al final de la ficha, tal como la escribió
   *  el propio autor —admite *cursiva*, **negrita** y [enlaces](url). */
  bio?: string;
};

export const articulos: Articulo[] = [
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
  {
    slug: "el-sobreviviente-contrafactico",
    titulo: "El sobreviviente contrafáctico",
    autor: "Javier Sinay",
    fecha: "2026-08-17",
    seccion: "Estelar",
    acceso: "abierto",
    url: "",
    imagen:
      "https://substackcdn.com/image/fetch/$s_!yq51!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F703e8b51-1c13-437f-a628-b647fd188fba_1672x941.png",
    resumen: "Outtake de El secreto de los sobrevivientes.",
    porQue: "",
    bio: "**Javier Sinay** (Argentina) es periodista. Su nuevo libro es *El secreto de los sobrevivientes*. Puedes comprarlo [en este enlace](https://www.planetadelibros.com.ar/libro-el-secreto-de-los-sobrevivientes/454204).",
  },
  {
    slug: "haiti-la-revuelta-eterna",
    titulo: "Haití, la revuelta eterna",
    autor: "Juan Martínez d'Aubuisson",
    fecha: "2026-06-15",
    seccion: "Estelar",
    acceso: "abierto",
    url: "",
    imagen:
      "https://substackcdn.com/image/fetch/$s_!tE4v!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fc499a2bf-e5ff-43f2-b449-72ce9ff5e113_1448x1086.png",
    resumen: "",
    porQue: "",
    bio: "**Juan Martínez d’Aubuisson.** Antropólogo sociocultural y cronista. Se ha enfocado desde 2008 en estudiar a las pandillas centroamericanas y la violencia social. Autor de los libros *Ver, oír y callar*, *El Niño de Hollywood* y *El que tenga miedo a morir que no nazca*. Premio Ortega y Gasset 2024 y Premio Gabo 2025.",
  },
  {
    slug: "mexico-magico-artificial",
    titulo: "México mágico artificial",
    autor: "Mateo Cornejo",
    fecha: "2026-08-19",
    seccion: "Anteojos",
    acceso: "abierto",
    url: "",
    imagen:
      "https://substackcdn.com/image/fetch/$s_!j1ut!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F4931041c-5dc9-4513-8893-0967afd90363_882x460.png",
    resumen: "",
    porQue: "",
    bio: "[Mateo Cornejo](https://www.instagram.com/mateomcornejo/) (México) actualmente cursa la Licenciatura en Medios, Información, Tecnocultura y Ciencia Política en la Universidad de Ontario Occidental (Western) en Canadá. Tiene perfiles activos en [redes sociales](https://www.instagram.com/mateomcornejo/) donde realiza verificación de noticias.",
  },
  {
    slug: "odiar-sin-limites",
    titulo: "Odiar sin límites",
    autor: "Montse Vila Aleart",
    fecha: "2026-08-19",
    seccion: "Anteojos",
    acceso: "abierto",
    url: "",
    imagen: "",
    resumen: "",
    porQue: "",
    bio: "[Montse Vila Aleart](https://www.instagram.com/montsevaleart/) (Argentina) es Licenciada en Comunicación Social por la Universidad Nacional de Rosario y magíster en Comunicación Institucional y Política en Sevilla. Actualmente vive en Barcelona.",
  },
  {
    slug: "mexico-a-dos-anos-de-sheinbaum-manuel-pedrero",
    titulo: "México, a dos años de Sheinbaum",
    autor: "Manuel Pedrero",
    fecha: "2026-09-16",
    seccion: "Anteojos",
    acceso: "abierto",
    url: "",
    imagen: "",
    resumen: "",
    porQue: "",
    bio: "Manuel Pedrero (Tabasco, México) es un periodista, reportero, conductor del noticiero [Sin Máscaras](https://www.youtube.com/channel/UCH4M_4Ed6SUidQthmZ60M2g) y director del medio digital [Los Reporteros Mx](https://www.losreporteros.mx/). En marzo de 2026, a sus 23 años, fue galardonado con el Premio Nacional de Periodismo en la categoría de Periodismo Digital, convirtiéndose en la persona más joven en recibir este reconocimiento. Puedes encontrar su trabajo en redes sociales, bajo su nombre, [Manuel Pedrero](https://www.instagram.com/manuel_es_pedrero/?hl=es).",
  },
  {
    slug: "mexico-a-dos-anos-de-sheinbaum-natalia-torres",
    titulo: "México, a dos años de Sheinbaum",
    autor: "Natalia Torres",
    fecha: "2026-09-16",
    seccion: "Anteojos",
    acceso: "abierto",
    url: "",
    imagen: "",
    resumen: "",
    porQue: "",
    bio: "[Natalia Torres Salim](https://www.instagram.com/naattorres/?hl=es) (Ciudad de México, México) es abogada, profesora y analista política, especializada en Derecho Constitucional y Amparo. Es profesora en la Universidad Panamericana y participa en espacios de análisis y debate político en medios nacionales. Desde 2022 crea contenido de divulgación político-jurídica en plataformas digitales. Puedes leerla y seguir su trabajo en redes sociales como [@naattorres](https://x.com/naattorres1?lang=es).",
  },
  {
    slug: "notas-sobre-la-poesia-del-siglo-xxi",
    titulo: "Notas sobre la poesía del siglo XXI",
    autor: "J.L. Sabau",
    fecha: "2026-01-23",
    seccion: "El Creativo",
    acceso: "abierto",
    url: "",
    imagen:
      "https://substackcdn.com/image/fetch/$s_!KNBM!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F67794333-e0d2-490a-97e8-9deaf90d3b30_1216x880.png",
    resumen: "",
    porQue: "",
    bio: "[JL Sabau](http://sabauismos.substack.com/) es el editor general de Perpetuo. No le gustan las biografías.",
  },
  {
    slug: "poemas-selectos-rosa-berbel",
    titulo: "Poemas selectos",
    autor: "Rosa Berbel",
    fecha: "2025-11-20",
    seccion: "El Creativo",
    acceso: "abierto",
    url: "",
    imagen:
      "https://substackcdn.com/image/fetch/$s_!5atH!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F21d37df9-2290-432e-ad95-7d5614a7de4b_4800x2520.png",
    resumen: "",
    porQue: "",
    forma: "verso",
    ilustrador: "Daniela Zorrilla",
    bio: "[Rosa Berbel](https://www.instagram.com/rosa_berbel/) (Sevilla, España, 1997) ha publicado *Las niñas siempre dicen la verdad* (Hiperión, 2018) y *Los planetas fantasma* (Tusquets, 2022). Ha obtenido, entre otros, el Premio de Poesía Joven Antonio Carvajal, el Premio de la Crítica de Andalucía a la mejor Ópera Prima y el Premio Ojo Crítico de Poesía 2019 de Radio Nacional de España. Fue residente del Museo de Arte Latinoamericano de Buenos Aires (MALBA) en septiembre de 2025. Publicó una selección de sus poemas bajo el título *Brillantes y caóticas* (Sonámbulos, 2021) y ha aparecido en numerosas antologías nacionales e internacionales. En la actualidad trabaja en el Departamento de Literatura Española de la Universidad de Granada.",
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
