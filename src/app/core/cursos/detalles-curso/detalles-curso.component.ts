import { Component } from '@angular/core';
import { Seccion } from './secciones-curso/secciones';
import { Contenido } from './contenido-curso/contenido';
import { ActivatedRoute } from '@angular/router';
import { CursosService } from '../cursos.service';

@Component({
  selector: 'app-detalles-curso',
  templateUrl: './detalles-curso.component.html',
  styleUrl: './detalles-curso.component.scss'
})
export class DetallesCursoComponent {
  secciones: Seccion[] = [];
  idCurso: number = 0;
  contenido: { [key: number]: Contenido[] } = {};
  seccionExpandida: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private cursoService: CursosService
  ) { }

  ngOnInit(): void {
    const idCursoParam = this.route.snapshot.paramMap.get('idCurso');
    if (idCursoParam !== null && idCursoParam !== undefined && !isNaN(+idCursoParam)) {
      this.idCurso = +idCursoParam;
      this.obtenerSeccionesYContenido(this.idCurso);
    } else {
      console.error('Invalid idCursoParam:', idCursoParam);
    }
  }

  obtenerSeccionesYContenido(idCurso: number): void {
    this.cursoService.obtenerSeccionesCurso(idCurso).subscribe(
      (data: Seccion[]) => {
        this.secciones = data;
        this.secciones.forEach(seccion => {
          this.obtenerContenidoSeccion(seccion.idSeccion);
        });
      },
      (error) => {
        console.error('Error al obtener las secciones del curso:', error);
      }
    );
  }

  obtenerContenidoSeccion(idSeccion: number): void {
    this.cursoService.obtenerContenidoSeccion(idSeccion).subscribe(
      (data: Contenido[]) => {
        this.contenido[idSeccion] = data;
      },
      (error) => {
        console.error('Error al obtener el contenido de la sección:', error);
      }
    );
  }
}
