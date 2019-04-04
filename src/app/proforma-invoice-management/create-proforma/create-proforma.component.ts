import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { ProformaInvoice } from './../../shared/proformaInvoice.model';
import { ProformaInvoiceService } from './../proforma-invoice.service';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { WorkOrder } from './../../shared/workorder.model';
import { WorkOrderPdf } from '../../shared/workorderpdf.model';

@Component({
  selector: 'app-create-proforma',
  templateUrl: './create-proforma.component.html',
  styleUrls: ['./create-proforma.component.css']
})
export class CreateProformaComponent implements OnInit {

  constructor(private fb: FormBuilder, private proformaInvoiceService: ProformaInvoiceService
    , private route: ActivatedRoute, private router: Router
    ) { }
  requirements: FormArray;
  proformaInvoiceDetailsForm: FormGroup;
  proformaInvoice: ProformaInvoice;
  workOrder: WorkOrder;
  arryValue: any = [];
  sum = 0;
  leadId;
  workId;
  requirementsData;
  taxVal;
  gstVal;
  workOrderPDFModel: WorkOrderPdf;
  ngOnInit() {
    this.route.paramMap.subscribe(
      (params: ParamMap) => {
        this.leadId = params.get('leadId');
        this.workId = params.get('workId');
      }
    );
    this.createForm();
    this.viewWorkOrder();
  }
  createForm() {
    this.proformaInvoiceDetailsForm = this.fb.group({
      customerID: [''],
      customerName: [''],
      companyName: [''],
      workOrderID: [''],
      companyAddress: ['', Validators.required],
      mobileNumber: ['', Validators.required],
      emailId: ['', Validators.required],
      leadID: ['', Validators.required],
      date: ['', Validators.required],
      expiryDate: ['', Validators.required],
      requirements: this.fb.array([]),
      allTotal: ['', Validators.required],
      subTotal: ['', Validators.required],
      tax: ['', Validators.required]
    });
  }
  viewCompanyDetails() {
    this.proformaInvoiceService.workorderPDFDetails().subscribe(data => {
      this.workOrderPDFModel = data;
      this.gstVal = this.workOrderPDFModel[0].gst;
    }, error => {
      console.log(error);
    });
  }
  createLeadProformaInvoice(proformaInvoiceDetailsForm: FormGroup)   {
    this.proformaInvoice = new ProformaInvoice(
      proformaInvoiceDetailsForm.controls.customerID.value,
      proformaInvoiceDetailsForm.controls.customerName.value,
      proformaInvoiceDetailsForm.controls.companyName.value,
      proformaInvoiceDetailsForm.controls.companyAddress.value,
      proformaInvoiceDetailsForm.controls.mobileNumber.value,
      proformaInvoiceDetailsForm.controls.emailId.value,
      proformaInvoiceDetailsForm.controls.leadID.value,
      proformaInvoiceDetailsForm.controls.requirements.value,
      proformaInvoiceDetailsForm.controls.workOrderID.value,
      proformaInvoiceDetailsForm.controls.date.value,
      proformaInvoiceDetailsForm.controls.expiryDate.value,
      proformaInvoiceDetailsForm.controls.allTotal.value,
      proformaInvoiceDetailsForm.controls.subTotal.value,
      proformaInvoiceDetailsForm.controls.tax.value
    );
    this.proformaInvoiceService.createProformaInvoice(this.proformaInvoice).subscribe(data => {
      this.proformaInvoice = data;
      this.router.navigate(['proformainvoice/viewproformainvoice', data.workOrderID]);
    }, error => {
      console.log(error);
    });
  }

  cancelInvoice() {
    this.router.navigate(['workorder/viewworkorder', this.leadId]);
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
  viewWorkOrder()   {
    this.proformaInvoiceService.viewSingleWorkOrder(this.workId).subscribe(data => {
      this.workOrder = data;
      this.addForm();
      this.getTotal();
      this.viewCompanyDetails();
    }, error => {
      console.log(error);
    });
  }
  addForm() {
      for (let i = 0; i <= this.workOrder[0].requirements.length - 1; i++)     {
        this.requirementsData = this.fb.group({
          id: [this.workOrder[0].requirements[i]._id],
          item: [this.workOrder[0].requirements[i].item],
          quantity: [this.workOrder[0].requirements[i].quantity],
          price: [this.workOrder[0].requirements[i].price],
          discount: [this.workOrder[0].requirements[i].discount],
          description: [this.workOrder[0].requirements[i].description],
          total: [this.workOrder[0].requirements[i].total]
        });
        this.requirementsForms.push(this.requirementsData);
      }
  }
  get requirementsForms() {
    return this.proformaInvoiceDetailsForm.get('requirements') as FormArray;
  }
  getTotal() {
    this.sum = 0;
    this.arryValue = this.proformaInvoiceDetailsForm.controls.requirements;
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

