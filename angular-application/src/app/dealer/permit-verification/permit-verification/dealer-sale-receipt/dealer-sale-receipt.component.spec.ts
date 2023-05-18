import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealerSaleReceiptComponent } from './dealer-sale-receipt.component';

describe('DealerSaleReceiptComponent', () => {
  let component: DealerSaleReceiptComponent;
  let fixture: ComponentFixture<DealerSaleReceiptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DealerSaleReceiptComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DealerSaleReceiptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
