import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StateplanPaymentFileComponent } from './stateplan-payment-file.component';

describe('StateplanPaymentFileComponent', () => {
  let component: StateplanPaymentFileComponent;
  let fixture: ComponentFixture<StateplanPaymentFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StateplanPaymentFileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StateplanPaymentFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
