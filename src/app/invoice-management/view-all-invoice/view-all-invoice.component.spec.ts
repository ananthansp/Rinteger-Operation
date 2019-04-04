import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllInvoiceComponent } from './view-all-invoice.component';

describe('ViewAllInvoiceComponent', () => {
  let component: ViewAllInvoiceComponent;
  let fixture: ComponentFixture<ViewAllInvoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewAllInvoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAllInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
