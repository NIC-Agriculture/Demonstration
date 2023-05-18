import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PfmsPaymentFileComponent } from './pfms-payment-file.component';

describe('PfmsPaymentFileComponent', () => {
  let component: PfmsPaymentFileComponent;
  let fixture: ComponentFixture<PfmsPaymentFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PfmsPaymentFileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PfmsPaymentFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
