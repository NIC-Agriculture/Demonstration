import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealerSellComponent } from './dealer-sell.component';

describe('DealerSellComponent', () => {
  let component: DealerSellComponent;
  let fixture: ComponentFixture<DealerSellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DealerSellComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DealerSellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
