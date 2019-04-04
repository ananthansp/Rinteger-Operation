import { Component, OnInit, ViewChild } from '@angular/core';
import { Customer } from './../../customer/create-customer/customer.model';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { CustomerManagementService } from './../../customer-management.service';
import { ViewSingleSubscribecustomerService } from './../view-single-subcribecustomer/view-single-subscribecustomer.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { AlertDeleteService } from './../../shared/alert-delete/alert-delete.service';



@Component({
  selector: 'app-view-subcribecustomer',
  templateUrl: './view-subcribecustomer.component.html',
  styleUrls: ['./view-subcribecustomer.component.css']
})
export class ViewSubcribecustomerComponent implements OnInit {
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
  constructor(private fb: FormBuilder,
    private customerManagementService:
      CustomerManagementService, private snack: MatSnackBar, private alertDeleteService: AlertDeleteService,
    private viewSingleSubscribecustomerService: ViewSingleSubscribecustomerService) { }

  ngOnInit() {
    this.getSubscribeCustomer();
  }
  filterCustomer(data) {
    this.customerModel = new MatTableDataSource<Customer>(data);
    this.customerModel.paginator = this.paginator;
    this.customerModel = data;

  }
  getViewSingleCustomer(data) {
    this.viewSingleSubscribecustomerService.openSingleSubscribeCustomer(data);
  }
  getSubscribeCustomer() {
    this.customerManagementService.allSubscribeCustomer().subscribe(data => {
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
  getDeleteSubscribeCustomer(row) {
    this.alertDeleteService.confirm()
      .subscribe(res => {
        if (res) {
          this.customerManagementService.deleteSubscribeCustomer(row)
            .subscribe(data => {
              this.customerModel = data;
              this.matdatasource.data = data;
              this.matdatasource.paginator = this.paginator;
              this.snack.open('Successfully Deleted!', 'OK', { duration: 4000, panelClass: ['blue-snackbar'] });
            }, error => {
              console.log(error);
            });
        }
      });
  }
}
