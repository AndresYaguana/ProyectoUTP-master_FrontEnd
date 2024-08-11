import { Component, OnInit } from '@angular/core';
import { Seccion } from './secciones';
import { SeccionService } from './secciones-curso.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Curso } from '../../cursos';
import { MessageService } from 'primeng/api';
import { CursosService } from '../../cursos.service';
import { Usuario } from '../../../usuarios/usuarios';
import { AuthService } from '../../../Login/auth/auth.service';


@Component({
  selector: 'app-secciones-curso',
  templateUrl: './secciones-curso.component.html',
  styleUrl: './secciones-curso.component.scss',
  providers: [MessageService]
})
export class SeccionesCursoComponent implements OnInit{

  ruta: string = ''; 
  seccion: Seccion[] = [];
  nuevaSeccion: Seccion = { idSeccion: 0, idCurso: 0, nombre: '', habilitado: false, creadoPor: '', fechaCreacion: '',modificadoPor:'',fechaModificacion:'' };
  usuario: Usuario | null = null;

  /* Varaibles de la UI de Agregar */
  AgregarDialog: boolean = false;

  agregarFormulario: FormGroup = new FormGroup({});

  cursos: Curso[] = [];

  /* Variables de la UI de Modificar */

  ModificarDialog: boolean = false;

  modificarFormulario: FormGroup = new FormGroup({});

  constructor(
    private messageService: MessageService,
    private seccionServicio: SeccionService,
    private cursoServicio: CursosService,
    private authService: AuthService, 
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private fb: FormBuilder,
  ) {
    this.IniciarAgregarForm();
    this.IniciarModificarForm();
    this.obtenerCursos();
  }

  ngOnInit() {
    this.obtenerSecciones();
    this.usuario = this.authService.getLoggedInUser();
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

  /* Función para abrir el UI de Agregar */
  OpenAgregar(): void {
    this.AgregarDialog = true;
  };

  /* Función para recuperar los cursos */
  obtenerCursos(): void {
    this.cursoServicio.obtenerCursoLista().subscribe({
      next: (cursos) => {
        this.cursos = cursos;
      },
      error: (err) => console.error('Error obteniendo cursos:', err)
    });
  };

  /* Inicizalizar el Formulario de Agregar */
  IniciarAgregarForm(): void {
    this.agregarFormulario = this.fb.group({
      idSeccion: [0, [Validators.required]],
      idCurso: [0, [Validators.required]],
      nombre: [null, Validators.required],
      habilitado: [false, [Validators.required]]
    });
  };

  /* Función para Agregar la Nueva Seccion */
  agregarSeccion(): void {
    if (this.agregarFormulario.valid) {
      this.AgregarDialog = false;

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
              Swal.fire("Agregado!", "La Seccion ha sido agregado exitosamente.", "success");
              this.obtenerSecciones();
            },
            error: (err) => {
              Swal.fire("Error", "Error al agregar Seccion", err);
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
  OpenModificar(idSeccion: number): void {
    this.ModificarDialog = true;
    this.RecuperarRegistro(idSeccion);
  };

  /* Función para Inicializar el Formulario de Modificar */
  IniciarModificarForm(): void {
    this.modificarFormulario = this.fb.group({
      idCurso: [0, Validators.required],
      idSeccion: [0,Validators.required],
      nombre: [null, [Validators.required]],
      habilitado: [false, [Validators.required]],
      creadoPor: [''],
      fechaCreacion: [''],
      modificadoPor: [this.usuario?.email?.split('@')[0]?.toUpperCase()],
      fechaModificacion: [new Date().toISOString()]
    });
  };

  /* Función para Recuperar el Registro */
  RecuperarRegistro(idSeccion: number): void {
    this.seccionServicio.obtenerSeccionPorId(idSeccion).subscribe(
      {
        next: (datos: any) => {
          this.modificarFormulario.controls['idSeccion'].setValue(datos.idSeccion);
          this.modificarFormulario.controls['idCurso'].setValue(datos.curso.idCurso);
          this.modificarFormulario.controls['modificadoPor'].setValue(datos.modificadoPor);
          this.modificarFormulario.controls['fechaModificacion'].setValue(datos.fechaModificacion);
          this.modificarFormulario.controls['fechaCreacion'].setValue(datos.fechaCreacion);
          this.modificarFormulario.controls['creadoPor'].setValue(datos.creadoPor);
          this.modificarFormulario.controls['nombre'].setValue(datos.nombre);
          this.modificarFormulario.controls['habilitado'].setValue(datos.habilitado);
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
      confirmButtonText: "Guardar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.seccionServicio.editarSeccion(this.modificarFormulario.controls['idSeccion'].getRawValue(), this.modificarFormulario.getRawValue()).subscribe({
          next: (datos) => {
            Swal.fire("Guardado!", "La sección ha sido guardada exitosamente.", "success");
            this.obtenerSecciones();
          },
          error: (errores) => {
            Swal.fire("Error", "Hubo un problema al guardar la sección.", errores);
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


  /*abrirModalAgregarSeccion() {
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
  }*/

}
