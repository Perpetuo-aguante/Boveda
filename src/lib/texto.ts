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

export type Bloque =
  | { tipo: "parrafo"; texto: string }
  | { tipo: "subtitulo"; texto: string }
  | { tipo: "cita"; texto: string }
  | { tipo: "separador" };

export function leerTexto(slug: string): Bloque[] | null {
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
      const texto = t
        .split("\n")
        .map((l) => l.replace(/^>\s?/, ""))
        .join(" ")
        .trim();
      bloques.push({ tipo: "cita", texto });
    } else {
      bloques.push({ tipo: "parrafo", texto: t.split("\n").join(" ") });
    }
  }

  return bloques.length ? bloques : null;
}

/** Parte un párrafo en tramos rectos y en cursiva, para pintarlos con <em>. */
export function tramos(texto: string): Array<{ cursiva: boolean; texto: string }> {
  return texto
    .split(/(\*[^*]+\*)/g)
    .filter(Boolean)
    .map((t) =>
      t.startsWith("*") && t.endsWith("*") && t.length > 2
        ? { cursiva: true, texto: t.slice(1, -1) }
        : { cursiva: false, texto: t },
    );
}

/** Minutos de lectura, redondeados hacia arriba. 200 palabras por minuto. */
export function minutosDe(bloques: Bloque[]): number {
  const palabras = bloques
    .filter((b) => b.tipo !== "separador")
    .reduce((n, b) => n + ("texto" in b ? b.texto.split(/\s+/).length : 0), 0);
  return Math.max(1, Math.round(palabras / 200));
}
