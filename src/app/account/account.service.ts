import { Injectable } from '@angular/core';
import { LogIn } from './login/login.model';
import { Observable, of } from 'rxjs';
import { AppSetting } from './../config/appSetting';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  serviceUrl: string = AppSetting.serviceUrl;
  constructor(private httpClient: HttpClient) { }

  logIn(data: LogIn): Observable<any> {
    const addUrl = 'admin/validate';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.post<LogIn>(url, data);
  }
}
