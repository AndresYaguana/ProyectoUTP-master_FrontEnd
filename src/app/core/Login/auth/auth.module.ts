import { NgModule } from '@angular/core';
import { AuthComponent } from './auth.component';
import { AuthRoutingModule } from './auth-routing.module';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';



@NgModule({
  declarations: [AuthComponent],
  imports: [
    ButtonModule,
    InputTextModule,
    RippleModule,
    PasswordModule,
    FormsModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    ToastModule
  ]
})
export class AuthModule { }
