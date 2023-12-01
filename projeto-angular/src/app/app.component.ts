import { Component } from '@angular/core';
import { DjangoConnService } from './services/django-conn.service';
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
      let emailUser = this.localstorage.getItem('usuario').email;

      if (emailUser == 'admin.projeto@gmail.com') {
        this.django.getAdmin(userID).subscribe((admin) => {
          this.localstorage.setItem('usuario', admin);
        });
      } else {
        this.django.getSingleUser(userID).subscribe((data) => {
          if (data.categoria == 'monitor') {
            let assuntosDatabase = data.monitor.assuntos;

            assuntosDatabase == ''
              ? (data.monitor.assuntos = [])
              : (data.monitor.assuntos = assuntosDatabase.split(','));
          }

          this.localstorage.setItem('usuario', data);
        });
      }
    }
  }
}
