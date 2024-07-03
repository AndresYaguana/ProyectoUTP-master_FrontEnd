import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from '../service/app-layout.service';
import { CategoriasService } from '../categorias/categorias.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './app.menu.component.html',
  styleUrls: ['./app.menu.component.scss']
})
export class AppMenuComponent implements OnInit {

  model: MenuItem[] = [];

  constructor(
    public layoutService: LayoutService,
    private categoriaService: CategoriasService,
    private router: Router 
  ) { }

  ngOnInit() {
    this.categoriaService.obtenerCategoriaLista().subscribe(categorias => {
      const categoriasMenuItems: MenuItem[] = categorias.map(categoria => ({
        label: categoria.nombre,
        icon: 'pi pi-slack',
        routerLink: ['/categorias', categoria.idCategoria],
        items: [],
        expanded: false
      }));

      this.model = [
        {
          label: 'Cursos', icon: 'pi pi-book', routerLink: ['/pi-book'],
          items: [
            { label: 'Dashboard', icon: 'pi pi-warehouse', routerLink: ['/Dashboard-Curso'] },
            { label: 'Gestión Cursos', icon: 'pi pi-address-book', routerLink: ['/Cursos'] },
            { label: 'Gestión Seccion', icon: 'pi pi-address-book', routerLink: ['/GestionSeccion'] },
            { label: 'Categorías', icon: 'pi pi-bookmark-fill', routerLink: ['/pi-book'],
              items: [
                { label: 'Gestión Categorías', icon: 'pi pi-plus', routerLink: ['/Categorias'] },
                ...categoriasMenuItems
              ],
              expanded: false
            }
          ],
          expanded: false
        },
        {
          label: 'Comunidad', icon: 'pi pi-comments', routerLink: ['/pi-book'],
          items: [
            { label: 'Foro', icon: 'pi pi-comments', routerLink: ['/pi-book'] }
          ],
          expanded: false
        },
        {
          label: 'Seguridad', icon: 'pi pi-shield', routerLink: ['/pi-book'],
          items: [
            { label: 'Usuarios', icon: 'pi-users', routerLink: ['/pi-book'],
              items: [
                { label: 'Gestión Usuarios', icon: 'pi-user-plus', routerLink: ['/Usuarios'] },
                { label: 'Tipos Usuarios', icon: 'pi-user-edit', routerLink: ['/TiposUsuarios'] }
              ],
              expanded: false
            }
          ],
          expanded: false
        }
      ];
    });
  }

  toggleSubMenu(item: MenuItem) {
    item.expanded = !item.expanded;
  }

  mostrarCursosPorCategoria(categoriaItem: MenuItem) {
    const idCategoria = categoriaItem.routerLink[1];
    this.router.navigate(['/categorias', idCategoria]);
  }
}
