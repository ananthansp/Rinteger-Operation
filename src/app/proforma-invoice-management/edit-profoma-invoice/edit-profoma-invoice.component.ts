import { Component, OnInit } from '@angular/core';
import { Lead } from './../../shared/lead.model';
import { Customer } from './../../shared/customer.model';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { ProformaInvoice } from './../../shared/proformaInvoice.model';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatSnackBar} from '@angular/material';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { ProformaInvoiceService } from '../proforma-invoice.service';

@Component({
  selector: 'app-edit-profoma-invoice',
  templateUrl: './edit-profoma-invoice.component.html',
  styleUrls: ['./edit-profoma-invoice.component.css']
})
export class EditProfomaInvoiceComponent implements OnInit {

  requirements: FormArray;
  profomaInvoiceDetailsForm: FormGroup;
  profomaInvoice: ProformaInvoice;
  profomaInvoiceData: ProformaInvoice;
  leadModel: Lead[] = [];
  customerModel: Customer;
  arryValue: any = [];
  requirementsData;
  sum = 0;
  leadId: string;
  profomaInvoiceId: string;
  message;
  action;
  constructor(private fb: FormBuilder, private profomaService: ProformaInvoiceService
    , private route: ActivatedRoute, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.profomaInvoiceId = this.route.snapshot.params.id;
    console.log('profoma invoice id', this.profomaInvoiceId);
    this.viewProfomaInvoice();
    this.createForm();
  }
  createForm() {
    this.profomaInvoiceDetailsForm = this.fb.group({
      workOrderID: [''],
      customerID: [''],
      companyName: [''],
      companyAddress: [''],
      customerName: [''],
      proformaInvoiceID: [''],
      emailId: [''],
      leadID: ['', Validators.required],
      name: ['', Validators.required],
      mobileNumber: ['', Validators.required],
      date: [''],
      expiryDate: [''],
      requirements: this.fb.array([]),
      allTotal: ['', Validators.required],
      subTotal: ['', Validators.required],
      tax: ['', Validators.required]
    });
  }
  viewProfomaInvoice() {
    this.profomaService.viewSingleProformaInvoice(this.profomaInvoiceId).subscribe(data => {
      this.profomaInvoice = data[0];
      console.log(this.profomaInvoice);
      this.addForm();
      this.getTotal();
    }, error => {
      console.log(error);
    });
  }
  addForm() {
    for (let i = 0; i <= this.profomaInvoice.requirements.length - 1; i++) {
      this.requirementsData = this.fb.group({
        id: [this.profomaInvoice.requirements[i]._id],
        item: [this.profomaInvoice.requirements[i].item],
        quantity: [this.profomaInvoice.requirements[i].quantity],
        price: [this.profomaInvoice.requirements[i].price],
        discount: [this.profomaInvoice.requirements[i].discount],
        description: [this.profomaInvoice.requirements[i].description],
        total: [this.profomaInvoice.requirements[i].total]
      });
      this.requirementsForms.push(this.requirementsData);
    }
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
    return this.profomaInvoiceDetailsForm.get('requirements') as FormArray;
  }
  getTotal() {
    this.sum = 0;
    this.arryValue = this.profomaInvoiceDetailsForm.controls.requirements;
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
  updateProfomaInvoice(profomaInvoiceDetailsForm: FormGroup)   {
    this.message = 'Profoma Invoice Updated Successfully';
    this.profomaInvoice = new ProformaInvoice(
      profomaInvoiceDetailsForm.controls.customerID.value,
      profomaInvoiceDetailsForm.controls.customerName.value,
      profomaInvoiceDetailsForm.controls.companyName.value,
      profomaInvoiceDetailsForm.controls.companyAddress.value,
      profomaInvoiceDetailsForm.controls.mobileNumber.value,
      profomaInvoiceDetailsForm.controls.emailId.value,
      profomaInvoiceDetailsForm.controls.leadID.value,
      profomaInvoiceDetailsForm.controls.requirements.value,
      profomaInvoiceDetailsForm.controls.workOrderID.value,
      profomaInvoiceDetailsForm.controls.date.value,
      profomaInvoiceDetailsForm.controls.expiryDate.value,
      profomaInvoiceDetailsForm.controls.allTotal.value,
      profomaInvoiceDetailsForm.controls.subTotal.value,
      profomaInvoiceDetailsForm.controls.tax.value
    );
    this.profomaInvoice.proformaInvoiceID = this.profomaInvoiceDetailsForm.controls.proformaInvoiceID.value;
      this.profomaService.updateSingleProfomaInvoice(this.profomaInvoice, this.profomaInvoiceId).subscribe(data => {
      this.profomaInvoiceData = data[0];
      this.snackBar.open(this.message, this.action, {
        duration: 3000,
      });
      this.router.navigate(['proformainvoice/viewallproformainvoice']);
    }, error => {
      console.log(error);
    });
  }
}
