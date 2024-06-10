import { NgModule } from '@angular/core';
import { VerificationComponent } from './verification.component';
import { VerificationRoutingModule } from './verification-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { InputOtpModule } from 'primeng/inputotp';
import { InputNumberModule } from 'primeng/inputnumber';



@NgModule({
  declarations: [VerificationComponent],
  imports: [
    ButtonModule,
    InputTextModule,
    InputOtpModule,
    InputNumberModule,
    RippleModule,
    PasswordModule,
    FormsModule,
    ReactiveFormsModule,
    VerificationRoutingModule
  ]
})
export class VerificationModule { }
