import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/usuario.model';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class DjangoConnService {
  getURL = 'http://localhost:8000/usuarios/';
  postURL = 'http://localhost:8000/post/';
  putURL = 'http://localhost:8000/put/';

  constructor(
    private http: HttpClient,
    private localstorage: LocalStorageService
  ) {}

  getUsers(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.getURL);
  }

  getUserLogin(email: any, senha: any): Observable<Usuario> {
    return this.http.get(`${this.getURL}${email}/${senha}/`);
  }

  criarUsuario(usuario: any): Observable<any> {
    return this.http.post(this.postURL, usuario);
  }

  showUsers() {
    this.getUsers().subscribe((data) => {
      console.log(data);
    });
  }

  postUserLocalhost(usuario: Usuario) {
    this.localstorage.viewItems();
    this.localstorage.setItem('usuario', usuario);
    this.localstorage.setItem('logged', true);
  }

  confirmLogged() {}
}
