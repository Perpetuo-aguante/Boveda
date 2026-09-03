import Link from "next/link";

export default function NoEncontrado() {
  return (
    <section className="mx-auto flex min-h-[60vh] max-w-2xl flex-col justify-center px-6 sm:px-10">
      <p className="eyebrow text-tenue-mas">404</p>
      <h1 className="display mt-6 text-[clamp(2rem,5vw,3.25rem)]">
        Ese título no está en la estantería.
      </h1>
      <p className="mt-6 text-[1.0625rem] leading-relaxed text-niebla/70">
        Puede que lo hayamos movido, o que todavía no lo hayamos guardado.
      </p>
      <Link
        href="/"
        className="eyebrow mt-10 inline-flex items-center gap-2 text-brasa transition-colors hover:text-niebla"
      >
        <span aria-hidden>←</span> Volver a la estantería
      </Link>
    </section>
  );
}
