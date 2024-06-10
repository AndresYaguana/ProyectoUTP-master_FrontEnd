import { NgModule } from '@angular/core';

import { ForgetPasswordRoutingModule } from './forget-password-routing.module';
import { ForgetPasswordComponent } from './forget-password.component';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { PasswordModule } from 'primeng/password';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ForgetPasswordComponent],
  imports: [
    ButtonModule,
    InputTextModule,
    RippleModule,
    PasswordModule,
    FormsModule,
    ReactiveFormsModule,
    ForgetPasswordRoutingModule
  ]
})
export class ForgetPasswordModule { }
