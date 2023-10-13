import { Component, ElementRef, Renderer2 } from '@angular/core';
import { LocalStorageService } from './services/local-storage.service';
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
    private renderer: Renderer2,
    private el: ElementRef
  ) {}

  ngOnInit(): void {
    // this.theme_class = this.localStorage.getItem('theme');
    // atualizarTemaCores(this.theme_class);
    // this.setThemeColor(this.theme_class);
    // if (this.theme_class == undefined) {
    //   this.theme_class = this.localStorage.getItem('theme');
    // } else {
    //   this.theme_class = this.ThemeService.importTheme();
    // }
  }

  // setThemeColor(theme: string) {
  //   if (theme == 'dark') {
  //     this.renderer.setStyle(
  //       this.el.nativeElement.ownerDocument.body.body,
  //       '--title-color',
  //       '#FFFCE7'
  //     );
  //   }
  //   if (theme == 'light') {
  //     this.renderer.setStyle(
  //       this.el.nativeElement.ownerDocument.body.body,
  //       '--title-color',
  //       '#140E2E'
  //     );
  //   }
  // }
}
