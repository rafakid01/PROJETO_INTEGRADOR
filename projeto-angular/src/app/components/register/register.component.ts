import { LowerCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';
import { DjangoConnService } from 'src/app/services/django-conn.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
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
    categoria: ['', Validators.required],
  });

  senhaConfirm = new FormControl();

  comprimid: string = 'compressed';

  usuario: Usuario = {
    nome: '',
    email: '',
    senha: '',
    curso: '',
    categoria: '',
    contato_numero1: '',
    contato_numero2: '',
    foto_perfil: undefined,
  };

  constructor(
    private fb: FormBuilder,
    private navData: NavDataService,
    private djangohttp: DjangoConnService,
    private localstorage: LocalStorageService
  ) {}

  ngOnInit(): void {
    if (this.localstorage.getItem('logged') == true) {
      document.body.innerHTML = 'Saia do perfil para registrar outro';
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
    const senha = this.registerForm.value.senha;
    const senhaConfir = this.senhaConfirm.value;

    if (senha != senhaConfir) {
      console.log('Senhas não coincidem, tente novamente');
    } else {
      console.log(this.registerForm.value);

      this.usuario.nome = this.registerForm.value.nome;
      this.usuario.senha = this.registerForm.value.senha;
      this.usuario.email = this.registerForm.value.email;
      this.usuario.curso = this.registerForm.value.curso;
      this.usuario.categoria = this.registerForm.value.categoria;

      console.log(this.usuario);

      this.djangohttp.criarUsuario(this.usuario).subscribe((usuario) => {
        this.djangohttp.postUserLocalhost(usuario);
      });
    }
  }

  compressOptions() {
    this.comprimid == 'compressed'
      ? (this.comprimid = 'descompressed')
      : (this.comprimid = 'compressed');
  }
}
