import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service'; // Importa el servicio

@Component({
  selector: 'app-misasignaturas',  // Asegúrate de que el selector sea el correcto
  templateUrl: './misasignaturas.page.html',  // Cambié el archivo de la plantilla a misasignaturas.page.html
  styleUrls: ['./misasignaturas.page.scss'], // Cambié el archivo de estilos a misasignaturas.page.scss
})
export class MisasignaturasPage implements OnInit {

  asignaturas: any[] = [];  // Variable para almacenar las asignaturas del usuario
  userId: string = '';      // Variable para almacenar el ID del usuario
  userSeccion: string = ''; // Variable para almacenar la sección del usuario

  constructor(private userService: UserService) { }

  ngOnInit() {
    const nombreusuario = localStorage.getItem('nombreusuario'); // Recupera el nombre del usuario desde localStorage
    if (nombreusuario) {
      this.loadUserName(nombreusuario); // Llama al método para cargar el nombre de usuario
    }
  }

  // Método para cargar el nombre de usuario y obtener el ID y sección del usuario
  loadUserName(username: string) {
    this.userService.getUserByUsername(username).subscribe(
      (user) => {
        if (user) {
          // Asigna el ID del usuario y la sección
          this.userId = user.id.toString();
          this.userSeccion = user.seccion || '';  // Si no hay sección, asigna una cadena vacía
          
          // Guarda el ID del usuario en localStorage
          localStorage.setItem('userId', this.userId);

          // Llama al método para cargar las asignaturas del usuario
          this.loadAsignaturas(); 
        }
      },
      (error) => {
        console.error('Error al obtener el nombre del usuario:', error);
      }
    );
  }

  // Método para cargar las asignaturas del usuario
  loadAsignaturas() {
    if (this.userId && this.userSeccion) {
      this.userService.getAsignaturasByUser(this.userId, this.userSeccion).subscribe(
        (data: any) => {
          this.asignaturas = data;  // Asigna las asignaturas a la variable asignaturas
        },
        (error) => {
          console.error('Error al obtener las asignaturas del usuario:', error);
        }
      );
    }
  }
}
