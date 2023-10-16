import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { Component, OnInit } from '@angular/core';
import { ChangeThemeService } from './app/services/change-theme.service';

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));

@Component({
  template: '',
})
export class MainComponent implements OnInit {
  theme: String = 'light';
  constructor(private ThemeService: ChangeThemeService) {}

  ngOnInit(): void {
    this.theme = this.ThemeService.importTheme();
    console.log(this.theme);
  }
}
