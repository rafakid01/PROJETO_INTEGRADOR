import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Monitor } from 'src/app/models/monitor.model';
import { Usuario } from 'src/app/models/usuario.model';
import { DjangoConnService } from 'src/app/services/django-conn.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { NavDataService } from 'src/app/services/nav-data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  typeEdit: boolean = true;
  buttonContent: string = 'EDITAR PERFIL';
  themeButton: string = 'edit';
  typeButton: string = 'button';

  showConfirmDelete: string = 'hide';
  showConfirmLeave: string = 'hide';
  showBackGrnd: string = 'hide';

  actualUser: any;
  newValues: Monitor = {
    monitor: {
      assuntos_ensinados: undefined,
      nota_avaliacao: undefined,
      id_monitor_id: undefined,
    },
  };

  assuntosList: any;
  isMonitor: boolean = false;
  monitorListLearn: string = '';

  updateProfileForm: any;
  foto_perfil_blob: any;

  constructor(
    private route: Router,
    private localstorage: LocalStorageService,
    private fb: FormBuilder,
    private djangoconn: DjangoConnService,
    private navData: NavDataService
  ) {}

  ngOnInit(): void {
    this.localstorage.viewItems();

    let userValue = this.localstorage.getItem('usuario');
    if (userValue != null) {
      this.actualUser = userValue;
      console.log(this.actualUser);
    } else {
      document.body.innerHTML = 'Usuário não cadastrado';
    }

    if (this.actualUser.categoria == 'monitor') {
      this.assuntosList = this.navData.categoryList;
      this.isMonitor = true;
    }

    this.disableFormInit();
  }

  disableFormInit() {
    this.updateProfileForm = this.fb.group({
      nome: [this.actualUser.nome],
      email: [this.actualUser.email],
      senha: [this.actualUser.senha],
      curso: [this.actualUser.curso],
      contato_numero1: [this.actualUser.contato_numero1],
      contato_numero2: [this.actualUser.contato_numero1],
      foto_perfil: [],
    });

    this.updateProfileForm.disable();
  }

  changeEditProfile() {
    this.typeEdit = !this.typeEdit;

    if (!this.typeEdit) {
      this.updateProfileForm.enable();
      this.buttonContent = 'CONCLUÍDO';
      this.themeButton = 'conclusion';
      this.typeButton = 'button';
    } else {
      this.updateProfileRequest(this.updateProfileForm.value);

      this.updateProfileForm.disable();
      this.buttonContent = 'EDITAR PERFIL';
      this.themeButton = 'edit';
      this.typeButton = 'input';
    }
  }

  handleFileInput(event: any): void {
    const file = event.target.files[0];
    this.convertImageToBlob(file)
      .then((base64) => {
        console.log(base64);
        this.foto_perfil_blob = base64;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  convertImageToBlob(file: File) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (event: any) => {
        if (event.target.result) {
          resolve(event.target.result);
        } else {
          reject(new Error('Erro ao converter imagem para base64.'));
        }
      };

      reader.onerror = () => {
        reject(new Error('Erro ao ler a imagem.'));
      };

      reader.readAsDataURL(file);
    });
  }

  getCategory(event: any) {
    const inputClicado = event.target;
    this.monitorListLearn += inputClicado.value;

    console.log(inputClicado.value);
    console.log(this.monitorListLearn);

    function removeSelecao() {
      inputClicado.checked = false;
    }

    inputClicado.addEventListener('click', removeSelecao, { once: true });
  }

  updateProfileRequest(data: any) {
    this.newValues.id_usuario = this.actualUser.id_usuario;
    this.newValues.categoria = this.actualUser.categoria;
    this.newValues.nome = data.nome;
    this.newValues.email = data.email;
    this.newValues.senha = data.senha;
    this.newValues.curso = data.curso;
    this.newValues.contato_numero1 = data.contato_numero1;
    this.newValues.contato_numero2 = data.contato_numero2;
    this.newValues.foto_perfil = this.foto_perfil_blob;

    this.newValues.monitor.assuntos_ensinados = this.monitorListLearn;

    this.djangoconn.updateUser(this.newValues).subscribe((value) => {
      this.localstorage.setItem('usuario', value);
      this.actualUser = value;
      console.log(value);
    });
  }

  confirmDelete() {
    if (this.showConfirmDelete == 'hide') {
      this.showConfirmDelete = 'show';
      this.showBackGrnd = 'show';
    } else {
      this.showConfirmDelete = 'hide';
      this.showBackGrnd = 'hide';
    }
  }

  deleteProfile() {
    this.djangoconn
      .deleteUser(this.actualUser.id_usuario)
      .subscribe((content) => {
        console.log(content);
        this.localstorage.setItem('usuario', null);
        this.localstorage.setItem('logged', false);
      });
    this.route.navigate(['/']);
  }

  confirmExit() {
    if (this.showConfirmLeave == 'hide') {
      this.showConfirmLeave = 'show';
      this.showBackGrnd = 'show';
    } else {
      this.showConfirmLeave = 'hide';
      this.showBackGrnd = 'hide';
    }
  }

  exitProfile() {
    this.localstorage.setItem('usuario', null);
    this.localstorage.setItem('logged', false);
    this.route.navigate(['/']);
  }
}
