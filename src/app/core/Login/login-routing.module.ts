import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';



@NgModule({
  imports: [RouterModule.forChild([
      { path: '', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
      { path: 'Registrate', loadChildren: () => import('./registro/registro.module').then(m => m.RegistroModule)},
      { path: 'Olvide-Contraseña', loadChildren: () => import('./forget-password/forget-password.module').then(m => m.ForgetPasswordModule)},
      { path: 'Verificacion', loadChildren: () => import('./verification/verification.module').then(m => m.VerificationModule)},
      { path: 'Nuevo-Contraseña', loadChildren: () => import('./new-password/new-password.module').then(m => m.NewPasswordModule)},
      
  ])],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
