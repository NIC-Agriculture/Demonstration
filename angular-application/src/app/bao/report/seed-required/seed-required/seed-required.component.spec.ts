import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeedRequiredComponent } from './seed-required.component';

describe('SeedRequiredComponent', () => {
  let component: SeedRequiredComponent;
  let fixture: ComponentFixture<SeedRequiredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeedRequiredComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeedRequiredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
