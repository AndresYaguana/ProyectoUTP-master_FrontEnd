import { Component, Inject } from '@angular/core';
import { Curso } from '../cursos';
import { CursosService } from '../cursos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-editar-curso',
  //standalone: true,
  //imports: [FormsModule],
  templateUrl: './editar-curso.component.html',
  styleUrl: './editar-curso.component.scss'
})
export class EditarCursoComponent {
  curso: Curso = {idCurso: 0, idCategoria: 0, nombre: '', ruta: '', urlImage: '', descripcion: '', habilitado: false, creadoPor: '', fechaCreacion: '', modificadoPor: '', fechaModificacion: ''};
  id:number = 0;
  //dialogRef: any;

  constructor(
    private cursoServicio: CursosService, 
    private ruta: ActivatedRoute, 
    private enrutador:Router,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EditarCursoComponent>){
    this.id = data.idCurso;
  }

  ngOnInit(){
    this.cursoServicio.obtenerCursoPorId(this.id).subscribe(
      {
        next: (datos) => this.curso = datos,
        error: (errores: any) => console.log(errores)
      }
    );
  } 

  onSubmit(){
    console.log('Editando curso:', this.curso); 
    this.guardarCurso();
  }

  guardarCurso(){
    Swal.fire({
      title: "¿Quieres guardar los cambios?",
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: "Guardar",
      //showConfirmButton: false,
      //timer: 1500
    }).then((result) => {
      if (result.isConfirmed) {
    this.cursoServicio.editarCurso(this.id, this.curso).subscribe({
      next: (datos) => {
        Swal.fire("Guardado!", "El Curso ha sido guardado exitosamente.", "success");
        console.log('Curso Editado exitosamente.');
        this.cerrar()
        this.irCursoLista();
      },
      error: (errores) => {
        Swal.fire("Error", "Hubo un problema al guardar el curso.", "error");
        console.error('Error al guardar curso:', errores);
      }
    });
  } else if (result.isDenied) {
    Swal.fire("Cambios no guardados", "", "info");
  }
});
  }

  irCursoLista(){
    this.enrutador.navigate(['/Cursos'])
  }

  cerrar() {
    this.dialogRef.close();
  }
}
