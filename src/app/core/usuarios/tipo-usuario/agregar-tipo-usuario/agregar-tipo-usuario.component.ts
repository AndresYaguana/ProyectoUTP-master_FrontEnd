import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TipoUsuarioService } from '../tipo-usuario.service';
import { MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { TipoUsuario } from '../tipo-usuario';
import { Usuario } from '../../usuarios';
import { AuthService } from '../../../Login/auth/auth.service';

@Component({
  selector: 'app-agregar-tipo-usuario',
  templateUrl: './agregar-tipo-usuario.component.html',
  styleUrl: './agregar-tipo-usuario.component.scss'
})
export class AgregarTipoUsuarioComponent implements OnInit{
  mostrarFormulario: boolean = false;
  agregarFormulario: FormGroup = new FormGroup({});
  usuario: Usuario | null = null;

  constructor(
    private fb: FormBuilder,
    private tiposUsuariosServicio: TipoUsuarioService, 
    private authService: AuthService, 
    private dialogRef: MatDialogRef<AgregarTipoUsuarioComponent>) {
    this.agregarFormulario = this.fb.group({
        nombre: [null, [Validators.required]],
        habilitado: [false, Validators.required]
      });
    }

    ngOnInit() : void{
      this.toggleFormulario();
      this.usuario = this.authService.getLoggedInUser();
      console.log('Usuario actual:', this.usuario);
    }

    agregarTipoUsuario(): void {
      if (this.agregarFormulario.valid) {
        Swal.fire({
          title: "¿Quieres agregar esta nuevo Tipo Usuario?",
          showDenyButton: false,
          showCancelButton: true,
          confirmButtonText: "Guardar",
          //showConfirmButton: false,
          //timer: 1500
        }).then((result) => {
          if (result.isConfirmed) {
            const nuevoTipousuario: TipoUsuario = {
              ...this.agregarFormulario.value,
              creadoPor: this.usuario?.email?.split('@')[0]?.toUpperCase(),
              fechaCreacion: new Date().toISOString()
            };
            this.tiposUsuariosServicio.agregarTipousuario(nuevoTipousuario).subscribe({
              next: (tipousuario) => {
                console.log('Tipo Usuario agregado:', tipousuario);
                Swal.fire("Agregado!", "El Tipo Usuario ha sido agregado exitosamente.", "success");
                this.cerrar();
              },
              error: (err) => {
                console.error('Error agregando Tipo Usuario:', err);
                Swal.fire("Error", "Error al agregar Tipo Usuario", "error");
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
