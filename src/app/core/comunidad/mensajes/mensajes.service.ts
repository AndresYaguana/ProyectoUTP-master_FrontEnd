import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Mensaje } from './mensajes';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MensajesService {

  private urlBase = 'http://localhost:8080/ProyectoUTP-master';

  constructor(private http: HttpClient) { }

  obtenerMensajes(idUsuario: number): Observable<Mensaje[]> {
    return this.http.get<Mensaje[]>(`${this.urlBase}/usuario/${idUsuario}`);
  }

  enviarMensaje(mensaje: Mensaje): Observable<Mensaje> {
    return this.http.post<Mensaje>(`${this.urlBase}`, mensaje);
  }

  obtenerTodosLosMensajes(): Observable<Mensaje[]> {
    return this.http.get<Mensaje[]>(`${this.urlBase}/mensajes`);
  }
  
}
