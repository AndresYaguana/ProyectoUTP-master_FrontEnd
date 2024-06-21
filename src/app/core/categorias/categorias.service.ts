import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categoria } from './categorias';

@Injectable({
  providedIn: 'root'
})

export class CategoriasService {

    private urlBase = 'http://localhost:8080/ProyectoUTP-master/categorias'

    constructor(private clienteHttp: HttpClient) { }

    obtenerCategoriaLista(): Observable<Categoria[]>{
      return this.clienteHttp.get<Categoria[]>(this.urlBase)
    }
  
    agregarCategoria(categoria: Categoria):Observable<Object>{
      return this.clienteHttp.post(this.urlBase, categoria);
    }
    
    obtenerCategoriaPorId(idCategoria:number): Observable<Categoria>{
      return this.clienteHttp.get<Categoria>(`${this.urlBase}/${idCategoria}`);
    } 
  
    editarCategoria(idCategoria: number, categoria: Categoria):Observable<Object>{
      return this.clienteHttp.put(`${this.urlBase}/${idCategoria}`,categoria);
    }
  
    eliminarCategoria(idCategoria: number):Observable<Object>{
      return this.clienteHttp.delete(`${this.urlBase}/${idCategoria}`);
    }
}