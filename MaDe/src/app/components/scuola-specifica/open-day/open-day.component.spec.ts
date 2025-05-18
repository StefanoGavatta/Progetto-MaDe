import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenDayComponent } from './open-day.component';

describe('OpenDayComponent', () => {
  let component: OpenDayComponent;
  let fixture: ComponentFixture<OpenDayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OpenDayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpenDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
