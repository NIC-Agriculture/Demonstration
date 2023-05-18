import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermitVerificationComponent } from './permit-verification.component';

describe('PermitVerificationComponent', () => {
  let component: PermitVerificationComponent;
  let fixture: ComponentFixture<PermitVerificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PermitVerificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PermitVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
