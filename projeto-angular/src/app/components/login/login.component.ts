import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Monitor } from 'src/app/models/monitor.model';
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
    cont_logado: [true],
  });

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

  submitLogin() {
    let loginFormData = this.loginForm.value;
    console.log(loginFormData);

    this.django
      .getUserEmail(loginFormData.email, loginFormData.senha)
      .subscribe((data) => {
        this.localstorage.setItem('logged', true);
        this.localstorage.setItem('usuario', data);
        this.reload.reloadApp();
      });

    // this.route.navigate(['/']);
  }
}
