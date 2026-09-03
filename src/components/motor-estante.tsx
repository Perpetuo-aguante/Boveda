"use client";

import { useEffect } from "react";

/**
 * El motor de la estantería.
 *
 * Se monta una sola vez y maneja *todos* los cuadernillos de la página leyendo
 * el DOM (`[data-libro]`), en vez de que cada libro tenga su propio listener.
 * Un único listener de scroll + un rAF por fotograma: da igual que haya diez
 * cuadernillos o cien.
 *
 * Lo que hace por cada objeto: mide dónde está respecto al centro de la
 * pantalla y traduce esa posición a un ángulo. Un libro que entra por abajo se
 * ve muy de canto; al llegar al centro casi se pone de frente; al salir por
 * arriba gira al otro lado. Es el gesto de recorrer un estante con la vista.
 */
export function MotorEstante() {
  useEffect(() => {
    const sinMovimiento = window.matchMedia("(prefers-reduced-motion: reduce)");

    // Aparición al entrar en pantalla — independiente del movimiento 3D, así
    // que se activa siempre (el CSS ya neutraliza la animación si hace falta).
    const observador = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) {
          if (e.isIntersecting) {
            (e.target as HTMLElement).dataset.visible = "true";
            observador.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    document.querySelectorAll(".aparece").forEach((n) => observador.observe(n));

    if (sinMovimiento.matches) return () => observador.disconnect();

    let libros: HTMLElement[] = [];
    let pendiente = false;

    const recolectar = () => {
      libros = Array.from(document.querySelectorAll<HTMLElement>("[data-libro]"));
      for (const l of libros) l.dataset.motor = "on";
    };

    const pintar = () => {
      pendiente = false;
      const vh = window.innerHeight;

      for (const libro of libros) {
        const r = libro.getBoundingClientRect();

        // Fuera de pantalla con margen: no gastamos nada en él.
        if (r.bottom < -vh * 0.5 || r.top > vh * 1.5) continue;

        const centro = r.top + r.height / 2;
        // p va de +1 (aún por debajo del todo) a -1 (ya se fue por arriba),
        // y vale 0 justo cuando el libro está centrado en la pantalla.
        const alcance = vh / 2 + r.height / 2;
        const p = Math.max(-1, Math.min(1, (centro - vh / 2) / alcance));

        libro.style.setProperty("--giro", `${(7 + p * 27).toFixed(2)}deg`);
        libro.style.setProperty("--cabeceo", `${(-4 + p * 3).toFixed(2)}deg`);
        libro.style.setProperty("--flote", `${(p * 14).toFixed(1)}px`);

        const sombra = libro.parentElement?.querySelector<HTMLElement>(".sombra");
        if (sombra) {
          sombra.style.setProperty("--sombra-escala", (0.9 + p * 0.14).toFixed(3));
        }
      }
    };

    const alDesplazar = () => {
      if (pendiente) return;
      pendiente = true;
      requestAnimationFrame(pintar);
    };

    recolectar();
    pintar();

    window.addEventListener("scroll", alDesplazar, { passive: true });
    window.addEventListener("resize", alDesplazar);

    // Las fuentes cambian las alturas al cargar: hay que volver a medir.
    document.fonts?.ready.then(alDesplazar).catch(() => {});

    return () => {
      window.removeEventListener("scroll", alDesplazar);
      window.removeEventListener("resize", alDesplazar);
      observador.disconnect();
    };
  }, []);

  return null;
}
