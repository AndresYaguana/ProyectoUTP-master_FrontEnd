import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Usuario } from '../../usuarios/usuarios';
import { MessageService } from 'primeng/api';

@Component({
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  providers: [MessageService]
})
export class AuthComponent {
  loginFormulario: FormGroup;
  @Output() userLoggedIn = new EventEmitter<Usuario>();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private messageService: MessageService
  ) {
    this.loginFormulario = this.fb.group({
      user_email: [null, Validators.required],
      user_password: [null, Validators.required]
    });
  }

  /*enviarInicio(): void {
    console.log('Form values:', this.loginFormulario.value);
    const email = this.loginFormulario.value.user_email;
    const password = this.loginFormulario.value.user_password;
    this.authService.login(email, password).subscribe(
      response => {
        if (response) {
          this.userLoggedIn.emit(response);
          this.router.navigateByUrl('/Inicio');
          alert("Inicio de sesión exitoso");
        } else {
          console.error('Inicio de sesión fallido. Credenciales incorrectas.');
          alert("Email o contraseña incorrectos");
        }
      },
      error => {
        console.error('Error en la solicitud HTTP:', error);
        alert("Email o contraseña incorrectos");
      }
    );
  }*/

  enviarInicio(): void {
    const email = this.loginFormulario.value.user_email;
    const password = this.loginFormulario.value.user_password;
    this.authService.login(email, password).subscribe(
      response => {
        if (response) {         
          this.userLoggedIn.emit(response);
          this.router.navigateByUrl('/Inicio');
        } else {
          this.showWarn();
        }
      },
      error => {
        this.showError(error);
      }
    );
  }

  /* Mensaje de Datos Incorrectos */
  showWarn() {
    this.messageService.add({ severity: 'warn', summary: 'Datos Incorrectos', detail: 'Email o contraseña incorrectos' });
  };

  /* Mensaje de Error */
  showError(error: any) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Ocurrio un error: ' + error });
  };
  
}
