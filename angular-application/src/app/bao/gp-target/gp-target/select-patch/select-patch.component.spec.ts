import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectPatchComponent } from './select-patch.component';

describe('SelectPatchComponent', () => {
  let component: SelectPatchComponent;
  let fixture: ComponentFixture<SelectPatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectPatchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectPatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
