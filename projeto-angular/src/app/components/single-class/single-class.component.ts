import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
  rateSend = false;

  rateInput = new FormControl();

  selfMonitor: boolean = true;

  jaInteressou: boolean = false;

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

      this.selfMonitor = this.monitorBody.id == id;

      this.verificarInteresse(id);
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
      this.interesseSend = true;
      this.confirmaEnvio();
    });
  }

  confirmaEnvio() {
    setTimeout(() => {
      this.interesseSend = false;
    }, 3000);
  }

  verificarInteresse(id: any) {
    this.django.getInteressesMonitor(id).subscribe((listaInteresses) => {
      this.jaInteressou = listaInteresses.some((interesse: any) => {
        return interesse.aluno == this.localstorage.getItem('usuario').id;
      });
    });
  }

  openForm() {
    this.rateSend = true;
  }

  enviarAvaliacao(nota: number) {
    const id = Number(this.activeRoute.snapshot.paramMap.get('id'));

    this.django.getSingleMonitor(id).subscribe((monitor: any) => {
      let notaMonitor = Number(monitor.nota_avaliacao);

      let soma = notaMonitor + nota;

      let novaMedia = soma / 2;
      const novaMediaString = novaMedia.toString();

      this.django.updateRate(id, novaMediaString).subscribe((data) => {
        setTimeout(() => {
          this.rateSend = false;
        }, 1500);
      });
    });
  }
}
