import { ViewportScroller } from '@angular/common';
import { Component, OnInit, Renderer2 } from '@angular/core';
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
  storedTheme: any;
  backColor: string = 'transparent';

  storedProfile: any = true;

  constructor(
    private localStorage: LocalStorageService,
    private renderer: Renderer2,
    private scroll: ViewportScroller
  ) {}

  ngOnInit(): void {
    // this.alterationProfileLocalStorage();
    this.alterationThemeLocalStorage();
  }

  alterationProfileLocalStorage() {
    this.storedProfile = this.localStorage.getItem('logged');
  }

  alterationThemeLocalStorage() {
    // Será capturado o valor do LocalStorage onde está o booleano para o toggle checado
    this.storedTheme = localStorage.getItem('checked');

    // Se o toggle estiver checado, será mudado para False, o valor do tema para Light
    if (!this.storedTheme) {
      this.localStorage.setItem('theme', 'light');
      this.localStorage.setItem('checked', false);
    }

    // O tema local será definido a partir do valor contido na LocalStorage, assim como o booleano do toggle checado
    this.theme = this.localStorage.getItem('theme');
    this.toggleChecked = this.localStorage.getItem('checked');

    // O tema será passado para o método que fará a mudança de tema
    this.modifyTheme(this.theme);
  }

  // Método que será executado com o pressionamento do toggle no HTML
  changeColorTheme() {
    // O booleano do toggle será invertido
    this.toggleChecked = !this.toggleChecked;

    // Definição do tema de acordo com o valor do booleano
    this.toggleChecked == true ? (this.theme = 'dark') : (this.theme = 'light');

    // Mudança de valores do tema e do booleano na LocalStorage
    this.localStorage.setItem('theme', this.theme);
    this.localStorage.setItem('checked', this.toggleChecked);

    // O tema será passado para o método que fará a mudança de tema
    this.modifyTheme(this.theme);
  }

  modifyTheme(theme: string) {
    const html = document.getElementsByTagName('html')[0];
    if (theme == 'light') {
      this.renderer.removeClass(html, 'dark');
      this.renderer.addClass(html, theme);
    }
    if (theme == 'dark') {
      this.renderer.removeClass(html, 'light');
      this.renderer.addClass(html, theme);
    }
  }

  // FUNÇÃO QUE MUDA O BACKGROUND DA NAVBAR DE ACORDO COM A POSIÇÃO DA TELA
  changeBackground() {
    const positionY = this.scroll.getScrollPosition()[1];
    positionY > 0
      ? (this.backColor = 'colored')
      : (this.backColor = 'transparent');
  }

  scrollToTop() {
    this.scroll.scrollToPosition([0, 0]);
  }
}
