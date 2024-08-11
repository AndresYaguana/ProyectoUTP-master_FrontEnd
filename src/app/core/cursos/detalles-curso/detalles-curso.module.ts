import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetallesCursoComponent } from './detalles-curso.component';
import { DialogModule } from 'primeng/dialog';
import { TabViewModule } from 'primeng/tabview'; // Asegúrate de importar TabViewModule
import { SafePipe } from './detalles-curso-pipe';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [
    DetallesCursoComponent,
    SafePipe // Declare the pipe here
  ],
  imports: [
    CommonModule,
    DialogModule,
    TabViewModule,
    CardModule, 
    ButtonModule
  ],
  exports: [
    DetallesCursoComponent,
    SafePipe // Export the pipe if needed in other modules
  ]
})
export class DetallesCursoModule { }
