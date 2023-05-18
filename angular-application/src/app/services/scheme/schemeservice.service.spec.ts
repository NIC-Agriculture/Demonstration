import { TestBed } from '@angular/core/testing';

import { SchemeserviceService } from './schemeservice.service';

describe('SchemeserviceService', () => {
  let service: SchemeserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SchemeserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
