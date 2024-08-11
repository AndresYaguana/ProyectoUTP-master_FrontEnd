import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contenido } from './contenido';

@Injectable({
  providedIn: 'root'
})
export class ContenidoService {

    private urlBase = 'http://localhost:8080/ProyectoUTP-master/contenido';

    constructor(private clienteHttp: HttpClient) { }

    obtenerContenidoLista(): Observable<Contenido[]> {
      return this.clienteHttp.get<Contenido[]>(this.urlBase);
    }
  
    /*agregarContenido(contenido: Contenido): Observable<Object> {
      return this.clienteHttp.post(this.urlBase, contenido);
    }*/

      agregarContenido(contenido: Contenido, file: File | null): Observable<any> {
        const formData = new FormData();
        formData.append('contenidoCurso', JSON.stringify(contenido));
      
        if (file) {
          formData.append('file', file, file.name);
        }
      
        return this.clienteHttp.post(this.urlBase, formData);
      }
      
    
    obtenerContenidoPorId(idContenido: number): Observable<Contenido> {
      return this.clienteHttp.get<Contenido>(`${this.urlBase}/${idContenido}`);
    } 
  
    editarContenido(idContenido: number, contenido: Contenido): Observable<any> {
      contenido.modificadoPor = 'U20244131';
      contenido.fechaModificacion = new Date().toISOString();
      return this.clienteHttp.put(`${this.urlBase}/${idContenido}`, contenido);
    }
    
    eliminarContenido(idContenido: number): Observable<Object> {
      return this.clienteHttp.delete(`${this.urlBase}/${idContenido}`);
    }
}
 