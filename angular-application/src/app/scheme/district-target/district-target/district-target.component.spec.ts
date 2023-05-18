import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistrictTargetComponent } from './district-target.component';

describe('DistrictTargetComponent', () => {
  let component: DistrictTargetComponent;
  let fixture: ComponentFixture<DistrictTargetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DistrictTargetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DistrictTargetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
