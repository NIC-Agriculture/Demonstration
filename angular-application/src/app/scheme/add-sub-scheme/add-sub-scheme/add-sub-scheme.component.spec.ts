import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSubSchemeComponent } from './add-sub-scheme.component';

describe('AddSubSchemeComponent', () => {
  let component: AddSubSchemeComponent;
  let fixture: ComponentFixture<AddSubSchemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSubSchemeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSubSchemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
