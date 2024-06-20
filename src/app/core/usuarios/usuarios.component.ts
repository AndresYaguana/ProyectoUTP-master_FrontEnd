import { Component, OnInit } from '@angular/core';
import { Usuario } from './usuarios';
import { UsuariosService } from './usuarios.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AgregarUsuarioComponent } from './agregar-usuario/agregar-usuario.component';
import { EditarUsuarioComponent } from './editar-usuario/editar-usuario.component';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];
  //mostrarFormulario: boolean = false;
  nuevoUsuario: Usuario = { idUsuario: 0, email: '', password: '',nombres: '', apellidos: '',tipoUsuario: 0, urlFoto: '',universidad: '', habilitado: false, creadoPor: '', fechaCreacion: '',modificadoPor:'',fechaModificacion:''};

  constructor(
    private usuarioServicio: UsuariosService, 
    private enrutador: Router, 
    private dialog: MatDialog,
    private route: ActivatedRoute) {}

  ngOnInit() {
    this.obtenerUsuarios();
  }

  private obtenerUsuarios() {
    this.usuarioServicio.obtenerUsuarioLista().subscribe(
      (datos: Usuario[]) => {
        console.log(datos); // Verificar los datos recibidos
        this.usuarios = datos;
      },
      (error) => {
        console.error('Error al obtener la lista de usuarios:', error);
      }
    );
  }

  abrirModalAgregarUsuario() {
    const dialogRef = this.dialog.open(AgregarUsuarioComponent, {
      width: '500px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('El modal de agregar usuario se ha cerrado');
      this.obtenerUsuarios();
    });
  }

  maskPassword(password: string): string {
    return '*'.repeat(password.length);
  }

  editarUsuarios(idUsuario: number) {
    const dialogRef = this.dialog.open(EditarUsuarioComponent, {
      width: '500px',
      data: { idUsuario: idUsuario }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('El modal de editar usuario se ha cerrado');
      //console.log(idUsuario);
      this.obtenerUsuarios();
    });
  }


  eliminarUsuarios(idUsuario: number) {
    this.usuarioServicio.eliminarUsuario(idUsuario).subscribe(
      {
        next: (datos) => this.obtenerUsuarios(),
        error: (errores: any) => console.log(errores)
      }
    )
  }
}
