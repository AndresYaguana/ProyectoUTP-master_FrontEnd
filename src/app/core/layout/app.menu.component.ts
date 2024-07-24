import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from './app-layout.service';
import { CategoriasService } from '../categorias/categorias.service';
import { Router } from '@angular/router';
import { AuthService } from '../Login/auth/auth.service';

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
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    const isAdmin = this.authService.esAdministrador();
    const isStudent = this.authService.esEstudiante();

    this.categoriaService.obtenerCategoriaLista().subscribe(categorias => {
      const categoriasMenuItems: MenuItem[] = categorias.map(categoria => ({
        label: categoria.nombre,
        icon: 'pi pi-slack',
        routerLink: ['/categorias', categoria.idCategoria],
        visible: isStudent|| isAdmin, // Solo visible para estudiantes
        items: [],
        expanded: false
      }));

      this.model = [
        {
          label: 'Cursos', icon: 'pi pi-book', routerLink: ['/pi-book'],
          visible: isStudent || isAdmin,
          items: [
            { label: 'Dashboard', icon: 'pi pi-warehouse', routerLink: ['/Dashboard-Curso'], visible: isStudent || isAdmin },
            { label: 'Gestión Cursos', icon: 'pi pi-address-book', routerLink: ['/Cursos'], visible: isAdmin },
            { label: 'Gestión Sección', icon: 'pi pi-address-book', routerLink: ['/GestionSeccion'], visible: isAdmin },
            { label: 'Gestión Contenido', icon: 'pi pi-address-book', routerLink: ['/GestionContenido'], visible: isAdmin },
            {
              label: 'Categorías', icon: 'pi pi-bookmark-fill', routerLink: ['/pi-book'],
              visible: isStudent || isAdmin,
              items: [
                { label: 'Gestión Categorías', icon: 'pi pi-plus', routerLink: ['/Categorias'], visible: isAdmin },
                ...categoriasMenuItems
              ],
              expanded: false
            }
          ],
          expanded: false
        },
        {
          label: 'Comunidad', icon: 'pi pi-comments', routerLink: ['/pi-book'],
          visible: isStudent || isAdmin,
          items: [
            { label: 'Foro', icon: 'pi pi-comments', routerLink: ['/Foro'], visible: isStudent || isAdmin }
          ],
          expanded: false
        },
        {
          label: 'Seguridad', icon: 'pi pi-shield', routerLink: ['/pi-book'],
          visible: isAdmin,
          items: [
            {
              label: 'Usuarios', icon: 'pi-users', routerLink: ['/pi-book'],
              visible: isAdmin,
              items: [
                { label: 'Gestión Usuarios', icon: 'pi-user-plus', routerLink: ['/Usuarios'], visible: isAdmin },
                { label: 'Tipos Usuarios', icon: 'pi-user-edit', routerLink: ['/TiposUsuarios'], visible: isAdmin }
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
