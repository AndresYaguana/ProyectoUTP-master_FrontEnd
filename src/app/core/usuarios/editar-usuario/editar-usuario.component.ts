import { Component, Inject, OnInit } from '@angular/core';
import { Usuario } from '../usuarios';
import { UsuariosService } from '../usuarios.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { switchMap } from 'rxjs';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-editar-usuario',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.scss']
})
export class EditarUsuarioComponent implements OnInit {

  idUsuario: number = 0;
  usuario: Usuario = { idUsuario: 0, email: '', password: '',nombres: '', apellidos: '',idTipousuario: 0, urlFoto: '',universidad: '', habilitado: false, creadoPor: '', fechaCreacion: '',modificadoPor:'',fechaModificacion:'',tipousuario: { idTipousuario: 0, nombre: '',permisos:[], habilitado: false, creadoPor: '', fechaCreacion: '',modificadoPor:'',fechaModificacion:'' } };

  constructor(
    private usuariosServicio: UsuariosService,
    private ruta: ActivatedRoute,
    private enrutador: Router,
    private dialogRef: MatDialogRef<EditarUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.idUsuario = data.idUsuario;
  }

  ngOnInit() {
    this.usuariosServicio.obtenerUsuarioPorId(this.idUsuario).subscribe(
    {
      next: (datos) => this.usuario = datos,
      error: (error: any) => console.log(error)// Verificar usuario obtenido
    });
  }

  onSubmit() {
    console.log('Editando usuario:', this.usuario); // Verificar datos del usuario antes de guardar
    this.guardarUsuario();
  }

  guardarUsuario() {
    Swal.fire({
      title: "¿Quieres guardar los cambios?",
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: "Guardar",
      //showConfirmButton: false,
      //timer: 1500
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuariosServicio.editarUsuario(this.idUsuario, this.usuario).subscribe({
          next: (datos) => {
            Swal.fire("Guardado!", "El Usuario ha sido guardado exitosamente.", "success");
            console.log('Usuario guardado exitosamente.');
            this.cerrar();
            this.irUsuarioLista();
          },
          error: (errores) => {
            Swal.fire("Error", "Hubo un problema al guardar el usuario.", "error");
            console.error('Error al guardar usuario:', errores);
          }
        });
      } else if (result.isDenied) {
        Swal.fire("Cambios no guardados", "", "info");
      }
    });
  }
  

  irUsuarioLista() {
    this.enrutador.navigate(['/Usuarios']);
  }

  cerrar() {
    this.dialogRef.close();
  }

}
