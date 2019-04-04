import { Component, OnInit, Inject } from '@angular/core';
import { MarketCustomer } from '../../marketcustomer/create-marketcustomer/marketCustomer.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerManagementService } from './../../customer-management.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-marketcustomer',
  templateUrl: './edit-marketcustomer.component.html',
  styleUrls: ['./edit-marketcustomer.component.css']
})
export class EditMarketcustomerComponent implements OnInit {
  marketCustomerDetailsForm: FormGroup;
  marketModel: MarketCustomer[];
  marketEdit: MarketCustomer;
  id;
  constructor(private fb: FormBuilder,
    private customerManagementService: CustomerManagementService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }


  ngOnInit() {
    this.createForm();
    this.getAllMarketCustomer();
    this.id = this.route.snapshot.params.id;
  }
  createForm() {
    this.marketCustomerDetailsForm = this.fb.group({
      mobileNumber: ['', Validators.required],
      customerName: ['', Validators.required],
      emailId: [''],
      location: [''],
      whatsAppNo: [''],
      landLine: [''],
    });
  }
  getAllMarketCustomer() {
    this.customerManagementService.allMarketCustomer().subscribe(data => {
      this.marketModel = data;
      this.marketModel.forEach((customer) => {
        if (this.id === customer._id) {
          this.marketEdit = customer;
        }
      });
    }, error => {
      console.log(error);
    });
  }
  updateMarketCustomer(row) {
    this.customerManagementService.editMarketCustomer(row).subscribe(data => {
      this.marketModel = data;
      this.router.navigate(['customers/viewmarket']);
    }, error => {
      console.log(error);
    });
  }
  cancel() {
    this.router.navigate(['customers/viewmarket']);
  }
}
