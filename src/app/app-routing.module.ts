import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AppLayoutComponent } from './core/layout/app.layout.component';
import { CursosComponent } from './core/cursos/cursos.component';

const routes: Routes = [
  {
    path: '', loadChildren: () => import('./core/Login/login.module').then(m => m.LoginModule)
  },
  {
    path: '', component: AppLayoutComponent,
    children: [
      { path: 'Inicio', loadChildren: () => import('./pages/inicio/inicio.module').then(m => m.InicioModule)},
      { path: 'Usuarios', loadChildren: () => import('./core/usuarios/usuarios.module').then(m => m.UsuariosModule)},
      { path: 'Cursos', loadChildren: () => import('./core/cursos/cursos.module').then(m => m.CursosModule)},
      { path: 'curso/:ruta', component: CursosComponent }
      //{ path: 'Dashboard1', loadChildren: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent)}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
