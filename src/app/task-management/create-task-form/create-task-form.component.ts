import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { TaskModel } from '../../shared/task-management.model';
import { from } from 'rxjs';
import { TaskManagementService } from '../task-management.service';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { Register } from '../../user-management/registration/register.model';
/* import { Customer } from './../../customer-management/customer/create-customer/customer.model'; */
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
@Component({
  selector: 'app-create-task-form',
  templateUrl: './create-task-form.component.html',
  styleUrls: ['./create-task-form.component.css']
})
export class CreateTaskFormComponent implements OnInit {
  department; /*
  assignedto;
  assignedby; */
  /*  customerdetail; */
  unitName: Register[];
  taskname: any;
  units = ['Studio', 'BSS', 'Technologies'];
  priority = ['low', 'medium', 'high', 'critical'];
  taskForm: FormGroup;
  taskholder: TaskModel;
  /*   customerModel: Customer; */
  /*   selectedData: Customer; */
  departmentData = [];
  assignedBy = [];
  assignedTo = [];
  userId;
  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router,
    private taskManagementService: TaskManagementService) { }

  ngOnInit() {
    this.createtask();
    /*  this.getAllCustomer();
     this.getDepartment(); */

    this.getDepartment();
    this.route.paramMap.subscribe(
      (params: ParamMap) => {
        this.userId = params.get('id');
      });
    this.getUnitWiseName();
  }
  createtask() {
    this.taskForm = this.fb.group({
      taskNo: [''],
      dateTime: [''],

      taskTitle: [''],
      taskDescription: [''],
      priority: [''],
      units: [''],
      department: [''],
      assignedTo: [''],
      assignedBy: [''],
      status: [''],
      toCloseDate: [''],
      closedDate: ['']
    });
  }
  changed(e) {
    console.log(this.unitName.filter(data => data.unit === e.value));
    this.taskname = this.unitName.filter(data => data.unit === e.value);
    /*   this.taskholder = this.taskname.controls._id.value; */
  }


  onSubmit() {
    this.taskholder = new TaskModel();
    this.taskholder.taskNo = this.taskForm.controls.taskNo.value;
    this.taskholder.userId = this.taskForm.controls.assignedTo.value._id;
    this.taskholder.dateTime = this.taskForm.controls.dateTime.value;
    this.taskholder.taskTitle = this.taskForm.controls.taskTitle.value;
    this.taskholder.taskDescription = this.taskForm.controls.taskDescription.value;
    this.taskholder.units = this.taskForm.controls.units.value;
    this.taskholder.priority = this.taskForm.controls.priority.value;
    this.taskholder.department = this.taskForm.controls.department.value;
    this.taskholder.assignedTo = this.taskForm.controls.assignedTo.value.userName;
    this.taskholder.assignedBy = this.taskForm.controls.assignedBy.value;
    this.taskholder.status = this.taskForm.controls.status.value;
    this.taskholder.toCloseDate = this.taskForm.controls.toCloseDate.value;
    this.taskholder.closedDate = this.taskForm.controls.closedDate.value;
    this.taskManagementService.createTask(this.taskholder).subscribe(data => {
      this.taskholder = data;
      /*  this.router.navigate(['ticket/view']); */
      this.router.navigate(['task/viewtask', this.userId]);
    }, error => {
      console.log(error);
    });

  }

  getDepartment() {
    this.taskManagementService.getDepartmentData().subscribe(data => {
      this.taskholder = data;
      this.department = this.taskholder;
      this.departmentData = this.taskholder[0].department;
      this.assignedBy = this.taskholder[0].assignedBy;
    });
  }
  getUnitWiseName() {
    this.taskManagementService.getUnitWiseName().subscribe(data => {
      this.unitName = data;
    });
  }


  cancel() {
    this.router.navigate(['task/viewtask', this.userId]);
  }


  /*  getAllCustomer() {
     this.ts.allCustomer().subscribe(data => {
       this.customerdetail = data;
     }, error => {
       console.log(error);
     });
   }
   filterCustomer(data) {
     this.customerModel = data;
 
   } */
}
