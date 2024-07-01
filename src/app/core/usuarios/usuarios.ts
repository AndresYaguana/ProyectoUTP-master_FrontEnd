import { TipoUsuario } from "./tipo-usuario/tipo-usuario";

export interface Usuario {
  idUsuario: number;
  email: string;
  password: string;
  nombres: string;
  apellidos: string;
  idTipousuario: number;
  urlFoto: string;
  universidad: string;
  habilitado: boolean;
  creadoPor: string;
  fechaCreacion: string;
  modificadoPor: string;
  fechaModificacion: string;
  tipousuario: TipoUsuario;
  // Otros campos según la estructura de tus datos de usuario
}