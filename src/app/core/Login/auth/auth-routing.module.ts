import { NgModule } from '@angular/core';
import { AuthComponent } from './auth.component';
import { RouterModule } from '@angular/router';



@NgModule({
  imports: [RouterModule.forChild([
      { path: '', component: AuthComponent }
  ])],
  exports: [RouterModule]
})
export class AuthRoutingModule { }

