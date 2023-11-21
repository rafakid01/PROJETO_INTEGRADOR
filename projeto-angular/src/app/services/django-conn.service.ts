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
  putURL = 'http://localhost:8000/put/';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.getURL);
  }

  criarUsuario(usuario: any): Observable<any> {
    return this.http.post(this.postURL, usuario);
  }

  // updateMonitor(id: any): Observable<any> {
  //   return this.http.put(this.putURL);
  // }

  getMonitors() {}

  showUsers() {
    this.getUsers().subscribe((data) => {
      console.log(data);
    });
  }
}
