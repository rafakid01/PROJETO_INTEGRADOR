import { Component } from '@angular/core';
import { DjangoConnService } from './services/django-conn.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'projeto-angular';

  constructor(private back: DjangoConnService) {}

  ngOnInit(): void {
    this.back.showUsers();
  }
}
