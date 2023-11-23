import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Monitor } from 'src/app/models/monitor.model';
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

  monitorLogin: Monitor = {
    monitor: {
      assuntos_ensinados: undefined,
      nota_avaliacao: undefined,
      id_monitor_id: undefined,
    },
  };

  constructor(
    private fb: FormBuilder,
    private djangohttp: DjangoConnService,
    private localstorage: LocalStorageService,
    private route: Router
  ) {}

  loginForm = this.fb.group({
    email: ['', Validators.required],
    senha: ['', [Validators.required, Validators.minLength(8)]],
    cont_logado: [''],
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
      console.log(value);

      if (
        value.categoria == 'monitor' &&
        value.usuario.categoria == 'monitor'
      ) {
        this.monitorLogin.nome = value.usuario.nome;
        this.monitorLogin.email = value.usuario.email;
        this.monitorLogin.senha = value.usuario.senha;
        this.monitorLogin.curso = value.usuario.curso;
        this.monitorLogin.categoria = value.usuario.categoria;
        this.monitorLogin.id_usuario = value.usuario.id_usuario;
        this.monitorLogin.contato_numero1 = value.usuario.contato_numero1;
        this.monitorLogin.contato_numero2 = value.usuario.contato_numero2;
        this.monitorLogin.foto_perfil = value.usuario.foto_perfil;

        this.monitorLogin.monitor.id_monitor_id = value.usuario.id_monitor;
        this.monitorLogin.monitor.nota_avaliacao = value.usuario.nota_avaliacao;
        this.monitorLogin.monitor.assuntos_ensinados =
          value.usuario.assuntos_ensinados;

        this.localstorage.setItem('usuario', this.monitorLogin);
      } else {
        this.localstorage.setItem('usuario', value);
      }

      this.localstorage.setItem('logged', true);
      if (cont_logado) {
        this.localstorage.setItem('stay_logged', true);
      } else {
        this.localstorage.setItem('stay_logged', false);
      }
      console.log(value);
      this.route.navigate(['/']);
    });
  }
}
