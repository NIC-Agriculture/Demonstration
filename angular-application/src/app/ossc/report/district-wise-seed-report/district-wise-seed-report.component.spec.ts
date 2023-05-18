import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistrictWiseSeedReportComponent } from './district-wise-seed-report.component';

describe('DistrictWiseSeedReportComponent', () => {
  let component: DistrictWiseSeedReportComponent;
  let fixture: ComponentFixture<DistrictWiseSeedReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DistrictWiseSeedReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DistrictWiseSeedReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
