import { Component } from '@angular/core';
import { DjangoConnService } from './services/django-conn.service';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from './services/local-storage.service';
import { RefreshComponentService } from './services/refresh-component.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'projeto-angular';

  constructor(
    private django: DjangoConnService,
    private localstorage: LocalStorageService,
    private reload: RefreshComponentService
  ) {}

  ngOnInit(): void {
    this.reload.getWindow(window);

    if (this.localstorage.getItem('logged') != false) {
      let userID = this.localstorage.getItem('usuario').id;

      this.django.getSingleUser(userID).subscribe((data) => {
        this.localstorage.setItem('usuario', data);
      });
    }
  }
}
