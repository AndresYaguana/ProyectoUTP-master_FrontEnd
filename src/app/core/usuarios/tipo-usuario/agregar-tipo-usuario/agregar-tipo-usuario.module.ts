import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
      FormsModule
    ],
    exports: []
  })
  export class TipoUsuarioModule { }