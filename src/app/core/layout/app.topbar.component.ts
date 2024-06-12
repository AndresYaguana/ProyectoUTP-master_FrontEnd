import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ColorScheme, LayoutService } from '../service/app-layout.service';
import { UsuariosService } from '../usuarios/usuarios.service';
import { Password } from 'primeng/password';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuariosComponent } from '../usuarios/usuarios.component';
import { Usuario } from '../usuarios/usuarios';


@Component({
  //providers: [UsuariosService],
  selector: 'app-topbar',
  templateUrl: './app.topbar.component.html'
})
export class AppTopbarComponent implements OnInit{
  usuario: string = '';

  //loginFormulario: FormGroup;
  //email:string = '';
  
  menu: MenuItem[] = [];

  varmodo: boolean = false;

  @ViewChild('searchinput') searchInput!: ElementRef;

  @ViewChild('menubutton') menuButton!: ElementRef;

  searchActive: boolean = false;
 
  constructor(private fb: FormBuilder, public layoutService: LayoutService,private usuariosServicio: UsuariosService,) {}

  ngOnInit() {
    
    this.usuario = this.usuariosServicio.getUser();
    console.log('Usuario actual:', this.usuario);
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
}
