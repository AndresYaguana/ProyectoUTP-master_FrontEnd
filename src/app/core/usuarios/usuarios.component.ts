import { Component, OnInit } from '@angular/core';
import { Usuario } from './usuarios';
import { UsuariosService } from './usuarios.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { TipoUsuario } from './tipo-usuario/tipo-usuario';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TipoUsuarioService } from './tipo-usuario/tipo-usuario.service';
import { MessageService } from 'primeng/api';
import { AuthService } from '../Login/auth/auth.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'], 
  providers: [MessageService]
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];
  usuario: Usuario | null = null;
  nuevoUsuario: Usuario = { idUsuario: 0,email: '', password: '',nombres: '', apellidos: '',idTipousuario: 0, urlFoto: '',universidad: '', habilitado: false, creadoPor: '', fechaCreacion: '',modificadoPor:'',fechaModificacion:'',tipousuario:{ idTipousuario: 0, nombre: '',permisos:[], habilitado: false, creadoPor: '', fechaCreacion: '',modificadoPor:'',fechaModificacion:'' }};
  
  /* Varaibles de la UI de Agregar */
  AgregarDialog: boolean = false;

  agregarFormulario: FormGroup = new FormGroup({});

  tipousuarios: TipoUsuario[] = [];

  /* Variables de la UI de Modificar */

  ModificarDialog: boolean = false;

  modificarFormulario: FormGroup = new FormGroup({});
  
  constructor(
    
    private messageService: MessageService,
    private usuarioServicio: UsuariosService,
    private tipoUsuariosServicio: TipoUsuarioService,
    private authService: AuthService, 
    private usuariosServicio: UsuariosService,
    private route: Router, 
    private fb: FormBuilder,
  ) {
    this.IniciarAgregarForm();
    this.IniciarModificarForm();
    this.obtenerTipoUsuarios();
  }

  ngOnInit() {
    this.obtenerUsuarios();
    this.usuario = this.authService.getLoggedInUser();
  }

  private obtenerUsuarios() {
    this.usuarioServicio.obtenerUsuarioLista().subscribe(
      (datos: Usuario[]) => {
        //console.log(datos);
        this.usuarios = datos;
      },
      (error) => {
        console.error('Error al obtener la lista de usuarios:', error);
      }
    );
  }

  

  /*abrirModalAgregarUsuario() {
    const dialogRef = this.dialog.open(AgregarUsuarioComponent, {
      width: '500px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('El modal de agregar usuario se ha cerrado');
      this.obtenerUsuarios();
    });
  }*/

  maskPassword(password: string): string {
    const maxLength = 15;
    const maskedLength = Math.min(password.length, maxLength);
    return '*'.repeat(maskedLength);
  }

  /* Función para abrir el UI de Agregar */
  OpenAgregar(): void {
    this.AgregarDialog = true;
  };

  /* Inicizalizar el Formulario de Agregar */
  IniciarAgregarForm(): void {
    this.agregarFormulario = this.fb.group({
      idUsuario: [0],
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
      nombres: [null, Validators.required],
      apellidos: [null, Validators.required],
      idTipousuario: [0, [Validators.required]],
      urlFoto: [null, Validators.required],
      universidad: [null, Validators.required],
      habilitado: [false, Validators.required]
    });
  };

  /* Función para Agregar la Nueva Usuario */
  agregarUsuario(): void {
    if (this.agregarFormulario.valid) {
      this.AgregarDialog = false;

      Swal.fire({
        title: "¿Quieres agregar este nuevo usuario?",
        showDenyButton: false,
        showCancelButton: true,
        //confirmButtonText: "Guardar",
        //timer: 1500
      }).then((result) => {
        if (result.isConfirmed) {
          const nuevoUsuario: Usuario = {
            ...this.agregarFormulario.value,
            creadoPor: this.usuario?.email?.split('@')[0]?.toUpperCase(),
            fechaCreacion: new Date().toISOString(),
            tipousuario: { idTipousuario: this.agregarFormulario.value.idTipousuario }
          };
          this.usuarioServicio.agregarUsuario(nuevoUsuario).subscribe({
            next: (usuario) => {
              Swal.fire("Agregado!", "El Usuario ha sido agregado exitosamente.", "success");
              this.obtenerUsuarios();
            },
            error: (err) => {
              Swal.fire("Error", "Error al agregar usuario", err);
            }
          });
        } else if (result.isDenied) {
          Swal.fire("Cambios no guardados", "", "info");
        }
      });
    } else {
      this.formInvalid();
    }
  };

  /* Función para Cerrar la UI de Agregar */
  CloseAgregar(): void {
    this.AgregarDialog = false;
  }; 


  /* Función para Recuperar el Tipo de Usuario */
  obtenerTipoUsuarios(): void {
    this.tipoUsuariosServicio.obtenerTipousuarioLista().subscribe({
      next: (tipousuarios) => {
        this.tipousuarios = tipousuarios;
      },
      error: (err) => console.error('Error obteniendo Tipos Usuarios:', err)
    });
  };  

   /* Función para Abrir la UI de Modificar */
   OpenModificar(idUsuario: number): void {
    this.ModificarDialog = true;
    this.RecuperarRegistro(idUsuario);
  };

  /* Función para Inicializar el Formulario de Modificar */
  IniciarModificarForm(): void {
    this.modificarFormulario = this.fb.group({
      idUsuario: [0, Validators.required],
      email: [null, [Validators.required]],
      password: [{ value: null, disabled: true }, Validators.required],
      nombres: [null, Validators.required],
      apellidos: [null, Validators.required],
      idTipousuario: [0, [Validators.required]],
      urlFoto: [null, Validators.required],
      universidad: [null, Validators.required],
      habilitado: [false, Validators.required],
      creadoPor: [''],
      fechaCreacion: [''],
      modificadoPor: [this.usuario?.email?.split('@')[0]?.toUpperCase()],
      fechaModificacion: [new Date().toISOString()]
    });
  };

  /* Función para Recuperar el Registro */
  RecuperarRegistro(idUsuario: number): void {
    this.usuariosServicio.obtenerUsuarioPorId(idUsuario).subscribe(
      {
        next: (datos: any) => {
          this.modificarFormulario.controls['idUsuario'].setValue(datos.idUsuario);
          this.modificarFormulario.controls['modificadoPor'].setValue(datos.modificadoPor);
          this.modificarFormulario.controls['fechaModificacion'].setValue(datos.fechaModificacion);
          this.modificarFormulario.controls['fechaCreacion'].setValue(datos.fechaCreacion);
          this.modificarFormulario.controls['creadoPor'].setValue(datos.creadoPor);
          this.modificarFormulario.controls['email'].setValue(datos.email);
          this.modificarFormulario.controls['password'].setValue(datos.password);
          this.modificarFormulario.controls['nombres'].setValue(datos.nombres);
          this.modificarFormulario.controls['apellidos'].setValue(datos.apellidos);
          this.modificarFormulario.controls['idTipousuario'].setValue(datos.tipousuario.idTipousuario);
          this.modificarFormulario.controls['urlFoto'].setValue(datos.urlFoto);
          this.modificarFormulario.controls['universidad'].setValue(datos.universidad);
          this.modificarFormulario.controls['habilitado'].setValue(datos.habilitado);
        },
        error: (errores: any) => console.log(errores)
      }
    );
  };

  /* Función para Modificar el Usuario */
  ModificarUsuario(): void {
    this.ModificarDialog = false;
    this.modificarFormulario.controls['modificadoPor'].setValue(this.usuario?.email?.split('@')[0]?.toUpperCase());
    this.modificarFormulario.controls['fechaModificacion'].setValue(new Date().toISOString());
    Swal.fire({
      title: "¿Quieres guardar los cambios?",
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: "Guardar",
      //showConfirmButton: false,
      //timer: 1500 
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuariosServicio.editarUsuario(this.modificarFormulario.controls['idUsuario'].getRawValue(), this.modificarFormulario.getRawValue()).subscribe({
          next: (datos) => {
            Swal.fire("Guardado!", "El Usuario ha sido guardado exitosamente.", "success");
            this.obtenerUsuarios();
          },
          error: (errores) => {
            Swal.fire("Error", "Hubo un problema al guardar el usuario.", errores);
          }
        });
      } else if (result.isDenied) {
        Swal.fire("Cambios no guardados", "", "info");
      }
    });
  };

  /* Función para Cerrar la UI de Modificar */
  CloseModificar(): void {
    this.ModificarDialog = false;
  };

  /* Mensaje de Formulario Invalido */
  formInvalid(): void {
    this.messageService.add({ severity: 'error', summary: 'Formulario Invalido', detail: 'Formulario no válido. Verifica los campos.' })
  }; 

  eliminarUsuarios(idUsuario: number) {
    Swal.fire({
      title: "¿Estás seguro de Eliminar el Usuario?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, ¡eliminarlo!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioServicio.eliminarUsuario(idUsuario).subscribe({
          next: (datos) => {
            this.obtenerUsuarios();
            Swal.fire({
              title: "¡Eliminado!",
              text: "El Usuario ha sido eliminado.",
              icon: "success"
            });
          },
          error: (errores) => {
            console.error('Error eliminando Usuario:', errores);
            Swal.fire({
              title: "Error",
              text: "Hubo un problema al eliminar el Usuario.",
              icon: "error"
            });
          }
        });
      }
    });
  }

  /*editarUsuarios(idUsuario: number) {
    const dialogRef = this.dialog.open(EditarUsuarioComponent, {
      width: '500px',
      data: { idUsuario: idUsuario }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('El modal de editar usuario se ha cerrado');
      //console.log(idUsuario);
      this.obtenerUsuarios();
    });
  }*/


  /*eliminarUsuarios(idUsuario: number) {
    Swal.fire({
      title: "¿Estás seguro de Eliminar el Usuario?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, ¡eliminarlo!"
    }).then((result) => {
      if (result.isConfirmed) {  
    this.usuarioServicio.eliminarUsuario(idUsuario).subscribe({
        next: (datos) => {
          this.obtenerUsuarios();
          Swal.fire({
            title: "¡Eliminado!",
            text: "El Usuario ha sido eliminado.",
            icon: "success"
          });
        },
        error: (errores) => {
          console.error('Error eliminando Usuario:', errores);
          Swal.fire({
            title: "Error",
            text: "Hubo un problema al eliminar el Usuario.",
            icon: "error"
          });
        }
      });
    }
  });
}*/


}
