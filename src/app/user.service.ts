import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrlUsers = 'http://192.168.101.5:3000/users'; // URL del API local para usuarios
  private apiUrlProfes = 'http://192.168.101.5:3000/profes'; // URL del API local para profesores
  private apiUrlAsignaturas = 'http://192.168.101.5:3000/asignaturas'; // URL del API local para asignaturas
  private apiUrlAsistencias = 'http://192.168.101.5:3000/asistencias'; // URL del API local para asistencias

  constructor(private http: HttpClient) {}

  // Método para obtener todos los usuarios
  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrlUsers);
  }

  // Método para obtener un usuario por su nombre de usuario
  getUserByUsername(username: string): Observable<any> {
    return this.http.get<any[]>(this.apiUrlUsers).pipe(
      map(users => users.find(user => user.username === username))
    );
  }

  // Método para actualizar la contraseña de un usuario
  updatePassword(userId: number, newPassword: string): Observable<any> {
    return this.http.patch(`${this.apiUrlUsers}/${userId}`, { password: newPassword });
  }

  // Método para obtener asignaturas filtradas por userId y sección (para alumnos)
  getAsignaturasByUser(userId: string | null, userSeccion: string | null): Observable<any[]> {
    if (!userId || !userSeccion) {
      return new Observable(observer => observer.next([]));
    }
    return this.http.get<any[]>(`${this.apiUrlAsignaturas}?userId=${userId}&seccion=${userSeccion}`);
  }

  // Método para obtener todos los profesores
  getProfe(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrlProfes);
  }

  // Método para obtener un profesor por su nombre de usuario
  getProfeByUsername(username: string): Observable<any> {
    return this.http.get<any[]>(this.apiUrlProfes).pipe(
      map(profes => profes.find(profe => profe.username === username))
    );
  }

  // Método para obtener las asignaturas dictadas por un profesor (por profeId)
  getAsignaturasByProfe(profeId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrlAsignaturas}?profeId=${profeId}`);
  }

  // Método para registrar la asistencia de un usuario
  registrarAsistencia(asistencia: any): Observable<any> {
    return this.http.post(this.apiUrlAsistencias, asistencia);
  }

  // Método para obtener todas las asistencias del usuario
  getAsistenciasByUser(userId: string): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrlAsistencias).pipe(
      map(asistencias => asistencias.filter(asistencia => asistencia.usuario_id === userId))
    );
  }

  // Método para obtener un usuario por ID
  getUserById(userId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrlUsers}/${userId}`);
  }

  // Método para obtener todas las asignaturas (sin filtros)
  getAsignaturas(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrlAsignaturas);
  }
}



  // PARA PRENDER EL SERVER: json-server --watch db.json 