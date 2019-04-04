import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExpenseManagementService } from './../expense-management.service';
import { Expense } from '../../shared/expense.model';
import { Router } from '@angular/router';

import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';

@Component({
  selector: 'app-view-expense',
  templateUrl: './view-expense.component.html',
  styleUrls: ['./view-expense.component.css']
})
export class ViewExpenseComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  matdatasource = new MatTableDataSource([]);
  expenseDetailsForm: FormGroup;
  expenseValue: Expense[] = [];
  expenseval: Expense;
  expenseMod: Expense[];
  expenseModel: any;
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
  ExpenseType;
  constructor(private fb: FormBuilder, private expenseManagementService: ExpenseManagementService,
    private dialog: MatDialog, private router: Router) { }

  ngOnInit() {
    this.createForm();
    this.getAllExpense();
    this.getExpense();
  }
  createForm() {
    this.expenseDetailsForm = this.fb.group({
      srchterm: [''],
      fromDate: [''],
      toDate: [''],
      mobileNumber: ['', Validators.required],
      name: ['', Validators.required],
      companyName: ['', Validators.required],
      expenseType: ['', Validators.required],
      modeOfPayment: ['', Validators.required],
      location: ['', Validators.required],
      date: ['', Validators.required],
      totalAmount: ['', Validators.required],
      paid: ['', Validators.required],
      balance: ['', Validators.required],
      vouNo: ['', Validators.required],
      expensesDescription: ['', Validators.required],
      gst: ['', Validators.required]
    });
  }
  addExpense() {
    this.router.navigate(['expense/createExpense']);
  }

  getExpense() {
    this.expenseManagementService.allsttExpense().subscribe(data => {
      this.expenseMod = data[0].expenseType;
      console.log(this.expenseMod);
      this.ExpenseType = this.expenseMod;
    });
  }
  getDeleteExpense(row) {
    this.expenseManagementService.deleteExpense(row).subscribe(data => {
      this.expenseModel = data;
      this.matdatasource.data = data;
      this.matdatasource.paginator = this.paginator;
    }, error => {
      console.log(error);
    });
  }
  getViewExpense(data) {
    this.router.navigate(['expense/singleViewExpense', data._id]);
  }
  getEditExpense(row) {
    this.router.navigate(['expense/editExpense', row._id]);
  }
  getAllExpense() {
    this.expenseManagementService.allExpense().subscribe(data => {
      this.expenseval = data;
      this.expenseValue = data;
      this.expenseModel = new MatTableDataSource<Expense>(data);
      this.expenseModel.paginator = this.paginator;
      this.expenseModel = data;
      this.array = data;
      this.totalSize = this.array.length;
      this.iterator();
      this.getTotal();
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
    this.expenseModel = part;
  }
  /*  searchBy(value) {
     this.nameValue = value;
   } */
  updateExpense(expenseDetailsForm: FormGroup, row) {
    this.expenseManagementService.editExpense(row).subscribe(data => {
      this.expenseModel = data;
      this.expenseValue = data;
      this.getTotal();
    }, error => {
      console.log(error);
    });
  }
  SearchByType(row) {
    this.expenseModel = new Expense();
    this.expenseModel.expenseType = row;
    console.log(this.expenseModel);
    this.expenseManagementService.typeFilter(this.expenseModel).subscribe(data => {
      this.expenseModel = new MatTableDataSource<Expense>(data);
      this.expenseModel.paginator = this.paginator;
      this.expenseModel = data;
      this.array = data;
      this.totalSize = this.array.length;
      this.iterator();
      this.expenseValue = data;
      this.getTotal();
    }, error => {
      console.log(error);
    });
  }
  filterExpense(data) {
    this.expenseModel = new MatTableDataSource<Expense>(data);
    this.expenseModel.paginator = this.paginator;
    this.expenseModel = data;
    this.array = data;
    this.totalSize = this.array.length;
    this.iterator();
    this.expenseValue = data;
    this.getTotal();
  }
  findTDS() {
    this.expenseManagementService.tdsFind().subscribe(data => {
      this.expenseModel = new MatTableDataSource<Expense>(data);
      this.expenseModel.paginator = this.paginator;
      this.expenseModel = data;
      this.array = data;
      this.totalSize = this.array.length;
      this.iterator();
      this.expenseValue = data;
      this.getTotal();
    }, error => {
      console.log(error);
    });
  }
  findGST() {
    this.expenseManagementService.gstFind().subscribe(data => {
      this.expenseModel = new MatTableDataSource<Expense>(data);
      this.expenseModel.paginator = this.paginator;
      this.expenseModel = data;
      this.array = data;
      this.totalSize = this.array.length;
      this.iterator();
      this.expenseValue = data;
      this.getTotal();
    }, error => {
      console.log(error);
    })
  }



  searchByDate(expenseDetailsForm: FormGroup) {

    this.expenseModel = new Expense();
    this.expenseModel.fromDate = expenseDetailsForm.controls.fromDate.value;
    this.expenseModel.toDate = expenseDetailsForm.controls.toDate.value;
    this.expenseManagementService.dateFilter(this.expenseModel).subscribe(data => {
      this.expenseModel = new MatTableDataSource<Expense>(data);
      this.expenseModel.paginator = this.paginator;
      this.expenseModel = data;
      this.array = data;
      this.totalSize = this.array.length;
      this.iterator();
      this.expenseValue = data;
      this.getTotal();
    }, error => {
      console.log(error);
    });
  }
  getTotal() {
    let tot = 0;
    for (var i = 0; i <= this.expenseValue.length - 1; i++) {
      tot += this.expenseValue[i].totalAmount;
    }
    this.getBalance();
    this.getPaid();
    return tot;
  }
  getPaid() {
    let paid = 0;
    for (var i = 0; i <= this.expenseValue.length - 1; i++) {
      paid += this.expenseValue[i].paid;
    }
    return paid;
  }
  getBalance() {
    let bal = 0;

    for (var i = 0; i <= this.expenseValue.length - 1; i++) {
      bal += this.expenseValue[i].balance;
    }
    return bal;
  }
}
