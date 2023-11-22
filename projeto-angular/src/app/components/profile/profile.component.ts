import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(private route: Router) {}

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
    this.showConfirmDelete == 'hide'
      ? (this.showConfirmDelete = 'show')
      : (this.showConfirmDelete = 'hide');
  }

  exitProfile() {
    this.showConfirmLeave == 'hide'
      ? (this.showConfirmLeave = 'show')
      : (this.showConfirmLeave = 'hide');
  }

  backToHome() {
    this.route.navigate(['/']);
  }
}
