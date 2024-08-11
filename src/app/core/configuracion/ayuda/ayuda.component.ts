import { Component } from '@angular/core';

@Component({
  selector: 'app-ayuda',
  templateUrl: './ayuda.component.html',
  styleUrl: './ayuda.component.scss'
})
export class AyudaComponent {

  activeContent: string = 'proyecto';

  showContent(contentId: string): void {
    this.activeContent = contentId;
    document.getElementById(contentId)?.scrollIntoView({ behavior: 'smooth' });
  }
}
