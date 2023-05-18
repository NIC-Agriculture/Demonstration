import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegeneratePaymentFileComponent } from './regenerate-payment-file.component';

describe('RegeneratePaymentFileComponent', () => {
  let component: RegeneratePaymentFileComponent;
  let fixture: ComponentFixture<RegeneratePaymentFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegeneratePaymentFileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegeneratePaymentFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
