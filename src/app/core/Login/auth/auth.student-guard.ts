import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class StudentGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(): boolean {
    if (this.authService.esEstudiante() || this.authService.esAdministrador()) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}
