import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TipoUsuarioComponent } from './tipo-usuario.component'; // Adjust the path if necessary
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';

import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ToastModule } from 'primeng/toast';

const routes: Routes = [
    { path: '', component: TipoUsuarioComponent }
  ];
  
  @NgModule({
    declarations: [TipoUsuarioComponent], 
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
      RouterModule.forChild(routes),
    ],
    exports: [TipoUsuarioComponent] 
  })
  export class TipoUsuarioModule { }
  