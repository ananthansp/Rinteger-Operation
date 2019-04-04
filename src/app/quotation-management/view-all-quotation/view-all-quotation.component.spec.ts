import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllQuotationComponent } from './view-all-quotation.component';

describe('ViewAllQuotationComponent', () => {
  let component: ViewAllQuotationComponent;
  let fixture: ComponentFixture<ViewAllQuotationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewAllQuotationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAllQuotationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
