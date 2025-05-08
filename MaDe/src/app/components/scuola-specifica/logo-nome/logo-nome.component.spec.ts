import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoNomeComponent } from './logo-nome.component';

describe('LogoNomeComponent', () => {
  let component: LogoNomeComponent;
  let fixture: ComponentFixture<LogoNomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogoNomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogoNomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
