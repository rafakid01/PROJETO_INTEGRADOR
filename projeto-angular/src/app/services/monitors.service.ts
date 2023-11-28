import { Injectable } from '@angular/core';
import Dexie from 'dexie';
import { BehaviorSubject, Observable, from, of, switchMap, tap } from 'rxjs';
import { DjangoConnService } from './django-conn.service';

@Injectable({
  providedIn: 'root',
})
export class MonitorsService extends Dexie {
  monitores: any[] = [];
  monitoresFiltrados: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  constructor() {
    super('MeuBancoDeDados');
    this.version(1).stores({ monitores: 'id' });

    this.inicializarDados();
  }

  private inicializarDados() {
    this.table('monitores')
      .toArray()
      .then((dados) => {
        this.monitores = dados;
        this.monitoresFiltrados.next([...this.monitores]);

        console.log(this.monitores);
      });
  }

  obterTodosMonitores(): Observable<any[]> {
    return from(this.table('monitores').toArray());
  }

  obterMonitoresFiltrados(): Observable<any[]> {
    return this.monitoresFiltrados.asObservable();
  }

  filtrarMonitores(filtro: string) {
    this.monitoresFiltrados.next(
      this.monitores.filter((monitor) =>
        monitor.nome.toLowerCase().includes(filtro.toLowerCase())
      )
    );
  }
}
