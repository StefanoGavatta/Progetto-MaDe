import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScuolaSpecificaComponent } from './scuola-specifica.component';

describe('ScuolaSpecificaComponent', () => {
  let component: ScuolaSpecificaComponent;
  let fixture: ComponentFixture<ScuolaSpecificaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScuolaSpecificaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScuolaSpecificaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
