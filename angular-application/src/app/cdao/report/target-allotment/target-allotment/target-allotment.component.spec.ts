import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetAllotmentComponent } from './target-allotment.component';

describe('TargetAllotmentComponent', () => {
  let component: TargetAllotmentComponent;
  let fixture: ComponentFixture<TargetAllotmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TargetAllotmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TargetAllotmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
