import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockTargetMonitoringComponent } from './block-target-monitoring.component';

describe('BlockTargetMonitoringComponent', () => {
  let component: BlockTargetMonitoringComponent;
  let fixture: ComponentFixture<BlockTargetMonitoringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlockTargetMonitoringComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockTargetMonitoringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
