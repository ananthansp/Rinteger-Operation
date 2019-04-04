import { Component, OnInit, Inject } from '@angular/core';
import { Customer } from './../create-customer/customer.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerManagementService } from './../../customer-management.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';


@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css']
})
export class EditCustomerComponent implements OnInit {
  customerDetailsForm: FormGroup;
  customerModel: Customer[];
  customerEdit: Customer;
  id;
  constructor(private fb: FormBuilder,
     private customerManagementService: CustomerManagementService,
     private route: ActivatedRoute,
    private router: Router
     ) {
  }

  ngOnInit() {
    this.createForm();
    this.getAllCustomer();
    this.id = this.route.snapshot.params.id;
  }
  createForm() {
    this.customerDetailsForm = this.fb.group({
      customerID: ['', Validators.required],
      mobileNumber: ['', Validators.required],
      altMobileNumber: [''],
      name: ['', Validators.required],
      emailId: ['', Validators.required],
      location: ['', Validators.required],
  /*     city: ['', Validators.required], */
      state: ['', Validators.required],
      pincode: ['', Validators.required],
      companyName: ['', Validators.required],
      companyAddress: ['', Validators.required],
      gstNumber: ['', Validators.required],
      brandName: ['', Validators.required]
    });
  }
  getAllCustomer() {
    this.customerManagementService.allCustomer().subscribe(data => {
      this.customerModel = data;
      console.log('customers', this.customerModel);
      this.customerModel.forEach((customer) => {
        if (this.id === customer._id)       {
          this.customerEdit = customer;
        }
    });
    }, error => {
      console.log(error);
    });
  }
  updateCustomer(customerDetailsForm: FormGroup, row) {
    this.customerManagementService.editCustomer(row).subscribe(data => {
      this.customerModel = data;
      this.router.navigate(['customers/viewcustomer']);
    }, error => {
      console.log(error);
    });
  }
  cancel() {
    this.router.navigate(['customers/viewcustomer']);
  }
}
