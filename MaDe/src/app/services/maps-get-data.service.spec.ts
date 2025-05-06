import { TestBed } from '@angular/core/testing';

import { MapsGetDataService } from './maps-get-data.service';

describe('MapsGetDataService', () => {
  let service: MapsGetDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MapsGetDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
