import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/usuario.model';
import { LocalStorageService } from './local-storage.service';
import { Monitor } from '../models/monitor.model';

@Injectable({
  providedIn: 'root',
})
export class DjangoConnService {
  getURL = 'http://localhost:8000/usuarios/';
  postURL = 'http://localhost:8000/post/';
  putURL = 'http://localhost:8000/put/';
  deleteURL = 'http://localhost:8000/delete/';

  constructor(
    private http: HttpClient,
    private localstorage: LocalStorageService
  ) {}

  getUsers(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.getURL);
  }

  getUsersFilter(): Observable<any[]> {
    return this.http.get<any[]>(this.getURL);
  }

  getUserLogin(email: any, senha: any): Observable<any> {
    return this.http.get(`${this.getURL}${email}/${senha}/`);
  }

  updateUser(data: Monitor) {
    console.log(data);
    return this.http.put(`${this.putURL}${data.id_usuario}/`, data);
  }

  criarUsuario(usuario: any): Observable<any> {
    return this.http.post(this.postURL, usuario);
  }

  deleteUser(data: Usuario) {
    return this.http.delete(`${this.deleteURL}${data}`);
  }

  showUsers() {
    this.getUsers().subscribe((data) => {
      console.log(data);
    });
  }
}
