import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetAlertmentComponent } from './target-alertment.component';

describe('TargetAlertmentComponent', () => {
  let component: TargetAlertmentComponent;
  let fixture: ComponentFixture<TargetAlertmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TargetAlertmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TargetAlertmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
