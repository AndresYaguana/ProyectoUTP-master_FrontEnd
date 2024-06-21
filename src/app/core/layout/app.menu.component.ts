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
    /*this.cursoService.obtenerCursoLista().subscribe(cursos => {
      const cursosMenuItems: MenuItem[] = cursos.map(curso => ({
        label: curso.nombre,
        icon: 'pi pi-angle-right', // icon for sub-menu items
        routerLink: [curso.ruta],
        items: []
      }));*/

      this.model = [
        {
          label: 'Cursos', icon: 'pi pi-bo', routerLink: ['/.'],
          //items: cursosMenuItems
          items: [
            { label: 'Gestion Categorias', icon: 'pi pi-sitemap', routerLink: ['/Categorias'] },
            { label: 'Gestion Cursos', icon: 'pi pi-book', routerLink: ['/Cursos'] }
          ]
        },
        {
          label: 'Comunidad', icon: 'pi pi-comme', routerLink: ['/.'],
          items: [
            { label: 'Foro', icon: 'pi pi-comments', routerLink: ['/.'] }
          ]
        },
        {
          label: 'Seguridad', icon: 'pi pi-security', routerLink: ['/.'],
          items: [
            { label: 'Usuarios', icon: 'pi-user-plus', routerLink: ['/Usuarios'] }
          ]
        }
      ];
  }


  toggleMenu(item: any) {
    this.layoutService.isMenuOpen = !this.layoutService.isMenuOpen;
  }
}
