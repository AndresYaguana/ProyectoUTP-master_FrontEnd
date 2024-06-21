import { Component, Inject } from '@angular/core';
import { Categoria } from '../categorias';
import { CategoriasService } from '../categorias.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-editar-categoria',
  templateUrl: './editar-categoria.component.html',
  styleUrl: './editar-categoria.component.scss'
})
export class EditarCategoriaComponent {
  categoria: Categoria = {idCategoria: 0, nombre: '', ruta: '', habilitado: false, creadoPor: '', fechaCreacion: '', modificadoPor: '', fechaModificacion: ''};
  idCategoria:number = 0;

  constructor(
    private categoriasServicio: CategoriasService, 
    private ruta: ActivatedRoute, 
    private enrutador:Router,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EditarCategoriaComponent>){
    this.idCategoria = data.idCategoria;
  }

  ngOnInit(){
    this.categoriasServicio.obtenerCategoriaPorId(this.idCategoria).subscribe(
      {
        next: (datos) => this.categoria = datos,
        error: (errores: any) => console.log(errores)
      }
    );
  } 

  onSubmit(){
    console.log('Editando curso:', this.categoria); 
    this.guardarCategoria();
  }

    guardarCategoria(){
        Swal.fire({
            title: "¿Quieres guardar los cambios?",
            showDenyButton: false,
            showCancelButton: true,
            confirmButtonText: "Guardar",
            //showConfirmButton: false,
            //timer: 1500
          }).then((result) => {
            if (result.isConfirmed) {
          this.categoriasServicio.editarCategoria(this.idCategoria, this.categoria).subscribe({
            next: (datos) => {
              Swal.fire("Guardado!", "La Categoria ha sido guardado exitosamente.", "success");
              console.log('Categoria Editada exitosamente.');
              this.cerrar()
              this.irCategoriaLista();
            },
            error: (errores) => {
              Swal.fire("Error", "Hubo un problema al guardar la categoria.", "error");
              console.error('Error al guardar Categoria:', errores);
            }
          });
        } else if (result.isDenied) {
          Swal.fire("Cambios no guardados", "", "info");
        }
      });
    }

    irCategoriaLista(){
      this.enrutador.navigate(['/Categorias'])
    }
  
    cerrar() {
      this.dialogRef.close();
    }

}
