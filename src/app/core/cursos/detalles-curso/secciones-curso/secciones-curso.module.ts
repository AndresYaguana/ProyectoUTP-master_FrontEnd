import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms'; // If needed
import { SeccionesCursoComponent } from './secciones-curso.component';

const routes: Routes = [
  { path: '', component: SeccionesCursoComponent }
];
@NgModule({
  declarations: [SeccionesCursoComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule
  ],
  exports: [SeccionesCursoComponent,
  ]
})
export class SeccionesCursoModule { } // Adjust the module name as needed
