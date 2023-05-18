import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentSuccessFailureEntryComponent } from './payment-success-failure-entry.component';

describe('PaymentSuccessFailureEntryComponent', () => {
  let component: PaymentSuccessFailureEntryComponent;
  let fixture: ComponentFixture<PaymentSuccessFailureEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentSuccessFailureEntryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentSuccessFailureEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
