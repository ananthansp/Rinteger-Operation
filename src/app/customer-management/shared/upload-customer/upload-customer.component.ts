import { Component, OnInit } from '@angular/core';
import { Customer } from './../../customer/create-customer/customer.model';
import { MarketCustomer } from './../../marketcustomer/create-marketcustomer/marketCustomer.model';
import * as XLSX from 'xlsx';
import { CustomerManagementService } from './../../customer-management.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upload-customer',
  templateUrl: './upload-customer.component.html',
  styleUrls: ['./upload-customer.component.css']
})
export class UploadCustomerComponent implements OnInit {
  arrayBuffer: any;
  file: File;
  newCustomer: Customer[];
  newMarketCustomer: MarketCustomer[];
  constructor(private customerManagementService: CustomerManagementService,
     private router: Router) { }

  ngOnInit() {
  }
  uploadCustomer() {
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      this.arrayBuffer = fileReader.result;
      const data = new Uint8Array(this.arrayBuffer);
      const arr = new Array();
      for (let i = 0; i !== data.length; ++i) {
        arr[i] = String.fromCharCode(data[i]);
      }
      const bstr = arr.join('');
      const workbook = XLSX.read(bstr, { type: 'binary' });
      const first_sheet_name = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[first_sheet_name];
      this.newCustomer = XLSX.utils.sheet_to_json(worksheet);
      this.customerManagementService.createNewCustomer(this.newCustomer)
        .subscribe(detail => {
          this.newCustomer = detail;
          this.router.navigate(['customers/viewcustomer']);
          if (detail.length > 0) {
          }
        }, error => {
          console.log(error);
        });
    };
    fileReader.readAsArrayBuffer(this.file);
  }
  uploadInputCustomer(event) {
    this.file = event.target.files[0];
  }
  uploadMarket(event)   {
    this.file = event.target.files[0];
  }
  marketUpload() {
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      this.arrayBuffer = fileReader.result;
      const data = new Uint8Array(this.arrayBuffer);
      const arr = new Array();
      for (let i = 0; i !== data.length; ++i) {
        arr[i] = String.fromCharCode(data[i]);
      }
      const bstr = arr.join('');
      const workbook = XLSX.read(bstr, { type: 'binary' });
      const first_sheet_name = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[first_sheet_name];
      this.newMarketCustomer = XLSX.utils.sheet_to_json(worksheet);
      this.customerManagementService.createNewMulitpleCustomer(this.newMarketCustomer)
        .subscribe(detail => {
          this.newMarketCustomer = detail;
          this.router.navigate(['customers/viewmarket']);
        });
    };
    fileReader.readAsArrayBuffer(this.file);
  }
}
