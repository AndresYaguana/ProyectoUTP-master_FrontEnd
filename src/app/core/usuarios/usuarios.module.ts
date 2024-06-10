import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosComponent } from './usuarios.component';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  { path: '', component: UsuariosComponent }
];
@NgModule({
  declarations: [UsuariosComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes) // Importa FormsModule aquí
  ],
  exports: [UsuariosComponent]
})
export class UsuariosModule { }