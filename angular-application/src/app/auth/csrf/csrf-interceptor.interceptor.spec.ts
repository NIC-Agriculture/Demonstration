import { TestBed } from '@angular/core/testing';

import { CsrfInterceptorInterceptor } from './csrf-interceptor.interceptor';

describe('CsrfInterceptorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      CsrfInterceptorInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: CsrfInterceptorInterceptor = TestBed.inject(CsrfInterceptorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
