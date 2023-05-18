import { TestBed } from '@angular/core/testing';

import { VawService } from './vaw.service';

describe('VawService', () => {
  let service: VawService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VawService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
