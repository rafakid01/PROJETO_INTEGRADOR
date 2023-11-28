import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/usuario.model';
import { Monitor } from '../models/monitor.model';

@Injectable({
  providedIn: 'root',
})
export class DjangoConnService {
  usersURL = 'http://localhost:8000/usuarios/';
  monitorsURL = 'http://localhost:8000/monitores/';
  assuntosURL = 'http://localhost:8000/assuntos/';

  postURL = 'http://localhost:8000/post/';
  putURL = 'http://localhost:8000/put/';
  deleteURL = 'http://localhost:8000/delete/';

  constructor(private http: HttpClient) {}

  // RECUPERAR TODOS OS USUARIOS
  getUsers(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.usersURL);
  }

  // RECUPERAR TODOS OS MONITORES

  getAllMonitors(): Observable<any> {
    return this.http.get<any>(this.monitorsURL);
  }

  // RECUPERAR UM ÚNICO USUÁRIO
  getSingleUser(id: any): Observable<any> {
    return this.http.get(`${this.usersURL}${id}/`);
  }

  // RECUPERAR USUÁRIO PELO EMAIL E SENHA
  getUserEmail(email: any, senha: any): Observable<any> {
    return this.http.get(`${this.usersURL}${email}/${senha}/`);
  }

  // ADICIONAR USUÁRIO
  postUser(user: any): Observable<any> {
    return this.http.post<any>(`${this.usersURL}`, user);
  }

  // ATUALIZAR USUÁRIO ALUNO
  updateUser(user: any): Observable<any> {
    console.log(user);
    return this.http.put(`${this.usersURL}${user.id}/`, user);
  }

  // ATUALIZAR USUÁRIO MONITOR
  updateMonitor(monitor: any): Observable<any> {
    return this.http.put(`${this.monitorsURL}${monitor.user}/`, monitor);
  }

  // EXCLUIR USUÁRIO
  deleteUser(userId: any) {
    return this.http.delete(`${this.usersURL}${userId}/`);
  }

  // RECUPERAR INTERESSES
  getInteresses(): Observable<any> {
    return this.http.get<any>('http://localhost:8000/interesses/');
  }

  // RECUPERAR LISTA ASSUNTOS GERAIS
  getAssuntos(): Observable<any> {
    return this.http.get(`${this.assuntosURL}`);
  }
}
