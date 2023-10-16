import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ChangeThemeService {
  theme_final: any;
  constructor() {}

  getTheme(theme: String) {
    this.theme_final = theme;
  }

  importTheme() {
    return this.theme_final;
  }
}
