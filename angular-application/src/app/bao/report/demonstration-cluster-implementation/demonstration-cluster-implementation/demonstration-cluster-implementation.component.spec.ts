import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemonstrationClusterImplementationComponent } from './demonstration-cluster-implementation.component';

describe('DemonstrationClusterImplementationComponent', () => {
  let component: DemonstrationClusterImplementationComponent;
  let fixture: ComponentFixture<DemonstrationClusterImplementationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemonstrationClusterImplementationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemonstrationClusterImplementationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
