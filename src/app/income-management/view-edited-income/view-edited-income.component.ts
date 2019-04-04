import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IncomeModel } from '../../shared/income.model';
import { Router } from '@angular/router';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { IncomeManagementService } from '../income-management.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HttpInterceptingHandler } from '@angular/common/http/src/module';

@Component({
  selector: 'app-view-edited-income',
  templateUrl: './view-edited-income.component.html',
  styleUrls: ['./view-edited-income.component.css']
})
export class ViewEditedIncomeComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  incomeDetailsForm: FormGroup;
  matdatasource = new MatTableDataSource([]);
  incomeModel: any;
  incomeValue: IncomeModel;
  public pageSize = 50;
  public currentPage = 0;
  public totalSize = 0;
  public arry: any;

  public displayedColumns = ['', '', '', '', ''];
  public dataSource: any;
  
  constructor(private incomemanagementservice: IncomeManagementService, private router: Router,
    private fb: FormBuilder) { }

    createForm(){
      this.incomeDetailsForm = this.fb.group({     
        workOrderID: ['', Validators.required],
        customerName: ['', Validators.required],
        date: ['', Validators.required],
        companyName: ['', Validators.required],
        modeOfIncome: ['', Validators.required],
        allTotal: ['', Validators.required],
        paidAmount: ['', Validators.required],
        tds: ['', Validators.required],
        balanceAmount: ['', Validators.required],
        gst: ['', Validators.required]       
      });
    }
  ngOnInit() {
    this.createForm();
    this.findAllInome();
  }
  findAllInome(){
    this.incomemanagementservice.getFindAll().subscribe(data =>{
      this.incomeModel = data;
      this.incomeValue = data;
      this.incomeModel = new MatTableDataSource<IncomeModel>(data);
      this.incomeModel.paginator = this.paginator;
      this.incomeModel = data;
      this.getTotal();
      this.arry = data;
      this.totalSize = this.arry.length;
      this.iterator();
    },error => {
      console.log(error);
    })
  }
  filterIncome(data){
    this.incomeModel = new MatTableDataSource<IncomeModel>(data);
    this.incomeModel.paginator = this.paginator;
    this.incomeModel = data;
    this.arry = data;
    this.totalSize = this.arry.length;
    this.iterator();
    this.getTotal();
  }
  getEditIncome(data){
    this.router.navigate(['income/editincomesheet',data._id]);
  }
  getDeleteIncome(data){
    this.incomemanagementservice.DeleteIncomeSheet(data).subscribe(data =>{
      this.incomeModel = data;
    })
  }
  getTds(){
    this.incomemanagementservice.getTDS().subscribe(data => {
      this.incomeModel = new MatTableDataSource<IncomeModel>(data);
      this.incomeModel.paginator = this.paginator;
      this.incomeModel = data;
      this.arry = data;
      this.totalSize = this.arry.length;
      this.iterator();
      this.incomeValue = data;
      this.getTotal();
    })
  }
  getAll(){
    this.incomemanagementservice.getFindAll().subscribe(data =>{
      this.incomeModel = data;
      this.incomeValue = data;
      this.getTotal();
  })
}
public handlePage(e: any) {
  this.currentPage = e.pageIndex;
  this.pageSize = e.pageSize;
  this.iterator();
}
private iterator() {
  const end = (this.currentPage + 1) * this.pageSize;
  const start = this.currentPage * this.pageSize;
  const part = this.arry.slice(start, end);
  this.incomeModel = part;
}
getTotal() {
  let tot = 0;    
  for (var i = 0; i <= this.incomeModel.length-1; i++){
    tot += this.incomeModel[i].allTotal;      
  }    
  this.getBalance();
  this.getPaid();
  this.getTdsTotal();
  return tot;
}
getPaid() {
  let paid = 0;
  for (var i = 0; i <= this.incomeModel.length-1; i++){
    paid += this.incomeModel[i].paidAmount;
  }
  return paid;
}
getBalance() {
  let bal = 0;
  
  for (var i = 0; i <= this.incomeModel.length-1; i++){
    bal += this.incomeModel[i].balanceAmount;
  }
  return bal;
}
getTdsTotal() {
  let td = 0;
  
  for (var i = 0; i <= this.incomeModel.length-1; i++){
    td += this.incomeModel[i].tds;
  }
  return td;
}
}
