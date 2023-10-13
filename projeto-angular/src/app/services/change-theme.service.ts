import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ChangeThemeService implements OnInit {
  theme_final: any;
  constructor(@Inject(DOCUMENT) private document: Document) {}

  ngOnInit(): void {}

  modifyTheme(theme: String) {
    this.theme_final = theme;
    const body = this.document.getElementsByTagName('body')[0];
    console.log(body);
  }
}
