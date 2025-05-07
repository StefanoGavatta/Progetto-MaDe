import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScuoleComponent } from './scuole.component';

describe('ScuoleComponent', () => {
  let component: ScuoleComponent;
  let fixture: ComponentFixture<ScuoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScuoleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScuoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
