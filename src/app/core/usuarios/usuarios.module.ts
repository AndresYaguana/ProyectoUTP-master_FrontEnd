import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosComponent } from './usuarios.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';

const routes: Routes = [
  { path: '', component: UsuariosComponent }
];
@NgModule({
  declarations: [UsuariosComponent],
  imports: [
    CommonModule,
    ToastModule,
    InputTextModule,
    ButtonModule,
    DropdownModule,
    DialogModule,
    ReactiveFormsModule,
    TableModule,
    FormsModule,
    RouterModule.forChild(routes) // Importa FormsModule aquí
  ],
  exports: [UsuariosComponent]
})
export class UsuariosModule { }