import { Component, Input, OnInit } from '@angular/core';
import { Contenido } from './contenido';
import { Seccion } from '../secciones-curso/secciones';
import { ContenidoService } from './contenido-curso.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AgregarContenidoCursoComponent } from './agregar-contenido-curso/agregar-contenido-curso.component';
import { EditarContenidoCursoComponent } from './editar-contenido-curso/editar-contenido-curso.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contenido-curso',
  templateUrl: './contenido-curso.component.html',
  styleUrl: './contenido-curso.component.scss'
})
export class ContenidoCursoComponent implements OnInit{

  ruta: string = ''; 
  contenido: Contenido[] = [];
  nuevoContenido: Contenido = { idContenido: 0,idCurso: 0, idSeccion: 0, titulo: '', descripcion: '', urlArchivo: '', habilitado: false, creadoPor: '', fechaCreacion: '',modificadoPor:'',fechaModificacion:'' };


  constructor(
    private contenidoServicio: ContenidoService,
    private enrutador: Router,
    private dialog: MatDialog,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.obtenerContenidos();
    this.route.paramMap.subscribe(params => {
      this.ruta = params.get('ruta') || '';
    });
  } 

  private obtenerContenidos() {
    this.contenidoServicio.obtenerContenidoLista().subscribe(
      (datos: Contenido[]) => {
        console.log(datos);
        this.contenido = datos;
      },
      (error) => {
        console.error('Error al obtener la lista de contenidos:', error);
      }
    );
  }

  abrirModalAgregarContenido() {
    const dialogRef = this.dialog.open(AgregarContenidoCursoComponent, {
      width: '500px',
      data: {}
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('El modal de agregar contenido se ha cerrado');
    this.obtenerContenidos();
  });
  }

  editarSeccion(idContenido: number) {
    const dialogRef = this.dialog.open(EditarContenidoCursoComponent, {
      width: '500px',
      data: { idContenido: idContenido }
  });

    dialogRef.afterClosed().subscribe(result => {
    console.log('El modal de editar contenido se ha cerrado');
    if (result) {
      this.obtenerContenidos();
    }
    });
  }

  eliminarSeccion(idContenido: number) {
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
        this.contenidoServicio.eliminarContenido(idContenido).subscribe({
          next: (datos) => {
            this.obtenerContenidos();
            Swal.fire({
              title: "¡Eliminado!",
              text: "El Contenido ha sido eliminado.",
              icon: "success"
            });
          },
          error: (errores) => {
            console.error('Error eliminando Contenido:', errores);
            Swal.fire({
              title: "Error",
              text: "Hubo un problema al eliminar el Contenido.",
              icon: "error"
            });
          }
        });
      }
    });
  }

}
