import { Component, OnInit } from '@angular/core';
import { Curso } from '../../cursos/cursos';
import { ActivatedRoute } from '@angular/router';
import { CursosService } from '../../cursos/cursos.service';

@Component({
  selector: 'app-dashboard-categoriacursos',
  templateUrl: './dashboard-categoriacursos.component.html',
  styleUrls: ['./dashboard-categoriacursos.component.scss']
})
export class DashboardCategoriacursosComponent implements OnInit {
  cursos: Curso[] = [];
  idCategoria: number = 0;

  constructor(
    private route: ActivatedRoute,
    private cursosService: CursosService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.idCategoria = +params['idCategoria'];
      this.obtenerCursosPorCategoria();
    });
  }

  obtenerCursosPorCategoria() {
    this.cursosService.obtenerCursosPorCategoria(this.idCategoria)
      .subscribe(
        cursos => {
          this.cursos = cursos;
          console.log('Cursos obtenidos por categoría:', this.cursos);
        },
        error => {
          console.error('Error al obtener cursos por categoría:', error);
        }
      );
  }
}
