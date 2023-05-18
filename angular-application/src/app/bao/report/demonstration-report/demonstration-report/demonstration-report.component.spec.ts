import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemonstrationReportComponent } from './demonstration-report.component';

describe('DemonstrationReportComponent', () => {
  let component: DemonstrationReportComponent;
  let fixture: ComponentFixture<DemonstrationReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemonstrationReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemonstrationReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
