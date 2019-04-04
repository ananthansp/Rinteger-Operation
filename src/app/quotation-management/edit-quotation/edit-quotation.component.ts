import { Component, OnInit } from '@angular/core';
import { Lead } from './../../shared/lead.model';
import { Customer } from './../../shared/customer.model';
import { ActivatedRoute, Router } from '@angular/router';
import { QuotationManagementService } from './../quotation-management.service';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { Quotation } from './../../shared/quotation.model';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-edit-quotation',
  templateUrl: './edit-quotation.component.html',
  styleUrls: ['./edit-quotation.component.css']
})
export class EditQuotationComponent implements OnInit {
  requirements: FormArray;
  quotationDetailsForm: FormGroup;
  quotation: Quotation;
  quotationData: Quotation;
  leadModel: Lead[] = [];
  customerModel: Customer;
  arryValue: any = [];
  requirementsData;
  sum = 0;
  leadId: string;
  quotationId: string;
  message;
  action;
  constructor(private fb: FormBuilder, private quotationService: QuotationManagementService
    , private route: ActivatedRoute,  private snackBar: MatSnackBar, private router: Router) { }

  ngOnInit() {
    this.quotationId = this.route.snapshot.params.id;
    this.viewQuotation();
    this.createForm();
  }
  createForm() {
    this.quotationDetailsForm = this.fb.group({
      customerID: [''],
      companyName: [''],
      address: [''],
      customerName: [''],
      quotationID: [''],
      emailId: [''],
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
  viewQuotation()   {
    this.quotationService.viewSingleQuotation(this.quotationId).subscribe(data => {
      this.quotation = data[0];
      console.log(this.quotation);
      this.addForm();
      this.getTotal();
    }, error => {
      console.log(error);
    });
  }
  addForm() {
    for (let i = 0; i <= this.quotation.requirements.length - 1; i++)     {
      this.requirementsData = this.fb.group({
        id: [this.quotation.requirements[i]._id],
        item: [this.quotation.requirements[i].item],
        quantity: [this.quotation.requirements[i].quantity],
        price: [this.quotation.requirements[i].price],
        discount: [this.quotation.requirements[i].discount],
        description: [this.quotation.requirements[i].description],
        total: [this.quotation.requirements[i].total]
      });
      this.requirementsForms.push(this.requirementsData);
    }
}
  updateQuotation(quotationDetailsForm: FormGroup)   {
    this.message = 'Quotation Updated Successfully';
    console.log(quotationDetailsForm.value);
    this.quotation = new Quotation(
      quotationDetailsForm.controls.customerID.value,
      quotationDetailsForm.controls.customerName.value,
      quotationDetailsForm.controls.companyName.value,
      quotationDetailsForm.controls.address.value,
      quotationDetailsForm.controls.mobileNumber.value,
      quotationDetailsForm.controls.emailId.value,
      quotationDetailsForm.controls.leadID.value,
      quotationDetailsForm.controls.date.value,
      quotationDetailsForm.controls.requirements.value,
      quotationDetailsForm.controls.allTotal.value,
      quotationDetailsForm.controls.subTotal.value,
      quotationDetailsForm.controls.tax.value
    );
    this.quotation.quotationID =  quotationDetailsForm.controls.quotationID.value;
    this.quotationService.updateSingleQuotation(this.quotation, this.quotationId).subscribe(data => {
      this.quotationData = data[0];
      this.snackBar.open(this.message, this.action, {
        duration: 3000,
      });
      this.router.navigate(['quotation/viewallquotation']);
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
}
