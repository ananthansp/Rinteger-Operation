import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Lead } from './../shared/lead.model';
import { WorkOrder } from './../shared/workorder.model';
import { Quotation } from './../shared/quotation.model';
import { Customer } from './../shared/customer.model';
import { AppSetting } from './../config/appSetting';
import { HttpClient, HttpHeaders, HttpEvent } from '@angular/common/http';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { MatDialog, MatDialogRef } from '@angular/material';
import { LeadAddComponent } from './lead-add/lead-add.component';
import { LeadSettings } from '../shared/lead-settings.model';


@Injectable({
  providedIn: 'root'
})
export class LeadManagementService {
  serviceUrl: string = AppSetting.serviceUrl;
  headers: Headers = new Headers({
    'Content-Type': 'application/json; charset=utf-8'
  });
  dialogRef: MatDialogRef<LeadAddComponent>;
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
  allLead(): Observable<any> {
    const addUrl = 'viewleads';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.get<Lead[]>(url);
  }
  viewLead(id): Observable<any> {
    const addUrl = 'lead/';
    const url: string = this.serviceUrl + addUrl + id;
    return this.httpClient.get<Lead[]>(url);
  }
  addSingleLead(data: any): Observable<any> {
    const addUrl = 'addlead';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.post<Lead[]>(url, data);
  }
  editLead(edit, id): Observable<any> {
    const addUrl = 'leads/';
    const url: string = this.serviceUrl + addUrl + id;
    return this.httpClient.put<Lead[]>(url, edit);
  }
  addRequirements( id, data): Observable<any> {
    const addUrl = 'requirements/';
    const url: string = this.serviceUrl + addUrl + id ;
    return this.httpClient.put<Lead[]>(url, data);
  }
  addFollowUp( id, data): Observable<any> {
    const addUrl = 'followup/';
    const url: string = this.serviceUrl + addUrl + id ;
    return this.httpClient.put<Lead[]>(url, data);
  }
  editFollowUp( id, data): Observable<any> {
    const addUrl = 'followup/';
    const url: string = this.serviceUrl + addUrl + id ;
    return this.httpClient.put<Lead[]>(url, data);
  }
  editRequirements( id, data): Observable<any> {
    const addUrl = 'leads/';
    const addUrl1 = '/requirements/';
    const url: string = this.serviceUrl + addUrl + id + addUrl1 + data._id;
    return this.httpClient.put<Lead[]>(url, data);
  }
  editFollowUps( id, data): Observable<any> {
    const addUrl = 'leads/';
    const addUrl1 = '/followup/';
    const url: string = this.serviceUrl + addUrl + id + addUrl1 + data._id;
    return this.httpClient.put<Lead[]>(url, data);
  }
  singleLead(id): Observable<any> {
    const addUrl = 'lead/';
    const url: string = this.serviceUrl + addUrl + id;
    return this.httpClient.get<Lead[]>(url);
  }
  deleteLead(edit): Observable<any> {

    const addUrl = 'leads/';

    const url: string = this.serviceUrl + addUrl + edit._id;
    return this.httpClient.delete<Lead[]>(url);
  }
  deleteLeadRequirements(id, reqID): Observable<any> {

    const addUrl = 'lead/';
    const addUrl1 = '/requirements/';

    const url: string = this.serviceUrl + addUrl + id + addUrl1 + reqID;
    return this.httpClient.delete<Lead[]>(url);
  }
  deleteFollowUps(id, reqID): Observable<any> {

    const addUrl = 'lead/';
    const addUrl1 = '/followup/';

    const url: string = this.serviceUrl + addUrl + id + addUrl1 + reqID;
    return this.httpClient.delete<Lead[]>(url);
  }
  checkWorkOrder(check): Observable<any> {
    const addUrl = 'checkcustomers/';
    const url: string = this.serviceUrl + addUrl + check.mobileNumber;
    return this.httpClient.get<Customer[]>(url);
  }
  leadSource(): Observable<any> {
    const addUrl = 'leadsources';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.get<LeadSettings[]>(url);
  }
  viewAllWorkOrder(id): Observable<any> {
    const addUrl = 'viewworkorder/';
    const url: string = this.serviceUrl + addUrl + id;
    return this.httpClient.get<WorkOrder[]>(url);
  }
  viewAllQuotation(id): Observable<any> {
    const addUrl = 'viewquotation/';
    const url: string = this.serviceUrl + addUrl + id;
    return this.httpClient.get<Quotation[]>(url);
  }
  allCustomer(): Observable<any> {
    const addUrl = 'viewcustomer';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.get<Customer[]>(url);
  }
  leadDateSearch(dateSearch): Observable<any> {
    const addUrl = 'leaddate';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.post<Lead[]>(url, dateSearch);
  }
  leadMonthSearch(dateSearch): Observable<any> {
    const addUrl = 'leadmonth';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.post<Lead[]>(url, dateSearch);
  }
}
