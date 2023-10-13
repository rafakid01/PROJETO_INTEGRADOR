import { Component, Renderer2 } from '@angular/core';
import { LocalStorageService } from './services/local-storage.service';

declare function atualizarTemaCores(className: string): any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'projeto-angular';
  theme_class: any;

  constructor(
    private localStorage: LocalStorageService,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.theme_class = this.localStorage.getItem('theme');
    atualizarTemaCores(this.theme_class);

    this.renderer.setProperty(document, 'class', this.theme_class);

    // if (this.theme_class == undefined) {
    //   this.theme_class = this.localStorage.getItem('theme');
    // } else {
    //   this.theme_class = this.ThemeService.importTheme();
    // }
  }
}
