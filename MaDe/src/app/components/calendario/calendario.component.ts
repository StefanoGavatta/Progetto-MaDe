import {
  Component,
  InputSignal,
  OnInit,
  Signal,
  WritableSignal,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';

import { DateTime, Info, Interval } from 'luxon';
import { CommonModule } from '@angular/common';
import { Dati, Meetings } from '../../interfaces/meetings.interface';
import { DirectusService } from '../../services/directus.service';
import { SchoolsData } from '../../interfaces/schools-data';
import { Scuola } from '../../interfaces/scuola';
import { Data } from '@angular/router';
import { NotExpr } from '@angular/compiler';

@Component({
  selector: 'calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css'],
  imports: [CommonModule],
  standalone: true,
})
export class CalendarioComponent implements OnInit {
  directusService = inject(DirectusService)
  scuola: WritableSignal<Scuola | null> = signal(null);
  title = 'MaDe';
  bho: boolean = false;
  meetings: WritableSignal<Meetings> = signal<Meetings>({
  });
  today: Signal<DateTime> = signal(DateTime.local());

  firstDayOfActiveMonth: WritableSignal<DateTime> = signal(
    this.today().startOf('month'),
  );
  activeDay: WritableSignal<DateTime | null> = signal(null);
  weekDays: Signal<string[]> = signal(Info.weekdays('short'));
  daysOfMonth: Signal<DateTime[]> = computed(() => {
    return Interval.fromDateTimes(
      this.firstDayOfActiveMonth().startOf('week'),
      this.firstDayOfActiveMonth().endOf('month').endOf('week'),
    )
      .splitBy({ day: 1 })
      .map((d) => {
        if (d.start === null) {
          throw new Error('Date errate');
        }
        return d.start;
      });
  });
  DATE_MED = DateTime.DATE_MED;
  activeDayMeetings: Signal<Dati[]> = computed(() => {
    const activeDay = this.activeDay();
    if (activeDay === null) {
      return [];
    }
    const activeDayISO = activeDay.toISODate();

    if (!activeDayISO) {
      return [];
    }

    return this.meetings()[activeDayISO] ?? [];
  });

  // Nuovo metodo per ottenere gli eventi di un giorno specifico
  getMeetingsForDay(day: DateTime): Dati[] {
    const dayISO = day.toISODate();
    if (!dayISO) {
      return [];
    }
    return this.meetings()[dayISO] ?? [];
  }

  goToPreviousMonth(): void {
    this.firstDayOfActiveMonth.set(
      this.firstDayOfActiveMonth().minus({ month: 1 }),
    );
  }

  goToNextMonth(): void {
    this.firstDayOfActiveMonth.set(
      this.firstDayOfActiveMonth().plus({ month: 1 }),
    );
  }

  goToToday(): void {
    this.firstDayOfActiveMonth.set(this.today().startOf('month'));
  }

  onDayClick(day: DateTime): void {
    // Se il giorno cliccato è già attivo, disattivalo
    if (this.activeDay()?.toISODate() === day.toISODate()) {
      this.activeDay.set(null);
    } else {
      // Altrimenti attiva il giorno con l'animazione
      this.activeDay.set(day);
    }
    this.bho = true
  }

  ngOnInit(): void {
    this.directusService.getEventsData().subscribe(data => {
      data?.data.forEach(info => {
        const bho: Meetings = this.meetings()
        const nome = info.title
        this.directusService.getSchoolData(info.school).subscribe(scuolaDati => {
          const data = info.start_date.split("T")[0]
          const datiCheServono : Dati = {dataFine: info.end_date,dataInizio: info.start_date,title: info.title, icona: scuolaDati?.data.logo ?? "error"}
          datiCheServono.title = nome
          bho[info.start_date].push(datiCheServono)
          this.meetings.set(bho)
          
          console.log(this.meetings)
        })


      })
    })
  }


  closeOverlay(): void {
    this.bho = false;
  }


  
}
