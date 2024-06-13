export interface Usuario {
  idUsuario: number;
  email: string;
  password: string;
  nombres: string;
  apellidos: string;
  tipoUsuario: number;
  urlFoto: string;
  universidad: string;
  habilitado: boolean;
  creadoPor: string;
  fechaCreacion: string;
  modificadoPor: string;
  fechaModificacion: string;
  // Otros campos según la estructura de tus datos de usuario
}