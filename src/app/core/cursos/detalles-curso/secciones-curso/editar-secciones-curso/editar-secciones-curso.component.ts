import { Component, Inject, OnInit } from '@angular/core';
import { Seccion } from '../secciones';
import { SeccionService } from '../secciones-curso.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2'
import { Curso } from '../../../cursos';
import { CursosService } from '../../../cursos.service';

@Component({
  selector: 'app-editar-secciones-curso',
  templateUrl: './editar-secciones-curso.component.html',
  styleUrl: './editar-secciones-curso.component.scss'
})
export class EditarSeccionesCursoComponent implements OnInit{
 seccion: Seccion ={idSeccion: 0, idCurso: 0, nombre: '', habilitado: false, creadoPor: '', fechaCreacion: '', modificadoPor: '', fechaModificacion: '' }
 cursos: Curso[] = [];
 id:number = 0;
 constructor(
  private seccionServicio: SeccionService, 
  private cursoServicio: CursosService,
  private ruta: ActivatedRoute, 
  private enrutador: Router,
  @Inject(MAT_DIALOG_DATA) public data: any,
  public dialogRef: MatDialogRef<EditarSeccionesCursoComponent>){
  this.id = data.idSeccion;
}

ngOnInit(){
  this.seccionServicio.obtenerSeccionPorId(this.id).subscribe(
    {
      next: (datos) => this.seccion = datos,
      error: (errores: any) => console.log(errores)
    }
  );

  this.obtenerCursos();
} 

obtenerCursos(): void {
  this.cursoServicio.obtenerCursoLista().subscribe({
    next: (cursos) => {
      console.log('Cursos obtenidas:', cursos); // Verify the data
      this.cursos = cursos;
    },
    error: (err) => console.error('Error obteniendo cursos:', err)
  });
}
onSubmit(){
  console.log('Editando seccion:', this.seccion); 
  this.guardarSeccion();
}

guardarSeccion(){
  this.seccion.modificadoPor = 'U20244131'; // Establecer el usuario que modifica
  this.seccion.fechaModificacion = new Date().toISOString();
  curso: { idCurso: this.id };
   // Establecer la fecha de modificación
  Swal.fire({
    title: "¿Quieres guardar los cambios?",
    showDenyButton: false,
    showCancelButton: true,
    confirmButtonText: "Guardar",
    //showConfirmButton: false,
    //timer: 1500
  }).then((result) => {
    if (result.isConfirmed) {
  this.seccionServicio.editarSeccion(this.id, this.seccion).subscribe({
    next: (datos) => {
      Swal.fire("Guardado!", "La seccion ha sido guardado exitosamente.", "success");
      console.log('Curso Editado exitosamente.');
      this.cerrar()
      this.irSeccionLista();
    },
    error: (errores) => {
      Swal.fire("Error", "Hubo un problema al guardar la seccion.", "error");
      console.error('Error al guardar seccion:', errores);
    }
  });
} else if (result.isDenied) {
  Swal.fire("Cambios no guardados", "", "info");
}
});
}

irSeccionLista(){
  this.enrutador.navigate(['/GestionSeccion'])
}

cerrar() {
  this.dialogRef.close();
}
}

