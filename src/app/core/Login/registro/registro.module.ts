import { NgModule } from '@angular/core';
import { RegistroComponent } from './registro.component';
import { RegistroRoutingModule } from './registro-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';




@NgModule({
  declarations: [RegistroComponent],
  imports: [
    ButtonModule,
    InputTextModule,
    RippleModule,
    PasswordModule,
    FormsModule,
    ReactiveFormsModule,
    RegistroRoutingModule,
    DropdownModule
  ]
})
export class RegistroModule { }
