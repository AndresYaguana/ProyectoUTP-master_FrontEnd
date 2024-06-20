import { Component, OnInit } from '@angular/core';
import { Usuario } from '../usuarios';
import { UsuariosService } from '../usuarios.service';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-usuario',
  templateUrl: './agregar-usuario.component.html',
  styleUrls: ['./agregar-usuario.component.scss']
})
export class AgregarUsuarioComponent implements OnInit {
  
  mostrarFormulario: boolean = false;
  agregarFormulario: FormGroup = new FormGroup({});
  //nuevoUsuario: Usuario = { idUsuario: 0, email: '', password: '',nombres: '', apellidos: '',tipoUsuario: 0, urlFoto: '',universidad: '', habilitado: false, creadoPor: '', fechaCreacion: '',modificadoPor:'',fechaModificacion:'' };

  constructor(
    private fb: FormBuilder,
    private usuarioServicio: UsuariosService, 
    private dialogRef: MatDialogRef<AgregarUsuarioComponent>) {
      this.agregarFormulario = this.fb.group({
        email: [null, [Validators.required, Validators.email]],
        password: [null, Validators.required],
        nombres: [null, Validators.required],
        apellidos: [null, Validators.required],
        tipoUsuario: [null, Validators.required],
        urlFoto: [null, Validators.required],
        universidad: [null, Validators.required],
        habilitado: [false, Validators.required]
      });
    }

  ngOnInit() : void{
    this.toggleFormulario();
  }

 agregarUsuario(): void {
  if (this.agregarFormulario.valid) {
    Swal.fire({
      title: "¿Quieres agregar este nuevo usuario?",
      showDenyButton: false,
      showCancelButton: true,
      //confirmButtonText: "Guardar",
      //timer: 1500
    }).then((result) => {
      if (result.isConfirmed) {
        const nuevoUsuario: Usuario = {
        ...this.agregarFormulario.value,
        creadoPor: 'U20244131', 
        fechaCreacion: new Date().toISOString()
    };
    this.usuarioServicio.agregarUsuario(nuevoUsuario).subscribe({
      next: (usuario) => {
        console.log('Usuario agregado:', usuario);
        Swal.fire("Agregado!", "El Usuario ha sido agregado exitosamente.", "success");
        this.cerrar();
      },
      error: (err) => {
        console.error('Error agregando usuario:', err);
        Swal.fire("Error", "Error al agregar usuario", "error");
        this.dialogRef.close();
      }
    });
  } else if (result.isDenied) {
    Swal.fire("Cambios no guardados", "", "info");
  }
});
} else {
console.error('Formulario no válido. Verifica los campos.');
}
}

  cerrar() {
    this.dialogRef.close();
  }

  toggleFormulario() {
    this.mostrarFormulario = !this.mostrarFormulario;
  }
}
