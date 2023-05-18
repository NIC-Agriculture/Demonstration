import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageDemonstrationComponent } from './manage-demonstration.component';

describe('ManageDemonstrationComponent', () => {
  let component: ManageDemonstrationComponent;
  let fixture: ComponentFixture<ManageDemonstrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageDemonstrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageDemonstrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
