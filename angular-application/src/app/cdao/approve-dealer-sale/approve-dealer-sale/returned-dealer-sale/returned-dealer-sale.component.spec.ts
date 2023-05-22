import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnedDealerSaleComponent } from './returned-dealer-sale.component';

describe('ReturnedDealerSaleComponent', () => {
  let component: ReturnedDealerSaleComponent;
  let fixture: ComponentFixture<ReturnedDealerSaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReturnedDealerSaleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturnedDealerSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
