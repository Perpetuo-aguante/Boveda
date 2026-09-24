import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

/**
 * El cuerpo de cada texto vive en `contenido/<slug>.md`, no en articles.ts:
 * veintiséis crónicas enteras dentro de un archivo TypeScript sería
 * inmanejable, y así cada quien pega la suya en su propio archivo.
 *
 * Se lee en tiempo de compilación —todo el sitio es estático— y se traduce a
 * bloques con un formateador mínimo, sin dependencias: párrafos separados por
 * una línea en blanco, `## ` para subtítulos, `> ` para citas destacadas y
 * `---` para un separador. Dentro de un párrafo, `*así*` sale en cursiva.
 */
const DIR = path.join(process.cwd(), "contenido");

/** Un verso de una estrofa. `sangria` marca el verso que el propio autor
 *  quiso desplazado a la derecha —un aparte, no un verso más—: en la fuente
 *  es la única línea de un poema que empieza con espacio o tabulador, ya que
 *  el resto siempre va al margen. Se guarda aparte porque el verso normal se
 *  recorta ese espacio (es indistinto del ancho de columna); éste no. */
export type Verso = { texto: string; sangria: boolean };

export type Bloque =
  | { tipo: "parrafo"; texto: string }
  /** Una estrofa: sus versos se conservan como líneas, no se rejuntan. */
  | { tipo: "estrofa"; lineas: Verso[] }
  | { tipo: "subtitulo"; texto: string }
  | { tipo: "cita"; texto: string }
  | { tipo: "separador" };

/** Dentro de un párrafo o una cita, una línea que termina en `\` es un salto
 *  forzado —el autor lo quiso ahí a propósito, a diferencia del salto simple,
 *  que es accidente del ancho de columna y se rejunta con un espacio. Se
 *  marca con este separador invisible y se despliega como <br> al pintarlo. */
const SALTO = " ";

/** Une las líneas de un párrafo o una cita: espacio si el salto es simple,
 *  `SALTO` si la línea terminaba en `\`. */
function unirLineas(lineas: string[]): string {
  let texto = "";
  for (let i = 0; i < lineas.length; i++) {
    const forzado = /\\\s*$/.test(lineas[i]);
    texto += lineas[i].replace(/\\\s*$/, "").trim();
    if (i < lineas.length - 1) texto += forzado ? SALTO : " ";
  }
  return texto;
}

/**
 * `enVerso` cambia una sola cosa: un bloque de varias líneas deja de
 * rejuntarse en un párrafo y se conserva verso por verso. Un tercio del
 * archivo es poesía, y en prosa el salto de línea es accidente del ancho de
 * la columna mientras que en verso es del autor —rejuntarlo lo destruye.
 *
 * Con esto un poema se teclea como se escribe: un verso por línea, una línea
 * en blanco entre estrofa y estrofa. No hace falta marcar nada más.
 */
export function leerTexto(slug: string, enVerso = false): Bloque[] | null {
  // El slug viene de la URL: se limita al alfabeto de los slugs para que nadie
  // pueda pedir `../../algo` y sacar un archivo de fuera de contenido/.
  if (!/^[a-z0-9-]+$/.test(slug)) return null;

  const archivo = path.join(DIR, `${slug}.md`);
  if (!existsSync(archivo)) return null;

  const crudo = readFileSync(archivo, "utf8").trim();
  if (!crudo) return null;

  const bloques: Bloque[] = [];

  for (const trozo of crudo.split(/\n\s*\n/)) {
    const t = trozo.trim();
    if (!t) continue;

    if (/^-{3,}$/.test(t)) {
      bloques.push({ tipo: "separador" });
    } else if (t.startsWith("## ")) {
      bloques.push({ tipo: "subtitulo", texto: t.slice(3).trim() });
    } else if (t.startsWith("> ")) {
      const lineas = t.split("\n").map((l) => l.replace(/^>\s?/, ""));
      bloques.push({ tipo: "cita", texto: unirLineas(lineas) });
    } else if (enVerso) {
      const lineas = t
        .split("\n")
        .map((l) => ({ texto: l.trim(), sangria: /^[ \t]/.test(l) }))
        .filter((l) => l.texto);
      if (lineas.length) bloques.push({ tipo: "estrofa", lineas });
    } else {
      bloques.push({ tipo: "parrafo", texto: unirLineas(t.split("\n")) });
    }
  }

  return bloques.length ? bloques : null;
}

export type Tramo =
  | { tipo: "texto"; texto: string }
  | { tipo: "cursiva"; hijos: Tramo[] }
  | { tipo: "fuerte"; hijos: Tramo[] }
  | { tipo: "enlace"; texto: string; url: string };

/** Parte un párrafo en tramos: recto, en cursiva (`*así*`), en negrita
 *  (`**así**`) o enlace (`[así](url)`), para pintarlos con <em>, <strong> y
 *  <a>. El orden de la alternancia importa: el enlace y la negrita se prueban
 *  antes que la cursiva para que `**x**` no se lea como cursiva con un
 *  asterisco suelto de sobra. La cursiva y la negrita se resuelven de nuevo
 *  por dentro —recursivo—, porque un epígrafe entero puede ir en cursiva y
 *  llevar, aun así, un enlace adentro. */
export function tramos(texto: string): Tramo[] {
  return texto
    .split(/(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*|\*[^*]+\*)/g)
    .filter(Boolean)
    .map((t): Tramo => {
      const enlace = t.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (enlace) return { tipo: "enlace", texto: enlace[1], url: enlace[2] };
      if (t.startsWith("**") && t.endsWith("**") && t.length > 4) {
        return { tipo: "fuerte", hijos: tramos(t.slice(2, -2)) };
      }
      if (t.startsWith("*") && t.endsWith("*") && t.length > 2) {
        return { tipo: "cursiva", hijos: tramos(t.slice(1, -1)) };
      }
      return { tipo: "texto", texto: t };
    });
}

/** Las líneas de un párrafo o cita, ya separadas donde el autor forzó un
 *  salto con `\`. Cada una se pasa por `tramos` para su cursiva/negrita/
 *  enlaces; el llamador decide cómo unirlas (un <br> entre cada una). */
export function lineasDe(texto: string): string[] {
  return texto.split(SALTO);
}

/** Minutos de lectura, redondeados hacia arriba. 200 palabras por minuto. */
export function minutosDe(bloques: Bloque[]): number {
  const palabras = bloques.reduce((n, b) => {
    if ("texto" in b) return n + b.texto.split(/\s+/).length;
    if (b.tipo === "estrofa")
      return n + b.lineas.map((l) => l.texto).join(" ").split(/\s+/).length;
    return n;
  }, 0);
  return Math.max(1, Math.round(palabras / 200));
}
