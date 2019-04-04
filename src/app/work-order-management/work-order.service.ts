
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { WorkOrder } from './../shared/workorder.model';
import { AppSetting } from './../config/appSetting';
import { HttpClient, HttpHeaders, HttpEvent } from '@angular/common/http';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Customer } from './../shared/customer.model';
import { LeadSettings } from './../shared/lead-settings.model';

@Injectable({
  providedIn: 'root'
})

export class WorkOrderService {
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
  createWorkOrder(row): Observable<any> {
    const addUrl = 'workorder/';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.post<WorkOrder[]>(url, row);
  }
  viewAllWorkOrder(id): Observable<any> {
    const addUrl = 'viewworkorder/';
    const url: string = this.serviceUrl + addUrl + id;
    return this.httpClient.get<WorkOrder[]>(url);
  }
  viewSingleWorkOrder(workid): Observable<any> {
    const addUrl = 'viewsingleworkorder/';
    const url: string = this.serviceUrl + addUrl + workid;
    return this.httpClient.get<WorkOrder[]>(url);
  }
  singleCustomerDetails(id): Observable<any> {
    const addUrl = 'customerdetails/';
    const url: string = this.serviceUrl + addUrl + id;
    return this.httpClient.get<Customer[]>(url);
  }
  workorderPDFDetails(): Observable<any> {
    const addUrl = 'workorderpdfdetails/';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.get<Customer[]>(url);
  }
  updateSingleWorkOrder(row, workid) {
    const addUrl = 'workorder/';
    const url: string = this.serviceUrl + addUrl + workid;
    return this.httpClient.put<WorkOrder>(url, row);
  }
  deleteSingleWorkOrder(workid) {
    const addUrl = 'workorder/';
    const url: string = this.serviceUrl + addUrl + workid;
    return this.httpClient.delete<WorkOrder[]>(url);
  }
  viewCompanyDetails(leadid, workid): Observable<any> {
    const addUrl = 'viewsingleworkorder/';
    const singleUrl = '/single/';
    const url: string = this.serviceUrl + addUrl + leadid + singleUrl + workid;
    return this.httpClient.get<WorkOrder[]>(url);
  }
  allWorkOrder(): Observable<any> {
    const addUrl = 'viewallworkorder';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.get<WorkOrder[]>(url);
  }
  workOrderDateSearch(dateSearch): Observable<any> {
    const addUrl = 'workorderdate';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.post<WorkOrder[]>(url, dateSearch);
  }
  workOrderMonthSearch(dateSearch): Observable<any> {
    const addUrl = 'workordermonth';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.post<WorkOrder[]>(url, dateSearch);
  }
  workOrderWithOutGST(dateSearch): Observable<any> {
    const addUrl = 'workorwithoutgst';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.post<WorkOrder[]>(url, dateSearch);
  }
  workOrderWithGST(dateSearch): Observable<any> {
    const addUrl = 'workorwithgst';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.post<WorkOrder[]>(url, dateSearch);
  }
  leadUnit(): Observable<any> {
    const addUrl = 'leadsources';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.get<LeadSettings[]>(url);
  }
  unitFilter(dateSearch): Observable<any> {
    const addUrl = 'workorderunit';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.post<WorkOrder[]>(url, dateSearch);
  }
}
