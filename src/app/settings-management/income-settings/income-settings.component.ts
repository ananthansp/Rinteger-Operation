import { Component, OnInit, Inject, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatSnackBar } from '@angular/material';
import { SettingsServiceService } from '../settings-service.service';
import { IncomeSetting } from './../../shared/income-setting.model';

@Component({
  selector: 'app-income-settings',
  templateUrl: './income-settings.component.html',
  styleUrls: ['./income-settings.component.css']
})
export class IncomeSettingsComponent implements OnInit {

  incomeSettingsForm: FormGroup;
  settingModel: IncomeSetting;
  settingValue: IncomeSetting[];
  showPayment: boolean;
  showGst: boolean;
  message;
  action;
  constructor(private fb: FormBuilder, private settingsService: SettingsServiceService,
    private snackBar: MatSnackBar) { }
  ngOnInit() {
    this.createForm();
    this.viewIncomeSetting();
  }
  createForm() {
    this.incomeSettingsForm = this.fb.group({
      modeOfPayment: [''],
      gst: ['']
    });
  }
  showPaymentForm() {
    this.showPayment = true;
    this.showGst = false;
  }
  showGstForm() {
    this.showPayment = false;
    this.showGst = true;
  }
  addPaymentMode() {
    this.message = 'Payment mode added successfully';
    this.settingModel = new IncomeSetting();
    this.settingModel.modeOfPayment = this.incomeSettingsForm.controls.modeOfPayment.value;
    this.settingsService.addIncomePaymentMode(this.settingModel).subscribe(data => {
      this.settingModel = data;
      this.settingValue = data;
      this.snackBar.open(this.message, this.action, {
        duration: 3000,
      });
      this.incomeSettingsForm.reset();
    }, error => {
      console.log(error);
    });
  }
  viewIncomeSetting() {
    this.settingsService.getIncomePaymentMode().subscribe(data => {
      this.settingModel = data;
      this.settingValue = data;
    }, error => {
      console.log(error);
    });
  }
  deletePaymentMode(data) {
    this.message = 'Payment mode deleted successfully';
    this.settingsService.deleteIncomePaymentMode(data).subscribe(value => {
      this.settingModel = value;
      this.settingValue = value;
      this.snackBar.open(this.message, this.action, {
        duration: 3000,
      });
      this.incomeSettingsForm.reset();
    }, error => {
      console.log(error);
    });
  }
  addGst() {
    this.message = 'Gst Option added successfully';
    this.settingModel = new IncomeSetting();
    this.settingModel.gst = this.incomeSettingsForm.controls.gst.value;
    this.settingsService.addIncomeGst(this.settingModel).subscribe(data => {
      this.settingModel = data;
      this.settingValue = data;
      this.snackBar.open(this.message, this.action, {
        duration: 3000,
      });
      this.incomeSettingsForm.reset();
    }, error => {
      console.log(error);
    });
  }
  deleteGst(test) {
    this.message = 'Gst option deleted successfully';
    this.settingsService.deleteIncomeGst(test).subscribe(data => {
      this.settingModel = data;
      this.settingValue = data;
      this.snackBar.open(this.message, this.action, {
        duration: 3000,
      });
      this.incomeSettingsForm.reset();
    }, error => {
      console.log(error);
    });
  }
}
