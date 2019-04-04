import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerManagementService } from './../../customer-management.service';
import { MarketCustomer } from './../create-marketcustomer/marketCustomer.model';
import { Router } from '@angular/router';
import { CreateMarketcustomerService } from './../../marketcustomer/create-marketcustomer/create-marketcustomer.service';
import { AlertDeleteService } from './../../shared/alert-delete/alert-delete.service';
import { ViewsinglemarketcustomerService } from '../view-singlemarketcustomer/viewsinglemarketcustomer.service';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';


@Component({
  selector: 'app-view-marketcustomer',
  templateUrl: './view-marketcustomer.component.html',
  styleUrls: ['./view-marketcustomer.component.css']
})
export class ViewMarketcustomerComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  matdatasource = new MatTableDataSource([]);
  customerMarketModel: any;
  customerMarketValue: MarketCustomer;
  public pageSize = 50;
  public currentPage = 0;
  public totalSize = 0;

  public array: any;
  public displayedColumns = ['', '', '', '', ''];
  public dataSource: any;

  constructor(private fb: FormBuilder,
    private customerManagementService:
      CustomerManagementService,
    private dialog: MatDialog, private router: Router, private snack: MatSnackBar,
    private createMarketcustomerService: CreateMarketcustomerService, private alertDeleteService: AlertDeleteService,
    private viewsinglemarketcustomerService: ViewsinglemarketcustomerService) { }

  ngOnInit() {
    this.getAllMarketCustomer();
  }
  getViewMarketSingleCustomer(data) {
    this.viewsinglemarketcustomerService.openSingleMarketCustomer(data);
  }
  filterMarketCustomer(data) {
    this.customerMarketModel = new MatTableDataSource<MarketCustomer>(data);
    this.customerMarketModel.paginator = this.paginator;
    this.customerMarketModel = data;

  }
  addMarketCustomer() {
    this.createMarketcustomerService.openMarketCustomer()
      .subscribe(res => {
        if (res) {
          this.getAllMarketCustomer();
        }
      });
  }
  getEditMarketCustomer(row) {
    this.router.navigate(['customers/editmarket', row._id]);
  }
  getAllMarketCustomer() {
    this.customerManagementService.allMarketCustomer().subscribe(data => {
      this.customerMarketValue = data;
      this.customerMarketModel = new MatTableDataSource<MarketCustomer>(data);
      this.customerMarketModel.paginator = this.paginator;
      this.customerMarketModel = data;
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
    this.customerMarketModel = part;
  }

  getDeleteMarketCustomer(row) {
    this.alertDeleteService.confirm()
      .subscribe(res => {
        if (res) {
          this.customerManagementService.deleteMarketCustomer(row)
            .subscribe(data => {
              this.customerMarketModel = data;
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
