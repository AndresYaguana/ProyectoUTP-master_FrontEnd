
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RippleModule } from 'primeng/ripple';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@NgModule({
    declarations: [],
    imports: [
      CommonModule,
      ButtonModule,
      InputTextModule,
      RippleModule,
      FormsModule,
      ReactiveFormsModule
    ],
    exports: []
  })
  export class CursosModule { }