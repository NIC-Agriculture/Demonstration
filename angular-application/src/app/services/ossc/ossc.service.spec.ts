import { TestBed } from '@angular/core/testing';

import { OsscService } from './ossc.service';

describe('OsscService', () => {
  let service: OsscService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OsscService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
