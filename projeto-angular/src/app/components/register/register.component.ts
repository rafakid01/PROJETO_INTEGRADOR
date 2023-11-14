import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  typeInputPass: string = 'password';
  typeEye: string = 'bi bi-eye-fill';

  registerForm = this.fb.group({
    nome: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    curso: ['', Validators.required],
    senha: ['', [Validators.required, Validators.minLength(8)]],
    senhaConfirmacao: ['', Validators.required],
    tipoCadastro: ['', Validators.required],
  });

  constructor(private fb: FormBuilder) {}

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
}
