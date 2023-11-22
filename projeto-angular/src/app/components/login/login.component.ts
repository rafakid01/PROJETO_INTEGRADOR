import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DjangoConnService } from 'src/app/services/django-conn.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

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
    private djangohttp: DjangoConnService,
    private localstorage: LocalStorageService
  ) {}

  loginForm = this.fb.group({
    email: ['', Validators.required],
    senha: ['', [Validators.required, Validators.minLength(8)]],
    cont_logado: [false],
  });

  ngOnInit(): void {
    if (this.localstorage.getItem('logged') == true) {
      document.body.innerHTML =
        'Você já está logado. Saia do perfil para entrar em outro';
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
    let email = this.loginForm.value.email;
    let senha = this.loginForm.value.senha;
    let cont_logado = this.loginForm.value.cont_logado;

    this.djangohttp.getUserLogin(email, senha).subscribe((value) => {
      if (cont_logado) {
        this.localstorage.setItem('logged', true);
      }
      console.log(value);
    });
  }
}
