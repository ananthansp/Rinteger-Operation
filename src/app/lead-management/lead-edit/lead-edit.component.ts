import { Component, OnInit, Inject, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Lead } from './../../shared/lead.model';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { LeadManagementService } from './../lead-management.service';
import { CustomerManagementService } from './../../customer-management/customer-management.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatSnackBar } from '@angular/material';
import { SettingsServiceService } from '../../settings-management/settings-service.service';
import { LeadSettings } from '../../shared/lead-settings.model';
import { FollowUp } from '../../shared/follow-up.model';

@Component({
  selector: 'app-lead-edit',
  templateUrl: './lead-edit.component.html',
  styleUrls: ['./lead-edit.component.css']
})
export class LeadEditComponent implements OnInit {
  fullLeadType;
  leadDetailsForm: FormGroup;
  leadModel: Lead;
  fullLeadSource;
  fullLeadStatus;
  fullLeadService;
  fullLeadUnit;
  leadID;
  id;
  message;
  action;
  constructor(private fb: FormBuilder, private leadManagementService: LeadManagementService, private router: Router
    , private route: ActivatedRoute, private snackBar: MatSnackBar) {
    this.route.paramMap.subscribe(
      (params: ParamMap) => {
        this.id = params.get('id');
      });
  }

  ngOnInit() {
    this.viewLeadSettings();
    this.getSingleLead();
    this.createForm();
  }

  createForm() {
    this.leadDetailsForm = this.fb.group({
      leadID: [''],
      mobileNumber: [''],
      emailId: [''],
      name: [''],
      leadOwner: [''],
      leadSource: [''],
      leadStatus: [''],
      service: [''],
      leadUnit: [''],
      date: [''],
      remarks: [''],
      leadType: [''],
      requirements: this.fb.array([]),
      followUp: this.fb.array([])
    });
  }
  addForm() {
    const requirements = this.fb.group({
      id: [''],
      item: [''],
      quantity: [''],
      price: [''],
      discount: [''],
      description: [''],
      total: ['']
    });
    this.requirementsForms.push(requirements);
  }
  followUpForm() {
    const followUp = this.fb.group({
      id: [''],
      date: [''],
      upcomingDate: [''],
      remarks: [''],
    });
    this.followUpForms.push(followUp);
  }
  get requirementsForms() {
    return this.leadDetailsForm.get('requirements') as FormArray;
  }
  getSingleLead() {
    this.leadManagementService.singleLead(this.id).subscribe(data => {
      this.leadModel = data[0];
      this.addNewForm();
      this.addFollowUpForm();
    }, error => {
      console.log(error);
    });
  }
  addNewForm() {
    for (let i = 0; i <= this.leadModel.requirements.length - 1; i++) {
      const requirements = this.fb.group({
        id: [this.leadModel.requirements[i]._id],
        item: [this.leadModel.requirements[i].item],
        quantity: [this.leadModel.requirements[i].quantity],
        price: [this.leadModel.requirements[i].price],
        discount: [this.leadModel.requirements[i].discount],
        description: [this.leadModel.requirements[i].description],
        total: [this.leadModel.requirements[i].total]
      });
      this.requirementsForms.push(requirements);
    }
  }
  addFollowUpForm() {
    for (let i = 0; i <= this.leadModel.followUp.length - 1; i++) {
      const followUp = this.fb.group({
        id: [this.leadModel.followUp[i]._id],
        date: [this.leadModel.followUp[i].date],
        upcomingDate: [this.leadModel.followUp[i].upcomingDate],
        remarks: [this.leadModel.followUp[i].remarks],
      });
      this.followUpForms.push(followUp);
    }
  }
  deleteRequirements(i) {
    this.requirementsForms.removeAt(i);
  }
  get followUpForms() {
    return this.leadDetailsForm.get('followUp') as FormArray;
  }
  deleteFollowUp(i) {
    this.followUpForms.removeAt(i);
  }
  updateLeads(leadDetailsForm: FormGroup, lead) {
    if (leadDetailsForm.controls.leadStatus.value !== 'NOT INTRESTED') {
      this.message = 'Lead Updated Successfully';
      console.log('form value', this.followUpForms.value);
      this.leadManagementService.editLead(leadDetailsForm.value, lead._id).subscribe(data => {
        this.leadModel = data;
        this.snackBar.open(this.message, this.action, {
          duration: 3000,
        });
        this.router.navigate(['lead/leadview']);
      }, error => {
        console.log(error);
      });
    } else {
      this.leadManagementService.deleteLead(lead).subscribe(data => {
        this.leadModel = data;
        this.message = 'Lead Delete Successfully';
        this.snackBar.open(this.message, this.action, {
          duration: 3000,
        });
        this.router.navigate(['lead/leadview']);
      }, error => {
        console.log(error);
      });
    }
  }
  viewLeadSettings() {
    this.leadManagementService.leadSource().subscribe(data => {
      this.fullLeadSource = data[0].leadSource;
      this.fullLeadService = data[0].service;
      this.fullLeadStatus = data[0].leadStatus;
      this.fullLeadType = data[0].type;
      this.fullLeadUnit = data[0].leadUnit;
    }, err => {
      console.log(err);
    });
  }
  deleteRequirement(id) {
    this.leadManagementService.deleteLeadRequirements(this.leadModel._id, id).subscribe(data => {
      this.leadModel = data;
    }, err => {
      console.log(err);
    });
  }
  addFollowUps(i) {
    this.leadManagementService.addFollowUp(this.leadModel._id, this.followUpForms.value).subscribe(data => {
      this.leadModel = data;
    }, err => {
      console.log(err);
    });
  }
  editFollowUps(id) {
  }
  deleteFollowUps(i) {
    this.followUpForms.removeAt(i);
  }
  cancel() {
    this.router.navigate(['lead/leadview']);
  }
}

