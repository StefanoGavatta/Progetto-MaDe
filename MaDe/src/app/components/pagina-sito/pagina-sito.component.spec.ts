import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaSitoComponent } from './pagina-sito.component';

describe('PaginaSitoComponent', () => {
  let component: PaginaSitoComponent;
  let fixture: ComponentFixture<PaginaSitoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginaSitoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginaSitoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
