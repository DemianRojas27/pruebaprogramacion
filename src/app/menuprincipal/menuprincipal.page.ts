import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service'; // Importa el servicio

@Component({
  selector: 'app-menuprincipal',
  templateUrl: './menuprincipal.page.html',
  styleUrls: ['./menuprincipal.page.scss'],
})
export class MenuprincipalPage implements OnInit {

  username: string = '';  // Variable donde se almacenará el nombre de usuario

  constructor(private userService: UserService) { }

  ngOnInit() {
    const nombreusuario = localStorage.getItem('nombreusuario'); // Recupera el nombre del usuario desde localStorage
    if (nombreusuario) {
      this.loadUserName(nombreusuario); // Llama al método para cargar el nombre de usuario
    }
  }

  // Método para cargar el nombre de usuario desde la API
  loadUserName(username: string) {
    this.userService.getUserByUsername(username).subscribe(
      (user) => {
        if (user) {
          this.username = user.username; // Asigna el nombre de usuario al campo username
          
          // Guardar el ID del usuario en localStorage (no se mostrará en la UI)
          localStorage.setItem('userId', user.id.toString()); // Guarda el ID del usuario
        }
      },
      (error) => {
        console.error('Error al obtener el nombre del usuario:', error);
      }
    );
  }
}
