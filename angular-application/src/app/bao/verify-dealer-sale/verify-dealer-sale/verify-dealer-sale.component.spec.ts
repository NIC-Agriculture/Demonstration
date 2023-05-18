import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyDealerSaleComponent } from './verify-dealer-sale.component';

describe('VerifyDealerSaleComponent', () => {
  let component: VerifyDealerSaleComponent;
  let fixture: ComponentFixture<VerifyDealerSaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerifyDealerSaleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyDealerSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
