import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCropvarietyComponent } from './add-cropvariety.component';

describe('AddCropvarietyComponent', () => {
  let component: AddCropvarietyComponent;
  let fixture: ComponentFixture<AddCropvarietyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCropvarietyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCropvarietyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
