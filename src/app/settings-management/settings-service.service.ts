
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AppSetting } from './../config/appSetting';
import { HttpClient, HttpHeaders, HttpEvent } from '@angular/common/http';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { LeadSettings } from './../shared/lead-settings.model';
import { WorkOrderPdf } from './../shared/workorderpdf.model';
import { BankDetails } from './../shared/bankdetails.model';
import { ExpenseSetting } from './../shared/expense-settings.model';
import { TicketsettingsModel } from './ticket-setting/ticket-settings.model';
import { IncomeSetting } from '../shared/income-setting.model';
import { MaterialSetting } from '../shared/material-settings.model';
import { TasksettingsModel } from '../shared/task-setting.module';
@Injectable({
  providedIn: 'root'
})
export class SettingsServiceService {
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
  constructor(private http: Http, private httpClient: HttpClient
  ) { }

  addLeadSource(data: any): Observable<any> {
    const addUrl = 'leadsource';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.post<LeadSettings[]>(url, data);
  }
  addLeadService(data: any): Observable<any> {
    const addUrl = 'services';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.post<LeadSettings[]>(url, data);
  }
  addLeadStatus(data: any): Observable<any> {
    const addUrl = 'leadstatus';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.post<LeadSettings[]>(url, data);
  }
  addLeadType(data: any): Observable<any> {
    const addUrl = 'type';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.post<LeadSettings[]>(url, data);
  }
  addLeadUnit(data: any): Observable<any> {
    const addUrl = 'leadunitadd';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.post<LeadSettings[]>(url, data);
  }

  deleteLeadUnit(val): Observable<any> {
    const addUrl = 'leadunit/';
    const url: string = this.serviceUrl + addUrl + val;
    return this.httpClient.delete<LeadSettings[]>(url);
  }
  leadSource(): Observable<any> {
    const addUrl = 'leadsources';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.get<LeadSettings[]>(url);
  }
  deleteLeadSource(val): Observable<any> {
    const addUrl = 'leadsources/';
    const url: string = this.serviceUrl + addUrl + val;
    return this.httpClient.delete<LeadSettings[]>(url);
  }
  deleteLeadServices(val): Observable<any> {
    const addUrl = 'leadservices/';
    const url: string = this.serviceUrl + addUrl + val;
    return this.httpClient.delete<LeadSettings[]>(url);
  }
  deleteLeadStatus(val): Observable<any> {
    const addUrl = 'leadstatus/';
    const url: string = this.serviceUrl + addUrl + val;
    return this.httpClient.delete<LeadSettings[]>(url);
  }
  deleteLeadType(val): Observable<any> {
    const addUrl = 'leadtype/';
    const url: string = this.serviceUrl + addUrl + val;
    return this.httpClient.delete<LeadSettings[]>(url);
  }
  addGST(data: any): Observable<any> {
    const addUrl = 'workordergst';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.post<WorkOrderPdf[]>(url, data);
  }
  addSGST(data: any): Observable<any> {
    const addUrl = 'workordersgst';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.post<WorkOrderPdf[]>(url, data);
  }
  addCGST(data: any): Observable<any> {
    const addUrl = 'workordercgst';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.post<WorkOrderPdf[]>(url, data);
  }
  addTerms(data: any): Observable<any> {
    const addUrl = 'workorderterms';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.post<WorkOrderPdf[]>(url, data);
  }
  addDigitalTerms(data: any): Observable<any> {
    const addUrl = 'workorderdigitalterms';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.post<WorkOrderPdf[]>(url, data);
  }
  addBankDetails(data: any): Observable<any> {
    const addUrl = 'bankdetails';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.post<BankDetails[]>(url, data);
  }
  addCompanyDetails(data: any): Observable<any> {
    const addUrl = 'companydetails';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.post<BankDetails[]>(url, data);
  }
  addFooterDetails(data: any): Observable<any> {
    const addUrl = 'footerdetails';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.post<BankDetails[]>(url, data);
  }
  getPdfWorkOrderDetails(): Observable<any> {
    const addUrl = 'pdfworkorder';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.get<LeadSettings[]>(url);
  }

  ExpensePayment(): Observable<any> {
    const addUrl = 'expense';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.get<ExpenseSetting[]>(url);
  }
  ExpenseAddPayment(data): Observable<any> {
    const addUrl = 'addexpensepayment';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.post<ExpenseSetting[]>(url, data);
  }
  ExpenseDeletePayment(data): Observable<any> {
    const addUrl = 'deleteexpensepayment/';
    const url: string = this.serviceUrl + addUrl + data;
    return this.httpClient.delete<ExpenseSetting[]>(url, data);
  }
  expenseAddType(data): Observable<any> {
    const addUrl = 'addexpensetype';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.post<ExpenseSetting[]>(url, data);
  }
  expenseDeleteType(data): Observable<any> {
    const addUrl = 'deleteexpensetype/';
    const url: string = this.serviceUrl + addUrl + data;
    return this.httpClient.delete<ExpenseSetting[]>(url, data);
  }
  expenseAddGst(data): Observable<any> {
    const addUrl = 'addexpensegst';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.post<ExpenseSetting[]>(url, data);
  }
  expenseDeleteGst(data): Observable<any> {
    const addUrl = 'deleteexpensegst/';
    const url: string = this.serviceUrl + addUrl + data;
    return this.httpClient.delete<ExpenseSetting[]>(url, data);
  }


  addDepartment(data: any): Observable<any> {
    const addUrl = 'department';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.post<TicketsettingsModel[]>(url, data);
  }

  viewDepartment(): Observable<any> {
    const addUrl = 'departments';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.get<TicketsettingsModel[]>(url);
  }


  deleteDepartment(val): Observable<any> {
    const addUrl = 'departments/';
    const url: string = this.serviceUrl + addUrl + val;
    return this.httpClient.delete<TicketsettingsModel[]>(url);
  }


  addAssignedto(data: any): Observable<any> {
    const addUrl = 'assignedto';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.post<TicketsettingsModel[]>(url, data);
  }

  viewAssignedto(): Observable<any> {
    const addUrl = 'multiassignedto';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.get<TicketsettingsModel[]>(url);
  }


  deleteAssignedto(val): Observable<any> {
    const addUrl = 'multiassignedto/';
    const url: string = this.serviceUrl + addUrl + val;
    return this.httpClient.delete<TicketsettingsModel[]>(url);
  }

  addAssignedby(data: any): Observable<any> {
    const addUrl = 'assignedby';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.post<TicketsettingsModel[]>(url, data);
  }

  viewAssignedby(): Observable<any> {
    const addUrl = 'multiassignedby';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.get<TicketsettingsModel[]>(url);
  }
  deleteAssignedby(val): Observable<any> {
    const addUrl = 'multiassignedby/';
    const url: string = this.serviceUrl + addUrl + val;
    return this.httpClient.delete<TicketsettingsModel[]>(url);
  }
  addIncomePaymentMode(data: any): Observable<any> {
    const addUrl = 'addincomepaymentmode';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.post<IncomeSetting[]>(url, data);
  }
  getIncomePaymentMode(): Observable<any> {
    const addUrl = 'viewincomepaymentmode';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.get<IncomeSetting[]>(url);
  }
  deleteIncomePaymentMode(val): Observable<any> {
    const addUrl = 'deleteincomepaymentmode/';
    const url: string = this.serviceUrl + addUrl + val;
    return this.httpClient.delete<IncomeSetting[]>(url);
  }
  addIncomeGst(data: any): Observable<any> {
    const addUrl = 'addincomegst';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.post<IncomeSetting[]>(url, data);
  }
  deleteIncomeGst(val): Observable<any> {
    const addUrl = 'deleteincomegst/';
    const url: string = this.serviceUrl + addUrl + val;
    return this.httpClient.delete<IncomeSetting[]>(url);
  }
  addShootType(data): Observable<any> {
    const addUrl = 'addshoottype';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.post<MaterialSetting[]>(url, data);
  }
  getMaterial(): Observable<any> {
    const addUrl = 'getmaterial';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.get<MaterialSetting[]>(url);
  }
  deleteShootType(val): Observable<any> {
    const addUrl = 'deleteshoottype/';
    const url: string = this.serviceUrl + addUrl + val;
    return this.httpClient.delete<MaterialSetting[]>(url);
  }
  addDispatchType(data): Observable<any> {
    const addUrl = 'adddispatchtype';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.post<MaterialSetting[]>(url, data);
  }
  deleteDispatchType(val): Observable<any> {
    const addUrl = 'deletedispatchtype/';
    const url: string = this.serviceUrl + addUrl + val;
    return this.httpClient.delete<MaterialSetting[]>(url);
  }
  addMaterialStatus(data): Observable<any> {
    const addUrl = 'addmaterialstauts';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.post<MaterialSetting[]>(url, data);
  }
  deleteMaterialStatus(val): Observable<any> {
    const addUrl = 'deletematerialstatus/';
    const url: string = this.serviceUrl + addUrl + val;
    return this.httpClient.delete<MaterialSetting[]>(url);
  }

  addTaskDepartment(data: any): Observable<any> {
    const addUrl = 'adddepartment';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.post<TasksettingsModel[]>(url, data);
  }

  viewTaskDepartment(): Observable<any> {
    const addUrl = 'viewdepartments';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.get<TasksettingsModel[]>(url);
  }


  deleteTaskDepartment(val): Observable<any> {
    const addUrl = 'deletedepartments/';
    const url: string = this.serviceUrl + addUrl + val;
    return this.httpClient.delete<TasksettingsModel[]>(url);
  }
  addTaskAssignedby(data: any): Observable<any> {
    const addUrl = 'taskassignedby';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.post<TasksettingsModel[]>(url, data);
  }

  viewTaskAssignedby(): Observable<any> {
    const addUrl = 'viewtaskassignedy';
    const url: string = this.serviceUrl + addUrl;
    return this.httpClient.get<TasksettingsModel[]>(url);
  }
  deleteTaskAssignedby(val): Observable<any> {
    const addUrl = 'deletetaskassiginedby/';
    const url: string = this.serviceUrl + addUrl + val;
    return this.httpClient.delete<TasksettingsModel[]>(url);
  }

}
