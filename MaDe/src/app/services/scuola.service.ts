import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScuolaService {
  private scuolaSelezionata = new BehaviorSubject<any>({
    name: '',
    logo: '',
    id: '',
    tipo: ''
  });

  scuolaSelezionata$ = this.scuolaSelezionata.asObservable();

  setScuolaSelezionata(scuola: any) {
    this.scuolaSelezionata.next(scuola);
  }
}