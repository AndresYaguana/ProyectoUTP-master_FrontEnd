import { Component } from '@angular/core';
import { TipoUsuario } from './tipo-usuario';
import { TipoUsuarioService } from './tipo-usuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { MessageService } from 'primeng/api';
import { Usuario } from '../usuarios';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../Login/auth/auth.service';

@Component({
  selector: 'app-tipo-usuario',
  templateUrl: './tipo-usuario.component.html',
  styleUrl: './tipo-usuario.component.scss',
  providers: [MessageService]
})
export class TipoUsuarioComponent {
  tipousuario: TipoUsuario[] = [];
  nuevoTipousuario: TipoUsuario = { idTipousuario: 0, nombre: '',permisos:[], habilitado: false, creadoPor: '', fechaCreacion: '',modificadoPor:'',fechaModificacion:'' };
  usuario: Usuario | null = null;
  
  /* Varaibles de la UI de Agregar */
  AgregarDialog: boolean = false;

  agregarFormulario: FormGroup = new FormGroup({});

  /* Variables de la UI de Modificar */

  ModificarDialog: boolean = false;

  modificarFormulario: FormGroup = new FormGroup({});

  constructor(
    private tipousuarioServicio: TipoUsuarioService,
    private route: ActivatedRoute,
    private authService: AuthService, 
    private messageService: MessageService,
    private fb: FormBuilder,
  ) {
    this.IniciarAgregarForm();
    this.IniciarModificarForm();
  }

  ngOnInit() {
    this.obtenerTipousuario();
    this.usuario = this.authService.getLoggedInUser();
  } 
  private obtenerTipousuario() {
    this.tipousuarioServicio.obtenerTipousuarioLista().subscribe(
      (datos: TipoUsuario[]) => {
        console.log(datos);
        this.tipousuario = datos;
      },
      (error) => {
        console.error('Error al obtener la lista de tipo usuarios:', error);
      }
    );
  }

  eliminarTipoUsuario(idTipousuario: number) {
    Swal.fire({
      title: "¿Estás seguro de Eliminar?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, ¡eliminarlo!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.tipousuarioServicio.eliminarTipousuario(idTipousuario).subscribe({
          next: (datos) => {
            this.obtenerTipousuario();
            Swal.fire({
              title: "¡Eliminado!",
              text: "El Tipo usuario ha sido eliminado.",
              icon: "success"
            });
          },
          error: (errores) => {
            console.error('Error eliminando Tipo usuario:', errores);
            Swal.fire({
              title: "Error",
              text: "Hubo un problema al eliminar El Tipo usuario.",
              icon: "error"
            });
          }
        });
      }
    });
  }

  /* Función para abrir el UI de Agregar */
  OpenAgregar(): void {
    this.AgregarDialog = true;
  };

  /* Inicizalizar el Formulario de Agregar */
  IniciarAgregarForm(): void {
    this.agregarFormulario = this.fb.group({
      idTipousuario: [0, [Validators.required]],
      nombre: [null, Validators.required],
      habilitado: [false, [Validators.required]]
    });
  };

  /* Función para Agregar la Nueva Categoria */
  agregarTipousuario(): void {
    if (this.agregarFormulario.valid) {
      this.AgregarDialog = false;

      Swal.fire({
        title: "¿Quieres agregar esta nuevo Tipo usuario?",
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: "Guardar",
        //showConfirmButton: false,
        //timer: 1500
      }).then((result) => {
        if (result.isConfirmed) {
          const nuevaoTipoUsuario: TipoUsuario = {
            ...this.agregarFormulario.value,
            creadoPor: this.usuario?.email?.split('@')[0]?.toUpperCase(),
            fechaCreacion: new Date().toISOString()
          };
          this.tipousuarioServicio.agregarTipousuario(nuevaoTipoUsuario).subscribe({
            next: (tipousuario) => {
              Swal.fire("Agregado!", "La Categoria ha sido agregado exitosamente.", "success");
              this.obtenerTipousuario();
            },
            error: (err) => {
              Swal.fire("Error", "Error al agregar Categoria", err);
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

  /* Función para Abrir la UI de Modificar */
  OpenModificar(idTipousuario: number): void {
    this.ModificarDialog = true;
    this.RecuperarRegistro(idTipousuario);
  };

  /* Función para Inicializar el Formulario de Modificar */
  IniciarModificarForm(): void {
    this.modificarFormulario = this.fb.group({
      idTipousuario: [0, [Validators.required]],
      nombre: [null, Validators.required],
      habilitado: [false, [Validators.required]],
      creadoPor: [''],
      fechaCreacion: [''],
      modificadoPor: [this.usuario?.email?.split('@')[0]?.toUpperCase()],
      fechaModificacion: [new Date().toISOString()]
    });
  };

  /* Función para Recuperar el Registro */
  RecuperarRegistro(idTipousuario: number): void {
    this.tipousuarioServicio.obtenerTipousuarioPorId(idTipousuario).subscribe(
      {
        next: (datos: any) => {
          this.modificarFormulario.controls['idTipousuario'].setValue(datos.idTipousuario);
          this.modificarFormulario.controls['modificadoPor'].setValue(datos.modificadoPor);
          this.modificarFormulario.controls['fechaModificacion'].setValue(datos.fechaModificacion);
          this.modificarFormulario.controls['fechaCreacion'].setValue(datos.fechaCreacion);
          this.modificarFormulario.controls['creadoPor'].setValue(datos.creadoPor);
          this.modificarFormulario.controls['nombre'].setValue(datos.nombre);
          this.modificarFormulario.controls['habilitado'].setValue(datos.habilitado);
        },
        error: (errores: any) => console.log(errores)
      }
    );
  };

  /* Función para Modificar el Registro */
  ModificarTipoUsuario(): void {
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
        this.tipousuarioServicio.editarTipousuario(this.modificarFormulario.controls['idTipousuario'].getRawValue(), this.modificarFormulario.getRawValue()).subscribe({
          next: (datos) => {
            Swal.fire("Guardado!", "El Tipo usuario ha sido guardado exitosamente.", "success");
            this.obtenerTipousuario()
          },
          error: (errores) => {
            Swal.fire("Error", "Hubo un problema al guardar el tipo Usuario.", errores);
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




  /*abrirModalAgregarTipoUsuario() {
    const dialogRef = this.dialog.open(AgregarTipoUsuarioComponent, {
      width: '500px',
      data: {}
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('El modal de agregar tipo usuario se ha cerrado');
    this.obtenerTipousuario();
  });
  }


  editarTipoUsuario(idTipousuario: number) {
    const dialogRef = this.dialog.open(EditarTipoUsuarioComponent, {
      width: '500px',
      data: { idTipousuario: idTipousuario }
  });

    dialogRef.afterClosed().subscribe(result => {
    console.log('El modal de editar categoria se ha cerrado');
    if (result) {
      this.obtenerTipousuario();
    }
    });
  } 

  eliminarTipoUsuario(idTipousuario: number) {
    Swal.fire({
      title: "¿Estás seguro de Eliminar?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, ¡eliminarlo!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.tipousuarioServicio.eliminarTipousuario(idTipousuario).subscribe({
          next: (datos) => {
            this.obtenerTipousuario();
            Swal.fire({
              title: "¡Eliminado!",
              text: "La categoria ha sido eliminado.",
              icon: "success"
            });
          },
          error: (errores) => {
            console.error('Error eliminando categoria:', errores);
            Swal.fire({
              title: "Error",
              text: "Hubo un problema al eliminar la categoria.",
              icon: "error"
            });
          }
        });
      }
    });
  }*/

}
