import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveDealerSaleComponent } from './approve-dealer-sale.component';

describe('ApproveDealerSaleComponent', () => {
  let component: ApproveDealerSaleComponent;
  let fixture: ComponentFixture<ApproveDealerSaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproveDealerSaleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveDealerSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
