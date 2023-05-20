import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedDealerSaleListsComponent } from './approved-dealer-sale-lists.component';

describe('ApprovedDealerSaleListsComponent', () => {
  let component: ApprovedDealerSaleListsComponent;
  let fixture: ComponentFixture<ApprovedDealerSaleListsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApprovedDealerSaleListsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovedDealerSaleListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
