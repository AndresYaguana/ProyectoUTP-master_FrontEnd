import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CursosComponent } from './cursos.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardCursoComponent } from './dashboard-curso/dashboard-curso.component';
import { DashboardCursoPipe } from './dashboard-curso/dashboard-curso.pipe';
const routes: Routes = [
  { path: '', component: CursosComponent }
];
@NgModule({
  declarations: [CursosComponent,],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [CursosComponent,]
})
export class CursosModule { }