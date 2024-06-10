import { NgModule } from '@angular/core';
import { RegistroComponent } from './registro.component';
import { RouterModule } from '@angular/router';



@NgModule({
  imports: [RouterModule.forChild([
      { path: '', component: RegistroComponent }
  ])],
  exports: [RouterModule]
})
export class RegistroRoutingModule { }
