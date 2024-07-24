import { Curso } from "../../cursos";

export interface Seccion {
  idSeccion: number;
  idCurso: number;
  nombre: string;
  habilitado: boolean;
  creadoPor: string;
  fechaCreacion: string;
  modificadoPor: string;
  fechaModificacion: string;
  curso?: Curso; // Incluye la propiedad curso de tipo Curso
}
