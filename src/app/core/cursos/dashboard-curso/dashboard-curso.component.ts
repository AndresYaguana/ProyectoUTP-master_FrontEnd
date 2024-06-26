import { Component } from '@angular/core';
import { Curso } from '../cursos';
import { CursosService } from '../cursos.service';

@Component({
  selector: 'app-dashboard-curso',
  //standalone: true,
  //imports: [],
  templateUrl: './dashboard-curso.component.html',
  styleUrl: './dashboard-curso.component.scss'
})
export class DashboardCursoComponent {
  cursos: Curso[] = []
  filteredCursos: Curso[] = [];
  searchTerm: string = '';

  constructor(private cursoService: CursosService) { }

  ngOnInit(): void {
    this.cursoService.obtenerCursoLista().subscribe(cursos => {
      this.cursos = cursos;
      this.filteredCursos = this.cursos; // Mostrar inicialmente todos los cursos
    });
  }

  filterCourses(): void {
    this.filteredCursos = this.cursos.filter(curso => {
      const lowercaseTitle = curso.nombre.toLowerCase();
      return lowercaseTitle.includes(this.searchTerm.toLowerCase());
    });
  }

  onEnter(event: Event): void { // Can accept any Event type initially
    if ((event as KeyboardEvent).key === 'Enter') {
      // Trigger course filtering here
      this.filterCourses();
    }
  }

}
