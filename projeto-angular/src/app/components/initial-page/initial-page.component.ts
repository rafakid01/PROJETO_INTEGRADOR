import { Component } from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-initial-page',
  templateUrl: './initial-page.component.html',
  styleUrls: ['./initial-page.component.css'],
})
export class InitialPageComponent {
  constructor(private localstorage: LocalStorageService) {
    this.localstorage.setItem('monitoresFiltrados', null);
  }
}
