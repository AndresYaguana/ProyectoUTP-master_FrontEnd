import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Usuario } from '../../usuarios/usuarios';
import { TipoUsuario } from '../../usuarios/tipo-usuario/tipo-usuario';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/ProyectoUTP-master'; 
  private loggedInUserKey = 'loggedInUser';

  constructor(private http: HttpClient, private router: Router) { }

  login(email: string, password: string): Observable<Usuario | null> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { email, password };
  
    return this.http.post<Usuario>(`${this.apiUrl}/login`, body, { headers }).pipe(
      map(user => {
        console.log('Login response:', user);  // Log the response
        localStorage.setItem(this.loggedInUserKey, JSON.stringify(user));
        return user;
      }),
      catchError(() => {
        return of(null);
      })
    );
  }
  
  getLoggedInUser(): Usuario | null {
    const userJson = localStorage.getItem(this.loggedInUserKey);
    if (userJson) {
      return JSON.parse(userJson) as Usuario;
    }
    return null;
  }

  logout(): void {
    localStorage.removeItem(this.loggedInUserKey);
    this.router.navigate(['']);  // Redirige a la página de inicio de sesión
  }

  esAdministrador(): boolean {
    const user = this.getLoggedInUser();
    return user?.tipousuario?.idTipousuario === 1;
  }
  
  esEstudiante(): boolean {
    const user = this.getLoggedInUser();
    return user?.tipousuario?.idTipousuario === 2;
  }
  

  tienePermiso(permiso: string): boolean {
    const user = this.getLoggedInUser();
    if (user && user.tipousuario && user.tipousuario.permisos) {
      return user.tipousuario.permisos.includes(permiso);
    }
    return false;
  }
}
