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
  
  obtenerUsuarioPorId(id:number){
    return this.clienteHttp.get<Usuario>(`${this.urlBase}/${id}`);
  } 

  editarUsuario(id: number, usuarios: Usuario):Observable<Object>{
    return this.clienteHttp.put(`${this.urlBase}/${id}`,usuarios);
  }

  eliminarUsuario(id: number):Observable<Object>{
    return this.clienteHttp.delete(`${this.urlBase}/${id}`);
  }
  
}
