import { Component, signal, Signal, WritableSignal } from '@angular/core';
import { DateTime } from 'luxon';

@Component({
  selector: 'app-calendario',
  imports: [],
  templateUrl: './calendario.component.html',
  styleUrl: './calendario.component.css'
})
export class CalendarioComponent {

  today: Signal<DateTime> = signal(DateTime.local());
  firstDayOfActiveMonth: WritableSignal<DateTime> =signal(this.today().startOf('month'));
}
