import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CategoriasComponent } from './categorias.component'; // Adjust the path if necessary
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';

const routes: Routes = [
  { path: '', component: CategoriasComponent }
];

@NgModule({
  declarations: [CategoriasComponent], 
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  exports: [CategoriasComponent] 
})
export class CategoriasModule { }
