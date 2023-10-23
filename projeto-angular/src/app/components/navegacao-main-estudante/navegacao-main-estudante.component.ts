import { Component } from '@angular/core';
import { NavDataService } from 'src/app/services/nav-data.service';

@Component({
  selector: 'app-navegacao-main-estudante',
  templateUrl: './navegacao-main-estudante.component.html',
  styleUrls: ['./navegacao-main-estudante.component.css'],
})
export class NavegacaoMainEstudanteComponent {
  compressedDivOne: string = 'compressed';
  compressedDivTwo: string = 'compressed';
  compressedDivThree: string = 'compressed';

  constructor(private navData: NavDataService) {}

  monitorList = this.navData.monitorList;

  coursesList = this.navData.coursesList;

  categoryList = this.navData.categoryList;

  ratingList = this.navData.ratingList;

  compressOne() {
    this.compressedDivOne == 'compressed'
      ? (this.compressedDivOne = 'descompressed')
      : (this.compressedDivOne = 'compressed');
  }
  compressTwo() {
    this.compressedDivTwo == 'compressed'
      ? (this.compressedDivTwo = 'descompressed')
      : (this.compressedDivTwo = 'compressed');
  }
  compressThree() {
    this.compressedDivThree == 'compressed'
      ? (this.compressedDivThree = 'descompressed')
      : (this.compressedDivThree = 'compressed');
  }
}
