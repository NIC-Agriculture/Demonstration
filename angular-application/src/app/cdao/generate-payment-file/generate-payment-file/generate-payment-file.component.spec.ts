import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneratePaymentFileComponent } from './generate-payment-file.component';

describe('GeneratePaymentFileComponent', () => {
  let component: GeneratePaymentFileComponent;
  let fixture: ComponentFixture<GeneratePaymentFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneratePaymentFileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneratePaymentFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
