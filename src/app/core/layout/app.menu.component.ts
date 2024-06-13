import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from '../service/app-layout.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './app.menu.component.html',
  styleUrls: ['./app.menu.component.scss']
})
export class AppMenuComponent implements OnInit {

  model: any[] = [];

  constructor(
    public layoutService: LayoutService
  ) { }

  ngOnInit() {
    this.model = [
     /* {
        label: 'Dashboard', icon: 'pi-security', routerLink: ['/Dashboard1'],
        items: [
          { label: 'Principal', icon: 'pi pi-users', routerLink: ['/Dashboard1'] }
        ]
      },*/
      {
        label: 'Cursos', icon: 'pi pi-book', routerLink: ['/dashboard-sales'],
        items: [
          { label: 'Matemática I', icon: 'pi pi-angle-right', routerLink: ['/dashboard-sales'] },
          { label: 'Comunicación', icon: 'pi pi-angle-right', routerLink: ['/dashboard-sales'] }
        ]
      },
      {
        label: 'Comunidad', icon: 'pi-users', routerLink: ['/dashboard-sales'],
        items: [
          { label: 'Foro', icon: 'pi pi-comments', routerLink: ['/dashboard-sales'] }
        ]
      },
      {
        label: 'Seguridad', icon: 'pi-security', routerLink: ['/dashboard-sales'],
        items: [
          { label: 'Usuarios', icon: 'pi pi-users', routerLink: ['/Usuarios'] }
        ]
      }
    ];
  }

  toggleMenu(item: any) {
    this.layoutService.isMenuOpen = !this.layoutService.isMenuOpen;
  }
}
