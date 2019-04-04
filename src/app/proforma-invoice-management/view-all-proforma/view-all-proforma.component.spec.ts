import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllProformaComponent } from './view-all-proforma.component';

describe('ViewAllProformaComponent', () => {
  let component: ViewAllProformaComponent;
  let fixture: ComponentFixture<ViewAllProformaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewAllProformaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAllProformaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
