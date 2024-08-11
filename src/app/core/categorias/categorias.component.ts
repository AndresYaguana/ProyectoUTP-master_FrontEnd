import { Component } from '@angular/core';
import { Categoria } from './categorias';
import { CategoriasService } from './categorias.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from '../usuarios/usuarios';
import { AuthService } from '../Login/auth/auth.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrl: './categorias.component.scss',
  providers: [MessageService]
})
export class CategoriasComponent {
  ruta: string = ''; 
  categorias: Categoria[] = [];
  nuevaCategoria: Categoria = { idCategoria: 0, nombre: '', ruta: '', habilitado: false, creadoPor: '', fechaCreacion: '',modificadoPor:'',fechaModificacion:'' };
  usuario: Usuario | null = null;
  
  /* Varaibles de la UI de Agregar */
  AgregarDialog: boolean = false;

  agregarFormulario: FormGroup = new FormGroup({});

  /* Variables de la UI de Modificar */

  ModificarDialog: boolean = false;

  modificarFormulario: FormGroup = new FormGroup({});

  constructor(
    private categoriasServicio: CategoriasService,
    private route: ActivatedRoute,
    private authService: AuthService, 
    private messageService: MessageService,
    private fb: FormBuilder,
  ) {
    this.IniciarAgregarForm();
    this.IniciarModificarForm();
  }

  ngOnInit() {
    this.obtenerCategorias();
    this.usuario = this.authService.getLoggedInUser();
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
              text: "Hubo un problema al eliminar la categoria.",
              icon: "error"
            });
          }
        });
      }
    });
  }

  /* Función para abrir el UI de Agregar */
  OpenAgregar(): void {
    this.AgregarDialog = true;
  };

  /* Inicizalizar el Formulario de Agregar */
  IniciarAgregarForm(): void {
    this.agregarFormulario = this.fb.group({
      idCategoria: [0, [Validators.required]],
      nombre: [null, Validators.required],
      ruta: [null, Validators.required],
      habilitado: [false, [Validators.required]]
    });
  };

  /* Función para Agregar la Nueva Categoria */
  agregarCategoria(): void {
    if (this.agregarFormulario.valid) {
      this.AgregarDialog = false;

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
              Swal.fire("Agregado!", "La Categoria ha sido agregado exitosamente.", "success");
              this.obtenerCategorias();
            },
            error: (err) => {
              Swal.fire("Error", "Error al agregar Categoria", err);
            }
          });
        } else if (result.isDenied) {
          Swal.fire("Cambios no guardados", "", "info");
        }
      });
    } else {
      this.formInvalid();
    }
  };

  /* Función para Cerrar la UI de Agregar */
  CloseAgregar(): void {
    this.AgregarDialog = false;
  };

  /* Función para Abrir la UI de Modificar */
  OpenModificar(idCategoria: number): void {
    this.ModificarDialog = true;
    this.RecuperarRegistro(idCategoria);
  };

  /* Función para Inicializar el Formulario de Modificar */
  IniciarModificarForm(): void {
    this.modificarFormulario = this.fb.group({
      idCategoria: [0, [Validators.required]],
      nombre: [null, Validators.required],
      ruta: [null, Validators.required],
      habilitado: [false, [Validators.required]],
      creadoPor: [''],
      fechaCreacion: [''],
      modificadoPor: [this.usuario?.email?.split('@')[0]?.toUpperCase()],
      fechaModificacion: [new Date().toISOString()]
    });
  };

  /* Función para Recuperar el Registro */
  RecuperarRegistro(idCategoria: number): void {
    this.categoriasServicio.obtenerCategoriaPorId(idCategoria).subscribe(
      {
        next: (datos: any) => {
          this.modificarFormulario.controls['idCategoria'].setValue(datos.idCategoria);
          this.modificarFormulario.controls['modificadoPor'].setValue(datos.modificadoPor);
          this.modificarFormulario.controls['fechaModificacion'].setValue(datos.fechaModificacion);
          this.modificarFormulario.controls['fechaCreacion'].setValue(datos.fechaCreacion);
          this.modificarFormulario.controls['creadoPor'].setValue(datos.creadoPor);
          this.modificarFormulario.controls['nombre'].setValue(datos.nombre);
          this.modificarFormulario.controls['ruta'].setValue(datos.ruta);
          this.modificarFormulario.controls['habilitado'].setValue(datos.habilitado);
        },
        error: (errores: any) => console.log(errores)
      }
    );
  };

  /* Función para Modificar el Registro */
  ModificarCategoria(): void {
    this.ModificarDialog = false;

    this.modificarFormulario.controls['modificadoPor'].setValue(this.usuario?.email?.split('@')[0]?.toUpperCase());
    this.modificarFormulario.controls['fechaModificacion'].setValue(new Date().toISOString());

    Swal.fire({
      title: "¿Quieres guardar los cambios?",
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: "Guardar",
      //showConfirmButton: false,
      //timer: 1500
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoriasServicio.editarCategoria(this.modificarFormulario.controls['idCategoria'].getRawValue(), this.modificarFormulario.getRawValue()).subscribe({
          next: (datos) => {
            Swal.fire("Guardado!", "La Categoria ha sido guardado exitosamente.", "success");
            this.obtenerCategorias()
          },
          error: (errores) => {
            Swal.fire("Error", "Hubo un problema al guardar la categoria.", errores);
          }
        });
      } else if (result.isDenied) {
        Swal.fire("Cambios no guardados", "", "info");
      }
    });
  };

  /* Función para Cerrar la UI de Modificar */
  CloseModificar(): void {
    this.ModificarDialog = false;
  };

  /* Mensaje de Formulario Invalido */
  formInvalid(): void {
    this.messageService.add({ severity: 'error', summary: 'Formulario Invalido', detail: 'Formulario no válido. Verifica los campos.' })
  };


  /*abrirModalAgregarCategoria() {
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
              text: "Hubo un problema al eliminar la categoria.",
              icon: "error"
            });
          }
        });
      }
    });
  }*/

}
