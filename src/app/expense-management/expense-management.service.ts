import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Expense } from './../shared/expense.model';
import { AppSetting } from './../config/appSetting';
import { HttpClient, HttpHeaders, HttpEvent } from '@angular/common/http';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { MatDialog, MatDialogRef } from '@angular/material';
import { CreateExpenseComponent } from './create-expense/create-expense.component';

@Injectable({
  providedIn: 'root'
})
export class ExpenseManagementService {
  dialogRefCusomer: MatDialogRef<CreateExpenseComponent>;
  serviceUrl: string = AppSetting.serviceUrl;
  headers: Headers = new Headers({
    'Content-Type': 'application/json; charset=utf-8'
  });
  constructor(private http: Http, private httpClient: HttpClient, private dialog: MatDialog) { }
  allExpense(): Observable<any> {
    const addUrl = 'findallexpense';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.get<Expense[]>(url);
  }
  addSingleExpense(data: any): Observable<any> {
    const addUrl = 'createexpense';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.post<Expense[]>(url, data);
  } 
  editExpense(edit): Observable<any> {
    const addUrl = 'editexpense/';
    const url: string = this.serviceUrl + addUrl + edit._id;
    return this.httpClient.put<Expense[]>(url, edit);
  }
  deleteExpense(edit): Observable<any> {
    const addUrl = 'deleteexpense/';
    const url: string = this.serviceUrl + addUrl + edit._id;
    return this.httpClient.delete<Expense[]>(url);
  }
  singleExpense(id): Observable<any> {
    const addUrl = 'singleexpense/';
    const url: string = this.serviceUrl + addUrl + id;
    return this.httpClient.get<Expense[]>(url);
  }  
  typeFilter(data):Observable<any>{
    const addUrl = 'typefilter';
    const url: string = this.serviceUrl + addUrl ;
    return this.httpClient.post<Expense[]>(url, data);
  }
  dateFilter(data):Observable<any>{
    const addUrl = 'datefilter/';
    const url: string = this.serviceUrl + addUrl  ;
    return this.httpClient.post<Expense[]>(url, data);
  }
  tdsFind(): Observable<any> {
    const addUrl ='tdsfind';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.get<Expense[]>(url);
  }
  gstFind(): Observable<any> {
    const addUrl = 'gstfind';
    const url:string = this.serviceUrl + addUrl;
    return this.httpClient.get<Expense[]>(url);
  } 
  allsttExpense(): Observable<any> {
    const addUrl = 'expense';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.get<Expense[]>(url);
  } 
  allsttPayment(): Observable<any> {
    const addUrl = 'expense';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.get<Expense[]>(url);
  } 
  allsttGst(): Observable<any> {
    const addUrl = 'expense';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.get<Expense[]>(url);
  } 
}
