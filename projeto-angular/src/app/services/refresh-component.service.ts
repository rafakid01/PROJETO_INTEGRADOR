import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RefreshComponentService {
  windowApp: any;

  constructor() {}

  getWindow(windowLocal: any) {
    this.windowApp = windowLocal;
  }

  reloadApp() {
    this.windowApp.location.reload();
  }
}
