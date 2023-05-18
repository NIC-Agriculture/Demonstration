import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateDemonstrationComponent } from './generate-demonstration.component';

describe('GenerateDemonstrationComponent', () => {
  let component: GenerateDemonstrationComponent;
  let fixture: ComponentFixture<GenerateDemonstrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerateDemonstrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateDemonstrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
