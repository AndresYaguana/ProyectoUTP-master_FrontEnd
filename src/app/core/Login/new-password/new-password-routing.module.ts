import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NewPasswordComponent } from './new-password.component';

@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: NewPasswordComponent }
  ])],
  exports: [RouterModule]
})
export class NewPasswordRoutingModule { }
