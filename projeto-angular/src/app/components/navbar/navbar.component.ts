import { Component, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  styles: [],
})
export class NavbarComponent implements OnInit {
  constructor(private renderer: Renderer2) {}

  changeColorTheme() {}

  ngOnInit(): void {}
}
