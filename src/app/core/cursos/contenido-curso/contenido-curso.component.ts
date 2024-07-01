import { Component, Input } from '@angular/core';
import { Contenido } from './contenido';

@Component({
  selector: 'app-contenido-curso',
  templateUrl: './contenido-curso.component.html',
  styleUrl: './contenido-curso.component.scss'
})
export class ContenidoCursoComponent {

  @Input() contenido: Contenido[] = [];
}
