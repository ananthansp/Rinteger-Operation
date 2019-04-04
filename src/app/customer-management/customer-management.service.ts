import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Customer } from './../customer-management/customer/create-customer/customer.model';
import { MarketCustomer } from './../customer-management/marketcustomer/create-marketcustomer/marketCustomer.model';
import { AppSetting } from './../config/appSetting';
import { HttpClient, HttpHeaders, HttpEvent } from '@angular/common/http';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { MatDialog, MatDialogRef } from '@angular/material';
import { CreateCustomerComponent } from './customer/create-customer/create-customer.component';
import { LogIn  } from './../shared/login.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerManagementService {
  dialogRefCusomer: MatDialogRef<CreateCustomerComponent>;
  serviceUrl: string = AppSetting.serviceUrl;
  headers: Headers = new Headers({
    'Content-Type': 'application/json; charset=utf-8'
  });
  constructor(private http: Http, private httpClient: HttpClient, private dialog: MatDialog) { }
  allCustomer(): Observable<any> {
    const addUrl = 'viewcustomer';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.get<Customer[]>(url);
  }
  addSingleCustomer(data: any): Observable<any> {
    const addUrl = 'addcustomer';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.post<Customer[]>(url, data);
  }
  workorderPDFDetails(): Observable<any> {
    const addUrl = 'workorderpdfdetails/';
    const url: string = this.serviceUrl + addUrl ;
    return this.httpClient.get<Customer[]>(url);
  }
  editCustomer(edit): Observable<any> {
    const addUrl = 'customer/';
    const url: string = this.serviceUrl + addUrl + edit._id;
    return this.httpClient.put<Customer[]>(url, edit);
  }
  deleteCustomer(edit): Observable<any> {

    const addUrl = 'customer/';

    const url: string = this.serviceUrl + addUrl + edit._id;
    return this.httpClient.delete<Customer[]>(url);
  }
  singleCustomer(id): Observable<any> {

    const addUrl = 'singlecustomer/';

    const url: string = this.serviceUrl + addUrl + id;
    return this.httpClient.get<Customer[]>(url);
  }
  createNewCustomer(customer): Observable<any>   {
    const addUrl = 'multiplecustomertest';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.post<Customer[]>(url, customer);
  }
  /* openCustomer(data: Customer): Observable<boolean> {
    this.dialogRefCusomer = this.dialog.open(CreateCustomerComponent,
       { disableClose: true, backdropClass: 'light-backdrop',
      data: data
    });
    return this.dialogRefCusomer.afterClosed();
  }
  closeCustomer() {
    if (this.dialogRefCusomer) {
      this.dialogRefCusomer.close();
    }
  } */
  logIn(data: LogIn): Observable<any> {
    const addUrl = 'admin/validate';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.post<LogIn>(url, data);
  }

  allMarketCustomer(): Observable<any> {
    const addUrl = 'allmarketcustomers';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.get<MarketCustomer[]>(url);
  }
  addSingleMarketCustomer(data: any): Observable<any> {
    const addUrl = 'singlemarketcustomers';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.post<MarketCustomer[]>(url, data);
  }
 /*  workorderPDFDetails(): Observable<any> {
    const addUrl = 'workorderpdfdetails/';
    const url: string = this.serviceUrl + addUrl ;
    return this.httpClient.get<MarketDB[]>(url);
  } */
  editMarketCustomer(edit): Observable<any> {
    const addUrl = 'marketcustomers/';
    const url: string = this.serviceUrl + addUrl + edit._id;
    return this.httpClient.put<MarketCustomer[]>(url, edit);
  }
  deleteMarketCustomer(edit): Observable<any> {

    const addUrl = 'marketcustomersdelete/';

    const url: string = this.serviceUrl + addUrl + edit._id;
    return this.httpClient.delete<MarketCustomer[]>(url);
  }
  createNewMulitpleCustomer(customer): Observable<any>   {
    const addUrl = 'marketcustomers';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.post<Customer[]>(url, customer);
  }
  allSubscribeCustomer(): Observable<any> {
    const addUrl = 'subscribedcustomers';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.get<Customer[]>(url);
  }

  deleteSubscribeCustomer(row): Observable<any> {

    const addUrl = 'subscribednumber/';

    const url: string = this.serviceUrl + addUrl + row._id;
    return this.httpClient.delete<Customer[]>(url);
  }

}
