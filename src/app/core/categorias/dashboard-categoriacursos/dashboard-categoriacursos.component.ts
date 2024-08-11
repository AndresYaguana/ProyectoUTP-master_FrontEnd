import { Component, OnInit } from '@angular/core';
import { Curso } from '../../cursos/cursos';
import { ActivatedRoute, Router } from '@angular/router';
import { CursosService } from '../../cursos/cursos.service';

@Component({
  selector: 'app-dashboard-categoriacursos',
  templateUrl: './dashboard-categoriacursos.component.html',
  styleUrls: ['./dashboard-categoriacursos.component.scss']
})
export class DashboardCategoriacursosComponent implements OnInit {
  cursos: Curso[] = [];
  filteredCursos: Curso[] = [];
  searchTerm: string = '';
  idCategoria: number = 0;

  constructor(
    private route: ActivatedRoute,
    private cursosService: CursosService, 
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.idCategoria = +params['idCategoria'];
      this.obtenerCursosPorCategoria();
      this.filteredCursos = this.cursos;
    });
  }

  obtenerCursosPorCategoria() {
    this.cursosService.obtenerCursosPorCategoria(this.idCategoria)
      .subscribe(
        cursos => {
          this.cursos = cursos;
          this.filteredCursos = cursos; // Update filteredCursos after fetching data
          console.log('Cursos obtenidos por categoría:', this.cursos);
        },
        error => {
          console.error('Error al obtener cursos por categoría:', error);
        }
      );
  }

  entrarAlCurso(idCurso: number): void {
    this.router.navigate(['/cursos', idCurso]);
  }

  filterCourses(): void {
    this.filteredCursos = this.cursos.filter(curso => {
      const lowercaseTitle = curso.nombre.toLowerCase();
      return lowercaseTitle.includes(this.searchTerm.toLowerCase());
    });
  }

  onEnter(event: Event): void {
    if ((event as KeyboardEvent).key === 'Enter') {
      this.filterCourses();
    }
  }
}
