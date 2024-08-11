import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CategoriasComponent } from './categorias.component'; // Adjust the path if necessary
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';

const routes: Routes = [
  { path: '', component: CategoriasComponent }
];

@NgModule({
  declarations: [CategoriasComponent], 
  imports: [
    CommonModule,
    FormsModule,
    ToastModule,
    InputTextModule,
    DropdownModule,
    DialogModule,
    ButtonModule,
    TableModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
  exports: [CategoriasComponent] 
})
export class CategoriasModule { }
