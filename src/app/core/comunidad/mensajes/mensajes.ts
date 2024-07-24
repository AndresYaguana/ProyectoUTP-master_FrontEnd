import { Usuario } from '../../usuarios/usuarios';

export interface Mensaje {
    idMensaje: number;
    emisor: Usuario;
    receptor: Usuario;
    contenido: string;
    fechaEnvio: string;
    habilitado: boolean;
}