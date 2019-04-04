import { Injectable } from '@angular/core';
import { IncomeModel } from './../shared/income.model';
import { AppSetting } from './../config/appSetting';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IncomeSetting } from './../shared/income-setting.model';
@Injectable({
  providedIn: 'root'
})
export class IncomeManagementService {
  serviceUrl: string = AppSetting.serviceUrl;
  constructor(private httpClient: HttpClient) { }
  getByDate(data): Observable<any> {
    const addUrl = 'findbydate';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.post<IncomeModel[]>(url, data);
  }
  getFindAll(): Observable<any> {
    const addUrl = 'findall';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.get<IncomeModel[]>(url);
  }
  getFindAllwork(): Observable<any> {
    const addUrl = 'findallwork';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.get<IncomeModel[]>(url);
  }
  EditIncome(data): Observable<any> {
    const addUrl = 'editincome/';
    const url: string = this.serviceUrl + addUrl + data._id;
    return this.httpClient.put<IncomeModel[]>(url, data);
  }
  DeleteIncome(data): Observable<any> {
    const addUrl = 'delete/';
    const url: string = this.serviceUrl + addUrl + data._id;
    return this.httpClient.delete<IncomeModel[]>(url);
  }
  DeleteIncomeSheet(data): Observable<any> {
    const addUrl = 'deleteincome/';
    const url: string = this.serviceUrl + addUrl + data._id;
    return this.httpClient.delete<IncomeModel[]>(url);
  }
  EditIncomeSheet(data): Observable<any> {
    const addUrl = 'editincomesheet/';
    const url: string = this.serviceUrl + addUrl + data._id;
    return this.httpClient.put<IncomeModel[]>(url, data);
  }
  getincomesetting(): Observable<any> {
    const addUrl = 'viewincomepaymentmode';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.get<IncomeSetting[]>(url);
  }

  getTDS(): Observable<any> {
    const addUrl = 'findtds';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.get<IncomeModel[]>(url);
  }
}
