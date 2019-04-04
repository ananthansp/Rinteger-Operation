
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LogIn } from './../../../shared/login.model';
import { CustomerManagementService } from './../../customer-management.service';


@Component({
  selector: 'app-alert-delete',
  template: `
  <form  [formGroup]="onLoginForm"
  novalidate>
      <div class="container-fluid">
      <div class="alert alert-danger"
      *ngIf="loginFailed">
      Please Enter Valid Details
      </div>
        <div class="row">
          <div class="col-md-12 mx-auto">
            <p>Do you want to delete ? please Signin</p>
            <div class="form-group">
              <mat-form-field class="example-full-width">
                <input matInput placeholder="User Name" formControlName="userName" required>
                <button mat-button matSuffix mat-icon-button aria-label="User Name">
                  <mat-icon>account_circle</mat-icon>
                </button>
                <mat-error *ngIf="onLoginForm.controls['userName'].errors?.required">
                  UserName is
                  <strong>required</strong>
                </mat-error>
              </mat-form-field>
              <div>
                <mat-form-field class="example-full-width">
                  <input matInput placeholder="Password"  type="password" formControlName="password"
                   required>
                  <button mat-button matSuffix mat-icon-button aria-label="User Name">
                    <mat-icon>remove_red_eye</mat-icon>
                  </button>
                  <mat-error *ngIf="onLoginForm.controls['password'].errors?.required">
                    Password is
                    <strong>required</strong>
                  </mat-error>
                </mat-form-field>
              </div>
              <div mat-dialog-actions>
      <button
      type="button"
      mat-raised-button
      (click)="validateData()"
      color="primary">Delete</button>
      &nbsp;
      <span fxFlex></span>
      <button
      type="button"
      color="warn"
      mat-raised-button
      (click)="dialogRef.close(false)">No</button>
      </div>
            </div>
          </div>
        </div>
      </div>
    </form>`,
})
export class AlertDeleteComponent implements OnInit {
  onLoginForm: FormGroup;
  login: LogIn;
  loginFailed: boolean;
  constructor(
    public dialogRef: MatDialogRef<AlertDeleteComponent>, private fb: FormBuilder,
     private customerManagementService: CustomerManagementService
  ) { }

  ngOnInit() {
    this.createForm();
  }
  createForm() {
    this.onLoginForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  validateData() {
    this.login = new LogIn(
      this.onLoginForm.controls.userName.value,
      this.onLoginForm.controls.password.value
    );
    this.customerManagementService.logIn(this.login).subscribe(data => {
      if (data.length !== 0
      ) {
        this.dialogRef.close(true);
      } else {
        this.loginFailed = true;
      }
    });
}
}

