import { Component } from '@angular/core';
import { Categoria } from './categorias';
import { CategoriasService } from './categorias.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { EditarCategoriaComponent } from './editar-categoria/editar-categoria.component';
import { AgregarCategoriaComponent } from './agregar-categoria/agregar-categoria.component';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrl: './categorias.component.scss'
})
export class CategoriasComponent {
  ruta: string = ''; 
  categorias: Categoria[] = [];
  nuevaCategoria: Categoria = { idCategoria: 0, nombre: '', ruta: '', habilitado: false, creadoPor: '', fechaCreacion: '',modificadoPor:'',fechaModificacion:'' };
  
  constructor(
    private categoriasServicio: CategoriasService,
    private enrutador: Router,
    private dialog: MatDialog,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.obtenerCategorias();
    this.route.paramMap.subscribe(params => {
      this.ruta = params.get('ruta') || '';
    });
  } 

  private obtenerCategorias() {
    this.categoriasServicio.obtenerCategoriaLista().subscribe(
      (datos: Categoria[]) => {
        console.log(datos);
        this.categorias = datos;
      },
      (error) => {
        console.error('Error al obtener la lista de categorias:', error);
      }
    );
  }


  abrirModalAgregarCategoria() {
    const dialogRef = this.dialog.open(AgregarCategoriaComponent, {
      width: '500px',
      data: {}
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('El modal de agregar categoria se ha cerrado');
    this.obtenerCategorias();
  });
  }

  editarCategorias(idCategoria: number) {
    const dialogRef = this.dialog.open(EditarCategoriaComponent, {
      width: '500px',
      data: { idCategoria: idCategoria }
  });

    dialogRef.afterClosed().subscribe(result => {
    console.log('El modal de editar categoria se ha cerrado');
    if (result) {
      this.obtenerCategorias();
    }
    });
  }

  eliminarCategorias(idCategoria: number) {
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
        this.categoriasServicio.eliminarCategoria(idCategoria).subscribe({
          next: (datos) => {
            this.obtenerCategorias();
            Swal.fire({
              title: "¡Eliminado!",
              text: "La categoria ha sido eliminado.",
              icon: "success"
            });
          },
          error: (errores) => {
            console.error('Error eliminando categoria:', errores);
            Swal.fire({
              title: "Error",
              text: "Hubo un problema al eliminar el categoria.",
              icon: "error"
            });
          }
        });
      }
    });
  }

}
