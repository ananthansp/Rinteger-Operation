
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ProformaInvoice } from './../shared/proformaInvoice.model';
import { AppSetting } from './../config/appSetting';
import { HttpClient, HttpHeaders, HttpEvent } from '@angular/common/http';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Customer} from '../shared/customer.model';
import { WorkOrder } from './../shared/workorder.model';

@Injectable({
  providedIn: 'root'
})


export class ProformaInvoiceService {
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
  createProformaInvoice(row): Observable<any> {
    const addUrl = 'proforma/';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.post<ProformaInvoice[]>(url, row);
  }
  viewAllProformaInvoice(id): Observable<any> {
    const addUrl = 'viewproforma/';
    const url: string = this.serviceUrl + addUrl + id;
    return this.httpClient.get<ProformaInvoice[]>(url);
  }
  viewSingleProformaInvoice(pinvid): Observable<any> {
    const addUrl = 'viewsingleproforma/';
    const url: string = this.serviceUrl + addUrl + pinvid;
    return this.httpClient.get<ProformaInvoice[]>(url);
  }
  deleteSingleProformaInvoice(pinvid): Observable<any>    {
    const addUrl = 'proforma/';
    const url: string = this.serviceUrl + addUrl + pinvid;
    return this.httpClient.delete<ProformaInvoice[]>(url);
  }
  updateSingleProfomaInvoice(row,  id): Observable<any>   {
    const addUrl = 'profomainvoice/';
    const url: string = this.serviceUrl + addUrl + id;
    return this.httpClient.put<ProformaInvoice[]>(url, row);
  }
  workorderPDFDetails(): Observable<any> {
    const addUrl = 'workorderpdfdetails/';
    const url: string = this.serviceUrl + addUrl ;
    return this.httpClient.get<Customer[]>(url);
  }
  allAllProfomaInvoice(): Observable<any> {
    const addUrl = 'viewallprofomainvoice';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.get<ProformaInvoice[]>(url);
  }
  singleCustomerDetails(id): Observable<any> {
    const addUrl = 'customerdetails/';
    const url: string = this.serviceUrl + addUrl + id ;
    return this.httpClient.get<Customer[]>(url);
  }
  viewSingleWorkOrder(workid): Observable<any> {
    const addUrl = 'viewsingleworkorder/';
    const url: string = this.serviceUrl + addUrl  + workid;
    return this.httpClient.get<WorkOrder[]>(url);
  }
  proformaInvoiceDateSearch(dateSearch): Observable<any> {
    const addUrl = 'profomadate';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.post<ProformaInvoice[]>(url, dateSearch);
  }
  proformaInvoiceMonthSearch(dateSearch): Observable<any> {
    const addUrl = 'profomamonth';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.post<ProformaInvoice[]>(url, dateSearch);
  }
}
