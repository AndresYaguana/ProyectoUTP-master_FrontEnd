import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TipoUsuarioComponent } from './tipo-usuario.component'; // Adjust the path if necessary
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';

const routes: Routes = [
    { path: '', component: TipoUsuarioComponent }
  ];
  
  @NgModule({
    declarations: [TipoUsuarioComponent], 
    imports: [
      CommonModule,
      RouterModule.forChild(routes),
    ],
    exports: [TipoUsuarioComponent] 
  })
  export class TipoUsuarioModule { }
  