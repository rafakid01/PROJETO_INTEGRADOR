import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { DjangoConnService } from 'src/app/services/django-conn.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { RefreshComponentService } from 'src/app/services/refresh-component.service';

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

  usuarioAtualStorage = this.localstorage.getItem('usuario');
  assuntosAtualUsuarioStorage: any;
  isMonitor = false;

  updateUserForm: any;

  listaAssuntosDatabase: any[] = [];
  listaNovosAssuntos: any[] = [];

  fotoPerfil64: any;

  constructor(
    private route: Router,
    private localstorage: LocalStorageService,
    private fb: FormBuilder,
    private django: DjangoConnService,
    private reload: RefreshComponentService
  ) {}

  ngOnInit(): void {
    console.log('Usuario atual LocalStorage');
    console.log(this.usuarioAtualStorage);

    if (this.localstorage.getItem('logged') == false) {
      this.route.navigate(['/']);
    }

    if (this.usuarioAtualStorage.categoria == 'monitor') {
      this.assuntosAtualUsuarioStorage =
        this.usuarioAtualStorage.monitor.assuntos;

      let assuntosFromStorage = this.assuntosAtualUsuarioStorage.replace(
        '([A-Za-z0-9]+( [A-Za-z0-9]+)+)ção'
      );
      this.assuntosAtualUsuarioStorage = assuntosFromStorage.split(',');
      console.log(this.assuntosAtualUsuarioStorage);
    }

    this.fotoPerfil64 = this.usuarioAtualStorage.foto_perfil;

    this.createForms();
    this.updateUserForm.disable();
  }

  createForms() {
    if (this.usuarioAtualStorage.categoria == 'monitor') {
      this.isMonitor = true;
      this.createMonitorForm();
    } else {
      this.createUserForm();
    }
    console.log('Valores formulario de update');
    console.log(this.updateUserForm.value);
  }

  createUserForm() {
    this.updateUserForm = this.fb.group({
      nome: [this.usuarioAtualStorage.nome],
      email: [this.usuarioAtualStorage.email],
      senha: [this.usuarioAtualStorage.senha],
      curso: [this.usuarioAtualStorage.curso],
      contato_numero1: [this.usuarioAtualStorage.contato_numero_1],
      contato_numero2: [this.usuarioAtualStorage.contato_numero_2],
      foto_perfil: [this.usuarioAtualStorage.foto_perfil],
    });
  }

  createMonitorForm() {
    this.updateUserForm = this.fb.group({
      nome: [this.usuarioAtualStorage.nome],
      email: [this.usuarioAtualStorage.email],
      senha: [this.usuarioAtualStorage.senha],
      curso: [this.usuarioAtualStorage.curso],
      contato_numero1: [this.usuarioAtualStorage.contato_numero_1],
      contato_numero2: [this.usuarioAtualStorage.contato_numero_2],
      foto_perfil: [this.usuarioAtualStorage.foto_perfil],
      monitor: this.fb.group({
        descricao: [this.usuarioAtualStorage.monitor.descricao],
        nota_avaliacao: [this.usuarioAtualStorage.monitor.nota_avaliacao],
        assuntos: [''],
      }),
    });

    this.getAssuntos();
  }

  getAssuntos() {
    this.django.getAssuntos().subscribe((data) => {
      this.listaAssuntosDatabase = data;
    });
  }

  getAssunto(event: any) {
    const inputClicado = event.target;

    if (inputClicado.checked == true) {
      this.listaNovosAssuntos.push(inputClicado.value.trim());
    } else {
      let indexItem = this.listaNovosAssuntos.indexOf(inputClicado.value);
      this.listaNovosAssuntos.splice(indexItem, 1);
    }

    console.log(this.listaNovosAssuntos);
  }

  removerAssunto(index: number) {
    console.log(this.assuntosAtualUsuarioStorage[index]);
    this.assuntosAtualUsuarioStorage.splice(index, 1);
  }

  handleFileInput(event: any): void {
    const file = event.target.files[0];
    this.convertImageToBlob(file)
      .then((base64) => {
        this.fotoPerfil64 = base64;
        this.usuarioAtualStorage.foto_perfil = base64;
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

  changeEditProfile() {
    this.typeEdit = !this.typeEdit;
    if (!this.typeEdit) {
      this.updateUserForm.enable();
      this.buttonContent = 'CONCLUÍDO';
      this.themeButton = 'conclusion';
      this.typeButton = 'button';
    } else {
      this.updateProfileRequest(this.updateUserForm.value);
      this.updateUserForm.disable();
      this.buttonContent = 'EDITAR PERFIL';
      this.themeButton = 'edit';
      this.typeButton = 'input';
    }
  }

  async updateProfileRequest(data: any) {
    let updateObject = data;

    updateObject.id = this.usuarioAtualStorage.id;
    updateObject.categoria = this.usuarioAtualStorage.categoria;
    updateObject.nome = data.nome;
    updateObject.email = data.email;
    updateObject.senha = data.senha;
    updateObject.curso = data.curso;
    updateObject.contato_numero_1 = data.contato_numero1;
    updateObject.contato_numero_2 = data.contato_numero2;
    updateObject.foto_perfil = this.fotoPerfil64;

    this.django.updateUser(updateObject).subscribe((data) => {
      this.localstorage.setItem('usuario', data);
      this.usuarioAtualStorage = data;
      console.log(data);
    });

    if (this.isMonitor) {
      let arraysDiferentes = this.verificarArrays(
        this.listaNovosAssuntos,
        this.assuntosAtualUsuarioStorage
      );
      if (!arraysDiferentes) {
        this.throwError(
          'Ao menos um assunto selecionado já está cadastrado no seu perfil'
        );
      }

      let newArrayAssuntosInput: any = this.verifyTamanhoAssuntos(
        this.listaNovosAssuntos,
        this.assuntosAtualUsuarioStorage
      );
      if (!newArrayAssuntosInput) {
        this.throwError(
          'Não foi possível adicionar os assuntos selecionados. O total de assuntos ultrapassa o limite de 10 assuntos'
        );
      }

      newArrayAssuntosInput = newArrayAssuntosInput.toString();
      console.log(newArrayAssuntosInput);

      let monitorUpdateObject = {
        user: this.usuarioAtualStorage.id,
        descricao: data.monitor.descricao,
        assuntos: newArrayAssuntosInput,
      };

      this.django
        .updateMonitor(monitorUpdateObject)
        .subscribe((dataMonitor) => {
          this.localstorage.setItem('usuario.monitor', dataMonitor);
          this.usuarioAtualStorage.monitor = dataMonitor;

          let assuntosArray = dataMonitor.assuntos.split(',');

          this.localstorage.setItem('usuario.monitor.assuntos', assuntosArray);
          this.assuntosAtualUsuarioStorage = assuntosArray;
          console.log(dataMonitor);
        });
    }
  }

  verificarArrays(newArray: any[], baseArray: any[]) {
    return newArray.every((assunto) => {
      console.log(assunto);
      return !baseArray.includes(assunto);
    });
  }

  verifyTamanhoAssuntos(arr1: any[], arr2: any[]) {
    const unitedArray = arr1.concat(arr2);

    if (unitedArray.length > 10) {
      return false;
    }

    return unitedArray;
  }

  throwError(msg: string) {
    throw new Error(msg);
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
    this.django.deleteUser(this.usuarioAtualStorage.id).subscribe((content) => {
      console.log(content);
      this.localstorage.setItem('usuario', null);
      this.localstorage.setItem('logged', false);
    });
    this.reload.reloadApp();
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

    this.reload.reloadApp();
  }
}
