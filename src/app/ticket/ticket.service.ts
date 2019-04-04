import { Injectable } from '@angular/core';
import { TicketModel } from './ticket/ticket.Model';
import { HttpClient } from '@angular/common/http';
import { AppSetting } from './../config/appSetting';
import { Observable } from 'rxjs';
import { Customer } from './../customer-management/customer/create-customer/customer.model';
import {Register} from './../user-management/registration/register.model';
@Injectable({
  providedIn: 'root'
})
export class TicketService {
  ticketholder: TicketModel[];
  baseurl = AppSetting.serviceUrl;
  constructor(private http: HttpClient) { }


  getfieldValue(ticketholder): Observable<any> {
    const urlway = this.baseurl + 'createticket';

    return this.http.post<TicketModel>(urlway, ticketholder);
  }

  retriveTicket(): Observable<any> {
    const urlway = this.baseurl + 'retriveticket';

    return this.http.get<TicketModel[]>(urlway);
  }

  getDepartment(): Observable<any> {
    const urlway = this.baseurl + 'departments';

    return this.http.get<TicketModel[]>(urlway);
  }


  uniqTicket(id): Observable<TicketModel[]> {
    const urlway = this.baseurl + 'unique/' + id;
    return this.http.get<TicketModel[]>(urlway);
  }

  allCustomer(): Observable<any> {
    const addUrl = 'viewcustomer';
    const url: string = this.baseurl + addUrl;
    return this.http.get<Customer[]>(url);
  }

  getunitwiseTicket(name): Observable<TicketModel[]> {
    const urlway = this.baseurl + 'unitwiseticket/' + name;

    return this.http.get<TicketModel[]>(urlway);
  }

  deadlinedTicket(): Observable<TicketModel[]> {
    const urlway = this.baseurl + 'deadlinedTicket';

    return this.http.get<TicketModel[]>(urlway);
  }


  getAllRegisteres(): Observable<Register[]> {
    const urlway = this.baseurl + 'allregister';

    return this.http.get<Register[]>(urlway);
  }

  compareUserId(data): Observable<TicketModel[]> {
    const urlway = this.baseurl + 'logerTicket/' + data;

    return this.http.get<TicketModel[]>(urlway);
  }


  updateTicket(data): Observable<any> {
    const url: string = this.baseurl  + 'editTicket/' + data._id;
    return this.http.put<any[]>(url, data);
  }


  deleteTicket(data): Observable<any> {
    const url: string = this.baseurl  + 'deleteTicket/' + data;
    return this.http.delete<any[]>(url);
  }
}
