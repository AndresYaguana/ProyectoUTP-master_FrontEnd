import { Component, OnInit } from '@angular/core';
import { Curso } from './cursos';
import { CursosService } from './cursos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AgregarCursoComponent } from './agregar-curso/agregar-curso.component';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.scss']
})
export class CursosComponent implements OnInit {
  ruta: string = ''; // Inicializar la propiedad
  cursos: Curso[] = [];
  mostrarFormulario: boolean = false;

  constructor(
    private cursoServicio: CursosService,
    private enrutador: Router,
    private dialog: MatDialog,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.obtenerUsuarios();
    this.route.paramMap.subscribe(params => {
      this.ruta = params.get('ruta') || ''; // Asignar un valor por defecto si es nulo
    });
  }

  private obtenerUsuarios() {
    this.cursoServicio.obtenerCursoLista().subscribe(
      (datos: Curso[]) => {
        console.log(datos); // Verificar los datos recibidos
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
      this.obtenerUsuarios();
    });
  }

}