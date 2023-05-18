import { TestBed } from '@angular/core/testing';

import { CdaoService } from './cdao.service';

describe('CdaoService', () => {
  let service: CdaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CdaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
