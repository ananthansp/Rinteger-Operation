
import { Component, OnInit} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserManagementService } from './../user-management.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { Register } from './register.model';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registerForm: FormGroup;
  register: Register;
  newRoles: any;
  fullLeadUnit: any;
  constructor(private fb: FormBuilder,
     private router: Router, private userManagementService: UserManagementService, private snack: MatSnackBar) { }

  ngOnInit() {
    this.userRegister();
    this.getAllRole();
    this.viewLeadSettings();
  }

  getAllRole() {
    this.userManagementService.permissionRole().subscribe(data => {
      this.newRoles = data;
    }, error => {
      console.log(error);
    });
  }
  viewLeadSettings() {
    this.userManagementService.leadSource().subscribe(data => {
      this.fullLeadUnit = data[0].leadUnit;
    }, err => {
      console.log(err);
    });
  }
  userRegister() {
    this.registerForm = this.fb.group({
      _id: [''],
      userName: ['', Validators.minLength(3)],
      password: ['', Validators.minLength(3)],
      mobileNumber: ['', Validators.required],
      emailId: [''],
      role: ['', Validators.required],
      unit: ['', Validators.required]
    });
  }
  regSubmit(registerForm: FormGroup) {
    this.register = new Register();
    this.register.userName = registerForm.controls.userName.value;
    this.register.password = registerForm.controls.password.value;
    this.register.mobileNumber = registerForm.controls.mobileNumber.value;
    this.register.emailId = registerForm.controls.emailId.value;
    this.register.role = registerForm.controls.role.value;
    this.register.unit = registerForm.controls.unit.value;
    this.userManagementService.registration(this.register).subscribe(data => {
      this.snack.open('register successfully', 'OK', { duration: 1000, panelClass: ['blue-snackbar'] });
      this.router.navigate(['./account/login']);
    }, error => {
      console.log(error);
    });
  }
}
