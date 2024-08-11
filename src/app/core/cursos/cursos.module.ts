import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CursosComponent } from './cursos.component';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ToastModule } from 'primeng/toast';

const routes: Routes = [
  { path: '', component: CursosComponent }
];
@NgModule({
  declarations: [CursosComponent,],
  imports: [
    CommonModule,
    ButtonModule,
    TableModule,
    DialogModule,
    ReactiveFormsModule,
    FormsModule,
    DropdownModule,
    InputTextModule,
    InputTextareaModule,
    ToastModule,
    RouterModule.forChild(routes)
  ],
  exports: [CursosComponent,]
})
export class CursosModule { }