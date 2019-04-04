import { Component, OnInit } from '@angular/core';
import { Lead } from './../../shared/lead.model';
import { Customer } from './../../shared/customer.model';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkOrderService } from './../work-order.service';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { WorkOrder } from './../../shared/workorder.model';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import {MatSnackBar} from '@angular/material';
@Component({
  selector: 'app-edit-workorder',
  templateUrl: './edit-workorder.component.html',
  styleUrls: ['./edit-workorder.component.css']
})
export class EditWorkorderComponent implements OnInit {
  requirements: FormArray;
  workOrderDetailsForm: FormGroup;
  workOrder: WorkOrder;
  workOrderData: WorkOrder;
  leadModel: Lead[] = [];
  customerModel: Customer;
  arryValue: any = [];
  requirementsData;
  sum = 0;
  leadId: string;
  workId: string;
  message;
  action;
  constructor(private fb: FormBuilder, private workOrderService: WorkOrderService
    , private route: ActivatedRoute,  private snackBar: MatSnackBar, private router: Router) { }

  ngOnInit() {
    this.leadId = this.route.snapshot.params.leadId;
    this.workId = this.route.snapshot.params.workId;
    this.viewWorkOrder();
    this.createForm();
  }
  createForm() {
    this.workOrderDetailsForm = this.fb.group({
      customerID: [''],
      companyName: [''],
      address: [''],
      customerName: [''],
      workOrderID: [''],
      emailId: [''],
      leadUnit: [''],
      leadID: ['', Validators.required],
      name: ['', Validators.required],
      mobileNumber: ['', Validators.required],
      date: [''],
      requirements: this.fb.array([]),
      allTotal: ['', Validators.required],
      subTotal: ['', Validators.required],
      tax: ['', Validators.required]
    });
  }
  viewWorkOrder()   {
    this.workOrderService.viewSingleWorkOrder(this.workId).subscribe(data => {
      this.workOrder = data[0];
      console.log(this.workOrder);
      this.addForm();
      this.getTotal();
    }, error => {
      console.log(error);
    });
  }
  cancelWorkorder()   {
    this.router.navigate(['workorder/viewallworkorder']);
  }
  addForm() {
    for (let i = 0; i <= this.workOrder.requirements.length - 1; i++)     {
      this.requirementsData = this.fb.group({
        id: [this.workOrder.requirements[i]._id],
        item: [this.workOrder.requirements[i].item],
        quantity: [this.workOrder.requirements[i].quantity],
        price: [this.workOrder.requirements[i].price],
        discount: [this.workOrder.requirements[i].discount],
        description: [this.workOrder.requirements[i].description],
        total: [this.workOrder.requirements[i].total]
      });
      this.requirementsForms.push(this.requirementsData);
    }
}
  updateWorkOrder(workOrderDetailsForm: FormGroup)   {
    this.message = 'WorkOrder Updated Successfully';
    console.log(workOrderDetailsForm.value);
    this.workOrder = new WorkOrder(
      workOrderDetailsForm.controls.customerID.value,
      workOrderDetailsForm.controls.customerName.value,
      workOrderDetailsForm.controls.companyName.value,
      workOrderDetailsForm.controls.address.value,
      workOrderDetailsForm.controls.leadID.value,
      workOrderDetailsForm.controls.leadUnit.value,
      workOrderDetailsForm.controls.mobileNumber.value,
      workOrderDetailsForm.controls.emailId.value,
      workOrderDetailsForm.controls.date.value,
      workOrderDetailsForm.controls.requirements.value,
      workOrderDetailsForm.controls.allTotal.value,
      workOrderDetailsForm.controls.subTotal.value,
      workOrderDetailsForm.controls.tax.value
    );
    this.workOrder.workOrderID =  workOrderDetailsForm.controls.workOrderID.value;
    this.workOrderService.updateSingleWorkOrder(this.workOrder, this.workId).subscribe(data => {
      this.workOrderData = data[0];
      this.snackBar.open(this.message, this.action, {
        duration: 3000,
      });
      this.router.navigate(['workorder/viewallworkorder']);
    }, error => {
      console.log(error);
    });
  }
  addNewForm() {
    const requirements = this.fb.group({
      item: [''],
      quantity: [''],
      price: [''],
      discount: [''],
      description: [''],
      total: ['']
    });
    this.requirementsForms.push(requirements);
  }

  get requirementsForms() {
    return this.workOrderDetailsForm.get('requirements') as FormArray;
  }
  getTotal() {
    this.sum = 0;
    this.arryValue = this.workOrderDetailsForm.controls.requirements;
    this.arryValue.controls.forEach(x => {
      const parsed = +x.get('total').value;
      this.sum += parsed;
      console.log(this.sum);
    });
  }
  deleteRequirements(i) {
    this.requirementsForms.removeAt(i);
    this.getTotal();
  }
}
