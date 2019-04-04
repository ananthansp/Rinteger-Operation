import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MaterialModel } from '../../shared/material-management.model';
import { Router } from '@angular/router';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { MaterialManagementService } from '../material-management.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Product } from '../../shared/product.model';
@Component({
  selector: 'app-front-screen',
  templateUrl: './front-screen.component.html',
  styleUrls: ['./front-screen.component.css']
})
export class FrontScreenComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  matdatasource = new MatTableDataSource([]);
  materialDetailsForm: FormGroup;
  materialModel: any;
  materialValue: MaterialModel;
  public pageSize = 50;
  public currentPage = 0;
  public totalSize = 0;
  public array: any;
  constructor(private materialManagementService: MaterialManagementService, private router: Router,
    private fb: FormBuilder) { }
  ngOnInit() {
    this.createForm();
    this.findAllWorkOrder();
  }
  createForm() {
    this.materialDetailsForm = this.fb.group({
      fromDate: [''],
      toDate: [''],
      workOrderID: [''],
      customerName: [''],
      date: ['']
    });
  }
  findAllWorkOrder() {
    this.materialManagementService.getAllWorkOrider().subscribe(data => {
      this.materialModel = data;
      this.materialValue = data;
      this.materialModel = new MatTableDataSource<MaterialModel>(data);
      this.materialModel.paginator = this.paginator;
      this.materialModel = data;
      this.array = data;
      this.totalSize = this.array.length;
      this.iterator();
    }, error => {
      console.log(error);
    });
  }
  getEditMaterial(data) {
    this.router.navigate(['material/creatematerial', data._id]);
  }
  getMaterialSheet() {
    this.router.navigate(['material/viewmaterial']);
  }
  getDeleteMaterial(value) {
    this.materialManagementService.deleteWorkorder(value).subscribe(data => {
      this.materialModel = data;
      this.materialValue = data;
      this.materialModel = new MatTableDataSource<MaterialModel>(data);
      this.materialModel.paginator = this.paginator;
      this.materialModel = data;
      this.array = data;
      this.totalSize = this.array.length;
      this.iterator();
    }, error => {
      console.log(error);
    });
  }
  filterMaterial(data) {

    this.materialModel = data;
    this.materialValue = data;
    this.materialModel = new MatTableDataSource<MaterialModel>(data);
    this.materialModel.paginator = this.paginator;
    this.materialModel = data;
    this.array = data;
    this.totalSize = this.array.length;
    this.iterator();
  }
  searchByDate(materialDetailsForm: FormGroup) {
    this.materialModel = new MaterialModel();
    this.materialModel.fromDate = materialDetailsForm.controls.fromDate.value;
    this.materialModel.toDate = materialDetailsForm.controls.toDate.value;
    this.materialManagementService.getByDate(this.materialModel).subscribe(data => {
      this.materialModel = data;
      this.materialModel = new MatTableDataSource<MaterialModel>(data);
      this.materialModel.paginator = this.paginator;
      this.materialModel = data;
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
    this.materialModel = part;
  }
}
