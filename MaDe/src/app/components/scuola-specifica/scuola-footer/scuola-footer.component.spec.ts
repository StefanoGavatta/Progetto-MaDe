import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScuolaFooterComponent } from './scuola-footer.component';

describe('ScuolaFooterComponent', () => {
  let component: ScuolaFooterComponent;
  let fixture: ComponentFixture<ScuolaFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScuolaFooterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScuolaFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
