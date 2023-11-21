import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root',
})
export class DjangoConnService {
  getURL = 'http://localhost:8000/usuarios/';
  postURL = 'http://localhost:8000/post/';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.getURL);
  }

  criarUsuario(usuario: any): Observable<any> {
    return this.http.post(this.postURL, usuario);
  }

  showUsers() {
    this.getUsers().subscribe((data) => {
      console.log(data);
    });
  }
}
