
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { Quotation } from './../../shared/quotation.model';
import { QuotationManagementService } from './../quotation-management.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Lead } from './../../shared/lead.model';
import { Customer } from './../../shared/customer.model';
import {WorkOrderPdf} from '../../shared/workorderpdf.model';


@Component({
  selector: 'app-create-quotation',
  templateUrl: './create-quotation.component.html',
  styleUrls: ['./create-quotation.component.css']
})
export class CreateQuotationComponent implements OnInit {

  constructor(private fb: FormBuilder, private quotationManagementService: QuotationManagementService
    , private route: ActivatedRoute, private router: Router
  ) { }
  requirements: FormArray;
  quotationDetailsForm: FormGroup;
  quotation: Quotation;
  workOrderPDFModel: WorkOrderPdf;
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
  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    this.leadId = this.route.snapshot.params.leadId;
    this.getSingleLeads();
    this.getSingleCustomer();
    this.createForm();
    this.viewCompanyDetails();
  }
  createForm() {
    this.quotationDetailsForm = this.fb.group({
      customerID: [''],
      customerName: [''],
      companyName: [''],
      companyAddress: [''],
      mobileNumber: ['', Validators.required],
      emailId: ['', Validators.required],
      leadID: ['', Validators.required],
      date: ['', Validators.required],
      requirements: this.fb.array([]),
      expiryDate: ['', Validators.required],
      status: ['', Validators.required],
      tax: ['', Validators.required],
      subTotal: ['', Validators.required],
      allTotal: ['', Validators.required]
    });
  }
  viewCompanyDetails() {
    this.quotationManagementService.workorderPDFDetails().subscribe(data => {
      this.workOrderPDFModel = data;
      this.gstVal = this.workOrderPDFModel[0].gst;
    }, error => {
      console.log(error);
    });
  }
  createQuotation(quotationDetailsForm: FormGroup) {
    this.quotation = new Quotation(
      quotationDetailsForm.controls.customerID.value,
      quotationDetailsForm.controls.customerName.value,
      quotationDetailsForm.controls.companyName.value,
      quotationDetailsForm.controls.companyAddress.value,
      quotationDetailsForm.controls.mobileNumber.value,
      quotationDetailsForm.controls.emailId.value,
      quotationDetailsForm.controls.leadID.value,
      quotationDetailsForm.controls.date.value,
      quotationDetailsForm.controls.requirements.value,
      quotationDetailsForm.controls.subTotal.value,
      quotationDetailsForm.controls.allTotal.value,
      quotationDetailsForm.controls.tax.value
    );
    this.quotationManagementService.createQuotation(this.quotation).subscribe(data => {
      this.router.navigate(['quotation/viewallquotation']);
    }, error => {
      console.log(error);
    });
  }
  cancelQutotation()   {
    this.router.navigate(['lead/leadview']);
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
    return this.quotationDetailsForm.get('requirements') as FormArray;
  }
  getTotal() {
    this.sum = 0;
    this.arryValue = this.quotationDetailsForm.controls.requirements;
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
    this.quotationManagementService.singleCustomer(this.id).subscribe(data => {
      this.customerModel = data;
      console.log('customers', this.customerModel);
    }, error => {
      console.log(error);
    });
  }
  getSingleLeads() {
    this.quotationManagementService.singleLead(this.leadId).subscribe(data => {
      this.leadModel = data;
      this.addForm();
      this.getTotal();
      console.log('single leads', this.leadModel);
    }, error => {
      console.log(error);
    });
  }
}

