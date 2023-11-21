import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-monitor-profile',
  templateUrl: './monitor-profile.component.html',
  styleUrls: ['./monitor-profile.component.css'],
})
export class MonitorProfileComponent implements OnInit {
  typeEdit: boolean = true;
  buttonContent: string = 'EDITAR PERFIL';
  themeButton: string = 'edit';
  typeButton: string = 'button';
  showConfirm: string = 'hide';

  editMonitorForm = this.fb.group({
    nome: [''],
    email: [''],
    curso: [''],
    senha: [''],
    contato_numero1: [''],
    contato_numero2: [''],
    foto_perfil: [''],
  });

  constructor(private route: Router, private fb: FormBuilder) {}

  ngOnInit(): void {}

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
    this.showConfirm == 'hide'
      ? (this.showConfirm = 'show')
      : (this.showConfirm = 'hide');
  }

  backToHome() {
    this.route.navigate(['/']);
  }
}
