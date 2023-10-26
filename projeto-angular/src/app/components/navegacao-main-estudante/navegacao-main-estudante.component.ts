import { Component, OnInit } from '@angular/core';
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

  constructor(private navData: NavDataService) {}

  compressedDivOne: string = 'compressed';
  compressedDivTwo: string = 'compressed';
  compressedDivThree: string = 'compressed';

  ngOnInit(): void {
    this.monitorList = this.navData.monitorsList;
    this.coursesList = this.navData.coursesList;
    this.categoryList = this.navData.categoryList;
    this.ratingList = this.navData.ratingList;
    this.monitorsNumber = this.navData.monitorsList.length;
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
}
