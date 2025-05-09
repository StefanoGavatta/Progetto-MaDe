import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContattaciComponent } from './contattaci.component';

describe('ContattaciComponent', () => {
  let component: ContattaciComponent;
  let fixture: ComponentFixture<ContattaciComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContattaciComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContattaciComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
