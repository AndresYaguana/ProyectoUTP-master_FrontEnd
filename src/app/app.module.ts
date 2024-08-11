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
import { CursosService } from './core/cursos/cursos.service';
import { CategoriasModule } from './core/categorias/categorias.module';
import { CategoriasService } from './core/categorias/categorias.service';
import { BrowserModule } from '@angular/platform-browser';
import { DashboardCursoPipe } from './core/cursos/dashboard-curso/dashboard-curso.pipe';
import { DashboardCursoComponent } from './core/cursos/dashboard-curso/dashboard-curso.component';
import { DashboardCategoriacursosComponent } from './core/categorias/dashboard-categoriacursos/dashboard-categoriacursos.component';
import { TipoUsuarioModule } from './core/usuarios/tipo-usuario/tipo-usuario.module';
import { TipoUsuarioService } from './core/usuarios/tipo-usuario/tipo-usuario.service';
import { SeccionesCursoModule } from './core/cursos/detalles-curso/secciones-curso/secciones-curso.module';
import { DashboardCursoModule } from './core/cursos/dashboard-curso/dashboard-curso.module';
import { TabViewModule } from 'primeng/tabview';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DetallesCursoComponent } from './core/cursos/detalles-curso/detalles-curso.component';
import { SeccionesCursoComponent } from './core/cursos/detalles-curso/secciones-curso/secciones-curso.component';
import { SeccionService } from './core/cursos/detalles-curso/secciones-curso/secciones-curso.service';
import { ForoModule } from './core/comunidad/foro/foro.module';
import { ForoComponent } from './core/comunidad/foro/foro.component';
import { DropdownModule } from 'primeng/dropdown';
import { AgregarContenidoCursoComponent } from './core/cursos/detalles-curso/contenido-curso/agregar-contenido-curso/agregar-contenido-curso.component';
import { ContenidoCursoModule } from './core/cursos/detalles-curso/contenido-curso/agregar-contenido-curso/agregar-contenido-curso.module';
import { ContenidoService } from './core/cursos/detalles-curso/contenido-curso/contenido-curso.service';
import { DialogModule } from '@angular/cdk/dialog';
import { DetallesCursoModule } from './core/cursos/detalles-curso/detalles-curso.module';
import { SafePipe } from './core/cursos/detalles-curso/detalles-curso-pipe';

@NgModule({
  declarations: [
    AppComponent,
    DashboardCursoPipe,
    DashboardCategoriacursosComponent,
    ForoComponent,
    AgregarContenidoCursoComponent
    
  ],
  imports: [
    AppLayoutModule,
    AppRoutingModule, // Esta es la única importación de AppRoutingModule que necesitas
    HttpClientModule,
    ReactiveFormsModule,
    UsuariosModule,
    MatDialogModule,
    FormsModule,
    BrowserModule,
    TipoUsuarioModule,
    TabViewModule,
    BrowserAnimationsModule,
    CommonModule,
    SeccionesCursoModule,
    ForoModule,
    ContenidoCursoModule,
    DetallesCursoModule,
    DropdownModule
  ],
  providers: [
    AuthService,
    UsuariosService,
    CursosService,
    CategoriasService,
    TipoUsuarioService,
    SeccionService,
    ContenidoService,
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
