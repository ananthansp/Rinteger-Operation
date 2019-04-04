
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Lead } from './../shared/lead.model';
import { Customer } from './../shared/customer.model';
import { AppSetting } from './../config/appSetting';
import { HttpClient, HttpHeaders, HttpEvent } from '@angular/common/http';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Invoice } from './../shared/invoice.model';
import { WorkOrder } from './../shared/workorder.model';
import { Quotation } from './../shared/quotation.model';
import { ProformaInvoice } from './../shared/proformaInvoice.model';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  serviceUrl: string = AppSetting.serviceUrl;
  headers: Headers = new Headers({
    'Content-Type': 'application/json; charset=utf-8'
  });

  requestOptions: RequestOptions = new RequestOptions({ headers: this.headers });

  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.log(error); // log to console instead
      // TODO: better job of transforming error for user consumption
      // this.log(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  constructor(private http: Http, private httpClient: HttpClient) { }
  /* createCustomer(data: any): Observable<any> {
    const addUrl = 'customers';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.post<Customer[]>(url, data);
  } */
  // all customer details
  allCustomers(): Observable<any> {
    const addUrl = 'viewcustomer';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.get<Customer[]>(url);
  }
  allLead(): Observable<any> {
    const addUrl = 'viewleads';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.get<Lead[]>(url);
  }
  allAllInvoice(): Observable<any> {
    const addUrl = 'viewallinvoice';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.get<Invoice[]>(url);
  }
  allAllQutotation(): Observable<any> {
    const addUrl = 'viewallqutotation';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.get<Quotation[]>(url);
  }
  allAllProfomaInvoice(): Observable<any> {
    const addUrl = 'viewallprofomainvoice';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.get<ProformaInvoice[]>(url);
  }
  allWorkOrder(): Observable<any> {
    const addUrl = 'viewallworkorder';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.get<WorkOrder[]>(url);
  }
  allQuotation(): Observable<any> {
    const addUrl = 'viewallquotation';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.get<Quotation[]>(url);
  }
  viewAllInvoice(id): Observable<any> {
    const addUrl = 'viewinvoice/';
    const url: string = this.serviceUrl + addUrl + id;
    return this.httpClient.get<Invoice[]>(url);
  }
  workOrderTotalAmount(): Observable<any>    {
    const addUrl = 'allworkordertotal/';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.get<Invoice[]>(url);

  }
}
