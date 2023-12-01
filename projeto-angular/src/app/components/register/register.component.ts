import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

  errorMessage: string = '';

  registerForm = this.fb.group({
    nome: ['', Validators.required],
    email: [
      '',
      [
        Validators.required,
        Validators.email,
        Validators.pattern(
          "[-A-Za-z0-9!#$%&'*+/=?^_`{|}~]+(?:.[-A-Za-z0-9!#$%&'*+/=?^_`{|}~]+)*@(?:[A-Za-z0-9](?:[-A-Za-z0-9]*[A-Za-z0-9])?.)+[A-Za-z0-9](?:[-A-Za-z0-9]*[A-Za-z0-9])?"
        ),
      ],
    ],
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

  registerSubmit() {
    let registerFormData = this.registerForm.value;

    if (registerFormData.senha != this.senhaConfirm.value) {
      let message = 'A senha e a confirmação da senha não coincidem';
      this.throwError(message);
    }

    this.django.postUser(registerFormData).subscribe((data) => {
      this.localstorage.setItem('logged', true);
      this.localstorage.setItem('usuario', data);

      if (data.categoria == 'monitor') {
        this.django.setRateFive(data.id).subscribe((monitor: any) => {
          this.reload.reloadApp();
        });
      }
    });
  }

  compressOptions() {
    this.comprimid == 'compressed'
      ? (this.comprimid = 'descompressed')
      : (this.comprimid = 'compressed');
  }
}
