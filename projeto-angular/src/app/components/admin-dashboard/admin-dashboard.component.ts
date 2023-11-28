import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { filter } from 'rxjs';
import { DjangoConnService } from 'src/app/services/django-conn.service';
import { RefreshComponentService } from 'src/app/services/refresh-component.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  allUsers: any;

  usuarioToEdit: any;
  formCreated: boolean = false;

  editForm = this.fb.group({
    id: [''],
    nome: [''],
    curso: [''],
    contato_numero_1: [''],
    contato_numero_2: [''],
    senha: [''],
    email: [''],
  });

  searchForm = this.fb.group({
    searchInput: [''],
  });

  constructor(
    private django: DjangoConnService,
    private fb: FormBuilder,
    private reload: RefreshComponentService
  ) {}

  ngOnInit(): void {
    this.django.getUsers().subscribe((data) => {
      this.allUsers = data;
      console.log(this.allUsers);
    });
  }

  buildEditForm(user: any) {
    this.editForm = this.fb.group({
      id: [user.id],
      nome: [user.nome],
      curso: [user.curso],
      contato_numero_1: [user.contato_numero_1],
      contato_numero_2: [user.contato_numero_2],
      senha: [user.senha],
      email: [user.email],
    });
    this.hideForm();
  }

  hideForm() {
    this.formCreated = !this.formCreated;
  }

  editUser(userID: number) {
    let usuarioasereditado = this.allUsers[userID - 1];
    console.log(usuarioasereditado);

    this.usuarioToEdit = usuarioasereditado;

    this.buildEditForm(usuarioasereditado);
  }

  updateUser() {
    let userData: any = this.editForm.value;
    userData.categoria = this.usuarioToEdit.categoria;
    userData.foto_perfil = this.usuarioToEdit.foto_perfil;

    this.django.updateUser(this.editForm.value).subscribe((data) => {
      console.log(data);
      this.reload.reloadApp();
    });
  }

  filterUsers() {
    let filterString = this.searchForm.value.searchInput;
    let filteredUsers: any[] = [];

    filteredUsers = this.allUsers.filter((usuario: any) => {
      return usuario.nome.toLowerCase().includes(filterString?.toLowerCase());
    });
    this.allUsers = filteredUsers;
  }

  deleteUser(userID: number) {
    this.django.deleteUser(userID).subscribe((data) => {
      console.log(data);
      this.reload.reloadApp();
    });
  }
}
