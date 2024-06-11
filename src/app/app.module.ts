import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './core/layout/app.layout.module';

import { AuthComponent } from './core/Login/auth/auth.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './core/Login/auth/auth.service';
import { RegistroComponent } from './core/Login/registro/registro.component';
import { UsuariosService } from './core/usuarios/usuarios.service';
import { MatDialogModule } from '@angular/material/dialog';
import { UsuariosModule } from './core/usuarios/usuarios.module';
import { FormsModule } from '@angular/forms';
import { AgregarUsuarioComponent } from './core/usuarios/agregar-usuario/agregar-usuario.component';
@NgModule({
  declarations: [
    AppComponent,
    AgregarUsuarioComponent
  ],
  imports: [
    AppLayoutModule,
    AppRoutingModule, // Esta es la única importación de AppRoutingModule que necesitas
    HttpClientModule,
    ReactiveFormsModule,
    UsuariosModule,
    MatDialogModule,
    FormsModule
  ],
  providers: [
    AuthService,
    UsuariosService,
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
