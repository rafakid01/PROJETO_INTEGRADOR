import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NavDataService } from 'src/app/services/nav-data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  typeInputPass: string = 'password';
  typeEye: string = 'bi bi-eye-fill';

  coursesList = this.navData.coursesList;

  registerForm = this.fb.group({
    nome: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    curso: ['', Validators.required],
    senha: ['', [Validators.required, Validators.minLength(8)]],
    senhaConfirmacao: ['', Validators.required],
    tipoCadastro: ['', Validators.required],
  });

  comprimid: string = 'compressed';

  constructor(private fb: FormBuilder, private navData: NavDataService) {}

  ngOnInit(): void {}

  changeVisibility() {
    this.typeInputPass == 'password'
      ? (this.typeInputPass = 'text')
      : (this.typeInputPass = 'password');

    this.typeEye == 'bi bi-eye-fill'
      ? (this.typeEye = 'bi bi-eye-slash-fill')
      : (this.typeEye = 'bi bi-eye-fill');
  }

  registerSubmit() {
    const senha = this.registerForm.value.senha;
    const senhaConfir = this.registerForm.value.senhaConfirmacao;

    senha != senhaConfir
      ? console.log('Senhas não coincidem, tente novamente')
      : console.log(this.registerForm.value);
  }

  compressOptions() {
    this.comprimid == 'compressed'
      ? (this.comprimid = 'descompressed')
      : (this.comprimid = 'compressed');
  }
}
