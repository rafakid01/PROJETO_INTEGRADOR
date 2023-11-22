import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage.service';

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

  updateProfileForm = this.fb.group({
    nome: ['', { disabled: true }],
    email: [''],
    senha: [''],
    curso: [''],
    contato_numero1: [''],
    contato_numero2: [''],
    foto_perfil: [''],
  });

  constructor(
    private route: Router,
    private localstorage: LocalStorageService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.localstorage.viewItems();
    let userValue = this.localstorage.getItem('usuario');
    if (userValue != null) {
      this.actualUser = userValue;
      console.log(this.actualUser);
    }
  }

  changeEditProfile() {
    this.typeEdit = !this.typeEdit;

    if (!this.typeEdit) {
      this.buttonContent = 'CONCLUÍDO';
      this.themeButton = 'conclusion';
    } else {
      this.buttonContent = 'EDITAR PERFIL';
      this.themeButton = 'edit';
      this.typeButton = 'input';
    }
  }

  deleteProfile() {
    if (this.showConfirmDelete == 'hide') {
      this.showConfirmDelete = 'show';
      this.showBackGrnd = 'show';
    } else {
      this.showConfirmDelete = 'hide';
      this.showBackGrnd = 'hide';
    }
  }

  exitProfile() {
    if (this.showConfirmLeave == 'hide') {
      this.showConfirmLeave = 'show';
      this.showBackGrnd = 'show';
    } else {
      this.showConfirmLeave = 'hide';
      this.showBackGrnd = 'hide';
    }
  }

  backToHome() {
    this.route.navigate(['/']);
  }
}
