import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Curso } from '../cursos';
import { CursosService } from '../cursos.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-agregar-curso',
  //standalone: true,
  //imports: [],
  templateUrl: './agregar-curso.component.html',
  styleUrl: './agregar-curso.component.scss'
})
export class AgregarCursoComponent implements OnInit {
  
    mostrarFormulario: boolean = false;
    agregarFormulario: FormGroup = new FormGroup({});
    nuevoCurso: Curso = { idCurso: 0, nombre: '', ruta: '', urlImage: '', habilitado: false, creadoPor: '', fechaCreacion: '',modificadoPor:'',fechaModificacion:'' };
  
    constructor(
      private fb: FormBuilder,
      private cursoServicio: CursosService, 
      private dialogRef: MatDialogRef<AgregarCursoComponent>) {
      this.agregarFormulario = this.fb.group({
          nombre: [null, [Validators.required]],
          ruta: [null, Validators.required],
          urlImage: ['', Validators.required],
          habilitado: [false, Validators.required]
        });
      }
  
    ngOnInit() : void{
      this.toggleFormulario(); // Inicializa nuevoUsuario cuando se abre el modal
    }
  
   agregarCurso(): void {
    if (this.agregarFormulario.valid) {
      const nuevoCurso: Curso = {
        idCurso: 0, // Debes asignar un valor válido para idCurso
        nombre: this.agregarFormulario.value.nombre,
        ruta: this.agregarFormulario.value.ruta,
        urlImage: this.agregarFormulario.value.urlImage,
        habilitado: this.agregarFormulario.value.habilitado,
        creadoPor: 'U20244131', // Aquí deberías obtener el usuario actual o asignar un valor adecuado
        fechaCreacion: new Date().toISOString(), // Puedes usar new Date() para obtener la fecha actual
        modificadoPor: '', // Inicializar según tus necesidades
        fechaModificacion: '' // Inicializar según tus necesidades
      };
      this.cursoServicio.agregarCurso(nuevoCurso).subscribe({
        next: (curso) => {
          console.log('Curso agregado:', curso);
          //this.agregarFormulario.reset();
          this.cerrar(); // Cierra el modal después de agregar un usuario
        },
        error: (err) => {
          console.error('Error agregando usuario:', err);
          this.dialogRef.close();
        }
      });
    }else {
      console.error('Formulario no válido. Verifica los campos.');
    }
    };
  
    cerrar() {
      this.dialogRef.close();
    }
  
    toggleFormulario() {
      this.mostrarFormulario = !this.mostrarFormulario;
      if (!this.mostrarFormulario) {
        this.nuevoCurso = { idCurso: 0, nombre: '', ruta: '', urlImage: '', habilitado: false, creadoPor: '', fechaCreacion: '',modificadoPor:'',fechaModificacion:'' };
      }
    }
}
