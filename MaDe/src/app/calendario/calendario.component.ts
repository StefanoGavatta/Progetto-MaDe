import {
  Component,
  InputSignal,
  Signal,
  WritableSignal,
  computed,
  input,
  signal,
} from '@angular/core';

import { DateTime, Info, Interval } from 'luxon';
import { CommonModule } from '@angular/common';
import { Meetings } from './meetings.interface';

@Component({
  selector: 'calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css'],
  imports: [CommonModule],
  standalone: true,
})
export class CalendarioComponent {
  meetings: InputSignal<Meetings> = input.required();
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
  activeDayMeetings: Signal<string[]> = computed(() => {
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
  getMeetingsForDay(day: DateTime): string[] {
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
}
