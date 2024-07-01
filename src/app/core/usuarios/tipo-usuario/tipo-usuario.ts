export interface TipoUsuario {
    idTipousuario: number;
    nombre: string;
    permisos: string[];
    habilitado: boolean;
    creadoPor: string;
    fechaCreacion: string;
    modificadoPor: string;
    fechaModificacion: string;
  }