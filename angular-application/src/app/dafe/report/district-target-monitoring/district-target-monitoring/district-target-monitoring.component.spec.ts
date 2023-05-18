import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistrictTargetMonitoringComponent } from './district-target-monitoring.component';

describe('DistrictTargetMonitoringComponent', () => {
  let component: DistrictTargetMonitoringComponent;
  let fixture: ComponentFixture<DistrictTargetMonitoringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DistrictTargetMonitoringComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DistrictTargetMonitoringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
