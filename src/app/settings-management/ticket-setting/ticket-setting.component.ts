import { Component, OnInit, Inject, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { SettingsServiceService } from '../settings-service.service';
import { TicketsettingsModel } from './ticket-settings.model';


@Component({
  selector: 'app-ticket-setting',
  templateUrl: './ticket-setting.component.html',
  styleUrls: ['./ticket-setting.component.css']
})
export class TicketSettingComponent implements OnInit {
  ticketSettingsForm: FormGroup;
  showDepartment: boolean;
  showAssignedto: boolean;
  showAssignedby: boolean;
  ticketsettingholder: TicketsettingsModel;
  message;
  action;


  constructor(private ticketsettingservice: SettingsServiceService, private fb: FormBuilder,
    private dialog: MatDialog, public snackBar: MatSnackBar) { }

  ngOnInit() {

    this.createForm();
    this.viewDepartment();
    this.showDepartment = true;
    this.showAssignedto = true;
    this.showAssignedby = true;
  }


  createForm() {
    this.ticketSettingsForm = this.fb.group({

      department: [''],
      assignedto: [''],
      assignedby: ['']
    });
  }
  showDepartmentForm() {
    this.showDepartment = true;

  }


  addDepartment() {
    this.message = 'source added successfully';
    this.ticketsettingholder = new TicketsettingsModel();
    this.ticketsettingholder.department = this.ticketSettingsForm.controls.department.value;
    this.ticketsettingservice.addDepartment(this.ticketsettingholder).subscribe(data => {
      this.ticketsettingholder = data;
      this.snackBar.open(this.message, this.action, {
        duration: 3000,
      });
      this.ticketSettingsForm.reset();
    }, err => {
      console.log(err);
    });
  }
  viewDepartment() {
    this.ticketsettingservice.viewDepartment().subscribe(data => {
      this.ticketsettingholder = data;
    }, err => {
      console.log(err);
    });
  }
  deleteDepartment(value) {
    this.message = 'source deleted successfully';
    this.ticketsettingservice.deleteDepartment(value).subscribe(data => {
      this.ticketsettingholder = data;
      this.snackBar.open(this.message, this.action, {
        duration: 3000,
      });
    }, err => {
      console.log(err);
    });
    console.log(value);
  }



  showAssignedtoForm() {
    this.showAssignedto = true;

  }



  addAssignedto() {
    this.message = 'source added successfully';
    this.ticketsettingholder = new TicketsettingsModel();
    this.ticketsettingholder.assignedto = this.ticketSettingsForm.controls.assignedto.value;
    this.ticketsettingservice.addAssignedto(this.ticketsettingholder).subscribe(data => {
      this.ticketsettingholder = data;
      this.snackBar.open(this.message, this.action, {
        duration: 3000,
      });
      this.ticketSettingsForm.reset();
    }, err => {
      console.log(err);
    });
  }
  viewAssignedto() {
    this.ticketsettingservice.viewAssignedto().subscribe(data => {
      this.ticketsettingholder = data;
    }, err => {
      console.log(err);
    });
  }
  deleteAssignedto(value) {
    this.message = 'source deleted successfully';
    this.ticketsettingservice.deleteAssignedto(value).subscribe(data => {
      this.ticketsettingholder = data;
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
    this.message = 'source added successfully';
    this.ticketsettingholder = new TicketsettingsModel();
    this.ticketsettingholder.assignedby = this.ticketSettingsForm.controls.assignedby.value;
    this.ticketsettingservice.addAssignedby(this.ticketsettingholder).subscribe(data => {
      this.ticketsettingholder = data;
      this.snackBar.open(this.message, this.action, {
        duration: 3000,
      });
      this.ticketSettingsForm.reset();
    }, err => {
      console.log(err);
    });
  }
  viewAssignedby() {
    this.ticketsettingservice.viewAssignedby().subscribe(data => {
      this.ticketsettingholder = data;
    }, err => {
      console.log(err);
    });
  }
  deleteAssignedby(value) {
    this.message = 'source deleted successfully';
    this.ticketsettingservice.deleteAssignedby(value).subscribe(data => {
      this.ticketsettingholder = data;
      this.snackBar.open(this.message, this.action, {
        duration: 3000,
      });
    }, err => {
      console.log(err);
    });
  }
}


