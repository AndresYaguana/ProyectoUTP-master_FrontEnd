import { Component, OnInit } from '@angular/core';
import { Curso } from '../cursos';
import { CursosService } from '../cursos.service';
import { Router } from '@angular/router';
import { Seccion } from '../detalles-curso/secciones-curso/secciones';
import { Contenido } from '../detalles-curso/contenido-curso/contenido';

@Component({
  selector: 'app-dashboard-curso',
  templateUrl: './dashboard-curso.component.html',
  styleUrl: './dashboard-curso.component.scss'
})
export class DashboardCursoComponent implements OnInit{
  cursos: Curso[] = []
  filteredCursos: Curso[] = [];
  searchTerm: string = '';
  selectedCurso: Curso | null = null;
  secciones: Seccion[] = [];
  contenidos: Contenido[] = []; 

  constructor(private cursoService: CursosService, private router: Router) { }

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

  entrarAlCurso(idCurso: number): void {
    this.router.navigate(['/cursos', idCurso]);
  }

  cargarSecciones(idCurso: number): void {
    this.cursoService.obtenerSeccionesCurso(idCurso).subscribe(secciones => {
      this.secciones = secciones;
    });
  }



}
