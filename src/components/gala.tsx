"use client";

import { useEffect, useRef } from "react";

/**
 * La gala: el cierre animado de Perpetuo, al final del recorrido.
 *
 * Hay dos cortes del mismo video —apaisado para pantallas anchas y vertical
 * para el teléfono— y los dos van en el DOM; el CSS esconde el que no toca.
 * Con `preload="none"` el escondido no baja ni un byte, y el visible tampoco
 * hasta que el lector se acerca al final: son 9-12 MB que la mayoría de las
 * visitas no llegaría a ver.
 *
 * Es mudo, así que puede arrancar solo (los navegadores sólo dejan hacerlo a
 * los videos sin sonido). Se reproduce mientras está en pantalla y se pausa al
 * salir. Con `prefers-reduced-motion` no arranca: queda el cartel fijo con los
 * controles, y le da play quien quiera.
 */
export function Gala() {
  const seccion = useRef<HTMLElement>(null);

  useEffect(() => {
    const raiz = seccion.current;
    if (!raiz) return;
    const sinMovimiento = window.matchMedia("(prefers-reduced-motion: reduce)");
    const videos = Array.from(raiz.querySelectorAll("video"));
    // El que se ve es el que tiene caja; el escondido por CSS mide cero.
    const visible = () => videos.find((v) => v.offsetWidth > 0);

    if (sinMovimiento.matches) {
      for (const v of videos) v.controls = true;
      return;
    }

    // Empieza a cargar una pantalla antes de llegar, para que al asomarse ya
    // esté corriendo.
    const precarga = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        const v = visible();
        if (v) v.preload = "auto";
        precarga.disconnect();
      },
      { rootMargin: "100% 0px" },
    );

    const reproduccion = new IntersectionObserver(
      ([e]) => {
        for (const v of videos) {
          if (e.isIntersecting && v === visible()) v.play().catch(() => {});
          else v.pause();
        }
      },
      { threshold: 0.35 },
    );

    precarga.observe(raiz);
    reproduccion.observe(raiz);
    return () => {
      precarga.disconnect();
      reproduccion.disconnect();
    };
  }, []);

  const comunes = {
    muted: true,
    loop: true,
    playsInline: true,
    preload: "none",
    "aria-label": "Perpetuo: por un español que no se queda quieto. Animación sin sonido.",
    className: "block h-auto w-full",
  } as const;

  return (
    <section
      ref={seccion}
      className="mx-auto mt-28 max-w-6xl px-6 sm:px-10"
      aria-label="Perpetuo, la gala"
    >
      {/* Sobre la noche del sitio una sombra tinta no se vería: va en azul
          lona, el mismo de los ríos del video. */}
      <div className="dura-gruesa border-[2.5px] border-tinta bg-papel [--dura-color:var(--lona)]">
        <video
          {...comunes}
          poster="/gala/perpetuo-gala-vertical.webp"
          width={720}
          height={1280}
          className={`${comunes.className} md:hidden`}
        >
          <source src="/gala/perpetuo-gala-vertical.mp4" type="video/mp4" />
        </video>
        <video
          {...comunes}
          poster="/gala/perpetuo-gala.webp"
          width={1600}
          height={900}
          className={`${comunes.className} hidden md:block`}
        >
          <source src="/gala/perpetuo-gala.mp4" type="video/mp4" />
        </video>
      </div>
    </section>
  );
}
