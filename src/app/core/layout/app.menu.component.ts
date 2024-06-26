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

  model: any[] = [];

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
        expanded: false // Agregar propiedad expanded
      }));

      this.model = [
        {
          label: 'Cursos', icon: 'pi pi-book', routerLink: ['/pi-book'],
          items: [
            { label: 'Dashboard', icon: 'pi-warehouse', routerLink: ['/Dashboard-Curso'] },
            { label: 'Gestion Cursos', icon: 'pi-address-book', routerLink: ['/Cursos'] },
            { label: 'Categorias', icon: 'pi pi-bookmark-fill', routerLink: ['/pi-book'],
              items: [
                { label: 'Gestion Categorias', icon: 'pi pi-plus', routerLink: ['/Categorias'] },
                ...categoriasMenuItems
              ],
              expanded: false // Agregar propiedad expanded
            }
          ],
          expanded: false // Agregar propiedad expanded
        },
        {
          label: 'Comunidad', icon: 'pi pi-comments', routerLink: ['/pi-book'],
          items: [
            { label: 'Foro', icon: 'pi pi-comments', routerLink: ['/pi-book'] }
          ],
          expanded: false // Agregar propiedad expanded
        },
        {
          label: 'Seguridad', icon: 'pi pi-shield', routerLink: ['/pi-book'],
          items: [
            { label: 'Usuarios', icon: 'pi pi-user-plus', routerLink: ['/Usuarios'] }
          ],
          expanded: false // Agregar propiedad expanded
        }
      ];
    });
  }

  toggleSubMenu(item: any) {
    item.expanded = !item.expanded;
  }

  mostrarCursosPorCategoria(categoriaItem: MenuItem) {
    const idCategoria = categoriaItem.routerLink[1];
    this.router.navigate(['/categorias', idCategoria]);
  }
  
}
