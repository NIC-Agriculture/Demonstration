import { TestBed } from '@angular/core/testing';

import { BaoServiceService } from './bao-service.service';

describe('BaoServiceService', () => {
  let service: BaoServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BaoServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
