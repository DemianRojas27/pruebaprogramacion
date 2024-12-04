import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service'; // Importa el servicio

interface Asistencia {
  nombre: string;  // Nombre de la asignatura
  seccion: string; // Sección de la asignatura
  fecha: string;   // Fecha de la asistencia
  estado: string;  // Puede ser "Presente" o "Ausente"
  showDetails: boolean; // Campo para controlar la visibilidad de los detalles
}

@Component({
  selector: 'app-asistencias',
  templateUrl: './asistencias.page.html',
  styleUrls: ['./asistencias.page.scss'],
})
export class AsistenciasPage implements OnInit {

  asistencias: Asistencia[] = [];  // Variable para almacenar las asistencias del usuario
  userId: string = '';             // Variable para almacenar el ID del usuario
  asignaturas: any[] = [];         // Variable para almacenar las asignaturas

  constructor(private userService: UserService) { }

  ngOnInit() {
    const nombreusuario = localStorage.getItem('nombreusuario'); // Recupera el nombre del usuario desde localStorage
    if (nombreusuario) {
      this.loadUserName(nombreusuario); // Llama al método para cargar el nombre de usuario
    }
    this.loadAsignaturas(); // Cargar las asignaturas disponibles
  }

  // Método para cargar el nombre de usuario y obtener el ID del usuario
  loadUserName(username: string) {
    this.userService.getUserByUsername(username).subscribe(
      (user) => {
        if (user) {
          // Asigna el ID del usuario
          this.userId = user.id.toString();
          
          // Guarda el ID del usuario en localStorage
          localStorage.setItem('userId', this.userId);

          // Llama al método para cargar las asistencias del usuario
          this.loadAsistencias(); 
        }
      },
      (error) => {
        console.error('Error al obtener el nombre del usuario:', error);
      }
    );
  }

  // Método para cargar las asignaturas disponibles
  loadAsignaturas() {
    this.userService.getAsignaturas().subscribe(
      (data) => {
        this.asignaturas = data;
      },
      (error) => {
        console.error('Error al obtener las asignaturas:', error);
      }
    );
  }

  // Método para cargar las asistencias del usuario
  loadAsistencias() {
    if (this.userId) {
      this.userService.getAsistenciasByUser(this.userId).subscribe(
        (data: any) => {
          this.asistencias = data.map((asistencia: any) => {
            // Buscar el nombre de la asignatura utilizando el ID de la asignatura
            const asignatura = this.asignaturas.find(a => a.id === asistencia.asignatura_id);
            return {
              nombre: asignatura ? asignatura.nombre : 'Desconocida', // Si no se encuentra la asignatura, pone 'Desconocida'
              fecha: asistencia.fecha,
              estado: asistencia.asistio ? 'Presente' : 'Ausente', // Mapea el estado de la asistencia
              showDetails: false // Inicializa la propiedad showDetails para controlar la visibilidad de los detalles
            };
          });
        },
        (error) => {
          console.error('Error al obtener las asistencias del usuario:', error);
        }
      );
    }
  }

  // Método para alternar la visibilidad de los detalles de la asistencia
  toggleDetails(asistencia: Asistencia) {
    asistencia.showDetails = !asistencia.showDetails;  // Cambia el estado de showDetails
  }
}
