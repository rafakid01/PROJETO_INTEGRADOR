import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { MonitorsService } from 'src/app/services/monitors.service';
import { NavDataService } from 'src/app/services/nav-data.service';

@Component({
  selector: 'app-navegacao-main-estudante',
  templateUrl: './navegacao-main-estudante.component.html',
  styleUrls: ['./navegacao-main-estudante.component.css'],
})
export class NavegacaoMainEstudanteComponent implements OnInit {
  monitorList: any;
  coursesList: any;
  categoryList: any;
  ratingList: any;
  monitorsNumber: any;

  filterForm = this.fb.group({
    course: [''],
    rate: [''],
    category: [''],
  });
  constructor(
    private nav: NavDataService,
    private fb: FormBuilder,
    private localstorage: LocalStorageService,
    private route: Router,
    private moniService: MonitorsService
  ) {}

  compressedDivOne: string = 'compressed';
  compressedDivTwo: string = 'compressed';
  compressedDivThree: string = 'compressed';

  ngOnInit(): void {
    if (!this.localstorage.getItem('logged')) {
      this.route.navigate(['/']);
    }

    this.monitorList = this.localstorage.getItem('monitoresFiltrados');

    this.monitorsNumber = 30;
    this.coursesList = this.nav.coursesList;
    this.categoryList = this.nav.categoryList;
    this.ratingList = this.nav.ratingList;
  }

  compressOne() {
    this.compressedDivOne == 'compressed'
      ? (this.compressedDivOne = 'uncompressed')
      : (this.compressedDivOne = 'compressed');

    if (this.compressedDivOne == 'uncompressed') {
      this.compressedDivTwo = 'compressed';
      this.compressedDivThree = 'compressed';
    }
  }
  compressTwo() {
    this.compressedDivTwo == 'compressed'
      ? (this.compressedDivTwo = 'uncompressed')
      : (this.compressedDivTwo = 'compressed');

    if (this.compressedDivTwo == 'uncompressed') {
      this.compressedDivOne = 'compressed';
      this.compressedDivThree = 'compressed';
    }
  }
  compressThree() {
    this.compressedDivThree == 'compressed'
      ? (this.compressedDivThree = 'uncompressed')
      : (this.compressedDivThree = 'compressed');

    if (this.compressedDivThree == 'uncompressed') {
      this.compressedDivTwo = 'compressed';
      this.compressedDivOne = 'compressed';
    }
  }

  submitFilter(event: any) {}
}
