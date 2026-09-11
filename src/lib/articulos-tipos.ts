/**
 * Las secciones son las de Perpetuo y salen del calendario editorial fijo:
 * lunes = Estelar, miércoles = Anteojos, viernes = El Creativo. Cuando no se
 * sabe la fecha de un texto queda «Sin clasificar» hasta que alguien la ponga.
 */
export const SECCIONES = ["Estelar", "Anteojos", "El Creativo", "Sin clasificar"] as const;

export type Seccion = (typeof SECCIONES)[number];

/** Si el texto estaba abierto o era sólo para suscriptores cuando salió. */
export type Acceso = "abierto" | "suscriptores";
