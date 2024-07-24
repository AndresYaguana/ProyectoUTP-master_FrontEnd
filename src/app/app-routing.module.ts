import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AppLayoutComponent } from './core/layout/app.layout.component';
import { CursosComponent } from './core/cursos/cursos.component';
import { CategoriasComponent } from './core/categorias/categorias.component';
import { DashboardCursoComponent } from './core/cursos/dashboard-curso/dashboard-curso.component';
import { DashboardCategoriacursosComponent } from './core/categorias/dashboard-categoriacursos/dashboard-categoriacursos.component';
import { DetallesCursoComponent } from './core/cursos/detalles-curso/detalles-curso.component';
import { AyudaComponent } from './core/configuracion/ayuda/ayuda.component';
import { ForoComponent } from './core/comunidad/foro/foro.component';
import { AuthGuard } from './core/Login/auth/auth.guard';
import { AdminGuard } from './core/Login/auth/auth.admin-guard';
import { StudentGuard } from './core/Login/auth/auth.student-guard';

const routes: Routes = [
  {
    path: '', loadChildren: () => import('./core/Login/login.module').then(m => m.LoginModule)
  },
  {
    path: '', component: AppLayoutComponent,
    children: [
      { path: 'Inicio', loadChildren: () => import('./pages/inicio/inicio.module').then(m => m.InicioModule),  canActivate: [StudentGuard] },
      { path: 'Usuarios', loadChildren: () => import('./core/usuarios/usuarios.module').then(m => m.UsuariosModule), canActivate: [AdminGuard] },
      { path: 'Cursos', loadChildren: () => import('./core/cursos/cursos.module').then(m => m.CursosModule), canActivate: [AdminGuard] },
      { path: 'curso/:ruta', component: CursosComponent, canActivate: [StudentGuard] },
      { path: 'Categorias', loadChildren: () => import('./core/categorias/categorias.module').then(m => m.CategoriasModule), canActivate: [AdminGuard] },
      { path: 'categoria/:ruta', component: CategoriasComponent, canActivate: [StudentGuard] },
      { path: 'Dashboard-Curso', component: DashboardCursoComponent, canActivate: [StudentGuard] },
      { path: 'categorias/:idCategoria', component: DashboardCategoriacursosComponent, canActivate: [StudentGuard] },
      { path: 'TiposUsuarios', loadChildren: () => import('./core/usuarios/tipo-usuario/tipo-usuario.module').then(m => m.TipoUsuarioModule), canActivate: [AdminGuard] },
      { path: 'cursos/:idCurso', component: DetallesCursoComponent, canActivate: [StudentGuard] },
      { path: 'GestionSeccion', loadChildren: () => import('./core/cursos/detalles-curso/secciones-curso/secciones-curso.module').then(m => m.SeccionesCursoModule), canActivate: [AdminGuard] },
      { path: 'GestionContenido', loadChildren: () => import('./core/cursos/detalles-curso/contenido-curso/contenido-curso.module').then(m => m.ContenidoCursoModule), canActivate: [AdminGuard] },
      { path: 'Ayuda', component: AyudaComponent, canActivate: [StudentGuard] },
      { path: 'Foro', component: ForoComponent, canActivate: [StudentGuard] },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
