import { Component, OnInit } from '@angular/core';
import { Usuario } from '../usuarios';
import { UsuariosService } from '../usuarios.service';

@Component({
  selector: 'app-agregar-usuario',
  templateUrl: './agregar-usuario.component.html',
  styleUrls: ['./agregar-usuario.component.scss']
})
export class AgregarUsuarioComponent implements OnInit {
  usuarios: Usuario[] = [];
  mostrarFormulario: boolean = false;
  nuevoUsuario: Usuario = { id: 0, email: '', password: '' };

  constructor(private usuarioServicio: UsuariosService) {}

  ngOnInit() {
    this.obtenerUsuarios();
  }

  private obtenerUsuarios() {
    this.usuarioServicio.obtenerUsuarioLista().subscribe(
      (datos: Usuario[]) => {
        this.usuarios = datos;
      }
    );
  }

  agregarUsuario() {
    this.usuarioServicio.agregarUsuario(this.nuevoUsuario).subscribe({
      next: (usuario) => {
        console.log('Usuario agregado:', usuario);
        // Actualiza la lista de usuarios después de agregar uno nuevo
        this.obtenerUsuarios(); // Asumiendo que esta función actualiza la lista de usuarios
        // Oculta el formulario después de agregar un usuario
        this.mostrarFormulario = false;
      },
      error: (err) => {
        console.error('Error agregando usuario:', err);
      }
    });
  }

  toggleFormulario() {
    this.mostrarFormulario = !this.mostrarFormulario; // Alterna la visibilidad del formulario
    this.nuevoUsuario = { id: 0, email: '', password: '' }; // Reinicia el nuevoUsuario al mostrar/ocultar el formulario
  }
}
