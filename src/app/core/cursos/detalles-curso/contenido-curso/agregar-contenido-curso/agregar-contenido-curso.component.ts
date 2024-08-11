import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Curso } from '../../../cursos';
import { Usuario } from '../../../../usuarios/usuarios';
import { Seccion } from '../../secciones-curso/secciones';
import { SeccionService } from '../../secciones-curso/secciones-curso.service';
import { CursosService } from '../../../cursos.service';
import { AuthService } from '../../../../Login/auth/auth.service';
import { MatDialogRef } from '@angular/material/dialog';
import { ContenidoService } from '../contenido-curso.service';
import Swal from 'sweetalert2';
import { Contenido } from '../contenido';

@Component({
  selector: 'app-agregar-contenido-curso',
  templateUrl: './agregar-contenido-curso.component.html',
  styleUrls: ['./agregar-contenido-curso.component.scss']
})
export class AgregarContenidoCursoComponent implements OnInit {

  mostrarFormulario: boolean = false;
  agregarFormulario: FormGroup = new FormGroup({});
  cursos: Curso[] = [];
  secciones: Seccion[] = [];
  usuario: Usuario | null = null;
  isUrlArchivoDisabled: boolean = true;
  fileError: string | null = null;
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private contenidoServicio: ContenidoService,
    private seccionServicio: SeccionService, 
    private cursoServicio: CursosService,
    private authService: AuthService, 
    private dialogRef: MatDialogRef<AgregarContenidoCursoComponent>
  ) {
    this.agregarFormulario = this.fb.group({
      idCurso: [0, [Validators.required]],
      idSeccion: [0, [Validators.required]],
      titulo: [null, [Validators.required]],
      descripcion: [null, [Validators.required]],
      urlArchivo: [null],
      habilitado: [false, [Validators.required]]
    });    
  }

  ngOnInit(): void {
    this.obtenerCursos();
    this.usuario = this.authService.getLoggedInUser();
    console.log('Usuario actual:', this.usuario);
  }

  obtenerCursos(): void {
    this.cursoServicio.obtenerCursoLista().subscribe({
      next: (cursos) => {
        console.log('Cursos obtenidos:', cursos);
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

  onCursoChange(): void {
    const idCurso = this.agregarFormulario.get('idCurso')?.value;
    this.obtenerSecciones(idCurso);
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
  
  agregarContenido(): void {
    if (this.agregarFormulario.valid) {
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
  
          console.log('Contenido a enviar:', nuevoContenido);
  
          this.contenidoServicio.agregarContenido(nuevoContenido, this.selectedFile).subscribe({
            next: (contenido) => {
              console.log('Contenido agregado:', contenido);
              this.cerrar();
            },
            error: (err) => {
              console.error('Error agregando Sección:', err);
              Swal.fire("Error", "Error al agregar Sección", "error");
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
