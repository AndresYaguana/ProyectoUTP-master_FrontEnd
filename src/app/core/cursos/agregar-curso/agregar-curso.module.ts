
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Importa FormsModule
import { RippleModule } from 'primeng/ripple';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { AgregarCursoComponent } from './agregar-curso.component';

@NgModule({
    declarations: [],
    imports: [
      CommonModule,
      ButtonModule,
      InputTextModule,
      RippleModule,
      FormsModule
    ],
    exports: []
  })
  export class CursosModule { }