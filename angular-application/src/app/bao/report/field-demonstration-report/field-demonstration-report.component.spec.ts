import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldDemonstrationReportComponent } from './field-demonstration-report.component';

describe('FieldDemonstrationReportComponent', () => {
  let component: FieldDemonstrationReportComponent;
  let fixture: ComponentFixture<FieldDemonstrationReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FieldDemonstrationReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldDemonstrationReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
