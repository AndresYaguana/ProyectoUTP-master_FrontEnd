import { Component, OnInit } from '@angular/core';
import { EmailValidator, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Curso } from '../cursos';
import { CursosService } from '../cursos.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Usuario } from '../../usuarios/usuarios';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-curso',
  templateUrl: './agregar-curso.component.html',
  styleUrl: './agregar-curso.component.scss'
})
export class AgregarCursoComponent implements OnInit {
    mostrarFormulario: boolean = false;
    agregarFormulario: FormGroup = new FormGroup({});

    constructor(
      private fb: FormBuilder,
      private cursoServicio: CursosService, 
      private dialogRef: MatDialogRef<AgregarCursoComponent>) {
      this.agregarFormulario = this.fb.group({
          nombre: [null, [Validators.required]],
          ruta: [null, Validators.required],
          urlImage: [null, Validators.required],
          habilitado: [false, Validators.required]
        });
      }
  
    ngOnInit() : void{
      this.toggleFormulario();
    }
  
  agregarCurso(): void {
    if (this.agregarFormulario.valid) {
      Swal.fire({
        title: "¿Quieres agregar este nuevo curso?",
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: "Guardar",
        //showConfirmButton: false,
        //timer: 1500
      }).then((result) => {
        if (result.isConfirmed) {
          const nuevoCurso: Curso = {
            ...this.agregarFormulario.value,
            creadoPor: 'U20244131',
            fechaCreacion: new Date().toISOString()
          };
          this.cursoServicio.agregarCurso(nuevoCurso).subscribe({
            next: (curso) => {
              console.log('Curso agregado:', curso);
              Swal.fire("Agregado!", "El Curso ha sido agregado exitosamente.", "success");
              this.cerrar();
            },
            error: (err) => {
              console.error('Error agregando curso:', err);
              Swal.fire("Error", "Error al agregar curso", "error");
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
