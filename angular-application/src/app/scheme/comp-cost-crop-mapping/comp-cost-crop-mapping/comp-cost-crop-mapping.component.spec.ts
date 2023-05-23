import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompCostCropMappingComponent } from './comp-cost-crop-mapping.component';

describe('CompCostCropMappingComponent', () => {
  let component: CompCostCropMappingComponent;
  let fixture: ComponentFixture<CompCostCropMappingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompCostCropMappingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompCostCropMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
