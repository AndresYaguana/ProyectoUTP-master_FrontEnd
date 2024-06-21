import { Component, OnInit } from '@angular/core';
import { Curso } from './cursos';
import { CursosService } from './cursos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AgregarCursoComponent } from './agregar-curso/agregar-curso.component';
import { EditarCursoComponent } from './editar-curso/editar-curso.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.scss']
})
export class CursosComponent implements OnInit {
  ruta: string = ''; 
  cursos: Curso[] = [];
  nuevoCurso: Curso = { idCurso: 0, idCategoria: 0, nombre: '', ruta: '', urlImage: '', descripcion:'', habilitado: false, creadoPor: '', fechaCreacion: '',modificadoPor:'',fechaModificacion:'' };

  constructor(
    private cursoServicio: CursosService,
    private enrutador: Router,
    private dialog: MatDialog,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.obtenerCursos();
    this.route.paramMap.subscribe(params => {
      this.ruta = params.get('ruta') || '';
    });
  }

  private obtenerCursos() {
    this.cursoServicio.obtenerCursoLista().subscribe(
      (datos: Curso[]) => {
        console.log(datos);
        this.cursos = datos;
      },
      (error) => {
        console.error('Error al obtener la lista de usuarios:', error);
      }
    );
  }

  abrirModalAgregarCurso() {
    const dialogRef = this.dialog.open(AgregarCursoComponent, {
      width: '500px',
      data: {}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('El modal de agregar usuario se ha cerrado');
      this.obtenerCursos();
    });
  }

  editarCursos(idCurso: number) {
    const dialogRef = this.dialog.open(EditarCursoComponent, {
      width: '500px',
      data: { idCurso: idCurso }
    });
    dialogRef.afterClosed().subscribe(result => {
    console.log('El modal de editar curso se ha cerrado');
    if (result) {
      this.obtenerCursos();
    }
    });
  }


  eliminarCursos(idCurso: number) {
    Swal.fire({
      title: "¿Estás seguro de Eliminar el Curso?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, ¡eliminarlo!"
    }).then((result) => {
      if (result.isConfirmed) {  
    this.cursoServicio.eliminarCurso(idCurso).subscribe({
        next: (datos) => {
          this.obtenerCursos();
          Swal.fire({
            title: "¡Eliminado!",
            text: "El Curso ha sido eliminado.",
            icon: "success"
          });
        },
        error: (errores) => {
          console.error('Error eliminando Curso:', errores);
          Swal.fire({
            title: "Error",
            text: "Hubo un problema al eliminar el Curso.",
            icon: "error"
          });
        }
      });
    }
  });
}


}
