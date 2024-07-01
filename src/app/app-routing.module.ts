import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AppLayoutComponent } from './core/layout/app.layout.component';
import { CursosComponent } from './core/cursos/cursos.component';
import { CategoriasComponent } from './core/categorias/categorias.component';
import { DashboardCursoComponent } from './core/cursos/dashboard-curso/dashboard-curso.component';
import { DashboardCategoriacursosComponent } from './core/categorias/dashboard-categoriacursos/dashboard-categoriacursos.component';

const routes: Routes = [
  {
    path: '', loadChildren: () => import('./core/Login/login.module').then(m => m.LoginModule)
  },
  {
    path: '', component: AppLayoutComponent,
    children: [
      { path: 'Inicio', loadChildren: () => import('./pages/inicio/inicio.module').then(m => m.InicioModule) },
      { path: 'Usuarios', loadChildren: () => import('./core/usuarios/usuarios.module').then(m => m.UsuariosModule) },
      { path: 'Cursos', loadChildren: () => import('./core/cursos/cursos.module').then(m => m.CursosModule) },
      { path: 'curso/:ruta', component: CursosComponent },
      { path: 'Categorias', loadChildren: () => import('./core/categorias/categorias.module').then(m => m.CategoriasModule) },
      { path: 'categoria/:ruta', component: CategoriasComponent },
      { path: 'Dashboard-Curso', component: DashboardCursoComponent },
      { path: 'categorias/:idCategoria', component: DashboardCategoriacursosComponent },
      { path: 'TiposUsuarios', loadChildren: () => import('./core/usuarios/tipo-usuario/tipo-usuario.module').then(m => m.TipoUsuarioModule) },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
