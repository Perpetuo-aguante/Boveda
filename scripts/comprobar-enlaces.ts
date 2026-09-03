/**
 * Comprueba que los enlaces de `src/lib/articles.ts` sigan vivos.
 *
 *   npm run enlaces
 *
 * Vale la pena correrlo cada tanto: los medios reorganizan sus archivos y una
 * biblioteca de enlaces muertos no es una biblioteca. Sale con código 1 si algo
 * falla, así que se puede colgar de un GitHub Action sin tocar nada.
 */
import { articulos } from "../src/lib/articles";

const TIEMPO_LIMITE = 15_000;

type Resultado = { slug: string; url: string; estado: string; ok: boolean };

async function comprobar(url: string): Promise<{ estado: string; ok: boolean }> {
  // Algunos servidores rechazan HEAD pero responden bien a GET, así que se
  // intenta primero lo barato y se cae a lo caro sólo si hace falta.
  for (const method of ["HEAD", "GET"] as const) {
    try {
      const r = await fetch(url, {
        method,
        redirect: "follow",
        signal: AbortSignal.timeout(TIEMPO_LIMITE),
        headers: { "user-agent": "BibliotecaPerpetuo/1.0 (+https://perpetuo.global)" },
      });
      if (r.ok) return { estado: String(r.status), ok: true };
      if (method === "GET") return { estado: String(r.status), ok: false };
    } catch (e) {
      if (method === "GET") {
        return { estado: e instanceof Error ? e.name : "error", ok: false };
      }
    }
  }
  return { estado: "desconocido", ok: false };
}

async function main() {
  const conEnlace = articulos.filter((a) => a.url);
  const sinEnlace = articulos.filter((a) => !a.url);

  console.log(`Comprobando ${conEnlace.length} enlaces…\n`);

  const resultados: Resultado[] = await Promise.all(
    conEnlace.map(async (a) => ({
      slug: a.slug,
      url: a.url,
      ...(await comprobar(a.url)),
    })),
  );

  for (const r of resultados.sort((a, b) => Number(a.ok) - Number(b.ok))) {
    console.log(`${r.ok ? "  ok " : "FALLA"}  ${r.estado.padEnd(8)} ${r.slug}`);
    if (!r.ok) console.log(`         ${r.url}`);
  }

  if (sinEnlace.length) {
    console.log(`\nSin enlace (${sinEnlace.length}): ${sinEnlace.map((a) => a.slug).join(", ")}`);
  }

  const rotos = resultados.filter((r) => !r.ok).length;
  console.log(`\n${resultados.length - rotos} vivos, ${rotos} rotos.`);

  // Si absolutamente todo falla con 403, casi seguro que el problema es la red
  // de quien ejecuta esto y no los medios: los proxies corporativos y los
  // entornos aislados devuelven 403 a todo.
  if (rotos === resultados.length && resultados.every((r) => r.estado === "403")) {
    console.log(
      "\nTodos dieron 403. Eso huele a proxy de salida, no a enlaces muertos:\n" +
        "vuelve a correrlo desde una máquina con internet abierto antes de\n" +
        "tocar nada en articles.ts.",
    );
  }

  if (rotos) process.exitCode = 1;
}

main();
