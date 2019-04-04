import { Component, OnInit, Inject } from '@angular/core';
import { MaterialModel } from '../../shared/material-management.model';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { MaterialManagementService } from '../material-management.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Router } from '@angular/router';
import { IncomeModel } from '../../shared/income.model';
@Component({
  selector: 'app-edit-material',
  templateUrl: './edit-material.component.html',
  styleUrls: ['./edit-material.component.css']
})
export class EditMaterialComponent implements OnInit {
  materialDetailForm: FormGroup;
  materialEdit: any;
  materialType: any;
  materialModel: any;
  materialValue: MaterialModel;
  product: FormArray;
  id;
  shootStatus = ['completed', 'not completed', 'partial'];
  paymentStatus;
  unit = ['Studio', 'BSS', 'Technologies'];
  shootType;
  materialStatus;
  dispatchType;
  completed: boolean;
  pending: boolean;
  constructor(private marerialManagementService: MaterialManagementService,
    private fb: FormBuilder, private router: Router, private route: ActivatedRoute) { }
  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id');
    });
    this.createForm();
    this.getAllMaterial();
    this.getShootType();
    this.getMaterialStatus();
    this.getDispatchType();
  }
  createForm() {
    this.materialDetailForm = this.fb.group({
      workOrderID: [''],
      DCnumber: [''],
      date: ['', Validators.required],
      customerName: [''],
      receivedBy: [''],
      unit: [''],
      /*  productType: [''],
       noOfProduct: [''],
       shootType: [''], */
      shootStatus: [''],
      paymentStatus: [''],
      modeOfInward: [''],
      modeOfOutward: [''],
      dispatchType: [''],
      materialStatus: [''],
      remark: [''],
      product: this.fb.array([])
    })
    /*  this.addForm(); */
  }
  addForm() {
    const product = this.fb.group({
      productType: [''],
      noOfProduct: ['']
    });
    this.productForms.push(product);
  }
  get productForms() {
    return this.materialDetailForm.get('product') as FormArray;
  }

  deleteProducts(i) {
    this.productForms.removeAt(i);
  }

  addNewForm() {
    for (let i = 0; i <= this.materialEdit.product.length - 1; i++) {
      const product = this.fb.group({
        _id: [this.materialEdit.product[i]._id],
        productType: [this.materialEdit.product[i].productType],
        noOfProduct: [this.materialEdit.product[i].noOfProduct]

      });
      this.productForms.push(product);
    }
  }

  getAllMaterial() {
    this.marerialManagementService.getAllMaterial().subscribe(data => {
      this.materialModel = data;
      this.materialModel.forEach(element => {
        if (this.id === element._id) {
          this.findPaymentStatus(element.workOrderID);
          this.materialEdit = element;
          console.log(this.materialEdit);
          this.addNewForm();
        }
      });
    }, error => {
      console.log(error);
    });
  }
  updateMaterial(materialDetailForm: FormGroup, data) {
    this.marerialManagementService.getUpdateMaterial(materialDetailForm.value, data._id).subscribe(data => {
      this.materialEdit = data;
      this.router.navigate(['material/viewmaterial']);
    }, error => {
      console.log(error);
    });
  }
  cancel() {
    this.router.navigate(['material/viewmaterial']);
  }
  getShootType() {
    this.marerialManagementService.getMaterialSetting().subscribe(data => {
      this.materialType = data[0].shootType;
      console.log(this.materialValue);
      this.shootType = this.materialType;
    });
  }
  getMaterialStatus() {
    this.marerialManagementService.getMaterialSetting().subscribe(data => {
      this.materialType = data[0].materialStatus;
      this.materialStatus = this.materialType;
    });
  }
  getDispatchType() {
    this.marerialManagementService.getMaterialSetting().subscribe(data => {
      this.materialType = data[0].dispatchType;
      this.dispatchType = this.materialType;
    });
  }
  findPaymentStatus(value) {
    this.marerialManagementService.getPaymentStatus(value).subscribe(data => {
      if (data.balanceAmount === 0) {
        this.paymentStatus = 'completed';
      } else {
        this.paymentStatus = 'pending';
      }
    });
  }
}
