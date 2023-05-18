import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveIncentiveSeedCostComponent } from './approve-incentive-seed-cost.component';

describe('ApproveIncentiveSeedCostComponent', () => {
  let component: ApproveIncentiveSeedCostComponent;
  let fixture: ComponentFixture<ApproveIncentiveSeedCostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproveIncentiveSeedCostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveIncentiveSeedCostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
