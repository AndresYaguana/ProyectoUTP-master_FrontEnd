import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/ProyectoUTP-master'; // URL de tu backend

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { email, password };
    // Realiza la solicitud HTTP al endpoint de inicio de sesión en tu backend
    return this.http.post<any>(`${this.apiUrl}/login`, body ,{ headers }).pipe(
        map(response => {
            return response;
        })
    );
  }

}
