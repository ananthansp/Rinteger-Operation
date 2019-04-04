import { Component, OnInit, Inject, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatSnackBar } from '@angular/material';
import { SettingsServiceService } from '../settings-service.service';
import { WorkOrderPdf } from './../../shared/workorderpdf.model';
import { BankDetails } from './../../shared/bankdetails.model';
import { CompanyDetails } from './../../shared/companydetails.model';
import { FooterDetails } from './../../shared/footerdetails.model';

@Component({
  selector: 'app-workorder-pdf-template',
  templateUrl: './workorder-pdf-template.component.html',
  styleUrls: ['./workorder-pdf-template.component.css']
})
export class WorkorderPdfTemplateComponent implements OnInit {
  workOrderPdfForm: FormGroup;
  message;
  action;
  workOrderModel: WorkOrderPdf;
  bankDetailModel: BankDetails;
  companyDetailModel: CompanyDetails;
  footerDetailModel: FooterDetails;
  showgstForm: boolean;
  showsgstForm: boolean;
  showcgstForm: boolean;
  showtermsForm: boolean;
  showcompanyDetailsForm: boolean;
  showDigitaltermsForm: boolean;
  showbankDetailsForm: boolean;
  showfooterDetailsForm: boolean;
  constructor(private fb: FormBuilder,
    private dialog: MatDialog, private settingService: SettingsServiceService,
    public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.createForm();
    this.getPdfTemplate();
    this.showgstForm = true;
  }
  createForm() {
    this.workOrderPdfForm = this.fb.group({
      gst: [''],
      sgst: [''],
      cgst: [''],
      terms: [''],
      digitalterms: [''],
      accountname: [''],
      accountnumber: [''],
      bankname: [''],
      accounttype: [''],
      branchname: [''],
      ifsc: [''],
      companyName: [''],
      tax: [''],
      pan: [''],
      sac: [''],
      pincode: [''],
      address: [''],
      phNo: [''],
      emailId: [''],
      website: [''],
      footerCompanyName: [''],
      footerAddress: [''],
      footerPhNo: ['']
    });
  }
  addGstForm() {
    this.showgstForm = true;
    this.showcgstForm = false;
    this.showtermsForm = false;
    this.showcompanyDetailsForm = false;
    this.showbankDetailsForm = false;
    this.showfooterDetailsForm = false;
    this.showsgstForm = false;
    this.showDigitaltermsForm = false;
  }
  addCGstForm() {
    this.showgstForm = false;
    this.showcgstForm = true;
    this.showtermsForm = false;
    this.showcompanyDetailsForm = false;
    this.showbankDetailsForm = false;
    this.showfooterDetailsForm = false;
    this.showsgstForm = false;
    this.showDigitaltermsForm = false;
  }
  addSGstForm() {
    this.showgstForm = false;
    this.showcgstForm = false;
    this.showtermsForm = false;
    this.showcompanyDetailsForm = false;
    this.showbankDetailsForm = false;
    this.showfooterDetailsForm = false;
    this.showsgstForm = true;
    this.showDigitaltermsForm = false;
  }
  termsForm() {
    this.showgstForm = false;
    this.showcgstForm = false;
    this.showtermsForm = true;
    this.showcompanyDetailsForm = false;
    this.showbankDetailsForm = false;
    this.showfooterDetailsForm = false;
    this.showsgstForm = false;
    this.showDigitaltermsForm = false;
  }
  digitalTermsForm() {
    this.showgstForm = false;
    this.showcgstForm = false;
    this.showtermsForm = false;
    this.showcompanyDetailsForm = false;
    this.showbankDetailsForm = false;
    this.showfooterDetailsForm = false;
    this.showsgstForm = false;
    this.showDigitaltermsForm = true;
  }
  bankForm() {
    this.showgstForm = false;
    this.showcgstForm = false;
    this.showtermsForm = false;
    this.showcompanyDetailsForm = false;
    this.showbankDetailsForm = true;
    this.showfooterDetailsForm = false;
    this.showsgstForm = false;
    this.showDigitaltermsForm = false;
  }
  companyForm() {
    this.showgstForm = false;
    this.showtermsForm = false;
    this.showcgstForm = false;
    this.showcompanyDetailsForm = true;
    this.showbankDetailsForm = false;
    this.showfooterDetailsForm = false;
    this.showsgstForm = false;
    this.showDigitaltermsForm = false;
  }
  footerForm() {
    this.showgstForm = false;
    this.showtermsForm = false;
    this.showcgstForm = false;
    this.showcompanyDetailsForm = false;
    this.showbankDetailsForm = false;
    this.showfooterDetailsForm = true;
    this.showsgstForm = false;
    this.showDigitaltermsForm = false;
  }
  addGST(workOrderPdfForm) {
    this.message = 'GST number added successfully';
    this.workOrderModel = new WorkOrderPdf();
    this.workOrderModel.gst = workOrderPdfForm.controls.gst.value;
    this.settingService.addGST(this.workOrderModel).subscribe(data => {
      this.workOrderModel = data;
      this.snackBar.open(this.message, this.action, {
        duration: 3000,
      });
    }, err => {
      console.log(err);
    });
  }
  addSGST(workOrderPdfForm) {
    this.message = 'SGST number added successfully';
    this.workOrderModel = new WorkOrderPdf();
    this.workOrderModel.sgst = workOrderPdfForm.controls.sgst.value;
    this.settingService.addSGST(this.workOrderModel).subscribe(data => {
      this.workOrderModel = data;
      this.snackBar.open(this.message, this.action, {
        duration: 3000,
      });
    }, err => {
      console.log(err);
    });
  }
  addCGST(workOrderPdfForm) {
    this.message = 'CGST number added successfully';
    this.workOrderModel = new WorkOrderPdf();
    this.workOrderModel.cgst = workOrderPdfForm.controls.cgst.value;
    this.settingService.addCGST(this.workOrderModel).subscribe(data => {
      this.workOrderModel = data;
      this.snackBar.open(this.message, this.action, {
        duration: 3000,
      });
    }, err => {
      console.log(err);
    });
  }
  addTerms(workOrderPdfForm) {
    this.message = 'Terms & Condition  added successfully';
    this.workOrderModel = new WorkOrderPdf();
    this.workOrderModel.terms = workOrderPdfForm.controls.terms.value;
    this.settingService.addTerms(this.workOrderModel).subscribe(data => {
      this.workOrderModel = data;
      this.snackBar.open(this.message, this.action, {
        duration: 3000,
      });
    }, err => {
      console.log(err);
    });
  }
  addDigtalTerms(workOrderPdfForm) {
    this.message = 'Terms & Condition  added successfully';
    this.workOrderModel = new WorkOrderPdf();
    this.workOrderModel.digitalterms = workOrderPdfForm.controls.digitalterms.value;
    this.settingService.addDigitalTerms(this.workOrderModel).subscribe(data => {
      this.workOrderModel = data;
      this.snackBar.open(this.message, this.action, {
        duration: 3000,
      });
    }, err => {
      console.log(err);
    });
  }
  addBankDetails(workOrderPdfForm) {
    this.message = 'Bank Details  added successfully';
    this.bankDetailModel = new BankDetails();
    this.bankDetailModel.accName = workOrderPdfForm.controls.accountname.value;
    this.bankDetailModel.accNo = workOrderPdfForm.controls.accountnumber.value;
    this.bankDetailModel.accountType = workOrderPdfForm.controls.accounttype.value;
    this.bankDetailModel.bankName = workOrderPdfForm.controls.bankname.value;
    this.bankDetailModel.branchName = workOrderPdfForm.controls.branchname.value;
    this.bankDetailModel.IFSC = workOrderPdfForm.controls.ifsc.value;
    this.settingService.addBankDetails(this.bankDetailModel).subscribe(data => {
      this.workOrderModel = data;
      this.snackBar.open(this.message, this.action, {
        duration: 3000,
      });
    }, err => {
      console.log(err);
    });
  }
  addCompanyDetails(workOrderPdfForm) {
    this.message = 'Company Details  added successfully';
    this.companyDetailModel = new CompanyDetails();
    this.companyDetailModel.companyName = workOrderPdfForm.controls.companyName.value;
    this.companyDetailModel.TAX = workOrderPdfForm.controls.tax.value;
    this.companyDetailModel.PAN = workOrderPdfForm.controls.pan.value;
    this.companyDetailModel.SAC = workOrderPdfForm.controls.sac.value;
    this.companyDetailModel.address = workOrderPdfForm.controls.address.value;
    this.companyDetailModel.pincode = workOrderPdfForm.controls.pincode.value;
    this.companyDetailModel.phNo = workOrderPdfForm.controls.phNo.value;
    this.settingService.addCompanyDetails(this.companyDetailModel).subscribe(data => {
      this.workOrderModel = data;
      this.snackBar.open(this.message, this.action, {
        duration: 3000,
      });
    }, err => {
      console.log(err);
    });
  }
  addFooterDetails(workOrderPdfForm) {
    this.message = 'Footer Details  added successfully';
    this.footerDetailModel = new FooterDetails();
    this.footerDetailModel.companyName = workOrderPdfForm.controls.footerCompanyName.value;
    this.footerDetailModel.address = workOrderPdfForm.controls.footerAddress.value;
    this.footerDetailModel.emailId = workOrderPdfForm.controls.emailId.value;
    this.footerDetailModel.phNo = workOrderPdfForm.controls.footerPhNo.value;
    this.footerDetailModel.website = workOrderPdfForm.controls.website.value;
    this.settingService.addFooterDetails(this.footerDetailModel).subscribe(data => {
    this.workOrderModel = data;
    this.snackBar.open(this.message, this.action, {
        duration: 3000,
      });
    }, err => {
      console.log(err);
    });
  }
  getPdfTemplate() {
    this.settingService.getPdfWorkOrderDetails().subscribe(data => {
      this.workOrderModel = data;
      this.workOrderPdfForm.setValue({
        gst: this.workOrderModel[0].gst,
        sgst: this.workOrderModel[0].sgst,
        cgst: this.workOrderModel[0].cgst,
        terms: this.workOrderModel[0].terms,
        digitalterms: this.workOrderModel[0].digitalterms,
        accountname: this.workOrderModel[0].bankdetails[0].accName,
        accountnumber: this.workOrderModel[0].bankdetails[0].accNo,
        bankname: this.workOrderModel[0].bankdetails[0].bankName,
        accounttype: this.workOrderModel[0].bankdetails[0].accountType,
        branchname: this.workOrderModel[0].bankdetails[0].branchName,
        ifsc: this.workOrderModel[0].bankdetails[0].IFSC,
        companyName: this.workOrderModel[0].companydetails[0].companyName,
        tax: this.workOrderModel[0].companydetails[0].TAX,
        pan: this.workOrderModel[0].companydetails[0].PAN,
        sac: this.workOrderModel[0].companydetails[0].SAC,
        pincode: this.workOrderModel[0].companydetails[0].pincode,
        address: this.workOrderModel[0].companydetails[0].address,
        phNo: this.workOrderModel[0].companydetails[0].phNo,
        emailId: this.workOrderModel[0].footerdetails[0].emailId,
        website: this.workOrderModel[0].footerdetails[0].website,
        footerCompanyName: this.workOrderModel[0].footerdetails[0].companyName,
        footerAddress: this.workOrderModel[0].footerdetails[0].address,
        footerPhNo: this.workOrderModel[0].footerdetails[0].phNo,
      });
    }, err => {
      console.log(err);
    });
  }
}
