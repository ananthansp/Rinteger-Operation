import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { UserManagementService } from './../user-management.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserPermission } from './../../shared/userPermission.model';

@Component({
  selector: 'app-create-role',
  templateUrl: './create-role.component.html',
  styleUrls: ['./create-role.component.css']
})
export class CreateRoleComponent implements OnInit {
  accessForm: FormGroup;
  selectedPermissions = [];
  accessPermission: UserPermission;
  constructor(private fb: FormBuilder, private router: Router
    , private userManagementService: UserManagementService) { }

  ngOnInit() {
    this.userAccess();
  }
  userAccess() {

    this.accessForm = this.fb.group({
      role: ['', Validators.required],
      currentDate: ['', Validators.required],
      marketingRole: this.fb.group({
        customerNav: [false, Validators.required],
        leadNav: [false, Validators.required],
        bookingNav: [false, Validators.required],
        quotationNav: [false, Validators.required],
        workOrderNav: [false, Validators.required],
      }),
      financialRole: this.fb.group({
        incomeNav: [false, Validators.required],
        expenseNav: [false, Validators.required],
        invoiceNav: [false, Validators.required],
        profomaInvoiceNav: [false, Validators.required],
      }),
      baseRole: this.fb.group({
        ticketNav: [false, Validators.required],
        taskNav: [false, Validators.required]
      }),
      adminRole: this.fb.group({
        settingNav: [false, Validators.required],
        uploadNav: [false, Validators.required],
      }),
      materialRole: this.fb.group({
        materialNav: [false, Validators.required],
      }),
      workOrderRole: this.fb.group({
        workOrderMenu: [false, Validators.required],
      })
    });
  }
  sendPermission(accessForm: FormGroup) {
    /* accessForm.controls._id.setValue(id);
    accessForm.controls.userType.setValue(userType); */
    this.accessPermission = new UserPermission();
    this.accessPermission.role = accessForm.controls.role.value,
      this.accessPermission.currentDate = new Date();
    this.accessPermission.marketingRole = accessForm.controls.marketingRole.value;
    this.accessPermission.financialRole = accessForm.controls.financialRole.value;
    this.accessPermission.baseRole = accessForm.controls.baseRole.value;
    this.accessPermission.adminRole = accessForm.controls.adminRole.value;
    this.accessPermission.materialRole = accessForm.controls.materialRole.value;
    this.accessPermission.workOrderRole = accessForm.controls.workOrderRole.value;
    this.userManagementService.permissionUsers(this.accessPermission).subscribe(data => {
      this.router.navigate(['./user/register']);
    }, error => {
      console.log(error);
    });
  }
}
