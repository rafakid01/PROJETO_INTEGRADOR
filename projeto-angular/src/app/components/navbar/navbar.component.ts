import { Component, OnInit } from '@angular/core';
import { ChangeThemeService } from 'src/app/services/change-theme.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  styles: [],
})
export class NavbarComponent implements OnInit {
  toggleChecked: any;
  theme: any;
  storedValue: any;

  constructor(
    private localStorage: LocalStorageService,
    private ChangeTheme: ChangeThemeService
  ) {}

  ngOnInit(): void {
    this.storedValue = localStorage.getItem('checked');
    if (!this.storedValue) {
      this.localStorage.setItem('theme', 'light');
      this.localStorage.setItem('checked', false);
    }

    this.localStorage.viewItems();

    this.theme = this.localStorage.getItem('theme');
    this.toggleChecked = this.localStorage.getItem('checked');

    this.passThemeService(this.theme);
  }

  changeColorTheme() {
    this.toggleChecked = !this.toggleChecked;
    this.toggleChecked == true ? (this.theme = 'dark') : (this.theme = 'light');
    this.localStorage.setItem('theme', this.theme);
    this.localStorage.setItem('checked', this.toggleChecked);

    this.passThemeService(this.theme);
  }

  passThemeService(theme: String) {
    this.ChangeTheme.getTheme(theme);
  }
}
