# Biblioteca Perpetuo

Una estantería con los artículos que guardamos en Perpetuo. Cada texto es un
cuadernillo tridimensional que gira mientras se baja por la página; al abrirlo
hay una ficha con los datos del original y por qué está aquí.

Es un homenaje declarado a [Stripe Press](https://press.stripe.com), adaptado a
un problema distinto: Stripe muestra libros que existen y tienen portada; aquí
hay artículos, que no tienen objeto físico. La portada de cada uno se genera a
partir de sus datos.

## Añadir un artículo

Todo vive en **`src/lib/articles.ts`**. Se copia una entrada, se cambia, y ya:
la estantería, el índice, las fichas, el sitemap y los enlaces
anterior/siguiente se rehacen solos. El orden del array es el orden de la
estantería.

```ts
{
  slug: "el-rastro-en-los-huesos",   // la URL: /articulo/<slug>
  titulo: "El rastro en los huesos",
  autor: "Leila Guerriero",
  medio: "Gatopardo",                 // va arriba en la portada
  anio: 2010,
  url: "https://…",                   // vacío si no hay enlace estable
  seccion: "Crónica",                 // decide la paleta de la portada
  idioma: "es",
  resumen: "Una línea. Es lo que se lee junto al cuadernillo.",
  porQue: "Uno o dos párrafos: por qué está en la biblioteca.",
  cita: "…",                          // opcional, sólo si está verificada
  curador: "…",                       // opcional
}
```

Las **secciones** están en `src/lib/articulos-tipos.ts` y cada una tiene su
paleta en `src/lib/covers.ts`. Para inventar una sección nueva hay que añadirla
en los dos sitios; TypeScript avisa si falta una.

## Antes de publicar

Los diez artículos que vienen en el repo son **contenido semilla**, no la
selección de Perpetuo. Concretamente:

- **Los `resumen` y `porQue` son borradores escritos por Claude.** Hay que
  reescribirlos con la voz de la casa antes de que esto sea público.
- **Las URL no están verificadas.** La sesión que construyó esto tenía la salida
  a internet bloqueada por un proxy, así que no se pudo comprobar ni una. Corre
  `npm run enlaces` desde una máquina con internet abierto.
- **No hay citas textuales en la semilla**, a propósito: no queríamos entrecomillar
  nada que no pudiéramos verificar. El campo `cita` está listo para cuando sí.

## Comandos

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # las 15 rutas se prerenderizan estáticas
npm run lint
npm run enlaces    # comprueba que los enlaces de articles.ts sigan vivos
```

No hay base de datos, ni API, ni variables de entorno. Es un sitio estático:
sirve cualquier hosting, y en Vercel es importar el repo y darle a desplegar.

## Cómo está hecho

Next.js 16 (App Router, Turbopack) + Tailwind 4. Sin dependencias de terceros
para la parte visual.

**El cuadernillo** (`src/components/cuadernillo.tsx`) es un prisma de seis caras
en CSS 3D — portada, contraportada, lomo, canto, cabeza y pie. Cada cara se
centra en el centro del libro con márgenes negativos, y desde ahí sólo hace
falta rotar y trasladar media dimensión; es la parte que normalmente se rompe
si se intenta con `transform-origin`. Todas las medidas se derivan de `--ancho`
con `calc()`, así que un `clamp()` en esa variable escala el objeto entero
—caras, grosor y tipografía— sin un solo media query.

**El giro** lo lleva `src/components/motor-estante.tsx`: un único componente
cliente que se monta una vez y maneja todos los cuadernillos leyendo el DOM
(`[data-libro]`), en vez de un listener por libro. Mide dónde está cada objeto
respecto al centro de la pantalla y traduce esa posición a un ángulo. La
elevación al pasar el ratón vive en otra capa (`.alza`) para que no se pelee con
la rotación por scroll; el enderezado usa `@property --giro-mult`, que es lo que
permite animar una custom property.

Se respeta `prefers-reduced-motion`: el objeto sigue siendo tridimensional, pero
se queda quieto.

**Sin WebGL, sin Three.js.** La versión de Stripe es una escena real con luces y
materiales; ésta imita el gesto con transformaciones CSS. Se ve casi igual,
carga al instante, funciona en móviles modestos y no añade un solo kilobyte de
dependencias. Si algún día se quiere el pase de páginas de verdad, el modelo de
datos no cambia: sólo se sustituye `cuadernillo.tsx`.
