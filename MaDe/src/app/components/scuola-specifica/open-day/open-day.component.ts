import { Component, AfterViewInit, Renderer2, ElementRef } from '@angular/core';

@Component({
  selector: 'app-open-day',
  imports: [],
  templateUrl: './open-day.component.html',
  styleUrl: './open-day.component.css'
})
export class OpenDayComponent implements AfterViewInit {
  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngAfterViewInit() {
    const boxes = this.el.nativeElement.querySelectorAll('.indirizzo-box:not(.empty)');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.renderer.addClass(entry.target, 'visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    boxes.forEach((box: Element) => observer.observe(box));
  }
}
