import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemonstrationWiseDetailsComponent } from './demonstration-wise-details.component';

describe('DemonstrationWiseDetailsComponent', () => {
  let component: DemonstrationWiseDetailsComponent;
  let fixture: ComponentFixture<DemonstrationWiseDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemonstrationWiseDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemonstrationWiseDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
