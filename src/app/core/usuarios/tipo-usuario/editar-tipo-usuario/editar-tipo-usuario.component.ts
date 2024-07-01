import { Component, Inject } from '@angular/core';
import { TipoUsuario } from '../tipo-usuario';
import { TipoUsuarioService } from '../tipo-usuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-editar-tipo-usuario',
  templateUrl: './editar-tipo-usuario.component.html',
  styleUrl: './editar-tipo-usuario.component.scss'
})
export class EditarTipoUsuarioComponent {
  tipousuario: TipoUsuario = {idTipousuario: 0, nombre: '',permisos:[], habilitado: false, creadoPor: '', fechaCreacion: '', modificadoPor: '', fechaModificacion: ''};
  idTipousuario:number = 0;

  constructor(
    private tipoUsuarioServicio: TipoUsuarioService, 
    private ruta: ActivatedRoute, 
    private enrutador:Router,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EditarTipoUsuarioComponent>){
    this.idTipousuario = data.idTipousuario;
  }


  ngOnInit(){
    this.tipoUsuarioServicio.obtenerTipousuarioPorId(this.idTipousuario).subscribe(
      {
        next: (datos) => this.tipousuario = datos,
        error: (errores: any) => console.log(errores)
      }
    );
  } 

  onSubmit(){
    console.log('Editando Tipo Usuario:', this.tipousuario); 
    this.guardarTipoUsuario();
  }


  guardarTipoUsuario(){
    Swal.fire({
        title: "¿Quieres guardar los cambios?",
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: "Guardar",
        //showConfirmButton: false,
        //timer: 1500
      }).then((result) => {
        if (result.isConfirmed) {
      this.tipoUsuarioServicio.editarTipousuario(this.idTipousuario, this.tipousuario).subscribe({
        next: (datos) => {
          Swal.fire("Guardado!", "El Tipo Usuario ha sido guardado exitosamente.", "success");
          console.log('Tipo Usuario Editado exitosamente.');
          this.cerrar()
          this.irTipoUsuarioLista();
        },
        error: (errores) => {
          Swal.fire("Error", "Hubo un problema al guardar el Tipo Usuario.", "error");
          console.error('Error al guardar Tipo Usuario:', errores);
        }
      });
    } else if (result.isDenied) {
      Swal.fire("Cambios no guardados", "", "info");
    }
  });
}

irTipoUsuarioLista(){
  this.enrutador.navigate(['/TiposUsuarios'])
}

cerrar() {
  this.dialogRef.close();
}
}
