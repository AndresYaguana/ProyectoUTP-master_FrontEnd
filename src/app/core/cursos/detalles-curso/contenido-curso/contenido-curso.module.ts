import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { ContenidoCursoComponent } from './contenido-curso.component';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';

const routes: Routes = [
  { path: '', component: ContenidoCursoComponent }
];
@NgModule({
  declarations: [ContenidoCursoComponent,
  ],
  imports: [
    CommonModule,
    ToastModule,
    InputTextModule,
    DropdownModule,
    DialogModule,
    ButtonModule,
    TableModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    FormsModule
  ],
  exports: [ContenidoCursoComponent,
  ]
})
export class ContenidoCursoModule { } // Adjust the module name as needed
