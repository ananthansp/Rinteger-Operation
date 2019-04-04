
import { Component, OnInit, Inject, Optional, Input } from '@angular/core';
import { MarketCustomer } from './marketCustomer.model';
import { mobileNumberValidation } from './../../shared/mobileNumberValidation';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerManagementService } from './../../customer-management.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-create-marketcustomer',
  templateUrl: './create-marketcustomer.component.html',
  styleUrls: ['./create-marketcustomer.component.css']
})
export class CreateMarketcustomerComponent implements OnInit {
  marketCustomerDetailsForm: FormGroup;
  marketModel: MarketCustomer;
  editable = true;
  constructor(private fb: FormBuilder,
    @Optional() public dialogRef: MatDialogRef<CreateMarketcustomerComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private customerManagementService: CustomerManagementService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.marketCustomerDetailsForm = this.fb.group({
      mobileNumber: ['', mobileNumberValidation],
      name: ['', Validators.required],
      emailId: ['', [
        Validators.required,
        Validators.email
      ]],
      location: ['', Validators.required],
      whatsAppNo: [''],
      landLine: ['']
    });
  }
  cancel() {
    this.dialogRef.close();
  }
  addMarketSingleCustomer (marketCustomerDetailsForm: FormGroup) {
    this.marketModel = new MarketCustomer();
    this.marketModel.mobileNumber = marketCustomerDetailsForm.controls.mobileNumber.value;
    this.marketModel.name = marketCustomerDetailsForm.controls.name.value;
    this.marketModel.emailId = marketCustomerDetailsForm.controls.emailId.value;
    this.marketModel.location = marketCustomerDetailsForm.controls.location.value;
    this.marketModel.whatsAppNo = marketCustomerDetailsForm.controls.whatsAppNo.value;
    this.marketModel.landLine = marketCustomerDetailsForm.controls.landLine.value;
    this.customerManagementService.addSingleMarketCustomer(this.marketModel).subscribe(data => {
      this.marketModel = data;
      this.dialogRef.close(true);
    }, error => {
      this.dialogRef.close(false);
      console.log(error);
    });
  }
}
