import { Component, Input, OnInit } from '@angular/core';
import { Contenido } from './contenido';
import { Seccion } from '../secciones-curso/secciones';
import { ContenidoService } from './contenido-curso.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AgregarContenidoCursoComponent } from './agregar-contenido-curso/agregar-contenido-curso.component';
import { EditarContenidoCursoComponent } from './editar-contenido-curso/editar-contenido-curso.component';
import Swal from 'sweetalert2';
import { MessageService } from 'primeng/api';
import { Usuario } from '../../../usuarios/usuarios';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../Login/auth/auth.service';
import { SeccionService } from '../secciones-curso/secciones-curso.service';
import { CursosService } from '../../cursos.service';
import { Curso } from '../../cursos';

@Component({
  selector: 'app-contenido-curso',
  templateUrl: './contenido-curso.component.html',
  styleUrl: './contenido-curso.component.scss',
  providers: [MessageService]
})
export class ContenidoCursoComponent implements OnInit{

  ruta: string = ''; 
  contenido: Contenido[] = [];
  cursos: Curso[] = [];
  secciones: Seccion[] = [];
  nuevoContenido: Contenido = { idContenido: 0,idCurso: 0, idSeccion: 0, titulo: '', descripcion: '', urlArchivo: '', habilitado: false, creadoPor: '', fechaCreacion: '',modificadoPor:'',fechaModificacion:'' };
  usuario: Usuario | null = null;
  isUrlArchivoDisabled: boolean = true;
  fileError: string | null = null;
  selectedFile: File | null = null;

  /* Varaibles de la UI de Agregar */
  AgregarDialog: boolean = false;

  agregarFormulario: FormGroup = new FormGroup({});

  /* Variables de la UI de Modificar */

  ModificarDialog: boolean = false;

  modificarFormulario: FormGroup = new FormGroup({});

  constructor(
    private contenidoServicio: ContenidoService,
    private seccionServicio: SeccionService, 
    private cursoServicio: CursosService,
    private route: ActivatedRoute,
    private authService: AuthService, 
    private messageService: MessageService,
    private fb: FormBuilder,
  ) {
    this.IniciarAgregarForm();
    //this.IniciarModificarForm();
  }

  /*constructor(
    private contenidoServicio: ContenidoService,
    private enrutador: Router,
    private dialog: MatDialog,
    private route: ActivatedRoute
  ) {}*/

  ngOnInit() {
    this.obtenerContenidos();
    this.obtenerCursos();
    this.route.paramMap.subscribe(params => {
      this.ruta = params.get('ruta') || '';
    });
  } 


  obtenerCursos(): void {
    this.cursoServicio.obtenerCursoLista().subscribe({
      next: (cursos) => {
        //console.log('Cursos obtenidos:', cursos);
        this.cursos = cursos;
      },
      error: (err) => console.error('Error obteniendo cursos:', err)
    });
  }

  obtenerSecciones(idCurso: number): void {
    this.cursoServicio.obtenerSeccionesCurso(idCurso).subscribe(
      (data: Seccion[]) => {
        this.secciones = data;
        this.onSeccionChange();
      },
      (error) => {
        console.error('Error al obtener las secciones del curso:', error);
      }
    );
  }


  
  obtenerContenidos() {
    this.contenidoServicio.obtenerContenidoLista().subscribe({
      next: (datos: Contenido[]) => {
        this.contenido = datos.map(contenido => ({
          ...contenido,
          cursoNombre: this.cursos.find(curso => curso.idCurso === contenido.idCurso)?.nombre || 'Curso no encontrado',
          seccionNombre: this.secciones.find(seccion => seccion.idSeccion === contenido.idSeccion)?.nombre || 'Sección no encontrada'
        }));
      },
      error: (error) => {
        console.error('Error al obtener la lista de contenidos:', error);
      }
    });
  }


  onCursoChange(): void {
    const idCurso = this.agregarFormulario.get('idCurso')?.value;
    if (idCurso) {
      this.obtenerSecciones(idCurso);
    }
  }

  onSeccionChange(): void {
    const idSeccion = this.agregarFormulario.get('idSeccion')?.value;
    const seccionSeleccionada = this.secciones.find(seccion => seccion.idSeccion === idSeccion);
  
    if (seccionSeleccionada) {
      const seccionNombre = seccionSeleccionada.nombre;
      this.isUrlArchivoDisabled = !(seccionNombre === 'Videos' || seccionNombre === 'Pdfs');
      if (this.isUrlArchivoDisabled) {
        this.agregarFormulario.get('urlArchivo')?.disable();
        this.agregarFormulario.get('urlArchivo')?.setValue(null);
      } else {
        this.agregarFormulario.get('urlArchivo')?.enable();
      }
    }
  }
  
  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 10485760) { // Ejemplo: límite de tamaño de archivo de 10MB
        this.fileError = 'El archivo es demasiado grande. Máximo permitido: 10MB.';
        this.selectedFile = null;
      } else {
        this.fileError = null;
        this.selectedFile = file;
        this.agregarFormulario.get('urlArchivo')?.setValue(file.name); // Opcional: actualizar el valor del formulario con el nombre del archivo
      }
    }
  }

  eliminarContenido(idContenido: number) {
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

  /* Función para abrir el UI de Agregar */
  OpenAgregar(): void {
    this.AgregarDialog = true;
  };

  /* Inicizalizar el Formulario de Agregar */
  IniciarAgregarForm(): void {
    this.agregarFormulario = this.fb.group({
        idCurso: [0, [Validators.required]],
        idSeccion: [0, [Validators.required]],
        titulo: [null, [Validators.required]],
        descripcion: [null, [Validators.required]],
        urlArchivo: [null],
        habilitado: [false, [Validators.required]]
    });
  };  

    agregarContenido(): void {
      if (this.agregarFormulario.valid) {
        this.AgregarDialog = false;
        Swal.fire({
          title: "¿Quieres agregar esta nueva sección?",
          showDenyButton: false,
          showCancelButton: true,
          confirmButtonText: "Guardar"
        }).then((result) => {
          if (result.isConfirmed) {
            const nuevoContenido: Contenido = {
              ...this.agregarFormulario.value,
              creadoPor: this.usuario?.email?.split('@')[0]?.toUpperCase(),
              fechaCreacion: new Date().toISOString(),
              curso: { idCurso: this.agregarFormulario.value.idCurso },
              seccion: { idSeccion: this.agregarFormulario.value.idSeccion },
              urlArchivo: this.selectedFile ? this.selectedFile.name : null
            }; 
            //console.log('Contenido a enviar:', nuevoContenido);
            this.contenidoServicio.agregarContenido(nuevoContenido, this.selectedFile).subscribe({
              next: (contenido) => {
                //console.log('Contenido agregado:', contenido);
                Swal.fire("Agregado!", "El Contenido ha sido agregado exitosamente.", "success");
                this.obtenerContenidos();
              },
              error: (err) => {
                //console.error('Error agregando Sección:', err);
                Swal.fire("Error", "Error al agregar Sección", "error");
                //this.dialogRef.close();
              }
            });
          } else if (result.isDenied) {
            Swal.fire("Cambios no guardados", "", "info");
          }
        });
      } else {
        //console.error('Formulario no válido. Verifica los campos.');
        this.formInvalid();
      }
    }

  /* Función para Cerrar la UI de Agregar */
  CloseAgregar(): void {
    this.AgregarDialog = false;
  };

  /* Mensaje de Formulario Invalido */
  formInvalid(): void {
    this.messageService.add({ severity: 'error', summary: 'Formulario Invalido', detail: 'Formulario no válido. Verifica los campos.' })
  };
  /*abrirModalAgregarContenido() {
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
  }*/

}
