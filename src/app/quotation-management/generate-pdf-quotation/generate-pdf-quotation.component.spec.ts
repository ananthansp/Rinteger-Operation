import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneratePdfQuotationComponent } from './generate-pdf-quotation.component';

describe('GeneratePdfQuotationComponent', () => {
  let component: GeneratePdfQuotationComponent;
  let fixture: ComponentFixture<GeneratePdfQuotationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneratePdfQuotationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneratePdfQuotationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
