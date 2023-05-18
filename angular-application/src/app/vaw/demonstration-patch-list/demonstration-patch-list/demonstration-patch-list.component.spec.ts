import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemonstrationPatchListComponent } from './demonstration-patch-list.component';

describe('DemonstrationPatchListComponent', () => {
  let component: DemonstrationPatchListComponent;
  let fixture: ComponentFixture<DemonstrationPatchListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemonstrationPatchListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemonstrationPatchListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
