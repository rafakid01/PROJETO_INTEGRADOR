import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DjangoConnService } from 'src/app/services/django-conn.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-single-class',
  templateUrl: './single-class.component.html',
  styleUrls: ['./single-class.component.css'],
})
export class SingleClassComponent implements OnInit {
  monitorBody?: any;
  interesseSend = false;

  constructor(
    private django: DjangoConnService,
    private activeRoute: ActivatedRoute,
    private localstorage: LocalStorageService,
    private date: DatePipe
  ) {
    this.getActualMonitor();
  }

  ngOnInit(): void {}

  getActualMonitor() {
    const id = Number(this.activeRoute.snapshot.paramMap.get('id'));

    this.django.getSingleUser(id).subscribe((monitor) => {
      delete monitor.senha;
      monitor.monitor.assuntos = monitor.monitor.assuntos.split(',');
      this.monitorBody = monitor;
      console.log(monitor);
    });
  }

  adicionarInteresse() {
    let interesse: any = {
      data_interesse: '',
      aluno: '',
      monitor: '',
    };

    let dataAtual = this.date.transform(new Date(), 'yyyy-MM-ddTHH:mm:ss');

    interesse.data_interesse = dataAtual;
    interesse.aluno = this.localstorage.getItem('usuario')?.id;
    interesse.monitor = this.monitorBody?.id;

    this.django.postInteresse(interesse).subscribe((interesse: any) => {
      console.log(interesse);
    });
  }
}
