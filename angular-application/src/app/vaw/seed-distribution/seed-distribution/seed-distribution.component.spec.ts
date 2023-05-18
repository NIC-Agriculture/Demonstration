import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeedDistributionComponent } from './seed-distribution.component';

describe('SeedDistributionComponent', () => {
  let component: SeedDistributionComponent;
  let fixture: ComponentFixture<SeedDistributionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeedDistributionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeedDistributionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
