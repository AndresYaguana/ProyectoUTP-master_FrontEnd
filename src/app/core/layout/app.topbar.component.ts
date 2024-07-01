import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ColorScheme, LayoutService } from '../service/app-layout.service';
import { AuthService } from '../Login/auth/auth.service';
import { Usuario } from '../usuarios/usuarios';

@Component({
  selector: 'app-topbar',
  templateUrl: './app.topbar.component.html'
})
export class AppTopbarComponent implements OnInit {
  usuario: Usuario | null = null;

  menu: MenuItem[] = [];
  varmodo: boolean = false;

  @ViewChild('searchinput') searchInput!: ElementRef;
  @ViewChild('menubutton') menuButton!: ElementRef;

  searchActive: boolean = false;

  constructor(
    public layoutService: LayoutService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.usuario = this.authService.getLoggedInUser();
    console.log('Usuario actual:', this.usuario);
  }

  tienePermiso(permiso: string): boolean {
    return this.authService.tienePermiso(permiso); // Llamar al método del servicio de autenticación
  }

  onClickMode() {
    if (this.varmodo == false) {
      this.changeColorScheme('dark');
      this.varmodo = true;
    } else {
      this.changeColorScheme('light');
      this.varmodo = false;
    }
  };

  changeColorScheme(colorScheme: ColorScheme) {
    const themeLink = <HTMLLinkElement>document.getElementById('theme-link');
    const themeLinkHref = themeLink.getAttribute('href');
    const currentColorScheme = 'theme-' + this.layoutService.config.colorScheme;
    const newColorScheme = 'theme-' + colorScheme;
    const newHref = themeLinkHref!.replace(currentColorScheme, newColorScheme);
    this.replaceThemeLink(newHref, () => {
      this.layoutService.config.colorScheme = colorScheme;
      this.layoutService.onConfigUpdate();
    });
  }

  replaceThemeLink(href: string, onComplete: Function) {
    const id = 'theme-link';
    const themeLink = <HTMLLinkElement>document.getElementById(id);
    const cloneLinkElement = <HTMLLinkElement>themeLink.cloneNode(true);

    cloneLinkElement.setAttribute('href', href);
    cloneLinkElement.setAttribute('id', id + '-clone');

    themeLink.parentNode!.insertBefore(cloneLinkElement, themeLink.nextSibling);

    cloneLinkElement.addEventListener('load', () => {
      themeLink.remove();
      cloneLinkElement.setAttribute('id', id);
      onComplete();
    });
  }

  onMenuButtonClick() {
    this.layoutService.onMenuToggle();
  }

  activateSearch() {
    this.searchActive = true;
    setTimeout(() => {
      this.searchInput.nativeElement.focus();
    }, 100);
  }

  deactivateSearch() {
    this.searchActive = false;
  }

  removeTab(event: MouseEvent, item: MenuItem, index: number) {
    this.layoutService.onTabClose(item, index);
    event.preventDefault();
  }

  get layoutTheme(): string {
    return this.layoutService.config.layoutTheme;
  }

  get colorScheme(): string {
    return this.layoutService.config.colorScheme;
  }

  get logo(): string {
    const path = 'assets/layout/images/logo-';
    const logo = (this.layoutTheme === 'primaryColor' && !(this.layoutService.config.theme == "yellow")) ? 'light.png' : (this.colorScheme === 'light' ? 'dark.png' : 'light.png');
    return path + logo;
  }

  get tabs(): MenuItem[] {
    return this.layoutService.tabs;
  }

  cerrarSesion(): void {
    this.authService.logout();
  }
}
