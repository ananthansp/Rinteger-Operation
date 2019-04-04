
import { Component, OnInit, Inject, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatSnackBar } from '@angular/material';
import { SettingsServiceService } from '../settings-service.service';
import { LeadSettings } from './../../shared/lead-settings.model';


@Component({
  selector: 'app-lead-settings',
  templateUrl: './lead-settings.component.html',
  styleUrls: ['./lead-settings.component.css']
})
export class LeadSettingsComponent implements OnInit {
  leadSettingsForm: FormGroup;
  showService: boolean;
  showStatus: boolean;
  showSource: boolean;
  showType: boolean;
  showLeadUnit: boolean;
  settingModel: LeadSettings;
  message;
  action;
  constructor(private fb: FormBuilder, private dialog: MatDialog, private settingService: SettingsServiceService,
    public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.createForm();
    this.viewLeadSource();
    this.showService = true;
  }
  createForm() {
    this.leadSettingsForm = this.fb.group({
      status: [''],
      service: [''],
      source: [''],
      type: [''],
      leadUnit: []
    });
  }
  showServiceForm() {
    this.showService = true;
    this.showSource = false;
    this.showStatus = false;
    this.showType = false;
    this.showLeadUnit = false;
  }
  showStatusForm() {
    this.showService = false;
    this.showSource = false;
    this.showStatus = true;
    this.showType = false;
    this.showLeadUnit = false;
  }
  showSourceForm() {
    this.showService = false;
    this.showSource = true;
    this.showStatus = false;
    this.showType = false;
    this.showLeadUnit = false;
  }
  showTypeForm() {
    this.showService = false;
    this.showSource = false;
    this.showStatus = false;
    this.showLeadUnit = false;
    this.showType = true;
  }
  showLeadUnitForm()   {
    this.showService = false;
    this.showSource = false;
    this.showStatus = false;
    this.showLeadUnit = true;
    this.showType = false;
  }
  addLeadSource() {
    this.message = 'source added successfully';
    this.settingModel = new LeadSettings();
    this.settingModel.leadSource = this.leadSettingsForm.controls.source.value;
    this.settingService.addLeadSource(this.settingModel).subscribe(data => {
      this.settingModel = data;
      this.snackBar.open(this.message, this.action, {
        duration: 3000,
      });
      this.leadSettingsForm.reset();
    }, err => {
      console.log(err);
    });
  }
  viewLeadSource() {
    this.settingService.leadSource().subscribe(data => {
      this.settingModel = data;
    }, err => {
      console.log(err);
    });
  }
  deleteSource(value) {
    this.message = 'source deleted successfully';
    this.settingService.deleteLeadSource(value).subscribe(data => {
      this.settingModel = data;
      this.snackBar.open(this.message, this.action, {
        duration: 3000,
      });
    }, err => {
      console.log(err);
    });
    console.log(value);
  }
  addLeadService() {
    this.message = 'services added successfully';
    this.settingModel = new LeadSettings();
    this.settingModel.service = this.leadSettingsForm.controls.service.value;
    this.settingService.addLeadService(this.settingModel).subscribe(data => {
      this.settingModel = data;
      this.snackBar.open(this.message, this.action, {
        duration: 3000,
      });
      this.leadSettingsForm.reset();
    }, err => {
      console.log(err);
    });
  }
  deleteLeadService(value) {
    this.message = 'service deleted successfully';
    this.settingService.deleteLeadServices(value).subscribe(data => {
      this.settingModel = data;
      this.snackBar.open(this.message, this.action, {
        duration: 3000,
      });
    }, err => {
      console.log(err);
    });
    console.log(value);
  }
  addLeadStatus() {
    this.message = 'status added successfully';
    this.settingModel = new LeadSettings();
    this.settingModel.leadStatus = this.leadSettingsForm.controls.status.value;
    this.settingService.addLeadStatus(this.settingModel).subscribe(data => {
      this.settingModel = data;
      this.snackBar.open(this.message, this.action, {
        duration: 3000,
      });
      this.leadSettingsForm.reset();
    }, err => {
      console.log(err);
    });
  }
  deleteLeadStatus(value) {
    this.message = 'status deleted successfully';
    this.settingService.deleteLeadStatus(value).subscribe(data => {
      this.settingModel = data;
      this.snackBar.open(this.message, this.action, {
        duration: 3000,
      });
    }, err => {
      console.log(err);
    });
    console.log(value);
  }
  addLeadType() {
    this.message = 'Lead Type added successfully';
    this.settingModel = new LeadSettings();
    this.settingModel.type = this.leadSettingsForm.controls.type.value;
    this.settingService.addLeadType(this.settingModel).subscribe(data => {
      this.settingModel = data;
      this.snackBar.open(this.message, this.action, {
        duration: 3000,
      });
      this.leadSettingsForm.reset();
    }, err => {
      console.log(err);
    });
  }
  addLeadUnit() {
    this.message = 'Lead Unit added successfully';
    this.settingModel = new LeadSettings();
    this.settingModel.leadUnit = this.leadSettingsForm.controls.leadUnit.value;
    this.settingService.addLeadUnit(this.settingModel).subscribe(data => {
      this.settingModel = data;
      this.snackBar.open(this.message, this.action, {
        duration: 3000,
      });
      this.leadSettingsForm.reset();
    }, err => {
      console.log(err);
    });
  }
  deleteLeadUnit(value) {
    this.message = 'Lead Unit deleted successfully';
    this.settingService.deleteLeadUnit(value).subscribe(data => {
      this.settingModel = data;
      this.snackBar.open(this.message, this.action, {
        duration: 3000,
      });
    }, err => {
      console.log(err);
    });
    console.log(value);
  }
  deleteLeadType(value) {
    this.message = 'Lead Type deleted successfully';
    this.settingService.deleteLeadType(value).subscribe(data => {
      this.settingModel = data;
      this.snackBar.open(this.message, this.action, {
        duration: 3000,
      });
    }, err => {
      console.log(err);
    });
    console.log(value);
  }
}
