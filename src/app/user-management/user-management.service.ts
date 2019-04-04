import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AppSetting } from './../config/appSetting';
import { HttpClient } from '@angular/common/http';
import { Register } from './registration/register.model';
import {  UserPermission } from './../shared/userPermission.model';
import {  LeadSettings } from './../shared/lead-settings.model';


@Injectable({
  providedIn: 'root'
})
export class UserManagementService {
  serviceUrl: string = AppSetting.serviceUrl;
  constructor(private httpClient: HttpClient) { }
  registration(data: Register) {
    const addUrl = 'register';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.post<Register>(url, data);
  }
  allRegister(): Observable<any> {
    const addUrl = 'allregister';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.get<Register[]>(url);
  }
  permissionUsers(data: UserPermission): Observable<any> {
    const addUrl = 'createrole';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.post<UserPermission>(url, data);
  }
  leadSource(): Observable<any> {
    const addUrl = 'leadsources';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.get<LeadSettings[]>(url);
  }
  permissionRole(): Observable<any>  {
    const addUrl = 'allroles';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.get<UserPermission[]>(url);
  }
}
