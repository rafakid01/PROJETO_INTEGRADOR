import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  viewItems() {
    console.log(localStorage);
  }

  setItem(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
    console.log(`Key: ${key} Value: ${value}`);
  }

  getItem(key: string) {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : null;
  }

  removeItem(key: string) {
    localStorage.removeItem(key);
  }
}
