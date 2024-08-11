import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule,ReactiveFormsModule } from '@angular/forms'; // If needed
import { SeccionesCursoComponent } from './secciones-curso.component';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';

const routes: Routes = [
  { path: '', component: SeccionesCursoComponent }
];
@NgModule({
  declarations: [SeccionesCursoComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ToastModule,
    ButtonModule,
    TableModule,
    ReactiveFormsModule,
    DialogModule,
    DropdownModule,
    InputTextModule,
  ],
  exports: [SeccionesCursoComponent,
  ]
})
export class SeccionesCursoModule { } // Adjust the module name as needed
