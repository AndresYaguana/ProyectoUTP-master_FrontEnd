import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { UsuariosService } from '../../usuarios/usuarios.service';

@Component({
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {

  loginFormulario: FormGroup;
  @Output() userLoggedIn = new EventEmitter<string>();
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private userService: UsuariosService
  ) {
    this.loginFormulario = this.fb.group({
      user_email: [null, Validators.required],
      user_password: [null, Validators.required]
    });
  }
  enviarInicio(): void {
    //console.log('Enviando inicio...');
    
    const email = this.loginFormulario.value.user_email;
    const password = this.loginFormulario.value.user_password;
    
    //console.log('Email:', email); // Agregar esta impresión
    //console.log('Contraseña:', password); // Agregar esta impresión
  
    this.authService.login(email, password).subscribe(
      response => {
        //console.log('Respuesta del backend:', response); // Agregar esta impresión
        // Manejar la respuesta del backend
        if (response) {
          //console.log('Inicio de sesión exitoso.');
          //console.log('Enviando inicio...');
          const email = this.loginFormulario.get('user_email')!.value;
          this.userLoggedIn.emit(email);
          this.userService.setUser(email);
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
