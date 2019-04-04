import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MaterialManagementService } from '../material-management.service';
import { MaterialModel } from '../../shared/material-management.model';
import { Router } from '@angular/router';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
@Component({
  selector: 'app-view-material',
  templateUrl: './view-material.component.html',
  styleUrls: ['./view-material.component.css']
})
export class ViewMaterialComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  matdatasource = new MatTableDataSource([]);
  materialDetailsForm: FormGroup;
  materialModel: any = [];
  materialType: any;
  materialValue: MaterialModel;
  shootStatus = ['completed', 'not completed', 'partial'];
  /*   paymentStatus = ['yes', 'no']; */
  productType = ['shirt', 'pant'];
  shootType;
  dispatchType;
  materialStatus;
  public pageSize = 50;
  public currentPage = 0;
  public totalSize = 0;
  public array: any;
  constructor(private materialManagementService: MaterialManagementService,
    private fb: FormBuilder, private router: Router) { }
  ngOnInit() {
    this.createForm();
    this.getAllMaterial();
    this.getShootType();
    this.getDispatchType();
    this.getMaterialStatus();
  }
  getShootType() {
    this.materialManagementService.getMaterialSetting().subscribe(data => {
      this.materialType = data[0].shootType;
      this.shootType = this.materialType;
    });
  }
  getDispatchType() {
    this.materialManagementService.getMaterialSetting().subscribe(data => {
      this.materialType = data[0].dispatchType;
      this.dispatchType = this.materialType;
    });
  }
  getMaterialStatus() {
    this.materialManagementService.getMaterialSetting().subscribe(data => {
      this.materialType = data[0].materialStatus;
      this.materialStatus = this.materialType;
    });
  }
  createForm() {
    this.materialDetailsForm = this.fb.group({
      srchterm: [''],
      fromDate: [''],
      toDate: [''],
      finddate: [''],
      date: ['', Validators.required],
      customerName: ['', Validators.required],
      productType: [''],
      /*   shootType: [''], */
      /*     noOfProduct: [''],
          shootStatus: [''], */
    });
  }
  getAllMaterial() {
    this.materialManagementService.getAllMaterial().subscribe(data => {
      this.materialModel = data;
      this.materialValue = data;
      /*      this.getNoOfProduct(); */
      this.materialModel = new MatTableDataSource<MaterialModel>(data);
      this.materialModel.paginator = this.paginator;
      this.materialModel = data;
      this.array = data;
      this.totalSize = this.array.length;
      this.iterator();

    });
  }
  addNewMaterial() {
    this.router.navigate(['material/creatematerial']);
  }
  getViewMaterial(data) {
    this.router.navigate(['material/viewsinglematerial', data._id]);
  }
  getDeleteMaterial(test) {
    this.materialManagementService.deleteMaterial(test).subscribe(data => {
      this.materialModel = data;
      this.materialValue = data;
      /*   this.getNoOfProduct(); */
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
    this.router.navigate(['material/editmaterial', data._id]);
  }
  filterMaterial(data) {
    this.materialModel = data;
    /* this.getNoOfProduct(); */
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
    this.materialManagementService.getByDateMaterial(this.materialModel).subscribe(data => {
      this.materialModel = data;
      /* this.getNoOfProduct(); */
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
  searchByDateMaterial(materialDetailsForm: FormGroup) {
    this.materialModel = new MaterialModel();
    this.materialModel.finddate = materialDetailsForm.controls.finddate.value;
    this.materialManagementService.getByDateSingleMaterial(this.materialModel).subscribe(data => {
      this.materialModel = data;
      /*  this.getNoOfProduct(); */
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
  /* getNoOfProduct() {
    let bal = 0;
    for (let i = 0; i < this.materialModel.length; i++) {
      if (this.materialModel[i].noOfProduct) {
        bal += this.materialModel[i].noOfProduct;
      }
    }
    return bal;
  } */
  SearchByShootStatus(row) {
    this.materialModel = new MaterialModel();
    this.materialModel.shootStatus = row;
    this.materialManagementService.shootStatus(this.materialModel).subscribe(data => {
      this.materialValue = data;
      this.materialModel = new MatTableDataSource<MaterialModel>(data);
      this.materialModel.paginator = this.paginator;
      this.materialModel = data;
      this.array = data;
      this.totalSize = this.array.length;
      this.iterator();
      /*  this.getNoOfProduct(); */
    }, error => {
      console.log(error);
    });
  }
  SearchByPaymentStatus(row) {
    this.materialModel = new MaterialModel();
    this.materialModel.paymentStatus = row;
    console.log(this.materialModel);
    this.materialManagementService.paymentStatus(this.materialModel).subscribe(data => {
      this.materialModel = data;
      this.materialValue = data;
      /*  this.getNoOfProduct(); */
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
  SearchByShootType(row) {
    this.materialModel = new MaterialModel();
    this.materialModel.shootType = row;
    console.log(this.materialModel);
    this.materialManagementService.shootType(this.materialModel).subscribe(data => {
      this.materialModel = data;
      this.materialValue = data;
      /* this.getNoOfProduct(); */
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
  SearchByDispatchType(row) {
    this.materialModel = new MaterialModel();
    this.materialModel.dispatchType = row;
    console.log(this.materialModel);
    this.materialManagementService.dispatchType(this.materialModel).subscribe(data => {
      this.materialModel = data;
      this.materialValue = data;
      /*   this.getNoOfProduct(); */
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
  SearchByMaterialStauts(row) {
    this.materialModel = new MaterialModel();
    this.materialModel.materialStatus = row;
    console.log(this.materialModel);
    this.materialManagementService.materialStatus(this.materialModel).subscribe(data => {
      this.materialValue = data;
      /* this.getNoOfProduct(); */
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
  /*  findPaymentStatus(value){
     this.materialManagementService.getPaymentStatus(value.workOrderID).subscribe(data => {
       this.materialModel = data;
     })
   } */

}
