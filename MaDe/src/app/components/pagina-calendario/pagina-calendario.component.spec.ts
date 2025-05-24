import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaCalendarioComponent } from './pagina-calendario.component';

describe('PaginaCalendarioComponent', () => {
  let component: PaginaCalendarioComponent;
  let fixture: ComponentFixture<PaginaCalendarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginaCalendarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginaCalendarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
