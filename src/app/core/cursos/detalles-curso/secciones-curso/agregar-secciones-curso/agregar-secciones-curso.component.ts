import { Component, OnInit } from '@angular/core';
import { Curso } from '../../../cursos';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SeccionService } from '../secciones-curso.service';
import { CursosService } from '../../../cursos.service';
import { MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { Seccion } from '../secciones';
import { Usuario } from '../../../../usuarios/usuarios';
import { AuthService } from '../../../../Login/auth/auth.service';

@Component({
  selector: 'app-agregar-secciones-curso',
  templateUrl: './agregar-secciones-curso.component.html',
  styleUrl: './agregar-secciones-curso.component.scss'
})
export class AgregarSeccionesCursoComponent implements OnInit {

  mostrarFormulario: boolean = false;
  agregarFormulario: FormGroup = new FormGroup({});
  cursos: Curso[] = [];
  usuario: Usuario | null = null;

  constructor(
    private fb: FormBuilder,
    private seccionServicio: SeccionService, 
    private cursoServicio: CursosService,
    private authService: AuthService, 
    private dialogRef: MatDialogRef<AgregarSeccionesCursoComponent>
  ) {
    this.agregarFormulario = this.fb.group({
      idCurso: [0, [Validators.required]],
      nombre: [null, [Validators.required]],
      habilitado: [false, [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.obtenerCursos();
    this.toggleFormulario();
    this.usuario = this.authService.getLoggedInUser();
    console.log('Usuario actual:', this.usuario);
  }


  obtenerCursos(): void {
    this.cursoServicio.obtenerCursoLista().subscribe({
      next: (cursos) => {
        console.log('Cursos obtenidas:', cursos); // Verify the data
        this.cursos = cursos;
      },
      error: (err) => console.error('Error obteniendo cursos:', err)
    });
  }

  agregarSeccion(): void {
    if (this.agregarFormulario.valid) {
      console.log(this.agregarFormulario.value);
      Swal.fire({
        title: "¿Quieres agregar esta nueva seccion?",
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: "Guardar"
      }).then((result) => {
        if (result.isConfirmed) {
          const nuevaSeccion: Seccion = {
            ...this.agregarFormulario.value,
            creadoPor: this.usuario?.email?.split('@')[0]?.toUpperCase(),
            fechaCreacion: new Date().toISOString(),
            curso: { idCurso: this.agregarFormulario.value.idCurso } 
          };
          this.seccionServicio.agregarSeccion(nuevaSeccion).subscribe({
            next: (seccion) => {
              console.log('Seccion agregado:', seccion);
              Swal.fire("Agregado!", "La Seccion ha sido agregado exitosamente.", "success");
              this.cerrar();
            },
            error: (err) => {
              console.error('Error agregando Seccion:', err);
              Swal.fire("Error", "Error al agregar Seccion", "error");
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
