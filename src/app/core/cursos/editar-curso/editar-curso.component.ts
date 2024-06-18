import { Component } from '@angular/core';
import { Curso } from '../cursos';
import { CursosService } from '../cursos.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-editar-curso',
  //standalone: true,
  //imports: [],
  templateUrl: './editar-curso.component.html',
  styleUrl: './editar-curso.component.scss'
})
export class EditarCursoComponent {
  curso: Curso = {idCurso: 0, nombre: '', ruta: '', urlImage: '', descripcion: '', habilitado: false, creadoPor: '', fechaCreacion: '', modificadoPor: '', fechaModificacion: ''};
  idCurso:number = 0;

  constructor(private cursoServicio: CursosService, private ruta: ActivatedRoute, private enrutador:Router){}

  ngOnInit(){
    this.idCurso= this.ruta.snapshot.params['idCurso'];
    this.cursoServicio.obtenerCursoPorId(this.idCurso).subscribe(
      {
        next: (datos) => this.curso = datos,
        error: (errores: any) => console.log(errores)
      }
    );
  }

  onSubmit(){
    this.guardarCurso();
  }

  guardarCurso(){
    this.cursoServicio.editarCurso(this.idCurso, this.curso).subscribe(
      {
        next: (datos) => this.irCursoLista(),
        error: (errores) => console.log(errores)

      }
    );
  }

  irCursoLista(){
    this.enrutador.navigate(['/Cursos'])
  }

}
