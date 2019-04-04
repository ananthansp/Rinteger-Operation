
import { Component, OnInit, Inject, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatSnackBar } from '@angular/material';
import { SettingsServiceService } from '../settings-service.service';
import { ExpenseSetting } from './../../shared/expense-settings.model';
@Component({
  selector: 'app-expense-settings',
  templateUrl: './expense-settings.component.html',
  styleUrls: ['./expense-settings.component.css']
})
export class ExpenseSettingsComponent implements OnInit {
  expenseSettingsForm: FormGroup;
  showPayment: boolean;
  showType: boolean;
  showGst: boolean;
  settingModel: ExpenseSetting;
  action;
  message;
  constructor(private fb: FormBuilder, private dialog: MatDialog, private settingsService: SettingsServiceService,
    private snackbar: MatSnackBar) { }
  createForm() {
    this.expenseSettingsForm = this.fb.group({
      modeOfPayment: [''],
      expenseType: [''],
      gst: ['']
    });
  }
  showPaymentForm() {
    this.showPayment = true;
    this.showType = false;
    this.showGst = false;
  }
  showTypeForm() {
    this.showPayment = false;
    this.showType = true,
      this.showGst = false;
  }
  showGstForm() {
    this.showPayment = false;
    this.showType = false;
    this.showGst = true;
  }
  viewExpensePayment() {
    this.settingsService.ExpensePayment().subscribe(data => {
      this.settingModel = data;
    }, err => {
      console.log(err);
    });
  }
  addExpensePayment() {
    this.message = 'Payment Type added Successfully';
    this.settingModel = new ExpenseSetting();
    this.settingModel.modeOfPayment = this.expenseSettingsForm.controls.modeOfPayment.value;
    this.settingsService.ExpenseAddPayment(this.settingModel).subscribe(data => {
      this.settingModel = data;
      this.snackbar.open(this.message, this.action, {
        duration: 3000,
      });
    }, error => {
      console.log(error);
    });
    this.expenseSettingsForm.reset();
  }
  deleteExpensePayment(value) {
    this.message = 'Payment Type deleted Successfully';
    this.settingsService.ExpenseDeletePayment(value).subscribe(data => {
      this.settingModel = data;
      this.snackbar.open(this.message, this.action, {
        duration: 3000,
      });
    }, error => {
      console.log(error);
    });
  }
  addExpenseType() {
    this.message = 'Expense Type added Successfully';
    this.settingModel = new ExpenseSetting();
    this.settingModel.expenseType = this.expenseSettingsForm.controls.expenseType.value;
    this.settingsService.expenseAddType(this.settingModel).subscribe(data => {
      this.settingModel = data;
      this.snackbar.open(this.message, this.action, {
        duration: 3000,
      });
    }, error => {
      console.log(error);
    });
    this.expenseSettingsForm.reset();
  }
  deleteExpenseType(value) {
    this.message = 'Expense Type deleted Successfully';
    this.settingsService.expenseDeleteType(value).subscribe(data => {
      this.settingModel = data;
      this.snackbar.open(this.message, this.action, {
        duration: 3000,
      });
    }, error => {
      console.log(error);
    });
  }
  addExpenseGst() {
    this.message = 'Expense Type added Successfully';
    this.settingModel = new ExpenseSetting();
    this.settingModel.gst = this.expenseSettingsForm.controls.gst.value;
    this.settingsService.expenseAddGst(this.settingModel).subscribe(data => {
      this.settingModel = data;
      this.snackbar.open(this.message, this.action, {
        duration: 3000,
      });
    }, error => {
      console.log(error);
    });
    this.expenseSettingsForm.reset();
  }
  deleteExpenseGst(value) {
    this.message = 'Expense Type deleted Successfully';
    this.settingsService.expenseDeleteGst(value).subscribe(data => {
      this.settingModel = data;
      this.snackbar.open(this.message, this.action, {
        duration: 3000,
      });
    }, error => {
      console.log(error);
    });
  }


  ngOnInit() {
    this.createForm();
    this.viewExpensePayment();
  }

}
