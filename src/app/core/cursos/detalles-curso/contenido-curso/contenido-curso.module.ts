import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms'; 
import { ContenidoCursoComponent } from './contenido-curso.component';

const routes: Routes = [
  { path: '', component: ContenidoCursoComponent }
];
@NgModule({
  declarations: [ContenidoCursoComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule
  ],
  exports: [ContenidoCursoComponent,
  ]
})
export class ContenidoCursoModule { } // Adjust the module name as needed
