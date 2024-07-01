import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Curso } from './cursos';
import { Seccion } from './secciones-curso/secciones';
import { Contenido } from './contenido-curso/contenido';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

    private urlBase = 'http://localhost:8080/ProyectoUTP-master/cursos'

    constructor(private clienteHttp: HttpClient) { }

    obtenerCursoLista(): Observable<Curso[]>{
      return this.clienteHttp.get<Curso[]>(this.urlBase)
    }
  
    agregarCurso(cursos: Curso):Observable<Object>{
      return this.clienteHttp.post(this.urlBase, cursos);
    }
    
    obtenerCursoPorId(idCurso:number): Observable<Curso>{
      return this.clienteHttp.get<Curso>(`${this.urlBase}/${idCurso}`);
    } 
  
    editarCurso(idCurso: number, cursos: Curso):Observable<Object>{
      return this.clienteHttp.put(`${this.urlBase}/${idCurso}`,cursos);
    }
  
    eliminarCurso(idCurso: number):Observable<Object>{
      return this.clienteHttp.delete(`${this.urlBase}/${idCurso}`);
    }

    obtenerCursosPorCategoria(idCategoria: number): Observable<Curso[]> {
      return this.clienteHttp.get<Curso[]>(`${this.urlBase}/categoria/${idCategoria}`);
    }

    obtenerSeccionesCurso(idCurso: number): Observable<Seccion[]> {
      return this.clienteHttp.get<Seccion[]>(`${this.urlBase}/${idCurso}/seccion`);
    }

 
}