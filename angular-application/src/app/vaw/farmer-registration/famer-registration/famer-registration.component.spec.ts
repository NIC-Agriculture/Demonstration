import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamerRegistrationComponent } from './famer-registration.component';

describe('FamerRegistrationComponent', () => {
  let component: FamerRegistrationComponent;
  let fixture: ComponentFixture<FamerRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FamerRegistrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FamerRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
