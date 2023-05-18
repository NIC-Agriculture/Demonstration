import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GpTargetComponent } from './gp-target.component';

describe('GpTargetComponent', () => {
  let component: GpTargetComponent;
  let fixture: ComponentFixture<GpTargetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GpTargetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GpTargetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
