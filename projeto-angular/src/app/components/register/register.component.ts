import { LowerCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';
import { DjangoConnService } from 'src/app/services/django-conn.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { NavDataService } from 'src/app/services/nav-data.service';
import { RefreshComponentService } from 'src/app/services/refresh-component.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  typeInputPass: string = 'password';
  typeEye: string = 'bi bi-eye-fill';

  coursesList = this.navData.coursesList;

  comprimid: string = 'compressed';

  registerForm = this.fb.group({
    nome: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    curso: ['', Validators.required],
    senha: ['', [Validators.required, Validators.minLength(8)]],
    categoria: ['', Validators.required],
  });

  senhaConfirm = new FormControl();

  constructor(
    private fb: FormBuilder,
    private navData: NavDataService,
    private django: DjangoConnService,
    private localstorage: LocalStorageService,
    private route: Router,
    private reload: RefreshComponentService
  ) {}

  ngOnInit(): void {
    if (this.localstorage.getItem('logged') == true) {
      this.route.navigate(['/']);
    }
  }

  changeVisibility() {
    this.typeInputPass == 'password'
      ? (this.typeInputPass = 'text')
      : (this.typeInputPass = 'password');

    this.typeEye == 'bi bi-eye-fill'
      ? (this.typeEye = 'bi bi-eye-slash-fill')
      : (this.typeEye = 'bi bi-eye-fill');
  }

  registerSubmit() {
    let registerFormData = this.registerForm.value;
    console.log(registerFormData);
    this.django.postUser(registerFormData).subscribe((data) => {
      this.localstorage.setItem('logged', true);
      this.localstorage.setItem('usuario', data);
      this.reload.reloadApp();
    });
  }

  compressOptions() {
    this.comprimid == 'compressed'
      ? (this.comprimid = 'descompressed')
      : (this.comprimid = 'compressed');
  }
}
