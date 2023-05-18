import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTechnicalnameComponent } from './add-technicalname.component';

describe('AddTechnicalnameComponent', () => {
  let component: AddTechnicalnameComponent;
  let fixture: ComponentFixture<AddTechnicalnameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTechnicalnameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTechnicalnameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
