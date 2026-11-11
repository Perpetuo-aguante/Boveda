# Inferencia — Especificación del sitio (v1)

Documento para el equipo de ingeniería. Acompaña al prototipo estático de esta carpeta (`index.html`, `episodios.html`, `noticias.html`). El prototipo es la referencia visual y de estructura; no es código de producción.

## 1. Qué es

Inferencia es un podcast semanal producido por Perpetuo para Primero AI. José Luis Sabau y José Antonio Murillo entrevistan a personas relevantes del mundo de la inteligencia artificial, los negocios y la política.

El sitio es una landing para gente a la que le interesa el programa. Tiene tres objetivos, en este orden:

- Que la persona vea o escuche el episodio más reciente.
- Que se suscriba al newsletter.
- Que encuentre el archivo de episodios, los textos destacados y los eventos.

Idioma del sitio: español.

## 2. Mapa del sitio

- **Inicio** (`/`, prototipo: `index.html`)
- **Episodios** (`/episodios`, prototipo: `episodios.html`)
- **Noticias y eventos** (`/noticias`, prototipo: `noticias.html`)

Páginas de detalle que el prototipo no dibuja y que hay que definir (ver sección 10): episodio individual, texto destacado (ensayo o entrevista), noticia individual.

## 3. Elementos globales

### Encabezado

- Logo (isotipo + logotipo) a la izquierda; lleva a Inicio.
- Navegación: Inicio, Episodios, Destacado (ancla a la sección de Inicio), Noticias y eventos.
- Botón "Suscribirse": lleva al bloque de suscripción de la página actual.
- La página activa se marca en azul con subrayado.
- En móvil los enlaces pasan a una segunda línea (en el prototipo simplemente se envuelven; se puede sustituir por un menú desplegable).

### Pie

- Logo en verde lima sobre fondo oscuro, la línea "Un podcast producido por Perpetuo para Primero AI." y el año.
- Enlaces: Episodios, Destacado, Noticias y eventos, RSS, Contacto.

## 4. Inicio

Secciones, de arriba abajo:

### 4.1 Hero

- Etiqueta: "Un podcast de Primero".
- Titular: "Conversaciones en serio para entender la inteligencia artificial, innovación y políticas públicas, con quienes están construyendo el cambio."
- Párrafo descriptivo del programa.
- Botón primario "Ver el último episodio" (ancla a 4.2) y botón secundario "Todos los episodios" (a Episodios).
- Fila "Disponible en": YouTube, Spotify, Apple Podcasts, Substack, RSS. Cada uno enlaza a su plataforma.
- Panel azul a la derecha con una composición de arte ASCII en verde lima (elemento gráfico de la marca). En el prototipo se genera con código; puede sustituirse por arte entregado por diseño.

### 4.2 Lo más reciente

- Reproductor del video del episodio más reciente (embed de YouTube), proporción 16:9.
- A un lado: número de episodio y fecha, título, invitado con cargo y organización, descripción de dos o tres líneas.
- Botones: "Escuchar el audio" y "Leer la entrevista".
- Enlace "Ver todos los episodios".
- Debe actualizarse solo cuando se publica un episodio nuevo.

### 4.3 Destacado

- Tres tarjetas elegidas editorialmente. Cada una puede ser un ensayo, una entrevista en texto o un capítulo.
- Cada tarjeta: etiqueta de tipo, título, resumen de una o dos líneas, y autor o invitado, fecha y tiempo de lectura.
- La etiqueta cambia de color según el tipo (lima para ensayo, azul para entrevista).

### 4.4 Hosts

- Dos tarjetas: José Luis Sabau (Perpetuo) y José Antonio Murillo (Primero AI).
- Cada tarjeta: foto cuadrada, nombre, rol y una semblanza breve.

### 4.5 Suscripción al newsletter

- Es el bloque más grande de la página: fondo verde lima, titular "Suscríbete al newsletter." a todo el ancho.
- Formulario de un solo campo (correo) y botón "Suscribirme".
- Estados que faltan por diseñar: enviando, éxito, error, correo no válido.

## 5. Episodios

- Encabezado: "Todos los episodios".
- Filtros por tema: Todos, Inteligencia artificial, Negocios, Política. Un solo filtro activo a la vez.
- Lista de episodios, del más reciente al más antiguo. Cada fila: miniatura 16:9, número, fecha, duración, título, invitado con cargo y organización, descripción breve, y tres acciones: "Ver video", "Escuchar", "Leer".
- Botón "Cargar más episodios" al final de la lista (paginación incremental).
- Franja final azul "Suscríbete por RSS": campo de solo lectura con la URL del feed, botón "Copiar" (copia al portapapeles y cambia a "Copiado"), y enlaces a YouTube, Spotify, Apple Podcasts y Substack.

## 6. Noticias y eventos

- Encabezado: "Noticias y eventos".
- **Próximos eventos**: lista ordenada por fecha. Cada fila: bloque de fecha (día y mes), tipo de evento (por ejemplo: grabación en vivo, presencial, en línea), nombre, lugar o enlace, hora, descripción de una línea y botón "Registrarme".
- **Noticias**: una noticia destacada con imagen, fecha, titular, resumen y "Leer más"; debajo, una cuadrícula de tarjetas con tipo (por ejemplo: anuncio, prensa), fecha, titular y resumen.
- Bloque de suscripción por correo ("Entérate antes que nadie."), más pequeño que el de Inicio.
- Falta definir qué se muestra cuando no hay eventos próximos.

## 7. Modelo de contenido

Campos mínimos que el sitio necesita. Todo el texto entre corchetes del prototipo sale de estos campos.

- **Episodio**: número, título, fecha de estreno, duración, invitado (nombre, cargo, organización), descripción, tema(s), miniatura, enlace de video (YouTube), enlace de audio, enlace a la entrevista en texto.
- **Texto destacado**: tipo (ensayo, entrevista, capítulo), título, resumen, autor o invitado, fecha, tiempo de lectura, enlace, marca de "destacado" y orden.
- **Evento**: fecha y hora, tipo, nombre, lugar o enlace, descripción, enlace de registro.
- **Noticia**: tipo, fecha, titular, resumen, imagen, cuerpo o enlace externo, marca de "destacada".
- **Host**: nombre, rol, organización, semblanza, foto.
- **Ajustes globales**: URL del feed RSS, enlaces a plataformas, contacto.

## 8. Comportamientos

- Navegación entre las tres páginas y anclas dentro de Inicio.
- Reproductor de video embebido en "Lo más reciente".
- Filtros de episodios por tema.
- "Cargar más episodios".
- Copiar la URL del feed RSS.
- Formularios de suscripción (Inicio y Noticias) conectados al proveedor de newsletter.
- Registro a eventos (enlace externo o formulario propio, por definir).

En el prototipo solo funcionan la navegación, el cambio visual de los filtros y el botón de copiar.

## 9. Sistema visual

Basado en el brandbook de Inferencia (Materia Prima Estudio, 2026).

### Colores

- Blanco `#FFFFFF`: fondo general del sitio (decisión del cliente; no está en la paleta del brandbook).
- Blanco cálido `#FFF7F5` (A3): fondo de secciones alternas y texto sobre fondo oscuro.
- Oscuro `#292525` (A6): texto, bordes y pie.
- Azul `#0049B2` (A4): acento principal. Enlaces, botones primarios, etiquetas, franja de RSS.
- Verde lima `#ADFF00` (A1): bloques de suscripción, fechas de eventos, etiquetas, logo sobre oscuro.
- Rojo `#FF2305` (A2) y morado `#A173CF` (A5): solo como bloques de color (video, miniaturas, fotos), nunca como color de texto sobre blanco porque no alcanzan contraste suficiente.
- Gris de texto secundario `#5F5B5B`: tono aclarado del oscuro; no está en la paleta.

El brandbook dice que no se permiten colores fuera de la paleta. Las dos excepciones de arriba (blanco puro y gris secundario) están por confirmar con la marca.

### Tipografía

- **Visual**: títulos principales y textos cortos destacados (y el logotipo).
- **PP Neue Bit**: títulos de sección, etiquetas y números.
- **Neue Montreal**: texto corrido e interfaz.

Las tres son tipografías comerciales. El prototipo las nombra primero en los estilos y, como no están instaladas, cae en sustitutos de Google Fonts: Pixelify Sans (para Visual y PP Neue Bit) e Inter Tight (para Neue Montreal). JetBrains Mono se usa solo para el arte ASCII y la URL del feed.

### Formas

- Esquinas rectas en todo (botones, tarjetas, campos).
- Bordes de 1 px en color oscuro.
- Ancho máximo de contenido: 1200 px, con 24 px de margen lateral.

### Logo

- Isotipo: anillo de cuadrados tipo píxel. En el prototipo está redibujado como SVG a partir del brandbook.
- Logotipo: "INFERENCIA" en la tipografía Visual. En el prototipo está escrito con la tipografía sustituta; hay que reemplazarlo por el archivo oficial.
- Reglas del brandbook: no deformar, no cambiar colores fuera de las combinaciones permitidas, altura mínima de 2 cm en impresos.

### Elementos gráficos

La identidad usa arte ASCII y composiciones generadas con caracteres. Se propone para el hero, las miniaturas y las portadas de episodios.

## 10. Responsive y accesibilidad

- Las tres páginas son fluidas: las columnas se apilan en pantallas angostas (el prototipo se puede revisar reduciendo el ancho de la ventana).
- Áreas táctiles de al menos 44 px.
- Texto con contraste mínimo de 4.5:1.
- Controles reales (`button`, `a`, `input` con `label`) y navegación por teclado.

## 11. Pendientes y preguntas abiertas

Contenido que falta (aparece entre corchetes en el prototipo):

- Episodios reales: títulos, invitados, fechas, duraciones, descripciones, miniaturas y enlaces.
- Textos destacados.
- Semblanzas y fotos de los hosts.
- Eventos y noticias.
- URL del feed RSS y enlaces a cada plataforma.
- Dato de contacto.

Decisiones por tomar:

- **Verde lima**: el brandbook rotula el color A1 como `#BABD92`, pero la muestra impresa es un lima vivo. El prototipo usa `#ADFF00`. Confirmar el valor correcto.
- **Tipografías**: quién compra o aporta las licencias web de Visual, PP Neue Bit y Neue Montreal.
- **Logo**: conseguir el archivo oficial (SVG).
- **Newsletter**: qué proveedor recibe las suscripciones (el programa ya publica en Substack).
- **Origen de los datos**: si los episodios se leen del feed RSS o de YouTube, o si se cargan a mano en un gestor de contenido.
- **Páginas de detalle**: si episodios, textos y noticias viven en el sitio o enlazan a YouTube, Substack y Perpetuo.
- **Temas de los filtros**: confirmar la lista (hoy: Inteligencia artificial, Negocios, Política).
- **Registro a eventos**: enlace externo o formulario propio.
- **Dominio, analítica y avisos legales** (privacidad, cookies).
