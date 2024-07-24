import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from './auth.service';

@Directive({
  selector: '[appShowForRole]'
})
export class ShowForRoleDirective {
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private authService: AuthService
  ) {}

  @Input() set appShowForRole(role: string) {
    let show = false;
    if (role === 'Administrador') {
      show = this.authService.esAdministrador();
    } else if (role === 'Estudiante') {
      show = this.authService.esEstudiante();
    }
    
    if (show) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
