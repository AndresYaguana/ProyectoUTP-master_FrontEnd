import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from './usuarios';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private urlBase = 'http://localhost:8080/ProyectoUTP-master/usuarios'

  constructor(private clienteHttp: HttpClient) { }

  obtenerUsuarioLista(): Observable<Usuario[]>{
    return this.clienteHttp.get<Usuario[]>(this.urlBase)
  }

  agregarUsuario(usuarios: Usuario):Observable<Object>{
    return this.clienteHttp.post(this.urlBase, usuarios);
  }
  
  obtenerUsuarioPorId(idUsuario:number): Observable<Usuario>{
    return this.clienteHttp.get<Usuario>(`${this.urlBase}/${idUsuario}`);
  } 

  editarUsuario(idUsuario: number, usuarios: Usuario):Observable<Object>{
    return this.clienteHttp.put(`${this.urlBase}/${idUsuario}`,usuarios);
  }

  eliminarUsuario(idUsuario: number):Observable<Object>{
    return this.clienteHttp.delete(`${this.urlBase}/${idUsuario}`);
  }
  
  private currentUser: string = '';

  setUser(user: string) {
    this.currentUser = user;
  }

  getUser(): string {
    return this.currentUser;
  }
}
