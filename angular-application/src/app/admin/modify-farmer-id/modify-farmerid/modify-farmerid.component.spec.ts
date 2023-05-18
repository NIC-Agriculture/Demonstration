import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyFarmeridComponent } from './modify-farmerid.component';

describe('ModifyFarmeridComponent', () => {
  let component: ModifyFarmeridComponent;
  let fixture: ComponentFixture<ModifyFarmeridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyFarmeridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyFarmeridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
