import { TestBed } from '@angular/core/testing';

import { UserwalletService } from './userwallet.service';

describe('UserwalletService', () => {
  let service: UserwalletService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserwalletService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
