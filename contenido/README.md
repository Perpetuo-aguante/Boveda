# Los textos completos

Un archivo por texto, llamado igual que el `slug` de `src/lib/articles.ts`:

    contenido/casa-de-rescate.md

Se pega el cuerpo del artículo tal cual, en texto plano. No hace falta saber
Markdown: basta con **dejar una línea en blanco entre párrafo y párrafo**. Eso
es todo lo que se necesita para el 95 % de los casos.

Si quieres algo más:

| Escribe            | Sale                          |
| ------------------ | ----------------------------- |
| `## Un subtítulo`  | Un intertítulo                |
| `> Una frase`      | Una cita destacada, en grande |
| `---`              | Un separador entre secciones  |
| `*así*`            | *Cursiva*, dentro de un párrafo |

No pongas el título ni la firma: esos salen de `articles.ts` y la ficha ya los
pinta arriba.

Mientras no exista el archivo, la ficha del texto funciona igual — muestra lo
que haya y no enseña cuerpo. Se pueden ir subiendo de uno en uno.

## Poesía

Un poema se teclea **como se escribe**: un verso por línea, y una línea en
blanco entre estrofa y estrofa. No hay que marcar nada dentro del archivo.

Lo único que hace falta es avisar en `articles.ts`, en la entrada de ese texto:

    forma: "verso",

Con eso los versos se conservan tal cual. Sin eso, el texto se trata como
prosa y cada estrofa se rejunta en un párrafo —que es lo correcto para una
crónica y lo que destruye un poema.

Si un verso es tan largo que no cabe en la columna, su continuación sale
sangrada, para que no se confunda con un verso nuevo.

## Las fotos

Van en `public/portadas/<slug>.jpg` (o `.webp`), y luego se apunta a ellas desde
el campo `imagen` de `articles.ts`:

    imagen: "/portadas/casa-de-rescate.jpg",

Cuando hay foto, la portada del cuadernillo la usa. Cuando no, se dibuja la
portada geométrica de siempre. Las dos conviven sin problema en el mismo puesto.
