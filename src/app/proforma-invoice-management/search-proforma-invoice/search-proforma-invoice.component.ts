
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProformaInvoice } from './../../shared/proformaInvoice.model';
@Component({
  selector: 'app-search-proforma-invoice',
  templateUrl: './search-proforma-invoice.component.html',
  styleUrls: ['./search-proforma-invoice.component.css']
})
export class SearchProformaInvoiceComponent implements OnInit {
  searchType = ['MobileNumber', 'Company Name'];
  proformaDetailsForm: FormGroup;
  @Input() proformaInvoiceModel: ProformaInvoice;
  @Output() searchProformaInvoice = new EventEmitter<any>();
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.proformaDetailsForm = this.fb.group({
      srchterm: [''],
    });
  }
  searchBy(proformaInvoiceData, selectType, filter) {
    switch (selectType) {
      case 'Company Name': {
        const filterData = proformaInvoiceData.filter(data => data.companyName.toUpperCase().indexOf(filter.toUpperCase()) > -1);
        this.searchProformaInvoice.emit(filterData);
        break;
      }
      case 'MobileNumber': {
        proformaInvoiceData.forEach(data => {
          if (!data.mobileNumber) {
            data.mobileNumber = '';
          }
        });
        const filterData = proformaInvoiceData.filter(data =>
          data.mobileNumber.toString().indexOf(filter.toString()) > -1);
        this.searchProformaInvoice.emit(filterData);
        break;
      }
      case 'EmailId': {
        proformaInvoiceData.forEach(data => {
          if (!data.emailId) {
            data.emailId = '';
          }
        });
        const filterData = proformaInvoiceData.filter(data =>
          data.emailId.toUpperCase().indexOf(filter.toUpperCase()) > -1);
        this.searchProformaInvoice.emit(filterData);
        break;
      }
      case 'City': {
        proformaInvoiceData.forEach(data => {
          if (!data.city) {
            data.city = '';
          }
        });
        const filterData = proformaInvoiceData.filter(data =>
          data.city.toUpperCase().indexOf(filter.toUpperCase()) > -1);
        this.searchProformaInvoice.emit(filterData);
        break;
      }
      case 'Location': {
        proformaInvoiceData.forEach(data => {
          if (!data.location) {
            data.location = '';
          }
        });
        const filterData = proformaInvoiceData.filter(data =>
          data.location.toUpperCase().indexOf(filter.toUpperCase()) > -1);
        this.searchProformaInvoice.emit(filterData);
        break;
      }
    }
  }
}
