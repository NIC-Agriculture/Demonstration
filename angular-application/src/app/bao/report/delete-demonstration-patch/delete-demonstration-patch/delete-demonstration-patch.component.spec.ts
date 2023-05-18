import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDemonstrationPatchComponent } from './delete-demonstration-patch.component';

describe('DeleteDemonstrationPatchComponent', () => {
  let component: DeleteDemonstrationPatchComponent;
  let fixture: ComponentFixture<DeleteDemonstrationPatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteDemonstrationPatchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteDemonstrationPatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
