
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Invoice } from './../../shared/invoice.model';
@Component({
  selector: 'app-search-invoice',
  templateUrl: './search-invoice.component.html',
  styleUrls: ['./search-invoice.component.css']
})
export class SearchInvoiceComponent implements OnInit {
  searchType = ['MobileNumber', 'Customer Name'];
  invoiceDetailsForm: FormGroup;
  @Input() invoiceModel: Invoice;
  @Output() searchInvoice = new EventEmitter<any>();
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.invoiceDetailsForm = this.fb.group({
      srchterm: [''],
    });
  }
  searchBy(invoiceData, selectType, filter) {
    switch (selectType) {
      case 'Customer Name': {
        const filterData = invoiceData.filter(data => data.customerName.toUpperCase().indexOf(filter.toUpperCase()) > -1);
        this.searchInvoice.emit(filterData);
        break;
      }
      case 'MobileNumber': {
        invoiceData.forEach(data => {
          if (!data.mobileNumber) {
            data.mobileNumber = '';
          }
        });
        const filterData = invoiceData.filter(data =>
          data.mobileNumber.toString().indexOf(filter.toString()) > -1);
        this.searchInvoice.emit(filterData);
        break;
      }
      case 'EmailId': {
        invoiceData.forEach(data => {
          if (!data.emailId) {
            data.emailId = '';
          }
        });
        const filterData = invoiceData.filter(data =>
          data.emailId.toUpperCase().indexOf(filter.toUpperCase()) > -1);
        this.searchInvoice.emit(filterData);
        break;
      }
      case 'City': {
        invoiceData.forEach(data => {
          if (!data.city) {
            data.city = '';
          }
        });
        const filterData = invoiceData.filter(data =>
          data.city.toUpperCase().indexOf(filter.toUpperCase()) > -1);
        this.searchInvoice.emit(filterData);
        break;
      }
      case 'Location': {
        invoiceData.forEach(data => {
          if (!data.location) {
            data.location = '';
          }
        });
        const filterData = invoiceData.filter(data =>
          data.location.toUpperCase().indexOf(filter.toUpperCase()) > -1);
        this.searchInvoice.emit(filterData);
        break;
      }
    }
  }
}
