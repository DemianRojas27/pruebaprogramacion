import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { UserService } from '../user.service'; 

@Component({
  selector: 'app-registrarasistencia',
  templateUrl: './registrarasistencia.page.html',
  styleUrls: ['./registrarasistencia.page.scss'],
})
export class RegistrarasistenciaPage {
  scanResult: string | null = null;
  userData: any; 
  alumnoSeccion: string = ''; 
  userId: string | null = null; 

  constructor(
    private toastController: ToastController,
    private router: Router,
    private userService: UserService
  ) {
    // Obtener los datos del alumno logueado desde el localStorage
    this.userData = JSON.parse(localStorage.getItem('userData') || '{}');
    this.userId = localStorage.getItem('userId'); 
    this.alumnoSeccion = String(this.userData?.seccion || '');
  }

  // Método para manejar el resultado del escaneo
  onScanSuccess(result: string) {
    this.scanResult = result;

    if (this.scanResult) {
      try {
        const qrData = JSON.parse(this.scanResult);

        if (qrData?.asignaturaId && qrData?.seccion && qrData?.userId) {
          const qrSeccion = String(qrData.seccion);
          const qrUserId = qrData.userId;

          // Validar si el ID del usuario del QR y la sección coinciden con el usuario logueado
          if (qrUserId === this.userId) {
            if (qrSeccion === this.alumnoSeccion) {
              // Llamar al servicio para registrar la asistencia
              this.registrarAsistencia(qrData.asignaturaId, qrData.seccion);
            } else {
              this.mostrarToast('¡Error! La sección del QR no coincide con la asignada.', 'danger');
            }
          } else {
            this.mostrarToast('¡Error! El ID del usuario no coincide con el del QR.', 'danger');
          }
        } else {
          this.mostrarToast('¡Error! El QR no contiene la información válida.', 'danger');
        }
      } catch (error) {
        console.error('Error al parsear el QR:', error);
        this.mostrarToast('¡Error! El formato del QR es incorrecto.', 'danger');
      }
    }
  }

  // Método para registrar la asistencia
  registrarAsistencia(asignaturaId: number, seccion: string) {
    const asistenciaData = {
      usuario_id: this.userId,  // Obtener el ID del usuario logueado
      asignatura_id: asignaturaId,
      fecha: new Date().toISOString(),
      asistio: true  // La asistencia está siendo registrada como 'true'
    };

    // Realizar la llamada al servicio para registrar la asistencia
    this.userService.registrarAsistencia(asistenciaData).subscribe(
      async (response) => {
        await this.mostrarToast('Asistencia registrada correctamente.', 'success');
        this.router.navigate(['/menuprincipal']); // Redirigir después de registrar la asistencia
      },
      async (error) => {
        console.error('Error al registrar la asistencia:', error);
        await this.mostrarToast('Hubo un error al registrar la asistencia.', 'danger');
      }
    );
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
