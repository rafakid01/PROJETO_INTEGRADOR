import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DjangoConnService {
  usersURL = 'http://localhost:8000/usuarios/';
  monitorsURL = 'http://localhost:8000/monitores/';
  assuntosURL = 'http://localhost:8000/assuntos/';
  interessesURL = 'http://localhost:8000/interesses/';

  adminURL = 'http://localhost:8000/administradores/';

  constructor(private http: HttpClient) {}

  // RECUPERAR TODOS OS USUARIOS
  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.usersURL);
  }

  // RECUPERAR TODOS OS MONITORES

  getAllMonitors(): Observable<any> {
    return this.http.get<any>(this.monitorsURL);
  }

  // RECUPERAR UM ÚNICO USUÁRIO
  getSingleUser(id: any): Observable<any> {
    return this.http.get(`${this.usersURL}${id}/`);
  }

  // RECUPERAR DADOS UNICO MONITOR
  getSingleMonitor(id: any): Observable<any> {
    return this.http.get(`${this.monitorsURL}${id}/`);
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

  // NOTA 5 DO MONITOR AO SE REGISTRAR
  setRateFive(id: any): Observable<any> {
    let monitor = {
      user: id,
      nota_avaliacao: '5',
    };
    return this.http.put(`${this.monitorsURL}${id}/`, monitor);
  }

  // ATUALIZAR NOTA DO MONITOR
  updateRate(id: any, value: any): Observable<any> {
    let monitor = {
      user: id,
      nota_avaliacao: value,
    };
    return this.http.put(`${this.monitorsURL}${id}/`, monitor);
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
  getInteressesMonitor(id: any): Observable<any> {
    return this.http.get<any>(`${this.interessesURL}${id}/`);
  }

  // ADICIONAR INTERESSE
  postInteresse(interesse: any): Observable<any> {
    return this.http.post(`${this.interessesURL}`, interesse);
  }

  // EXCLUIR INTERESSE
  deleteInteresse(id: any): Observable<any> {
    return this.http.delete(`${this.interessesURL}del/${id}/`);
  }

  // RECUPERAR LISTA ASSUNTOS GERAIS
  getAssuntos(): Observable<any> {
    return this.http.get(`${this.assuntosURL}`);
  }

  // ADICIONAR ASSUNTO
  postAssunto(assunto: any): Observable<any> {
    return this.http.post(`${this.assuntosURL}`, assunto);
  }

  // RECUPERAR DADOS ADMIN
  getAdmin(id: any): Observable<any> {
    return this.http.get<any>(`${this.adminURL}${id}/`);
  }
}
