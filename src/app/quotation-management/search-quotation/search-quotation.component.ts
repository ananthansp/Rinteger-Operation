
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Quotation } from './../../shared/quotation.model';
@Component({
  selector: 'app-search-quotation',
  templateUrl: './search-quotation.component.html',
  styleUrls: ['./search-quotation.component.css']
})
export class SearchQuotationComponent implements OnInit {
  searchType = ['MobileNumber', 'Customer Name'];
  quotationDetailsForm: FormGroup;
  @Input() quotationModel: Quotation;
  @Output() searchQuotation = new EventEmitter<any>();
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.quotationDetailsForm = this.fb.group({
      srchterm: [''],
    });
  }
  searchBy(quotationData, selectType, filter) {
    switch (selectType) {
      case 'Customer Name': {
        const filterData = quotationData.filter(data => data.customerName.toUpperCase().indexOf(filter.toUpperCase()) > -1);
        this.searchQuotation.emit(filterData);
        break;
      }
      case 'MobileNumber': {
        quotationData.forEach(data => {
          if (!data.mobileNumber) {
            data.mobileNumber = '';
          }
        });
        const filterData = quotationData.filter(data =>
          data.mobileNumber.toString().indexOf(filter.toString()) > -1);
        this.searchQuotation.emit(filterData);
        break;
      }
      case 'EmailId': {
        quotationData.forEach(data => {
          if (!data.emailId) {
            data.emailId = '';
          }
        });
        const filterData = quotationData.filter(data =>
          data.emailId.toUpperCase().indexOf(filter.toUpperCase()) > -1);
        this.searchQuotation.emit(filterData);
        break;
      }
      case 'City': {
        quotationData.forEach(data => {
          if (!data.city) {
            data.city = '';
          }
        });
        const filterData = quotationData.filter(data =>
          data.city.toUpperCase().indexOf(filter.toUpperCase()) > -1);
        this.searchQuotation.emit(filterData);
        break;
      }
      case 'Location': {
        quotationData.forEach(data => {
          if (!data.location) {
            data.location = '';
          }
        });
        const filterData = quotationData.filter(data =>
          data.location.toUpperCase().indexOf(filter.toUpperCase()) > -1);
        this.searchQuotation.emit(filterData);
        break;
      }
    }
  }
}
