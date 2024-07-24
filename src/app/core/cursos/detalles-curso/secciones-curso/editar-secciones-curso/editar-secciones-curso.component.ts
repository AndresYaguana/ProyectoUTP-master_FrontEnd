import { Component, Inject, OnInit } from '@angular/core';
import { Seccion } from '../secciones';
import { SeccionService } from '../secciones-curso.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { Curso } from '../../../cursos';
import { CursosService } from '../../../cursos.service';

@Component({
  selector: 'app-editar-secciones-curso',
  templateUrl: './editar-secciones-curso.component.html',
  styleUrls: ['./editar-secciones-curso.component.scss']
})
export class EditarSeccionesCursoComponent implements OnInit {
  seccion: Seccion = { idSeccion: 0, idCurso: 0, nombre: '', habilitado: false, creadoPor: '', fechaCreacion: '', modificadoPor: '', fechaModificacion: '' };
  curso: Curso = { idCurso: 0, idCategoria: 0, nombre: '', ruta: '', urlImage: '', descripcion: '', habilitado: false, creadoPor: '', fechaCreacion: '', modificadoPor: '', fechaModificacion: '' };
  id: number = 0;

  constructor(
    private seccionServicio: SeccionService,
    private cursoServicio: CursosService,
    private ruta: ActivatedRoute,
    private enrutador: Router,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EditarSeccionesCursoComponent>
  ) {
    this.id = data.idSeccion;
  }

  ngOnInit() {
    this.seccionServicio.obtenerSeccionPorId(this.id).subscribe({
      next: (datos) => {
        console.log('Datos obtenidos:', datos);
        this.seccion = datos;
        if (datos.curso) {
          this.curso = datos.curso;
          console.log('Curso obtenido:', this.curso);
        }
      },
      error: (errores: any) => console.log(errores)
    });
  }
  

  onSubmit() {
    console.log('Editando seccion:', this.seccion);
    this.guardarSeccion();
  }

  guardarSeccion() {
    this.seccion.modificadoPor = 'U20244131';
    this.seccion.fechaModificacion = new Date().toISOString();
    Swal.fire({
      title: "¿Quieres guardar los cambios?",
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: "Guardar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.seccionServicio.editarSeccion(this.id, this.seccion).subscribe({
          next: (datos) => {
            Swal.fire("Guardado!", "La sección ha sido guardada exitosamente.", "success");
            console.log('Sección editada exitosamente.');
            this.cerrar();
            this.irSeccionLista();
          },
          error: (errores) => {
            Swal.fire("Error", "Hubo un problema al guardar la sección.", "error");
            console.error('Error al guardar sección:', errores);
          }
        });
      } else if (result.isDenied) {
        Swal.fire("Cambios no guardados", "", "info");
      }
    });
  }

  irSeccionLista() {
    this.enrutador.navigate(['/GestionSeccion']);
  }

  cerrar() {
    this.dialogRef.close();
  }
}
