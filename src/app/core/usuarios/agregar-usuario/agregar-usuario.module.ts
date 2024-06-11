import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Importa FormsModule
import { AgregarUsuarioComponent } from './agregar-usuario.component';
import { PasswordModule } from 'primeng/password';
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
    PasswordModule,
    FormsModule
  ],
  exports: []
})
export class UsuariosModule { }
