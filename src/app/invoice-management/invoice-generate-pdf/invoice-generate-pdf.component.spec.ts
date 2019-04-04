import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceGeneratePdfComponent } from './invoice-generate-pdf.component';

describe('InvoiceGeneratePdfComponent', () => {
  let component: InvoiceGeneratePdfComponent;
  let fixture: ComponentFixture<InvoiceGeneratePdfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoiceGeneratePdfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceGeneratePdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
