import { Component, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  styles: [],
})
export class NavbarComponent implements OnInit {
  toggleChecked: Boolean = false;
  theme: String = 'light';

  buttonToggle: any = (document.documentElement.className = 'toggle-button');

  constructor(private renderer: Renderer2) {}

  changeColorTheme() {
    this.toggleChecked = !this.toggleChecked;
    this.toggleChecked == true ? (this.theme = 'dark') : (this.theme = 'light');
  }

  ngOnInit(): void {}
}
