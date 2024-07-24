import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Mensaje } from '../mensajes/mensajes';
import { MensajesService } from '../mensajes/mensajes.service';
import { Usuario } from '../../usuarios/usuarios';
import { AuthService } from '../../Login/auth/auth.service';

@Component({
  selector: 'app-foro',
  templateUrl: './foro.component.html',
  styleUrls: ['./foro.component.scss']
})
export class ForoComponent implements OnInit {
  mensajes: Mensaje[] = [];
  nuevoMensaje: string = '';
  archivo: File | undefined = undefined;
  usuario: Usuario | null = null;
  receptorId: number = 1;

  @ViewChild('fileInput') fileInput: ElementRef<HTMLInputElement> | undefined;

  constructor(
    private mensajesService: MensajesService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.usuario = this.authService.getLoggedInUser();
    if (this.usuario) {
      this.cargarMensajes();
    }
  }

  cargarMensajes() {
    this.mensajesService.obtenerTodosLosMensajes().subscribe(
      (mensajes: Mensaje[]) => {
        this.mensajes = mensajes;
      },
      (error) => {
        console.error('Error al cargar mensajes:', error);
      }
    );
  }

  enviarMensaje() {
    if (this.usuario && this.receptorId) {
      const nuevoMensaje: Mensaje = {
        idMensaje: 0,
        emisor: this.usuario,
        receptor: { 
          idUsuario: this.receptorId, 
          email: '', 
          password: '', 
          nombres: '', 
          apellidos: '', 
          idTipousuario: 0, 
          urlFoto: '', 
          universidad: '', 
          habilitado: false, 
          creadoPor: '', 
          fechaCreacion: '', 
          modificadoPor: '', 
          fechaModificacion: '', 
          tipousuario: { 
            idTipousuario: 0, 
            nombre: '', 
            permisos:[], 
            habilitado: false, 
            creadoPor: '', 
            fechaCreacion: '', 
            modificadoPor:'', 
            fechaModificacion:'' 
          }  
        },
        contenido: this.nuevoMensaje,
        fechaEnvio: new Date().toISOString(),
        habilitado: true
      };
  
      this.mensajesService.enviarMensaje(nuevoMensaje).subscribe(
        (mensaje: Mensaje) => {
          this.mensajes.push(mensaje);
          this.nuevoMensaje = '';
        },
        (error) => {
          console.error('Error al enviar mensaje:', error);
        }
      );
    }
  }

  esMensajeEnviado(mensaje: Mensaje): boolean {
    return this.usuario ? mensaje.emisor.idUsuario === this.usuario.idUsuario : false;
  }
}