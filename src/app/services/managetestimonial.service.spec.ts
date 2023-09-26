import { TestBed } from '@angular/core/testing';

import { ManagetestimonialService } from './managetestimonial.service';

describe('ManagetestimonialService', () => {
  let service: ManagetestimonialService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManagetestimonialService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
