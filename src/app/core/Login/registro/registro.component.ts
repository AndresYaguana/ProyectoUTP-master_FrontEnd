import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuariosService } from '../../../core/usuarios/usuarios.service';  
import { Usuario } from '../../../core/usuarios/usuarios';
import { TipoUsuarioService } from '../../usuarios/tipo-usuario/tipo-usuario.service';
import { TipoUsuario } from '../../usuarios/tipo-usuario/tipo-usuario';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.scss'
})
export class RegistroComponent implements OnInit {

  registroFormulario: FormGroup = new FormGroup({});
  //tipousuarios: TipoUsuario[] = [];

  constructor(
    private fb: FormBuilder,
    private usuariosService: UsuariosService,
    //private tipoUsuariosServicio: TipoUsuarioService,
    private router: Router
  ) {
    this.registroFormulario = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
      nombres: [null, Validators.required],
      apellidos: [null, Validators.required],
      //idTipousuario: [0, [Validators.required]],
      urlFoto: [null, Validators.required],
      universidad: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    //this.obtenerTipoUsuarios();
  };

  /*obtenerTipoUsuarios(): void {
    this.tipoUsuariosServicio.obtenerTipousuarioLista().subscribe({
      next: (tipousuarios) => {
        console.log('Tipos Usuarios obtenidos:', tipousuarios); // Verify the data
        this.tipousuarios = tipousuarios;
      },
      error: (err) => console.error('Error obteniendo Tipos Usuarios:', err)
    });
  }*/

  IniciarRegistroForm(): void {
    if (this.registroFormulario.valid) {
      const newUser: Usuario = {
        ...this.registroFormulario.value,
        habilitado: true,
        creadoPor: 'Login',
        fechaCreacion: new Date().toISOString(),
        tipousuario: { idTipousuario: this.registroFormulario.value.idTipousuario }
      };
      
      Swal.fire({
        title: "¿Quieres registrar este nuevo usuario?",
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: "Registrar",
      }).then((result) => {
        if (result.isConfirmed) {
          this.usuariosService.agregarUsuario(newUser).subscribe({
            next: (usuario) => {
              //console.log('Usuario registrado:', usuario);
              Swal.fire("Registrado!", "El Usuario ha sido registrado exitosamente.", "success");
              this.router.navigate(['/']); // Redirigir al inicio u otra página después del registro
            },
            error: (err) => {
              //console.error('Error registrando usuario:', err);
              Swal.fire("Error", "Error al registrar usuario", "error");
            }
          });
        } else if (result.isDenied) {
          Swal.fire("Cambios no guardados", "", "info");
        }
      });
    } else {
      //console.error('Formulario no válido. Verifica los campos.');
      Swal.fire("Formulario no válido", "Por favor verifica los campos del formulario.", "warning");
    }
  }
  
}
