import { TestBed } from '@angular/core/testing';

import { ReservationFormServiceTsService } from './reservation-form.service.ts.service';

describe('ReservationFormServiceTsService', () => {
  let service: ReservationFormServiceTsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReservationFormServiceTsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
