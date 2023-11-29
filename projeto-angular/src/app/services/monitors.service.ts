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
        return usuario.categoria == 'monitor' && usuario.foto_perfil != '';
      });

      monitores.forEach((monitor) => {
        delete monitor.senha;
      });

      this.localstorage.setItem('monitores', monitores);
    });
  }

  filterMonitors(filter: any) {
    let monitors: any[] = [];
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
}
