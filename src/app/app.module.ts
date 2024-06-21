import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './core/layout/app.layout.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './core/Login/auth/auth.service';
import { UsuariosService } from './core/usuarios/usuarios.service';
import { MatDialogModule } from '@angular/material/dialog';
import { UsuariosModule } from './core/usuarios/usuarios.module';
import { FormsModule } from '@angular/forms';
import { AgregarUsuarioComponent } from './core/usuarios/agregar-usuario/agregar-usuario.component';
import { CursosService } from './core/cursos/cursos.service';
import { CursosModule } from './core/cursos/agregar-curso/agregar-curso.module';
import { AgregarCursoComponent } from './core/cursos/agregar-curso/agregar-curso.component';
import { EditarCursoComponent } from './core/cursos/editar-curso/editar-curso.component';
import { CategoriasModule } from './core/categorias/categorias.module';
import { CategoriasService } from './core/categorias/categorias.service';
import { EditarCategoriaComponent } from './core/categorias/editar-categoria/editar-categoria.component';
import { AgregarCategoriaComponent } from './core/categorias/agregar-categoria/agregar-categoria.component';
import { BrowserModule } from '@angular/platform-browser';
@NgModule({
  declarations: [
    AppComponent,
    AgregarUsuarioComponent,
    AgregarCursoComponent,
    EditarCursoComponent,
    EditarCategoriaComponent,
    AgregarCategoriaComponent
  ],
  imports: [
    AppLayoutModule,
    AppRoutingModule, // Esta es la única importación de AppRoutingModule que necesitas
    HttpClientModule,
    ReactiveFormsModule,
    UsuariosModule,
    MatDialogModule,
    FormsModule,
    CursosModule,
    CategoriasModule,
    BrowserModule
  ],
  providers: [
    AuthService,
    UsuariosService,
    CursosService,
    CategoriasService,

    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
