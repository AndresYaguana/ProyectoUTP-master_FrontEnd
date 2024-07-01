import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TipoUsuario } from '././tipo-usuario';

@Injectable({
  providedIn: 'root'
})

export class TipoUsuarioService {

    private urlBase = 'http://localhost:8080/ProyectoUTP-master/tipousuarios'

    constructor(private clienteHttp: HttpClient) { }

    obtenerTipousuarioLista(): Observable<TipoUsuario[]>{
      return this.clienteHttp.get<TipoUsuario[]>(this.urlBase)
    }
  
    agregarTipousuario(categoria: TipoUsuario):Observable<Object>{
      return this.clienteHttp.post(this.urlBase, categoria);
    }
    
    obtenerTipousuarioPorId(idTipousuario:number): Observable<TipoUsuario>{
      return this.clienteHttp.get<TipoUsuario>(`${this.urlBase}/${idTipousuario}`);
    } 
  
    editarTipousuario(idTipousuario: number, tipousuario: TipoUsuario):Observable<Object>{
      return this.clienteHttp.put(`${this.urlBase}/${idTipousuario}`,tipousuario);
    }
  
    eliminarTipousuario(idTipousuario: number):Observable<Object>{
      return this.clienteHttp.delete(`${this.urlBase}/${idTipousuario}`);
    }
}