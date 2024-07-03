// dashboard-curso.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DashboardCursoComponent } from './dashboard-curso.component';

const routes = [
  { path: '', component: DashboardCursoComponent }
];

@NgModule({
  declarations: [
    DashboardCursoComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule
  ]
})
export class DashboardCursoModule { }
