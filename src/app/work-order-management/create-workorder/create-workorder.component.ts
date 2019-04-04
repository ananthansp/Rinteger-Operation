import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { WorkOrder } from './../../shared/workorder.model';
import { WorkOrderService } from './../work-order.service';
import { ActivatedRoute } from '@angular/router';
import { LeadManagementService } from './../../lead-management/lead-management.service';
import { CustomerManagementService } from './../../customer-management/customer-management.service';
import { Lead } from './../../shared/lead.model';
import { Customer } from './../../shared/customer.model';
import { WorkOrderPdf } from '../../shared/workorderpdf.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-workorder',
  templateUrl: './create-workorder.component.html',
  styleUrls: ['./create-workorder.component.css'],
  providers: [LeadManagementService, CustomerManagementService, WorkOrderService]
})
export class CreateWorkorderComponent implements OnInit {

  constructor(private fb: FormBuilder, private workOrderService: WorkOrderService
    , private route: ActivatedRoute, private leadManagementService: LeadManagementService,
    private customerManagementService: CustomerManagementService,
    private router: Router
  ) { }
  requirements: FormArray;
  workOrderDetailsForm: FormGroup;
  workOrderPDFModel: WorkOrderPdf;
  workOrder: WorkOrder;
  leadModel: Lead[] = [];
  customerModel: Customer;
  currentDate = new Date();
  arryValue: any = [];
  sum = 0;
  id;
  leadId;
  requirementsData;
  taxVal;
  gstVal;
  gstEnabled: boolean;
  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    this.leadId = this.route.snapshot.params.leadId;
    this.getSingleLeads();
    this.getSingleCustomer();
    this.createForm();
    this.viewCompanyDetails();
    this.getTotal();
  }
  createForm() {
    this.workOrderDetailsForm = this.fb.group({
      customerID: [''],
      customerName: ['', Validators.required],
      companyName: ['', Validators.required],
      companyAddress: ['', Validators.required],
      workOrderID: ['', Validators.required],
      leadID: ['', Validators.required],
      leadUnit: ['', Validators.required],
      emailId: ['', Validators.required],
      name: ['', Validators.required],
      mobileNumber: ['', Validators.required],
      date: ['', Validators.required],
      requirements: this.fb.array([]),
      allTotal: ['', Validators.required],
      subTotal: ['', Validators.required],
      tax: ['', Validators.required]
    });
  }
  viewCompanyDetails() {
    this.workOrderService.workorderPDFDetails().subscribe(data => {
      if (data.length !== 0) {
        this.workOrderPDFModel = data;
        this.gstVal = this.workOrderPDFModel[0].gst;
      }
    }, error => {
      console.log(error);
    });
  }
  checkGst(event) {
    if (event.checked) {
      this.gstVal = 0;
    } else {
      this.gstVal = this.workOrderPDFModel[0].gst;
    }
  }
  cancelWorkOrder() {
    this.router.navigate(['lead/leadview']);
  }
  createLeadWorkOrder(workOrderDetailsForm: FormGroup) {
    console.log('value', this.taxVal);
    this.workOrder = new WorkOrder(
      workOrderDetailsForm.controls.customerID.value,
      workOrderDetailsForm.controls.customerName.value,
      workOrderDetailsForm.controls.companyName.value,
      workOrderDetailsForm.controls.companyAddress.value,
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
    this.workOrderService.createWorkOrder(this.workOrder).subscribe(data => {
      this.workOrder = data;
      this.router.navigate(['workorder/viewworkorder', this.workOrder.leadID]);
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
  addForm() {
    for (let j = 0; j <= this.leadModel.length - 1; j++) {
      console.log(' requirements length ', this.leadModel[j].requirements);
      for (let i = 0; i <= this.leadModel[j].requirements.length - 1; i++) {
        this.requirementsData = this.fb.group({
          id: [this.leadModel[j].requirements[i]._id],
          item: [this.leadModel[j].requirements[i].item],
          quantity: [this.leadModel[j].requirements[i].quantity],
          price: [this.leadModel[j].requirements[i].price],
          discount: [this.leadModel[j].requirements[i].discount],
          description: [this.leadModel[j].requirements[i].description],
          total: [this.leadModel[j].requirements[i].total]
        });
        this.requirementsForms.push(this.requirementsData);
      }
    }
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
  getSingleCustomer() {
    this.customerManagementService.singleCustomer(this.id).subscribe(data => {
      this.customerModel = data;
      console.log('customers', this.customerModel);
    }, error => {
      console.log(error);
    });
  }
  getSingleLeads() {
    this.leadManagementService.singleLead(this.leadId).subscribe(data => {
      this.leadModel = data;
      this.addForm();
      this.getTotal();
      console.log('single leads', this.leadModel);
    }, error => {
      console.log(error);
    });
  }
}

