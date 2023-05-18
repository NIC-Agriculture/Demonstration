import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistrictTargetUpdateComponent } from './district-target-update.component';

describe('DistrictTargetUpdateComponent', () => {
  let component: DistrictTargetUpdateComponent;
  let fixture: ComponentFixture<DistrictTargetUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DistrictTargetUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DistrictTargetUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
