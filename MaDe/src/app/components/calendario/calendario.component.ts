import {
  Component,
  Signal,
  WritableSignal,
  computed,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateTime, Info, Interval } from 'luxon';
import { DirectusService } from '../../services/directus.service';
import { Scuola } from '../../interfaces/scuola';
import { Dati } from '../../interfaces/meetings.interface';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css'],
  imports: [CommonModule,RouterLink,RouterLinkActive],
  standalone: true,
})
export class CalendarioComponent {
  directusService = inject(DirectusService);
  scuola: WritableSignal<Scuola | null> = signal(null);
  title = 'MaDe';
  bho: boolean = false;
  meetings: WritableSignal<Record<string, Dati[]>> = signal({});
  giornoSelezionato: WritableSignal<Dati[] | null> = signal<Dati[] | null>(null);
  
  today: Signal<DateTime> = signal(DateTime.local());
  firstDayOfActiveMonth: WritableSignal<DateTime> = signal(
    this.today().startOf('month')
  );
  activeDay: WritableSignal<DateTime | null> = signal(null);
  weekDays: Signal<string[]> = signal(Info.weekdays('short'));
  
  daysOfMonth: Signal<DateTime[]> = computed(() => {
    return Interval.fromDateTimes(
      this.firstDayOfActiveMonth().startOf('week'),
      this.firstDayOfActiveMonth().endOf('month').endOf('week')
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
    
    return this.meetings()[activeDayISO] || [];
  });

  goToPreviousMonth(): void {
    this.firstDayOfActiveMonth.set(
      this.firstDayOfActiveMonth().minus({ month: 1 })
    );
  }

  goToNextMonth(): void {
    this.firstDayOfActiveMonth.set(
      this.firstDayOfActiveMonth().plus({ month: 1 })
    );
  }

  goToToday(): void {
    this.firstDayOfActiveMonth.set(this.today().startOf('month'));
  }

  onDayClick(day: DateTime): void {
    if (this.activeDay()?.toISODate() === day.toISODate()) {
      this.activeDay.set(null);
    } else {
      this.activeDay.set(day);
    }

    this.giornoSelezionato.set(this.meetings()[day.toISODate() ?? "bho"])
    console.log(this.giornoSelezionato())
    this.bho = true;
  }

  getMeetingsForDay(day: DateTime): string[] {
    const dayISO = day.toISODate();
    
    // Se la data non è valida o non ci sono eventi, restituisci array vuoto
    if (!dayISO || !this.meetings()[dayISO]) {
      return [];
    }
  
    // Usa optional chaining e nullish coalescing per sicurezza
    return this.meetings()[dayISO]?.map(incontro => incontro.dataInizio.split("T")[0]) ?? [];
  }


  ngOnInit(): void {
    this.directusService.getEventsData().subscribe(data => {
      const newMeetings: Record<string, Dati[]> = {};
      
      data?.data.forEach(info => {
        const dateKey = info.start_date.split("T")[0];
        
        this.directusService.getSchoolData(info.school).subscribe(scuolaDati => {
          const meetingData: Dati = {
            dataFine: info.end_date,
            dataInizio: info.start_date,
            title: info.title,
            icona: `https://api.retescuolevallagarina.it/assets/${scuolaDati?.data.logo  ?? "error"}` ,
            idScuola : info.school,
            scuola: scuolaDati?.data.name ?? "No name",
            luogo : info.location,
            descrizione : info.description
          };
          
          // Aggiorna newMeetings invece di this.meetings direttamente
          if (!newMeetings[dateKey]) {
            newMeetings[dateKey] = [];
          }
          newMeetings[dateKey].push(meetingData);
          
          // Aggiorna il segnale una volta che tutti i dati sono pronti
          this.meetings.update(current => ({ ...current, ...newMeetings }));
          console.log(this.meetings)
        });
      });
    });
  }

  closeOverlay(): void {
    this.bho = false;
  }
}
