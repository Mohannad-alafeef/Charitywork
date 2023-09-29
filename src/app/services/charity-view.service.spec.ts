import { TestBed } from '@angular/core/testing';

import { CharityViewService } from './charity-view.service';

describe('CharityViewService', () => {
  let service: CharityViewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CharityViewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
