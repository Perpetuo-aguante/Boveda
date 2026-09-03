export const SECCIONES = [
  "Crónica",
  "Ensayo",
  "Perfil",
  "Literatura",
  "Reportaje",
  "Discurso",
  "Manifiesto",
] as const;

export type Seccion = (typeof SECCIONES)[number];
