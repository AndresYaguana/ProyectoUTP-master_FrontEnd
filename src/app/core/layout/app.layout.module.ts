import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputTextModule } from 'primeng/inputtext';
import { SidebarModule } from 'primeng/sidebar';
import { BadgeModule } from 'primeng/badge';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputSwitchModule } from 'primeng/inputswitch';
import { RippleModule } from 'primeng/ripple';
import { RouterModule } from '@angular/router';
import { StyleClassModule } from 'primeng/styleclass';
import { TooltipModule } from 'primeng/tooltip';
import { DropdownModule } from 'primeng/dropdown';
import { MenuModule } from 'primeng/menu';
import { AppLayoutComponent } from './app.layout.component';
import { AppSidebarComponent } from './app.sidebar.component';
import { AppMenuComponent } from './app.menu.component';
import { AppMenuitemComponent } from './app.menuitem.component';
import { AppTopbarComponent } from './app.topbar.component';
import { ButtonModule } from 'primeng/button';


@NgModule({
  declarations: [
    AppMenuitemComponent,
    AppTopbarComponent,
    AppSidebarComponent,
    AppMenuComponent,
    AppLayoutComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    InputTextModule,
    InputSwitchModule,
    MenuModule,
    RouterModule,
    DropdownModule,
    SidebarModule,
    StyleClassModule,
    BadgeModule,
    RadioButtonModule,
    InputSwitchModule,
    RippleModule,
    RouterModule,
    TooltipModule,
    ButtonModule
  ],
  exports: [AppLayoutComponent]
})
export class AppLayoutModule { }