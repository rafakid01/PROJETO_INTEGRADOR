import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.css'],
})
export class StudentProfileComponent implements OnInit {
  typeEdit: boolean = true;
  buttonContent: string = 'EDITAR PERFIL';
  themeButton: string = 'edit';
  typeButton: string = 'button';
  showConfirm: string = 'hide';

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
    this.showConfirm == 'hide'
      ? (this.showConfirm = 'show')
      : (this.showConfirm = 'hide');
  }

  backToHome() {
    this.route.navigate(['/']);
  }
}
