import { Injectable } from '@angular/core';
import { TaskModel } from '../shared/task-management.model';
import { HttpClient } from '@angular/common/http';
import { AppSetting } from './../config/appSetting';
import { Observable } from 'rxjs';
import { Register } from './../user-management/registration/register.model';
import { LogIn } from '../shared/login.model';
/* import { Customer } from './../customer-management/customer/create-customer/customer.model'; */

@Injectable({
  providedIn: 'root'
})
export class TaskManagementService {
  baseurl = AppSetting.serviceUrl;
  constructor(private http: HttpClient) { }

  createTask(data): Observable<any> {
    const urlway = this.baseurl + 'createtask';
    return this.http.post<TaskModel[]>(urlway, data);
  }
  getAllTaskData(): Observable<any> {
    const urlway = this.baseurl + 'findalltask';

    return this.http.get<TaskModel[]>(urlway);
  }
  getSingleData(id): Observable<any> {
    const urlway = this.baseurl + 'findsingle/' + id;
    return this.http.get<TaskModel[]>(urlway);
  }
  UpdateTask(data): Observable<any> {
    const url: string = this.baseurl  + 'updatetask/' + data._id;
    return this.http.put<TaskModel[]>(url, data);
  }
  getunitwiseTask(name): Observable<TaskModel[]> {
    const urlway = this.baseurl + 'unitwisetask/' + name;

    return this.http.get<TaskModel[]>(urlway);
  }
  deadlinedTask(): Observable<TaskModel[]> {
    const urlway = this.baseurl + 'deadlinedTask';

    return this.http.get<TaskModel[]>(urlway);
  }
  getUnitWiseName(): Observable<any> {
    const urlway = this.baseurl + 'unitName';

    return this.http.get<Register[]>(urlway);
}
getDepartmentData(): Observable<any> {
  const urlway = this.baseurl + 'viewdepartments';

  return this.http.get<TaskModel[]>(urlway);
}
DeleteTask(data): Observable<any> {
  const url: string = this.baseurl + 'deletetask/' + data._id;
  return this.http.delete<TaskModel[]>(url);
}
getRolewisedata(): Observable<any> {
  const urlway = this.baseurl + 'admin/validate';

  return this.http.get<Register[]>(urlway);
}
compareUserId(data): Observable<any> {
  const urlway = this.baseurl + 'finduserid/' + data;

  return this.http.get<TaskModel[]>(urlway);
}
}
