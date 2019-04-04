import { Injectable } from '@angular/core';
import { MaterialModel } from '../shared/material-management.model';
import { AppSetting } from './../config/appSetting';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MaterialManagementService {
  serviceUrl: string = AppSetting.serviceUrl;
  constructor(private httpClient: HttpClient) { }
  createMaterial(data): Observable<any> {
    const addUrl = 'creatematerial';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.post<MaterialModel[]>(url, data);
  }
  getAllMaterial(): Observable<any> {
    const addUrl = 'findAllMaterial';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.get<MaterialModel[]>(url);
  }
  getSingleMaterial(id): Observable<any> {
    const addUrl = 'findSingleMaterial/';
    const url: string = this.serviceUrl + addUrl + id;
    return this.httpClient.get<MaterialModel[]>(url);
  }
  getUpdateMaterial(data, id): Observable<any> {
    const addUrl = 'updateMaterial/';
    const url: string = this.serviceUrl + addUrl + id;
    return this.httpClient.put<MaterialModel[]>(url, data);
  }
  getAllWorkOrider(): Observable<any> {
    const addUrl = 'findallworkorder';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.get<MaterialModel[]>(url);
  }
  deleteMaterial(data): Observable<any> {
    const addUrl = 'deletematerial/';
    const url: string = this.serviceUrl + addUrl + data._id;
    return this.httpClient.delete<MaterialModel[]>(url);
  }
  deleteWorkorder(data): Observable<any> {
    const addUrl = 'deleteworkorder/';
    const url: string = this.serviceUrl + addUrl + data._id;
    return this.httpClient.delete<MaterialModel[]>(url);
  }
  getByDate(data): Observable<any> {
    const addUrl = 'findbydate';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.post<MaterialModel[]>(url, data);
  }
  getByDateMaterial(data): Observable<any> {
    const addUrl = 'findbydatematerial';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.post<MaterialModel[]>(url, data);
  }
  getByDateSingleMaterial(data): Observable<any> {
    const addUrl = 'findbydatesinglematerial';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.post<MaterialModel[]>(url, data);
  }
  shootStatus(data): Observable<any> {
    const addUrl = 'shootingstatus';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.post<MaterialModel[]>(url, data);
  }
  paymentStatus(data): Observable<any> {
    const addUrl = 'paymentstatus';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.post<MaterialModel[]>(url, data);
  }
  getMaterialSetting(): Observable<any> {
    const addUrl = 'getmaterial';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.get<MaterialModel[]>(url);
  }
  shootType(data): Observable<any> {
    const addUrl = 'shoottype';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.post<MaterialModel[]>(url, data);
  }
  dispatchType(data): Observable<any> {
    const addUrl = 'dipatchtype';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.post<MaterialModel[]>(url, data);
  }
  materialStatus(data): Observable<any> {
    const addUrl = 'materialstatus';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.post<MaterialModel[]>(url, data);
  }
  getPaymentStatus(id): Observable<any> {
    const addUrl = 'findpaymentstatus/';
    const url: string = this.serviceUrl + addUrl + id;
    return this.httpClient.get<MaterialModel[]>(url);
  }
}
