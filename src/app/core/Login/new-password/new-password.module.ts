import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewPasswordRoutingModule } from './new-password-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { NewPasswordComponent } from './new-password.component';


@NgModule({
  declarations: [NewPasswordComponent],
  imports: [
    ButtonModule,
    InputTextModule,
    RippleModule,
    PasswordModule,
    FormsModule,
    ReactiveFormsModule,
    NewPasswordRoutingModule
  ]
})
export class NewPasswordModule { }
