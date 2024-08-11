import { Component, OnInit } from '@angular/core';
import { Seccion } from './secciones-curso/secciones';
import { Contenido } from './contenido-curso/contenido';
import { ActivatedRoute } from '@angular/router';
import { CursosService } from '../cursos.service';
import { DomSanitizer,SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-detalles-curso',
  templateUrl: './detalles-curso.component.html',
  styleUrls: ['./detalles-curso.component.scss']
})
export class DetallesCursoComponent implements OnInit {
  secciones: Seccion[] = [];
  idCurso: number = 0;
  contenido: { [key: number]: Contenido[] } = {};
  seccionExpandida: number | null = null;
  displayModal: boolean = false;
  selectedUrl: string = '';
  isLoading: boolean = false;
  modalContent: SafeHtml = '';

  constructor(
    private route: ActivatedRoute,
    private cursoService: CursosService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    const idCursoParam = this.route.snapshot.paramMap.get('idCurso');
    if (idCursoParam !== null && idCursoParam !== undefined && !isNaN(+idCursoParam)) {
      this.idCurso = +idCursoParam;
      this.obtenerSeccionesYContenido(this.idCurso);
    } else {
      console.error('Invalid idCursoParam:', idCursoParam);
    }
  }

  obtenerSeccionesYContenido(idCurso: number): void {
    this.isLoading = true;
    this.cursoService.obtenerSeccionesCurso(idCurso).subscribe(
      (data: Seccion[]) => {
        this.secciones = data;
        this.secciones.forEach(seccion => {
          this.obtenerContenidoSeccion(seccion.idSeccion);
        });
        this.isLoading = false;
      },
      (error) => {
        console.error('Error al obtener las secciones del curso:', error);
        this.isLoading = false;
      }
    );
  }

  obtenerContenidoSeccion(idSeccion: number): void {
    this.cursoService.obtenerContenidoSeccion(idSeccion).subscribe(
      (data: Contenido[]) => {
        this.contenido[idSeccion] = data;
      },
      (error) => {
        console.error('Error al obtener el contenido de la sección:', error);
      }
    );
  }

  getFileUrl(fileName: string): string {
    return `http://localhost:8080/ProyectoUTP-master/files/${fileName}`;
  }

  isImage(url: string): boolean {
    return url.match(/\.(jpeg|jpg|gif|png)$/) !== null;
  }

  isPdf(url: string): boolean {
    return url.match(/\.(pdf)$/) !== null;
  }

  isVideo(url: string): boolean {
    return url.match(/\.(mp4|mkv)$/) !== null;
  }

  showModal(url: string): void {
    this.selectedUrl = url;
    const fileType = this.getFileType(url);
    
    if (fileType === 'image') {
      this.modalContent = this.sanitizer.bypassSecurityTrustHtml(
        `<img src="${url}" alt="Preview Image" style="width: 100%; height: auto;">`
      );
    } else if (fileType === 'pdf' || fileType === 'video') {
      this.modalContent = this.sanitizer.bypassSecurityTrustHtml(
        `<iframe src="${url}" width="760px" height="1000px" style="border: none;"></iframe>`
      );
    } else {
      this.modalContent = this.sanitizer.bypassSecurityTrustHtml(
        '<p>File type not supported for preview.</p>'
      );
    }
    
    this.displayModal = true;
  }

  getFileType(url: string): 'image' | 'pdf' | 'video' | 'unknown' {
    if (this.isImage(url)) {
      return 'image';
    } else if (this.isPdf(url)) {
      return 'pdf';
    } else if (this.isVideo(url)) {
      return 'video';
    } else {
      return 'unknown';
    }
  }

  // Método para descargar el PDF en una nueva pestaña
  downloadFileInNewTab(url: string) {
    window.open(url, '_blank');
  }

  // Método para descargar el archivo
  downloadFile(url: string) {
    window.open(url, '_blank');
  }
}
