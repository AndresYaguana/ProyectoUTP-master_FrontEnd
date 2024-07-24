import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Seccion } from './secciones';

@Injectable({
  providedIn: 'root'
})
export class SeccionService {

    private urlBase = 'http://localhost:8080/ProyectoUTP-master/seccion';

    constructor(private clienteHttp: HttpClient) { }

    obtenerSeccionLista(): Observable<Seccion[]> {
      return this.clienteHttp.get<Seccion[]>(this.urlBase);
    }
  
    agregarSeccion(seccion: Seccion): Observable<Object> {
      return this.clienteHttp.post(this.urlBase, seccion);
    }
    
    obtenerSeccionPorId(idSeccion: number): Observable<Seccion> {
      return this.clienteHttp.get<Seccion>(`${this.urlBase}/${idSeccion}`);
    } 
  
    editarSeccion(idSeccion: number, seccion: Seccion): Observable<any> {
      // Establecer el usuario que modifica y la fecha de modificación
      seccion.modificadoPor = 'U20244131';
      seccion.fechaModificacion = new Date().toISOString();
    
      // Realizar la solicitud PUT al backend
      return this.clienteHttp.put(`${this.urlBase}/${idSeccion}`, seccion);
    }
    
  
    eliminarSeccion(idSeccion: number): Observable<Object> {
      return this.clienteHttp.delete(`${this.urlBase}/${idSeccion}`);
    }
}
 