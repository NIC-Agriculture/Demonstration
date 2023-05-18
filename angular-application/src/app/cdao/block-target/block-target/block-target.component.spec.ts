import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockTargetComponent } from './block-target.component';

describe('BlockTargetComponent', () => {
  let component: BlockTargetComponent;
  let fixture: ComponentFixture<BlockTargetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlockTargetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockTargetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
