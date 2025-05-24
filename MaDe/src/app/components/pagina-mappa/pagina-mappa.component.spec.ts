import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaMappaComponent } from './pagina-mappa.component';

describe('PaginaMappaComponent', () => {
  let component: PaginaMappaComponent;
  let fixture: ComponentFixture<PaginaMappaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginaMappaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginaMappaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
