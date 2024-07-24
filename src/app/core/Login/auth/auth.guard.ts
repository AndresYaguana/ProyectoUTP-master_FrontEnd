import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(): boolean {
    const isAuthenticated = !!this.authService.getLoggedInUser();
    if (!isAuthenticated) {
      this.router.navigate(['/']); // Solo redirige si el usuario no está autenticado
      return false;
    }
    return true;
  }
}
