import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from '../service/app-layout.service';
import { CursosService } from '../cursos/cursos.service';

@Component({
  selector: 'app-menu',
  templateUrl: './app.menu.component.html',
  styleUrls: ['./app.menu.component.scss']
})
export class AppMenuComponent implements OnInit {

  model: MenuItem[] = [];

  constructor(
    public layoutService: LayoutService,
    private cursoService: CursosService
  ) { }

  ngOnInit() {
    this.cursoService.obtenerCursoLista().subscribe(cursos => {
      const cursosMenuItems: MenuItem[] = cursos.map(curso => ({
        label: curso.nombre,
        icon: 'pi pi-angle-right', // icon for sub-menu items
        routerLink: [curso.ruta],
        items: []
      }));

      this.model = [
        {
          label: 'Cursos', icon: 'pi pi-bo', routerLink: ['/Cursos'],
          items: cursosMenuItems
        },
        {
          label: 'Comunidad', icon: 'pi pi-comme', routerLink: ['/dashboard-sales'],
          items: [
            { label: 'Foro', icon: 'pi pi-comments', routerLink: ['/dashboard-sales'] }
          ]
        },
        {
          label: 'Seguridad', icon: 'pi pi-security', routerLink: ['/dashboard-sales'],
          items: [
            { label: 'Usuarios', icon: 'pi pi-users', routerLink: ['/Usuarios'] }
          ]
        }
      ];
    });
  }

  toggleMenu(item: any) {
    this.layoutService.isMenuOpen = !this.layoutService.isMenuOpen;
  }
}
