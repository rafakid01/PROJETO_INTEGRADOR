import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DjangoConnService } from 'src/app/services/django-conn.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { RefreshComponentService } from 'src/app/services/refresh-component.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  typeInputPass: string = 'password';
  typeEye: string = 'bi bi-eye-fill';

  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private django: DjangoConnService,
    private localstorage: LocalStorageService,
    private route: Router,
    private reload: RefreshComponentService
  ) {}

  loginForm = this.fb.group({
    email: ['', Validators.required],
    senha: ['', [Validators.required, Validators.minLength(8)]],
  });

  ngOnInit(): void {
    if (this.localstorage.getItem('logged') == true) {
      this.route.navigate(['/']);
    }
  }

  throwError(message: string) {
    this.errorMessage = message;
    throw new Error(message);
  }

  changeVisibility() {
    this.typeInputPass == 'password'
      ? (this.typeInputPass = 'text')
      : (this.typeInputPass = 'password');

    this.typeEye == 'bi bi-eye-fill'
      ? (this.typeEye = 'bi bi-eye-slash-fill')
      : (this.typeEye = 'bi bi-eye-fill');
  }

  submitLogin() {
    let loginFormData = this.loginForm.value;

    if (
      loginFormData.email == 'admin.projeto@gmail.com' &&
      loginFormData.senha == '31415926'
    ) {
      this.django.getAdmin('1').subscribe((admin: any) => {
        this.localstorage.setItem('logged', true);
        this.localstorage.setItem('usuario', admin);
        this.reload.reloadApp();
      });
    } else {
      this.django
        .getUserEmail(loginFormData.email, loginFormData.senha)
        .subscribe({
          next: (data) => {
            this.localstorage.setItem('logged', true);
            this.localstorage.setItem('usuario', data);
            this.reload.reloadApp();
          },
          error: (error) => {
            this.throwError(error.error.detail);
          },
        });
    }
  }
}
