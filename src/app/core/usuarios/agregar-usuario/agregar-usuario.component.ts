import { Component, OnInit } from '@angular/core';
import { Usuario } from '../usuarios';
import { UsuariosService } from '../usuarios.service';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-agregar-usuario',
  templateUrl: './agregar-usuario.component.html',
  styleUrls: ['./agregar-usuario.component.scss']
})
export class AgregarUsuarioComponent implements OnInit {
  usuarios: Usuario[] = [];
  mostrarFormulario: boolean = false;
  agregarFormulario: FormGroup = new FormGroup({});
  nuevoUsuario: Usuario = { id: 0, email: '', password: '' };

  constructor(
    private fb: FormBuilder,
    private usuarioServicio: UsuariosService, 
    private dialogRef: MatDialogRef<AgregarUsuarioComponent>) {
      this.agregarFormulario = this.fb.group({
        email: [null, [Validators.required, Validators.email]],
        password: [null, Validators.required]
      });
    }

  ngOnInit() : void{
    this.toggleFormulario(); // Inicializa nuevoUsuario cuando se abre el modal
  }

 agregarUsuario(): void {
  if (this.agregarFormulario.valid) {
  const newUser: Usuario = this.agregarFormulario.value;
    this.usuarioServicio.agregarUsuario(newUser).subscribe({
      next: (usuario) => {
        console.log('Usuario agregado:', usuario);
        this.cerrar(); // Cierra el modal después de agregar un usuario
      },
      error: (err) => {
        console.error('Error agregando usuario:', err);
        this.dialogRef.close();
      }
    });
  }else {
    console.error('Formulario no válido');
  }
  };

  cerrar() {
    this.dialogRef.close();
  }

  toggleFormulario() {
    this.mostrarFormulario = !this.mostrarFormulario;
    if (!this.mostrarFormulario) {
      this.nuevoUsuario = { id: 0, email: '', password: '' };
    }
  }
}
