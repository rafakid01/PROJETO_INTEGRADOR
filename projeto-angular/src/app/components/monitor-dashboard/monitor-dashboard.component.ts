import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlunoInteresse } from 'src/app/models/usuario.model';
import { DjangoConnService } from 'src/app/services/django-conn.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { RefreshComponentService } from 'src/app/services/refresh-component.service';

@Component({
  selector: 'app-monitor-dashboard',
  templateUrl: './monitor-dashboard.component.html',
  styleUrls: ['./monitor-dashboard.component.css'],
})
export class MonitorDashboardComponent implements OnInit {
  arrayAlunosFinal: AlunoInteresse[] = [];

  constructor(
    private localstorage: LocalStorageService,
    private route: Router,
    private django: DjangoConnService,
    private reload: RefreshComponentService
  ) {}

  ngOnInit(): void {
    let monitorUsuario = this.localstorage.getItem('usuario');

    if (monitorUsuario.categoria != 'monitor') {
      this.route.navigate(['/']);
    }

    let alunosInteressados: any[] = [];
    this.django
      .getInteressesMonitor(monitorUsuario.id)
      .subscribe((listaAlunos: any) => {
        alunosInteressados = listaAlunos.filter((aluno: any) => {
          return aluno.aluno != monitorUsuario.id;
        });

        let mapaID = new Map();
        alunosInteressados.forEach((interesse: any) => {
          mapaID.set(interesse.aluno, interesse);
        });
        let interesseFiltered = Array.from(mapaID.values());

        interesseFiltered.forEach((aluno: any) => {
          this.django.getSingleUser(aluno.aluno).subscribe((user: any) => {
            const alunoAtual: any = {
              id: aluno.id,
              nome: user.nome,
              curso: user.curso,
              contato_numero1: user.contato_numero_1,
              data_interesse: this.convertDate(aluno.data_interesse),
            };

            this.arrayAlunosFinal.push(alunoAtual);
          });
        });
      });
  }

  convertDate(date: any) {
    const dataOriginal = new Date(date);

    const dia = String(dataOriginal.getDate()).padStart(2, '0');
    const mes = String(dataOriginal.getMonth() + 1).padStart(2, '0'); // O mês é baseado em zero, então adicionamos 1
    const ano = dataOriginal.getFullYear();
    const horas = String(dataOriginal.getHours()).padStart(2, '0');
    const minutos = String(dataOriginal.getMinutes()).padStart(2, '0');

    const dataFormatada = `${dia}/${mes}/${ano} ${horas}:${minutos}`;
    return dataFormatada;
  }

  deleteInteresse(id: any) {
    this.django.deleteInteresse(id).subscribe(() => {
      this.reload.reloadApp();
    });
  }
}
