// agregar-curso.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Curso } from '../cursos';
import { CursosService } from '../cursos.service';
import { CategoriasService } from '/Cursos/ProyectoUTP-master/src/app/core/categorias/categorias.service'; // Make sure the service name matches
import { MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { Categoria } from '/Cursos/ProyectoUTP-master/src/app//core/categorias/categorias';

@Component({
  selector: 'app-agregar-curso',
  templateUrl: './agregar-curso.component.html',
  styleUrls: ['./agregar-curso.component.scss']
})
export class AgregarCursoComponent implements OnInit {
  mostrarFormulario: boolean = false;
  agregarFormulario: FormGroup = new FormGroup({});
  categorias: Categoria[] = [];

  constructor(
    private fb: FormBuilder,
    private cursoServicio: CursosService, 
    private categoriasServicio: CategoriasService,
    private dialogRef: MatDialogRef<AgregarCursoComponent>
  ) {
    this.agregarFormulario = this.fb.group({
      idCategoria: [0, [Validators.required]],
      nombre: [null, [Validators.required]],
      ruta: [null, Validators.required],
      urlImage: [null, Validators.required],
      descripcion: [null, [Validators.required]],
      habilitado: [false, [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.obtenerCategorias();
    this.toggleFormulario();
  }

  obtenerCategorias(): void {
    this.categoriasServicio.obtenerCategoriaLista().subscribe({
      next: (categorias) => {
        console.log('Categorias obtenidas:', categorias); // Verify the data
        this.categorias = categorias;
      },
      error: (err) => console.error('Error obteniendo categorías:', err)
    });
  }

  agregarCurso(): void {
    if (this.agregarFormulario.valid) {
      console.log(this.agregarFormulario.value);
      Swal.fire({
        title: "¿Quieres agregar este nuevo curso?",
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: "Guardar"
      }).then((result) => {
        if (result.isConfirmed) {
          const nuevoCurso: Curso = {
            ...this.agregarFormulario.value,
            creadoPor: 'U20244131',
            fechaCreacion: new Date().toISOString(),
            categoria: { idCategoria: this.agregarFormulario.value.idCategoria } 
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
