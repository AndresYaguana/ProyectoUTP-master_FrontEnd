import { NgModule } from '@angular/core';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
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
import { DashboardCursoPipe } from './core/cursos/dashboard-curso/dashboard-curso.pipe';
import { DashboardCursoComponent } from './core/cursos/dashboard-curso/dashboard-curso.component';
import { DashboardCategoriacursosComponent } from './core/categorias/dashboard-categoriacursos/dashboard-categoriacursos.component';
import { TipoUsuarioModule } from './core/usuarios/tipo-usuario/tipo-usuario.module';
import { TipoUsuarioService } from './core/usuarios/tipo-usuario/tipo-usuario.service';
import { AgregarTipoUsuarioComponent } from './core/usuarios/tipo-usuario/agregar-tipo-usuario/agregar-tipo-usuario.component';
import { EditarTipoUsuarioComponent } from './core/usuarios/tipo-usuario/editar-tipo-usuario/editar-tipo-usuario.component';
import { SeccionesCursoModule } from './core/cursos/detalles-curso/secciones-curso/secciones-curso.module';
import { DashboardCursoModule } from './core/cursos/dashboard-curso/dashboard-curso.module';
import { TabViewModule } from 'primeng/tabview';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DetallesCursoComponent } from './core/cursos/detalles-curso/detalles-curso.component';
import { SeccionesCursoComponent } from './core/cursos/detalles-curso/secciones-curso/secciones-curso.component';
import { SeccionService } from './core/cursos/detalles-curso/secciones-curso/secciones-curso.service';
import { AgregarSeccionesCursoComponent } from './core/cursos/detalles-curso/secciones-curso/agregar-secciones-curso/agregar-secciones-curso.component';
import { EditarSeccionesCursoComponent } from './core/cursos/detalles-curso/secciones-curso/editar-secciones-curso/editar-secciones-curso.component';

@NgModule({
  declarations: [
    AppComponent,
    AgregarUsuarioComponent,
    AgregarCursoComponent,
    EditarCursoComponent,
    EditarCategoriaComponent,
    AgregarCategoriaComponent,
    DashboardCursoPipe,
    DashboardCategoriacursosComponent,
    AgregarTipoUsuarioComponent,
    EditarTipoUsuarioComponent,
    DetallesCursoComponent,
    AgregarSeccionesCursoComponent,
    EditarSeccionesCursoComponent
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
    BrowserModule,
    TipoUsuarioModule,
    TabViewModule,
    BrowserAnimationsModule,
    CommonModule,
    SeccionesCursoModule
  ],
  providers: [
    AuthService,
    UsuariosService,
    CursosService,
    CategoriasService,
    TipoUsuarioService,
    SeccionService,
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
