import { Component, OnInit } from '@angular/core';
import { Seccion } from './secciones';
import { SeccionService } from './secciones-curso.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AgregarSeccionesCursoComponent } from './agregar-secciones-curso/agregar-secciones-curso.component';
import { EditarSeccionesCursoComponent } from './editar-secciones-curso/editar-secciones-curso.component';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-secciones-curso',
  templateUrl: './secciones-curso.component.html',
  styleUrl: './secciones-curso.component.scss'
})
export class SeccionesCursoComponent implements OnInit{

  ruta: string = ''; 
  seccion: Seccion[] = [];
  nuevaSeccion: Seccion = { idSeccion: 0, idCurso: 0, nombre: '', habilitado: false, creadoPor: '', fechaCreacion: '',modificadoPor:'',fechaModificacion:'' };

  constructor(
    private seccionServicio: SeccionService,
    private enrutador: Router,
    private dialog: MatDialog,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.obtenerSecciones();
    this.route.paramMap.subscribe(params => {
      this.ruta = params.get('ruta') || '';
    });
  } 

  private obtenerSecciones() {
    this.seccionServicio.obtenerSeccionLista().subscribe(
      (datos: Seccion[]) => {
        console.log(datos);
        this.seccion = datos;
      },
      (error) => {
        console.error('Error al obtener la lista de secciones:', error);
      }
    );
  }

  abrirModalAgregarSeccion() {
    const dialogRef = this.dialog.open(AgregarSeccionesCursoComponent, {
      width: '500px',
      data: {}
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('El modal de agregar seccion se ha cerrado');
    this.obtenerSecciones();
  });
  }

  editarSeccion(idSeccion: number) {
    const dialogRef = this.dialog.open(EditarSeccionesCursoComponent, {
      width: '500px',
      data: { idSeccion: idSeccion }
  });

    dialogRef.afterClosed().subscribe(result => {
    console.log('El modal de editar seccion se ha cerrado');
    if (result) {
      this.obtenerSecciones();
    }
    });
  }

  eliminarSeccion(idSeccion: number) {
    Swal.fire({
      title: "¿Estás seguro de Eliminar?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, ¡eliminarlo!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.seccionServicio.eliminarSeccion(idSeccion).subscribe({
          next: (datos) => {
            this.obtenerSecciones();
            Swal.fire({
              title: "¡Eliminado!",
              text: "La seccion ha sido eliminado.",
              icon: "success"
            });
          },
          error: (errores) => {
            console.error('Error eliminando seccion:', errores);
            Swal.fire({
              title: "Error",
              text: "Hubo un problema al eliminar la seccion.",
              icon: "error"
            });
          }
        });
      }
    });
  }

}
