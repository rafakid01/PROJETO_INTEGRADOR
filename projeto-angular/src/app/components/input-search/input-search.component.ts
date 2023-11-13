import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input-search',
  templateUrl: './input-search.component.html',
  styleUrls: ['./input-search.component.css'],
})
export class InputSearchComponent {
  constructor(private fb: FormBuilder) {}

  searchForm = this.fb.group({
    searchData: [''],
  });

  submitForm() {
    console.log(this.searchForm.value);
  }
}
