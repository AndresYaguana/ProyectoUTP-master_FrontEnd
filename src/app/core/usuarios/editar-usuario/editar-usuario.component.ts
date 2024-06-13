import { Component, Inject, OnInit } from '@angular/core';
import { Usuario } from '../usuarios';
import { UsuariosService } from '../usuarios.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-editar-usuario',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.scss']
})
export class EditarUsuarioComponent implements OnInit {

  idUsuario: number;
  usuario: Usuario = { idUsuario: 0, email: '', password: '',nombres: '', apellidos: '',tipoUsuario: 0, urlFoto: '',universidad: '', habilitado: false, creadoPor: '', fechaCreacion: '',modificadoPor:'',fechaModificacion:'' };

  constructor(
    private usuariosServicio: UsuariosService,
    private ruta: ActivatedRoute,
    private enrutador: Router,
    private dialogRef: MatDialogRef<EditarUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { idUsuario: number, usuario: Usuario } // Injectar datos
  ) {
    this.idUsuario = data.idUsuario; // Asignar idUsuario desde los datos
    this.usuario = data.usuario; // Asignar el usuario desde los datos
    console.log('Datos del usuario:', this.usuario); // Verificar datos del usuario
  }

  ngOnInit() {
    this.ruta.params.pipe(
      switchMap(params => {
        this.idUsuario = params['idUsuario'];
        return this.usuariosServicio.obtenerUsuarioPorId(this.idUsuario);
      })
    ).subscribe({
      next: (usuario: Usuario) => {
        this.usuario = usuario;
        console.log('Usuario obtenido:', this.usuario); // Verificar usuario obtenido
      },
      error: (error: any) => console.error(error)
    });
  }

  onSubmit() {
    console.log('Guardando usuario:', this.usuario); // Verificar datos del usuario antes de guardar
    this.guardarUsuario();
  }

  guardarUsuario() {
    this.usuariosServicio.editarUsuario(this.idUsuario, this.usuario).subscribe({
      next: () => {
        console.log('Usuario guardado exitosamente.');
        this.irUsuarioLista();
      },
      error: (errores) => console.error('Error al guardar usuario:', errores)
    });
  }

  irUsuarioLista() {
    this.enrutador.navigate(['/usuarios']);
  }

  cerrar() {
    this.dialogRef.close();
  }

}
