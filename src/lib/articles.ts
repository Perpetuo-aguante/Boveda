/**
 * LA BIBLIOTECA — el único archivo que hay que tocar para añadir un artículo.
 *
 * Cada entrada de `articulos` se convierte en un "cuadernillo" en la estantería.
 * Para añadir uno: copia el bloque de abajo, cámbialo, y listo. El orden del
 * array es el orden en la estantería (los primeros arriba).
 *
 * ────────────────────────────────────────────────────────────────────────────
 * AVISO SOBRE ESTE CONTENIDO SEMILLA
 *
 * Los diez artículos de abajo son reales y están aquí sólo para que la página
 * se vea llena. NO son la selección de Perpetuo. Dos cosas que hay que revisar
 * antes de publicar:
 *
 *   1. Los campos `resumen` y `porQue` son borradores escritos por Claude, no
 *      por la redacción. Reescríbelos con la voz de la casa.
 *   2. Las URL no están verificadas: la sesión que construyó esto tenía la
 *      salida a internet bloqueada por el proxy. Corre `npm run enlaces` desde
 *      una máquina con red para comprobarlas.
 *
 * No hay citas textuales en la semilla a propósito: no queríamos poner entre
 * comillas nada que no pudiéramos verificar. Añádelas tú con `cita`.
 * ────────────────────────────────────────────────────────────────────────────
 */

/** Las secciones definen la paleta de la portada. Ver `src/lib/covers.ts`. */
import { SECCIONES, type Seccion } from "./articulos-tipos";
export { SECCIONES };
export type { Seccion };

export type Articulo = {
  /** Identificador en la URL: /articulo/<slug>. Minúsculas, sin acentos. */
  slug: string;
  titulo: string;
  autor: string;
  /** Revista, periódico o libro donde salió. Va arriba en la portada. */
  medio: string;
  anio: number;
  /** Enlace al original. Si no hay uno estable, déjalo vacío. */
  url: string;
  seccion: Seccion;
  /** Idioma del original — se muestra como etiqueta cuando no es español. */
  idioma: "es" | "en" | "pt" | "fr" | "it" | "de";
  /** Una línea. Es lo que se lee junto al cuadernillo en la estantería. */
  resumen: string;
  /** Uno o dos párrafos: por qué está en la biblioteca. Se lee en la ficha. */
  porQue: string;
  /** Cita textual opcional. Sólo si la tienes verificada palabra por palabra. */
  cita?: string;
  /** Quién lo trajo a la biblioteca. */
  curador?: string;
};

export const articulos: Articulo[] = [
  {
    slug: "frank-sinatra-esta-resfriado",
    titulo: "Frank Sinatra Has a Cold",
    autor: "Gay Talese",
    medio: "Esquire",
    anio: 1966,
    url: "https://www.esquire.com/news-politics/a638/frank-sinatra-has-a-cold-gay-talese/",
    seccion: "Perfil",
    idioma: "en",
    resumen:
      "El perfil que se escribió sin entrevistar al perfilado, y que por eso mismo lo retrata entero.",
    porQue:
      "Talese pasó tres meses siguiendo a Sinatra sin conseguir jamás sentarse con él. En vez de rendirse, escribió alrededor del hueco: los guardaespaldas, la mujer que cargaba las pelucas, el silencio de una sala cuando el jefe entra de mal humor. Es la prueba de que un perfil no se hace de declaraciones sino de observación, y de que el acceso negado también es información.",
    curador: "",
  },
  {
    slug: "el-rastro-en-los-huesos",
    titulo: "El rastro en los huesos",
    autor: "Leila Guerriero",
    medio: "Gatopardo",
    anio: 2010,
    url: "https://gatopardo.com/reportajes/el-rastro-en-los-huesos/",
    seccion: "Crónica",
    idioma: "es",
    resumen:
      "Los antropólogos forenses que aprendieron a leer los huesos de los desaparecidos argentinos.",
    porQue:
      "Guerriero cuenta el trabajo del Equipo Argentino de Antropología Forense sin subir nunca la voz. El material es insoportable y la prosa está bajo control absoluto: ahí está la lección. La contención no es frialdad, es la única forma de que el lector aguante hasta el final y salga distinto.",
    curador: "",
  },
  {
    slug: "notas-sobre-lo-camp",
    titulo: "Notes on “Camp”",
    autor: "Susan Sontag",
    medio: "Partisan Review",
    anio: 1964,
    url: "https://monoskop.org/images/5/59/Sontag_Susan_1964_Notes_on_Camp.pdf",
    seccion: "Ensayo",
    idioma: "en",
    resumen:
      "Cincuenta y ocho apuntes numerados que inventaron una manera de mirar y una manera de escribir.",
    porQue:
      "Sontag decidió que una sensibilidad demasiado escurridiza para un argumento continuo se podía cercar con notas sueltas, y de paso legitimó la fragmentación como forma del ensayo. Nos interesa tanto por lo que dice sobre el gusto como por lo que demuestra: que la estructura de un texto es una decisión crítica, no un accidente.",
    curador: "",
  },
  {
    slug: "consider-the-lobster",
    titulo: "Consider the Lobster",
    autor: "David Foster Wallace",
    medio: "Gourmet",
    anio: 2004,
    url: "https://www.gourmet.com.s3-website-us-east-1.amazonaws.com/magazine/2000s/2004/08/consider_the_lobster.html",
    seccion: "Crónica",
    idioma: "en",
    resumen:
      "Una revista de gastronomía lo manda a cubrir un festival de langosta y él vuelve con un problema moral.",
    porQue:
      "Es el mejor ejemplo de lo que puede pasar cuando un escritor se toma en serio un encargo menor. Wallace acepta la crónica de color, va, mira, y descubre que no puede escribirla sin preguntarse si el animal siente. El texto vale por el pensamiento en vivo y por las notas al pie, que son la mitad del argumento.",
    curador: "",
  },
  {
    slug: "carta-abierta-a-la-junta-militar",
    titulo: "Carta abierta de un escritor a la Junta Militar",
    autor: "Rodolfo Walsh",
    medio: "Agencia Clandestina de Noticias",
    anio: 1977,
    url: "https://www.elhistoriador.com.ar/carta-abierta-de-un-escritor-a-la-junta-militar-rodolfo-walsh/",
    seccion: "Manifiesto",
    idioma: "es",
    resumen:
      "Walsh la escribió, la echó al correo y lo desaparecieron al día siguiente.",
    porQue:
      "El primer aniversario del golpe, un hombre solo con una máquina de escribir contra un Estado, y con las cuentas hechas: cifras, nombres, métodos. Está aquí porque es la definición más corta que conocemos de para qué sirve escribir, y porque su autor pagó por ella el precio completo.",
    curador: "",
  },
  {
    slug: "la-soledad-de-america-latina",
    titulo: "La soledad de América Latina",
    autor: "Gabriel García Márquez",
    medio: "Discurso de aceptación del Premio Nobel",
    anio: 1982,
    url: "https://www.nobelprize.org/prizes/literature/1982/marquez/lecture/",
    seccion: "Discurso",
    idioma: "es",
    resumen:
      "Ocho minutos en Estocolmo para explicar que la desmesura del continente no es una metáfora.",
    porQue:
      "El argumento central sigue vivo: que a América Latina se le pide que se explique con instrumentos que no la miden, y que su realidad desborda a quienes la interpretan desde fuera. Lo tenemos a mano cada vez que hay que decidir para quién se escribe.",
    curador: "",
  },
  {
    slug: "el-escritor-argentino-y-la-tradicion",
    titulo: "El escritor argentino y la tradición",
    autor: "Jorge Luis Borges",
    medio: "Sur",
    anio: 1953,
    url: "https://www.cervantesvirtual.com/obra/el-escritor-argentino-y-la-tradicion/",
    seccion: "Ensayo",
    idioma: "es",
    resumen:
      "La respuesta definitiva a quien exige que un escritor latinoamericano suene a su país.",
    porQue:
      "Borges desmonta la obligación del color local con una calma casi insolente y reclama la cultura entera como herencia disponible. Para una revista en español que no quiere ser regional ni sucursal, este texto es prácticamente un documento fundacional.",
    curador: "",
  },
  {
    slug: "hablo-por-mi-diferencia",
    titulo: "Manifiesto (Hablo por mi diferencia)",
    autor: "Pedro Lemebel",
    medio: "Leído en un acto político, Santiago",
    anio: 1986,
    url: "",
    seccion: "Manifiesto",
    idioma: "es",
    resumen:
      "Lemebel entra descalzo a una reunión de la izquierda chilena y les lee esto en la cara.",
    porQue:
      "Un texto escrito para ser dicho en voz alta, delante de gente incómoda, en un país en dictadura. Es una lección de cómo el ritmo de una frase puede ser un arma política y de que la crónica latinoamericana viene tanto de la poesía como del periodismo.",
    curador: "",
  },
  {
    slug: "the-journalist-and-the-murderer",
    titulo: "The Journalist and the Murderer",
    autor: "Janet Malcolm",
    medio: "The New Yorker",
    anio: 1989,
    url: "https://www.newyorker.com/magazine/1989/03/13/the-journalist-and-the-murderer-i",
    seccion: "Reportaje",
    idioma: "en",
    resumen:
      "El texto que obligó al oficio a mirarse la relación con sus fuentes.",
    porQue:
      "Malcolm parte de un juicio entre un periodista y su entrevistado para preguntar qué le debe quien escribe a quien le abrió la puerta. Nadie que trabaje con testimonio ajeno debería no haberlo leído; se discute desde el día que salió y esa discusión es justamente el punto.",
    curador: "",
  },
  {
    slug: "goodbye-to-all-that",
    titulo: "Goodbye to All That",
    autor: "Joan Didion",
    medio: "Slouching Towards Bethlehem",
    anio: 1968,
    url: "",
    seccion: "Ensayo",
    idioma: "en",
    resumen:
      "Irse de Nueva York a los veintiocho, y descubrir que la ciudad era una edad.",
    porQue:
      "Didion escribe sobre una mudanza y termina escribiendo sobre el final de la juventud sin anunciarlo nunca. La primera persona aquí no es confesión: es un instrumento de precisión. Lo guardamos como recordatorio de que lo autobiográfico sólo funciona cuando está al servicio de algo más grande que el autor.",
    curador: "",
  },
];

/** Índice por slug, para las fichas. */
export function buscarArticulo(slug: string): Articulo | undefined {
  return articulos.find((a) => a.slug === slug);
}

/** Secciones realmente usadas, en orden de aparición. */
export function seccionesEnUso(): Seccion[] {
  return SECCIONES.filter((s) => articulos.some((a) => a.seccion === s));
}
