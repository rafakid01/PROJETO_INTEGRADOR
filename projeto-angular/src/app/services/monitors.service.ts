import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { DjangoConnService } from './django-conn.service';

@Injectable({
  providedIn: 'root',
})
export class MonitorsService {
  constructor(
    private localstorage: LocalStorageService,
    private django: DjangoConnService
  ) {
    this.getMonitors();
  }

  getMonitors() {
    let monitores: any[] = [];

    this.django.getUsers().subscribe((user) => {
      monitores = user.filter((usuario: any) => {
        return (
          usuario.categoria == 'monitor' &&
          usuario.foto_perfil != '' &&
          usuario.contato_numero_1 != null
        );
      });

      monitores.forEach((monitor) => {
        delete monitor.senha;

        let notaFormatada = monitor.monitor.nota_avaliacao[0];
        monitor.monitor.nota_avaliacao = notaFormatada;
      });

      this.localstorage.setItem('monitores', monitores);
    });
  }

  filterMonitors(filter: any) {
    let monitors: any[] = [];
    this.localstorage.setItem('filter', filter);
    monitors = this.localstorage.getItem('monitores');

    let filteredAssunto = monitors.filter((monitor) => {
      return monitor.monitor.assuntos
        .toLowerCase()
        .includes(filter.toLowerCase());
    });

    let filteredCurso = monitors.filter((monitor) => {
      return monitor.curso.toLowerCase().includes(filter.toLowerCase());
    });

    let filteredNome = monitors.filter((monitor) => {
      return monitor.nome.toLowerCase().includes(filter.toLowerCase());
    });

    let monitorsFiltered: any[] = filteredAssunto.concat(filteredCurso);
    monitorsFiltered = monitorsFiltered.concat(filteredNome);

    monitorsFiltered = monitorsFiltered.filter(
      (monitor, index, self) =>
        index === self.findIndex((m) => m.id === monitor.id)
    );

    this.localstorage.setItem('monitoresFiltrados', monitorsFiltered);
  }

  filterMonitorRadios(filters: any) {
    console.log(filters);

    let monitoresAtuais: any[] =
      this.localstorage.getItem('monitoresFiltrados');

    console.log(monitoresAtuais);

    let moniCurso = monitoresAtuais.filter((monitor) => {
      return monitor.curso.toLowerCase().includes(filters.course.toLowerCase());
    });
    console.log(moniCurso);

    let moniNota = moniCurso.filter((monitor) => {
      let notaMonitor: any = Number(monitor.monitor.nota_avaliacao);
      notaMonitor = notaMonitor.toFixed();
      return notaMonitor.includes(filters.rate);
    });
    console.log(moniNota);

    let moniAssunto = moniNota.filter((monitor) => {
      return monitor.monitor.assuntos
        .toString()
        .toLowerCase()
        .includes(filters.category.toLowerCase());
    });
    console.log(moniAssunto);

    return moniAssunto;
  }
}
