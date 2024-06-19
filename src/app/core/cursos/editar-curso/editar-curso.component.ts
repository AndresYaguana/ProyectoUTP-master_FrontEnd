import { Component, Inject } from '@angular/core';
import { Curso } from '../cursos';
import { CursosService } from '../cursos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-editar-curso',
  //standalone: true,
  //imports: [],
  templateUrl: './editar-curso.component.html',
  styleUrl: './editar-curso.component.scss'
})
export class EditarCursoComponent {
  curso: Curso = {idCurso: 0, nombre: '', ruta: '', urlImage: '', descripcion: '', habilitado: false, creadoPor: '', fechaCreacion: '', modificadoPor: '', fechaModificacion: ''};
  id:number = 0;
  dialogRef: any;

  constructor(private cursoServicio: CursosService, private ruta: ActivatedRoute, private enrutador:Router,@Inject(MAT_DIALOG_DATA) public data: any){
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
    this.cursoServicio.editarCurso(this.id, this.curso).subscribe({
      next: (datos) => {
        console.log('Curso Editado exitosamente.');
        this.irCursoLista();
      },
      error: (errores) => console.log(errores)

      });
  }

  irCursoLista(){
    this.enrutador.navigate(['/Cursos'])
  }

  cerrar() {
    this.dialogRef.close();
  }
}
