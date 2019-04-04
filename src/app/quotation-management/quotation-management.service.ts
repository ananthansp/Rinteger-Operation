import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Quotation } from './../shared/quotation.model';
import { AppSetting } from './../config/appSetting';
import { HttpClient, HttpHeaders, HttpEvent } from '@angular/common/http';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { MatDialog, MatDialogRef } from '@angular/material';
import {Customer} from './../shared/customer.model';
import { Lead } from './../shared/lead.model';


@Injectable({
  providedIn: 'root'
})


export class QuotationManagementService {
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
  constructor(private http: Http, private httpClient: HttpClient,
    private dialog: MatDialog) { }
  /* createCustomer(data: any): Observable<any> {
    const addUrl = 'customers';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.post<Customer[]>(url, data);
  } */
  // all customer details
  createQuotation(row): Observable<any> {
    const addUrl = 'quotation/';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.post<Quotation[]>(url, row);
  }
  viewAllQuotation(id): Observable<any> {
    const addUrl = 'viewquotation/';
    const url: string = this.serviceUrl + addUrl + id;
    return this.httpClient.get<Quotation[]>(url);
  }
  viewSingleQuotation(quoid): Observable<any> {
    const addUrl = 'viewsinglequotation/';
    const url: string = this.serviceUrl + addUrl  + quoid;
    return this.httpClient.get<Quotation[]>(url);
  }
  updateSingleQuotation(row, quoid): Observable<any>    {
    const addUrl = 'quotation/';
    const url: string = this.serviceUrl + addUrl  + quoid;
    return this.httpClient.put<Quotation>(url, row);
  }
  deleteSingleQuotation(quoid): Observable<any>    {
    const addUrl = 'deletequotation/';
    const url: string = this.serviceUrl + addUrl  + quoid;
    return this.httpClient.delete<Quotation[]>(url);
  }
  workorderPDFDetails(): Observable<any> {
    const addUrl = 'workorderpdfdetails/';
    const url: string = this.serviceUrl + addUrl ;
    return this.httpClient.get<Customer[]>(url);
  }
  singleCustomerDetails(id): Observable<any> {
    const addUrl = 'customerdetails/';
    const url: string = this.serviceUrl + addUrl + id ;
    return this.httpClient.get<Customer[]>(url);
  }
  allQuotation(): Observable<any> {
    const addUrl = 'viewallquotation';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.get<Quotation[]>(url);
  }
  singleCustomer(id): Observable<any> {

    const addUrl = 'singlecustomer/';

    const url: string = this.serviceUrl + addUrl + id;
    return this.httpClient.get<Customer[]>(url);
  }
  singleLead(id): Observable<any> {
    const addUrl = 'lead/';
    const url: string = this.serviceUrl + addUrl + id;
    return this.httpClient.get<Lead[]>(url);
  }
  quotationDateSearch(dateSearch): Observable<any> {
    const addUrl = 'quotationdate';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.post<Quotation[]>(url, dateSearch);
  }
  quotationMonthSearch(dateSearch): Observable<any> {
    const addUrl = 'quotationmonth';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.post<Quotation[]>(url, dateSearch);
  }
}
