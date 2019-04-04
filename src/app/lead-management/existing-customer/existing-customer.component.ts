import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Customer } from './../../shared/customer.model';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { LeadManagementService } from './../lead-management.service';


@Component({
  selector: 'app-existing-customer',
  templateUrl: './existing-customer.component.html',
  styleUrls: ['./existing-customer.component.css']
})
export class ExistingCustomerComponent implements OnInit {
  mobileNumberList = new FormControl('');
  customerModel: Customer[] = [];
  filteredOptions: Observable<Customer[]>;
  existingCustomerDetails: Customer[];
  constructor( public dialogRef: MatDialogRef<ExistingCustomerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Customer, private leadManagementService: LeadManagementService) { }

  ngOnInit() {
    this.getAllCustomer();
    this.filteredOptions = this.mobileNumberList.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }
  private _filter(value: string): Customer[] {
    const filterValue = value;
    this.customerModel.forEach(data => {
      if (!data.mobileNumber)           {
        data.mobileNumber = 0;
      }
    });
    return this.customerModel.filter(option => option.mobileNumber.toString().indexOf(filterValue.toString()) > -1);
  }
  
  selectedCustomer(selected, selectedId)     {
    if (selected.isUserInput === true)       {
    this.existingCustomerDetails  = this.customerModel.filter(data =>
      data._id.toString().indexOf(selectedId) === 0);
      this.dialogRef.close(this.existingCustomerDetails);
      /* this.customerModel.forEach(function(customer: Customer) {
        console.log(selectedId);
        if (customer._id === selectedId) {
          customer.showDetail = true;
        }       else {
          customer.showDetail = false;
        }
      }); */
    }
  }
  closed()   {
    this.dialogRef.close(false);
  }
  getAllCustomer() {
    this.leadManagementService.allCustomer().subscribe(data => {
      this.customerModel = data;
    }, error => {
      console.log(error);
    });
  }
}
