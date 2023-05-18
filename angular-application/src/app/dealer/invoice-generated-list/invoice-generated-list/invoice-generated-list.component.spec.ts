import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceGeneratedListComponent } from './invoice-generated-list.component';

describe('InvoiceGeneratedListComponent', () => {
  let component: InvoiceGeneratedListComponent;
  let fixture: ComponentFixture<InvoiceGeneratedListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoiceGeneratedListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceGeneratedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
