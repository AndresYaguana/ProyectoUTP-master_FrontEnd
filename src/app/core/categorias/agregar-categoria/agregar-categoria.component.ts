import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriasService } from '../categorias.service';
import { MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { Categoria } from '../categorias';
import { Usuario } from '../../usuarios/usuarios';
import { AuthService } from '../../Login/auth/auth.service';

@Component({
  selector: 'app-agregar-categoria',
  templateUrl: './agregar-categoria.component.html',
  styleUrl: './agregar-categoria.component.scss'
})
export class AgregarCategoriaComponent implements OnInit{
  mostrarFormulario: boolean = false;
  agregarFormulario: FormGroup = new FormGroup({});
  usuario: Usuario | null = null;

  constructor(
    private fb: FormBuilder,
    private categoriasServicio: CategoriasService,
    private authService: AuthService, 
    private dialogRef: MatDialogRef<AgregarCategoriaComponent>) {
    this.agregarFormulario = this.fb.group({
        nombre: [null, [Validators.required]],
        ruta: [null, Validators.required],
        habilitado: [false, Validators.required]
      });
    }

    ngOnInit() : void{
      this.toggleFormulario();
    }

    agregarCategoria(): void {
      if (this.agregarFormulario.valid) {
        Swal.fire({
          title: "¿Quieres agregar esta nueva Categoria?",
          showDenyButton: false,
          showCancelButton: true,
          confirmButtonText: "Guardar",
          //showConfirmButton: false,
          //timer: 1500
        }).then((result) => {
          if (result.isConfirmed) {
            const nuevaCategoria: Categoria = {
              ...this.agregarFormulario.value,
              creadoPor: this.usuario?.email?.split('@')[0]?.toUpperCase(),
              fechaCreacion: new Date().toISOString()
            };
            this.categoriasServicio.agregarCategoria(nuevaCategoria).subscribe({
              next: (categoria) => {
                console.log('Categoria agregado:', categoria);
                Swal.fire("Agregado!", "La Categoria ha sido agregado exitosamente.", "success");
                this.cerrar();
              },
              error: (err) => {
                console.error('Error agregando Categoria:', err);
                Swal.fire("Error", "Error al agregar Categoria", "error");
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


