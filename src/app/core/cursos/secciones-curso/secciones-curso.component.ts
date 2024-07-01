import { Component, Input, OnInit } from '@angular/core';
import { Seccion } from './secciones';
import { ActivatedRoute } from '@angular/router';
import { CursosService } from '../cursos.service';

@Component({
  selector: 'app-secciones-curso',
  templateUrl: './secciones-curso.component.html',
  styleUrls: ['./secciones-curso.component.scss']
})
export class SeccionesCursoComponent implements OnInit {
  secciones: Seccion[] = [];
   idCurso: number = 0;

  constructor(
    private route: ActivatedRoute,
    private cursoService: CursosService
  ) { }

  ngOnInit(): void {
    const idCursoParam = this.route.snapshot.paramMap.get('idCurso');
    if (idCursoParam !== null && idCursoParam !== undefined && !isNaN(+idCursoParam)) {
      this.idCurso = +idCursoParam;
    } else {
      // Manejar caso donde idCursoParam no es un número válido
      // Por ejemplo, redireccionar a una página de error o manejar de otra forma
    }
  }

  selectSeccion(seccion: Seccion): void {
    console.log('Seccion seleccionada:', seccion);
  }
}
