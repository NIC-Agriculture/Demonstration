import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LightTrapComponent } from './light-trap.component';

describe('LightTrapComponent', () => {
  let component: LightTrapComponent;
  let fixture: ComponentFixture<LightTrapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LightTrapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LightTrapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
