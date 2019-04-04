import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerManagementService } from './../../customer-management.service';
import { Customer } from './../create-customer/customer.model';
import { Router } from '@angular/router';
import { CreateCustomerService } from './../../customer/create-customer/create-customer.service';
import { AlertDeleteService } from './../../shared/alert-delete/alert-delete.service';
import { ViewsinglecustomerService } from '../view-singlecustomer/viewsinglecustomer.service';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';

@Component({
  selector: 'app-view-customer',
  templateUrl: './view-customer.component.html',
  styleUrls: ['./view-customer.component.css'],
  providers: [CreateCustomerService, AlertDeleteService]
})
export class ViewCustomerComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  matdatasource = new MatTableDataSource([]);
  customerDetailsForm: FormGroup;
  customerModel: any;
  customerValue: Customer;
  public pageSize = 50;
  public currentPage = 0;
  public totalSize = 0;

  public array: any;
  public displayedColumns = ['', '', '', '', ''];
  public dataSource: any;
  mobileValue;
  emailValue;
  nameValue;
  cityValue;
  searchType = ['MobileNumber', 'Name', 'City'];

  constructor(private fb: FormBuilder,
    private customerManagementService:
      CustomerManagementService,
    private dialog: MatDialog, private router: Router, private snack: MatSnackBar,
    private createCustomerService: CreateCustomerService, private alertDeleteService: AlertDeleteService,
     private singlecustomerService: ViewsinglecustomerService) { }

  ngOnInit() {
    this.createForm();
    this.getAllCustomer();
  }
  filterCustomer(data) {
    this.customerModel = new MatTableDataSource<Customer>(data);
    this.customerModel.paginator = this.paginator;
    this.customerModel = data;
  }
  createForm() {
    this.customerDetailsForm = this.fb.group({
      srchterm: [''],
      customerID: [''],
      mobileNumber: ['', Validators.required],
      name: ['', Validators.required],
      emailId: ['', Validators.required],
      location: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      pincode: ['', Validators.required],
      companyName: ['', Validators.required],
      companyAddress: ['', Validators.required],
      gstNumber: ['', Validators.required],
      brandName: ['', Validators.required]
    });
  }
  getViewSingleCustomer(data)   {
    this.singlecustomerService.openSingleCustomer(data);
  }
  addCustomer() {
    this.createCustomerService.openCustomer()
      .subscribe(res => {
        if (res) {
        this.getAllCustomer();
        }
      });
  }
  getEditCustomer(row) {
    this.router.navigate(['customers/editcustomer', row._id]);
  }
  getAllCustomer() {
    this.customerManagementService.allCustomer().subscribe(data => {
      this.customerValue = data;
      this.customerModel = new MatTableDataSource<Customer>(data);
      this.customerModel.paginator = this.paginator;
      this.customerModel = data;
      this.array = data;
      this.totalSize = this.array.length;
      this.iterator();
    }, error => {
      console.log(error);
    });
  }
  public handlePage(e: any) {
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.iterator();
  }
  private iterator() {
    const end = (this.currentPage + 1) * this.pageSize;
    const start = this.currentPage * this.pageSize;
    const part = this.array.slice(start, end);
    this.customerModel = part;
  }

  /* getDeleteCustomer(row) {
    this.customerManagementService.deleteCustomer(row).subscribe(data => {
      this.customerModel = data;
      this.matdatasource.data = data;
      this.matdatasource.paginator = this.paginator;
    }, error => {
      console.log(error);
    });
  } */
  getDeleteCustomer(row) {
    this.alertDeleteService.confirm()
      .subscribe(res => {
        if (res) {
          this.customerManagementService.deleteCustomer(row)
            .subscribe(data => {
              this.customerModel = data;
              this.matdatasource.data = data;
              this.matdatasource.paginator = this.paginator;
              this.snack.open('Successfully Deleted!', 'OK', { duration: 4000, panelClass: ['blue-snackbar'] });
            }, error => {
              console.log(error);
            }
            );
        }
      });
  }
}
