import { Component, OnInit } from '@angular/core';
import { Usuario } from './usuarios';
import { UsuariosService } from './usuarios.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AgregarUsuarioComponent } from './agregar-usuario/agregar-usuario.component';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];
  //mostrarFormulario: boolean = false;
  //nuevoUsuario: Usuario = { id: 0, email: '', password: '' };

  constructor(private usuarioServicio: UsuariosService, private enrutador: Router,private dialog: MatDialog) {}

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

  editarUsuarios(id: number) {
    this.enrutador.navigate(['editar-usuario', id]);
  }

  eliminarUsuarios(id: number) {
    this.usuarioServicio.eliminarUsuario(id).subscribe(
      {
        next: (datos) => this.obtenerUsuarios(),
        error: (errores: any) => console.log(errores)
      }
    )
  }
  abrirModalAgregarUsuario() {
    const dialogRef = this.dialog.open(AgregarUsuarioComponent, {
      width: '500px', // Ajusta el ancho y otras propiedades según tus necesidades
      data: {} // Puedes pasar datos al modal si es necesario
    });

    dialogRef.afterClosed().subscribe(result => {
      // Aquí puedes agregar lógica para manejar el resultado del modal si es necesario
      console.log('El modal de agregar usuario se ha cerrado');
      // Actualiza la lista de usuarios después de cerrar el modal si es necesario
      this.obtenerUsuarios();
    });
  }
}
