import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { MonitorsService } from 'src/app/services/monitors.service';
import { RefreshComponentService } from 'src/app/services/refresh-component.service';

@Component({
  selector: 'app-input-search',
  templateUrl: './input-search.component.html',
  styleUrls: ['./input-search.component.css'],
})
export class InputSearchComponent {
  constructor(
    private fb: FormBuilder,
    private route: Router,
    private moniService: MonitorsService,
    private reload: RefreshComponentService,
    private localstorage: LocalStorageService
  ) {}

  searchForm = this.fb.group({
    searchData: [''],
  });

  submitForm() {
    let filter = this.searchForm.value.searchData;
    this.moniService.filterMonitors(filter);
    this.route.navigate(['/navegacao']);

    if (this.route.url == '/navegacao') {
      this.localstorage.setItem('filter', filter);
      this.reload.reloadApp();
    }
  }
}
