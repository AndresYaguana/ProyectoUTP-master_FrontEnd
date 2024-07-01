import { Component } from '@angular/core';
import { TipoUsuario } from './tipo-usuario';
import { TipoUsuarioService } from './tipo-usuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { AgregarTipoUsuarioComponent } from './agregar-tipo-usuario/agregar-tipo-usuario.component';
import { EditarTipoUsuarioComponent } from './editar-tipo-usuario/editar-tipo-usuario.component';

@Component({
  selector: 'app-tipo-usuario',
  templateUrl: './tipo-usuario.component.html',
  styleUrl: './tipo-usuario.component.scss'
})
export class TipoUsuarioComponent {
  tipousuario: TipoUsuario[] = [];
  nuevoTipousuario: TipoUsuario = { idTipousuario: 0, nombre: '',permisos:[], habilitado: false, creadoPor: '', fechaCreacion: '',modificadoPor:'',fechaModificacion:'' };

  constructor(
    private tipousuarioServicio: TipoUsuarioService,
    private enrutador: Router,
    private dialog: MatDialog,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.obtenerTipousuario();

  } 
  private obtenerTipousuario() {
    this.tipousuarioServicio.obtenerTipousuarioLista().subscribe(
      (datos: TipoUsuario[]) => {
        console.log(datos);
        this.tipousuario = datos;
      },
      (error) => {
        console.error('Error al obtener la lista de tipo usuarios:', error);
      }
    );
  }

  abrirModalAgregarTipoUsuario() {
    const dialogRef = this.dialog.open(AgregarTipoUsuarioComponent, {
      width: '500px',
      data: {}
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('El modal de agregar tipo usuario se ha cerrado');
    this.obtenerTipousuario();
  });
  }


  editarTipoUsuario(idTipousuario: number) {
    const dialogRef = this.dialog.open(EditarTipoUsuarioComponent, {
      width: '500px',
      data: { idTipousuario: idTipousuario }
  });

    dialogRef.afterClosed().subscribe(result => {
    console.log('El modal de editar categoria se ha cerrado');
    if (result) {
      this.obtenerTipousuario();
    }
    });
  } 

  eliminarTipoUsuario(idTipousuario: number) {
    Swal.fire({
      title: "¿Estás seguro de Eliminar?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, ¡eliminarlo!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.tipousuarioServicio.eliminarTipousuario(idTipousuario).subscribe({
          next: (datos) => {
            this.obtenerTipousuario();
            Swal.fire({
              title: "¡Eliminado!",
              text: "La categoria ha sido eliminado.",
              icon: "success"
            });
          },
          error: (errores) => {
            console.error('Error eliminando categoria:', errores);
            Swal.fire({
              title: "Error",
              text: "Hubo un problema al eliminar la categoria.",
              icon: "error"
            });
          }
        });
      }
    });
  }


}
