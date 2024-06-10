import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuariosService } from '../../../core/usuarios/usuarios.service';  
import { Usuario } from '../../../core/usuarios/usuarios';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.scss'
})
export class RegistroComponent implements OnInit {
  /* Variables de Modelo */
  registroFormulario: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private usuariosService: UsuariosService,
    private router: Router
  ) {
    this.registroFormulario = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required]
    });
  }

  ngOnInit(): void {
  };

  /* Función para Inicializar el Formulario de Login */
  IniciarRegistroForm(): void {
    /*this.registroFormulario = this.fb.group({
      //user_usuario: [null, Validators.required],
      user_email: [null, Validators.required],
      user_password: [null, Validators.required]
    });
  };
*/
if (this.registroFormulario.valid) {
  const newUser: Usuario = this.registroFormulario.value;
  this.usuariosService.agregarUsuario(newUser).subscribe({
    next: (usuario) => {
      console.log('Usuario registrado:', usuario);
      this.router.navigate(['/']); // Redirigir al inicio u otra página después del registro
    },
    error: (err) => {
      console.error('Error registrando usuario:', err);
    }
  });
} else {
  console.error('Formulario no válido');
}
};
}
