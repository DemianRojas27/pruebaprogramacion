import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';  
import { Router } from '@angular/router'; 
import { UserService } from '../user.service'; // Api local para almacenar los datos 

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  nombreusuario: string = "";
  clave: string = "";
  correo: string = ""; // Aunque no se utiliza para nada ahora

  constructor(
    private toastController: ToastController, 
    private router: Router, 
    private userService: UserService // Inyecta el servicio
  ) {}

  // Método para ingresar al sistema
  async ingresar() {
    console.log('Ingresar button clicked!');
    console.log('nombreusuario:', this.nombreusuario);
    console.log('clave:', this.clave);

    if (!this.nombreusuario && !this.clave) {
      await this.mostrarToast('USTED NO HA INGRESADO DATOS EN: USUARIO Y CLAVE', 'danger');
      return; // Salir del método
    } else if (!this.nombreusuario) {
      await this.mostrarToast('USTED NO HA INGRESADO DATOS EN: USUARIO', 'danger');
      return;
    } else if (!this.clave) {
      await this.mostrarToast('USTED NO HA INGRESADO DATOS EN: CLAVE', 'danger');
      return;
    }

    // Se llama a la API para obtener los usuarios comunes
    this.userService.getUsers().subscribe(async (users) => {
      // Buscar usuario común
      const foundUser = users.find(user => user.username === this.nombreusuario && user.password === this.clave);

      if (foundUser) {
        // Guardar nombreusuario, userId y userSeccion en localStorage
        localStorage.setItem('nombreusuario', this.nombreusuario);
        localStorage.setItem('userId', foundUser.id);  // Asumiendo que el objeto usuario tiene un campo id
        localStorage.setItem('userSeccion', foundUser.seccion);  // Asumiendo que el objeto usuario tiene un campo seccion
        await this.mostrarToast('¡LOS DATOS INGRESADOS SON CORRECTOS!', 'success');
        this.router.navigate(['/menuprincipal']);
      } else {
        // Si no se encuentra en usuarios comunes, buscar en los profesores
        this.userService.getProfe().subscribe(async (profesores) => {
          const foundProfe = profesores.find(profe => profe.username === this.nombreusuario && profe.password === this.clave);

          if (foundProfe) {
            // Guardar nombreusuario, userId y userSeccion en localStorage
            localStorage.setItem('nombreusuario', this.nombreusuario);
            localStorage.setItem('userId', foundProfe.id);  // Asumiendo que el objeto profesor tiene un campo id
            localStorage.setItem('userSeccion', foundProfe.seccion);  // Asumiendo que el objeto profesor tiene un campo seccion
            await this.mostrarToast('¡LOS DATOS INGRESADOS SON CORRECTOS! Bienvenido Profesor.', 'success');
            this.router.navigate(['/profe1']);
          } else {
            await this.mostrarToast('NOMBRE O CONTRASEÑA INCORRECTOS', 'danger');
          }
        });
      }
    }, async (error) => {
      await this.mostrarToast('Error al acceder a los usuarios', 'danger');
      console.error(error);
    });
  }

  // Método para restablecer la contraseña (solo mensaje, sin funcionalidad)
  async reestablecercontrasena() {
    console.log('reestablecer button clicked!');

    // Mostrar solo un mensaje de alerta
    await this.mostrarToast('Se ha enviado un enlace para restablecer la contraseña.', 'secondary');
  }

  // Función para mostrar toasts
  async mostrarToast(mensaje: string, color: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,  
      position: 'top', 
      color: color
    });
    await toast.present();
  }
}
