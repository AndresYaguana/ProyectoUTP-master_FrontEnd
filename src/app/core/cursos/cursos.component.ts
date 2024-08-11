import { Component, OnInit } from '@angular/core';
import { Curso } from './cursos';
import { CursosService } from './cursos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { Categoria } from '../categorias/categorias';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { CategoriasService } from '../categorias/categorias.service';
import { Usuario } from '../usuarios/usuarios';
import { AuthService } from '../Login/auth/auth.service';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.scss'],
  providers: [MessageService]
})
export class CursosComponent implements OnInit {
  ruta: string = ''; 
  cursos: Curso[] = [];
  nuevoCurso: Curso = { idCurso: 0, idCategoria: 0, nombre: '', ruta: '', urlImage: '', descripcion:'', habilitado: false, creadoPor: '', fechaCreacion: '',modificadoPor:'',fechaModificacion:'' };
  usuario: Usuario | null = null;

  /* Varaibles de la UI de Agregar */
  AgregarDialog: boolean = false;

  submitted: boolean = false;

  categorias: Categoria[] = [];

  agregarFormulario: FormGroup = new FormGroup({});

  /* Variables de la UI de Modificar */

  ModificarDialog: boolean = false;

  modificarFormulario: FormGroup = new FormGroup({});

  constructor(
    private messageService: MessageService,
    private cursoServicio: CursosService,
    private categoriasServicio: CategoriasService,
    private authService: AuthService, 
    private route: ActivatedRoute,
    private fb: FormBuilder,
  ) {
    this.IniciarAgregarForm();
    this.IniciarModificarForm();
  }

  ngOnInit() {
    this.obtenerCursos();
    this.obtenerCategorias();
    this.usuario = this.authService.getLoggedInUser();
    this.route.paramMap.subscribe(params => {
      this.ruta = params.get('ruta') || '';
    });
  }

  private obtenerCursos() {
    this.cursoServicio.obtenerCursoLista().subscribe(
      (datos: Curso[]) => {
        console.log(datos);
        this.cursos = datos;
      },
      (error) => {
        console.error('Error al obtener la lista de usuarios:', error);
      }
    );
  }

    /* Función para Obtener las Categorias */
    obtenerCategorias(): void {
      this.categoriasServicio.obtenerCategoriaLista().subscribe({
        next: (categorias) => {
          this.categorias = categorias;
        },
        error: (err) => console.error('Error obteniendo categorías:', err)
      });
    }

  /* Función para abrir el UI de Agregar */
  OpenAgregar(): void {
    this.AgregarDialog = true;
    this.submitted = false;
  };

  /* Inicizalizar el Formulario de Agregar */
  IniciarAgregarForm(): void {
    this.agregarFormulario = this.fb.group({
      idCategoria: [0, [Validators.required]],
      nombre: [null, [Validators.required]],
      ruta: [null, Validators.required],
      urlImage: [null, Validators.required],
      descripcion: [null, [Validators.required]],
      habilitado: [false, [Validators.required]]
    });
  };


  /* Función para Agregar el Nuevo Curso */
  agregarCurso(): void {
    if (this.agregarFormulario.valid) {
      this.AgregarDialog = false;
      this.submitted = true;

      Swal.fire({
        title: "¿Quieres agregar este nuevo curso?",
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: "Guardar"
      }).then((result) => {
        if (result.isConfirmed) {
          const nuevoCurso: Curso = {
            ...this.agregarFormulario.value,
            creadoPor: this.usuario?.email?.split('@')[0]?.toUpperCase(),
            fechaCreacion: new Date().toISOString(),
            categoria: { idCategoria: this.agregarFormulario.value.idCategoria }
          };
          this.cursoServicio.agregarCurso(nuevoCurso).subscribe({
            next: (curso) => {
              Swal.fire("Agregado!", "El Curso ha sido agregado exitosamente.", "success");
              this.obtenerCursos();
            },
            error: (err) => {
              Swal.fire("Error", "Error al agregar curso", "error");
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
    this.submitted = false;
  };

  /* Función para Abrir la UI de Modificar */
  OpenModificar(idCurso: number): void {
    this.ModificarDialog = true;
    this.RecuperarRegistro(idCurso);
  };

  /* Función para Inicializar el Formulario de Modificar */
  IniciarModificarForm(): void {
    this.modificarFormulario = this.fb.group({
      idCurso: [0],
      idCategoria: [0, [Validators.required]],
      nombre: [null, [Validators.required]],
      ruta: [null, Validators.required],
      urlImage: [null, Validators.required],
      descripcion: [null, [Validators.required]],
      habilitado: [false, [Validators.required]],
      creadoPor: [''],
      fechaCreacion: [''],
      modificadoPor: [this.usuario?.email?.split('@')[0]?.toUpperCase()],
      fechaModificacion: [new Date().toISOString()]
    });
  };

  /* Función para Recuperar el Registro */
  RecuperarRegistro(idCurso: number): void {
    this.cursoServicio.obtenerCursoPorId(idCurso).subscribe(
      {
        next: (datos: any) => {
          this.modificarFormulario.controls['idCategoria'].setValue(datos.categoria.idCategoria);
          this.modificarFormulario.controls['idCurso'].setValue(datos.idCurso);
          this.modificarFormulario.controls['modificadoPor'].setValue(datos.modificadoPor);
          this.modificarFormulario.controls['fechaModificacion'].setValue(datos.fechaModificacion);
          this.modificarFormulario.controls['fechaCreacion'].setValue(datos.fechaCreacion);
          this.modificarFormulario.controls['creadoPor'].setValue(datos.creadoPor);
          this.modificarFormulario.controls['descripcion'].setValue(datos.descripcion);
          this.modificarFormulario.controls['nombre'].setValue(datos.nombre);
          this.modificarFormulario.controls['ruta'].setValue(datos.ruta);
          this.modificarFormulario.controls['habilitado'].setValue(datos.habilitado);
          this.modificarFormulario.controls['urlImage'].setValue(datos.urlImage);
        },
        error: (errores: any) => console.log(errores)
      }
    );
  };

  /* Función para Modificar el Registro */
  ModificarCurso(): void {
    this.ModificarDialog = false;
    this.modificarFormulario.controls['modificadoPor'].setValue(this.usuario?.email?.split('@')[0]?.toUpperCase());
    this.modificarFormulario.controls['fechaModificacion'].setValue(new Date().toISOString());
    
    Swal.fire({
      title: "¿Quieres guardar los cambios?",
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: "Guardar",
    }).then((result) => {
      if (result.isConfirmed) {
        this.cursoServicio.editarCurso(this.modificarFormulario.controls['idCurso'].getRawValue(), this.modificarFormulario.getRawValue()).subscribe({
          next: (datos) => {
            Swal.fire("Guardado!", "El Curso ha sido guardado exitosamente.", "success");
            this.obtenerCursos();
          },
          error: (errores) => {
            Swal.fire("Error", "Hubo un problema al guardar el curso.", errores);
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


  eliminarCursos(idCurso: number) {
    Swal.fire({
      title: "¿Estás seguro de Eliminar el Curso?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, ¡eliminarlo!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.cursoServicio.eliminarCurso(idCurso).subscribe({
          next: (datos) => {
            this.obtenerCursos();
            Swal.fire({
              title: "¡Eliminado!",
              text: "El Curso ha sido eliminado.",
              icon: "success"
            });
          },
          error: (errores) => {
            console.error('Error eliminando Curso:', errores);
            Swal.fire({
              title: "Error",
              text: "Hubo un problema al eliminar el Curso.",
              icon: "error"
            });
          }
        });
      }
    });
  }  

  /*abrirModalAgregarCurso() {
    const dialogRef = this.dialog.open(AgregarCursoComponent, {
      width: '500px',
      data: {}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('El modal de agregar usuario se ha cerrado');
      this.obtenerCursos();
    });
  }

  editarCursos(idCurso: number) {
    const dialogRef = this.dialog.open(EditarCursoComponent, {
      width: '500px',
      data: { idCurso: idCurso }
    });
    dialogRef.afterClosed().subscribe(result => {
    console.log('El modal de editar curso se ha cerrado');
    if (result) {
      this.obtenerCursos();
    }
    });
  }


  eliminarCursos(idCurso: number) {
    Swal.fire({
      title: "¿Estás seguro de Eliminar el Curso?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, ¡eliminarlo!"
    }).then((result) => {
      if (result.isConfirmed) {  
    this.cursoServicio.eliminarCurso(idCurso).subscribe({
        next: (datos) => {
          this.obtenerCursos();
          Swal.fire({
            title: "¡Eliminado!",
            text: "El Curso ha sido eliminado.",
            icon: "success"
          });
        },
        error: (errores) => {
          console.error('Error eliminando Curso:', errores);
          Swal.fire({
            title: "Error",
            text: "Hubo un problema al eliminar el Curso.",
            icon: "error"
          });
        }
      });
    }
  });
}*/


}
