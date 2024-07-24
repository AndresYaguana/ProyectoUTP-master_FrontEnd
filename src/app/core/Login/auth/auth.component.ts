import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Usuario } from '../../usuarios/usuarios';

@Component({
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  loginFormulario: FormGroup;
  @Output() userLoggedIn = new EventEmitter<Usuario>();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginFormulario = this.fb.group({
      user_email: [null, Validators.required],
      user_password: [null, Validators.required]
    });
  }

  enviarInicio(): void {
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
  }
  
}
