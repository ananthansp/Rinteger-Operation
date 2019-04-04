import { Component, OnInit, Inject, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { SettingsServiceService } from '../settings-service.service';
import { TasksettingsModel } from '../../shared/task-setting.module';
@Component({
  selector: 'app-task-settings',
  templateUrl: './task-settings.component.html',
  styleUrls: ['./task-settings.component.css']
})
export class TaskSettingsComponent implements OnInit {
  taskSettingsForm: FormGroup;
  showDepartment: boolean;
  showAssignedby: boolean;
  tasksettingholder: TasksettingsModel;
  message;
  action;


  constructor(private settingService: SettingsServiceService, private fb: FormBuilder,
    private dialog: MatDialog, public snackBar: MatSnackBar) { }

  ngOnInit() {

    this.createForm();
    this.viewDepartment();
    this.viewAssignedby();
    this.showDepartment = true;
    this.showAssignedby = true;
  }
  createForm() {
    this.taskSettingsForm = this.fb.group({
      department: [''],
      assignedBy: ['']
    });
  }
  showDepartmentForm() {
    this.showDepartment = true;
  }
  addDepartment() {
    this.message = 'Department added successfully';
    this.tasksettingholder = new TasksettingsModel();
    this.tasksettingholder.department = this.taskSettingsForm.controls.department.value;
    this.settingService.addTaskDepartment(this.tasksettingholder).subscribe(data => {
      this.tasksettingholder = data;
      this.snackBar.open(this.message, this.action, {
        duration: 3000,
      });
      this.taskSettingsForm.reset();
    }, err => {
      console.log(err);
    });
  }
  viewDepartment() {
    this.settingService.viewTaskDepartment().subscribe(data => {
      this.tasksettingholder = data;
    }, err => {
      console.log(err);
    });
  }
  deleteDepartment(value) {
    this.message = 'Department deleted successfully';
    this.settingService.deleteTaskDepartment(value).subscribe(data => {
      this.tasksettingholder = data;
      this.snackBar.open(this.message, this.action, {
        duration: 3000,
      });
    }, err => {
      console.log(err);
    });
    console.log(value);
  }
  showAssignedbyForm() {
    this.showAssignedby = true;
  }
  addAssignedby() {
    this.message = 'Assigned By added successfully';
    this.tasksettingholder = new TasksettingsModel();
    this.tasksettingholder.assignedBy = this.taskSettingsForm.controls.assignedBy.value;
    this.settingService.addTaskAssignedby(this.tasksettingholder).subscribe(data => {
      this.tasksettingholder = data;
      this.snackBar.open(this.message, this.action, {
        duration: 3000,
      });
      this.taskSettingsForm.reset();
    }, err => {
      console.log(err);
    });
  }
  viewAssignedby() {
    this.settingService.viewTaskAssignedby().subscribe(data => {
      this.tasksettingholder = data;
    }, err => {
      console.log(err);
    });
  }
  deleteAssignedby(value) {
    this.message = 'Assigned By deleted successfully';
    this.settingService.deleteTaskAssignedby(value).subscribe(data => {
      this.tasksettingholder = data;
      this.snackBar.open(this.message, this.action, {
        duration: 3000,
      });
    }, err => {
      console.log(err);
    });
  }
}


