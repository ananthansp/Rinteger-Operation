import { Component, OnInit } from '@angular/core';
import { InvoiceService } from './../invoice.service';
import { Invoice } from './../../shared/invoice.model';
import { WorkOrderPdf } from '../../shared/workorderpdf.model';
import { Customer } from './../../shared/customer.model';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-view-single-invoice',
  templateUrl: './view-single-invoice.component.html',
  styleUrls: ['./view-single-invoice.component.css']
})
export class ViewSingleInvoiceComponent implements OnInit {
  constructor(private route: ActivatedRoute,
    private router: Router, private invoiceService: InvoiceService,
     private fb: FormBuilder) { }
  singleInvoiceForm: FormGroup;
  leadId;
  invId;
  invoice: Invoice;
  workOrderPDFModel: WorkOrderPdf;
  customerModel: Customer;
  printArray = new Array;
  printArray1 = new Array;
  doc;
  templateOption: boolean;
  selected = 'withDiscount';
  tempArray = new Array;
  allValues = new Array;
  TypesOfTerms = ['Production Terms', 'Digital Marketing Terms'];
  templates = ['With Discount + GST', 'Without Discount + GST' , 'With Discount + SGST + CGST' , 'Without Discount + SGST + CGST'];
  
  ngOnInit() {
    this.route.paramMap.subscribe(
      (params: ParamMap) => {
        this.invId = params.get('invId');
      }
    );
    this.viewSingleInvoice();
    this.createForm();
  }

  cancelInvoice()   {
    this.router.navigate(['invoice/viewinvoice',
     this.invoice[0].workOrderID]);
  }
  viewSingleInvoice() {
    this.invoiceService.viewSingleInvoice(
      this.invId).subscribe(data => {
        this.invoice = data;
        this.customerDetails();
        this.viewCompanyDetails();
      }, error => {
        console.log(error);
      });
  }
  customerDetails() {
    this.invoiceService.singleCustomerDetails(this.invoice[0].customerID).subscribe(data => {
      this.customerModel = data; }, error => {
        console.log(error);
      });
  }
  viewCompanyDetails() {
    this.invoiceService.workorderPDFDetails().subscribe(data => {
      this.workOrderPDFModel = data;
      console.log('pdf details', this.workOrderPDFModel);
    }, error => {
      console.log(error);
    });
  }
  showTemplate() {
    this.templateOption = true;
  }
  createForm() {
    this.singleInvoiceForm = this.fb.group({
      termsType: [''],
    });
  }
  /* templateType(val) {
    const TYPE = this.singleInvoiceForm.controls.termsType.value;
    if (val === 'With Discount + GST' && TYPE === 'Production Terms') {
      this.savePDFWithDiscountTerms();
    } else if (val === 'With Discount + GST' && TYPE === 'Digital Marketing Terms') {
          this.savePDFWithDiscountDigtalTerms();
        }  else if (val === 'Without Discount + GST' && TYPE === 'Production Terms') {
          this.savePDFWithoutDiscountTerms();
        } else if (val === 'Without Discount + GST' && TYPE === 'Digital Marketing Terms') {
          this.savePDFWithoutDiscountDigtalTerms();
        } else  if (val === 'With Discount + SGST + CGST' && TYPE === 'Production Terms') {
          this.pdfGSTDiscountTerms();
        } else  if (val === 'Without Discount + SGST + CGST' && TYPE === 'Production Terms') {
          this.pdfGSTWithoutDiscountTerms();
        } else  if (val === 'With Discount + SGST + CGST' && TYPE === 'Digital Marketing Terms') {
          this.pdfGSTWithDiscountDigitalTerms();
        } else  if (val === 'Without Discount + SGST + CGST' && TYPE === 'Digital Marketing Terms') {
          this.pdfGSTWitouthDiscountDigitalTerms();
        }
  }
  pdfGSTDiscountTerms() {
    this.viewCompanyDetails();
    this.invoiceService.singleCustomerDetails(this.invoice[0].customerID).subscribe(data => {
      this.customerModel = data;
      const options = {
        margin: {
          top: 120
        },
      };
      const options1 = {
        margin: {
          top: 80
        },
      };
      for (let i = 0; i <= this.invoice[0].requirements.length - 1; i++) {
        this.allValues.push(this.invoice[0].requirements[i]);
      }
      for (let i = 0; i <= this.allValues.length - 1; i++) {
        this.tempArray[i] = new Array();
        this.tempArray[i] .push(this.allValues[i].item, this.allValues[i].description,
          this.allValues[i].quantity,
          this.allValues[i].price, this.allValues[i].discount, this.allValues[i].total);
          this.printArray.push(this.tempArray[i]);
      }
      const imgData = '../../../assets/images/logo.jpg';
      const columns = ['Item', 'Description', 'Quantity', 'Price', 'Discount %', 'Total'];
      const columns1 = ['Company No', 'Name', 'Address', 'Email', 'Phone No'];
      this.doc = new jspdf();
      this.doc.setFontSize(10);
      this.doc.setFont('Arial');
      this.doc.setFontType('bold');
      this.doc.text(130, 30, this.workOrderPDFModel[0].companydetails[0].companyName.toUpperCase());
      this.doc.setFontType('bold');
      this.doc.text(130, 35, 'TAX');
      this.doc.setFontType('normal');
      this.doc.text(140, 35, this.workOrderPDFModel[0].companydetails[0].TAX);
      this.doc.setFontType('bold');
      this.doc.text(130, 40, 'PAN');
      this.doc.setFontType('normal');
      this.doc.text(140, 40, this.workOrderPDFModel[0].companydetails[0].PAN);
      this.doc.setFontType('bold');
      this.doc.text(130, 45, 'SAC');
      this.doc.setFontType('normal');
      this.doc.text(140, 45, this.workOrderPDFModel[0].companydetails[0].SAC);
      this.doc.text(130, 50, this.workOrderPDFModel[0].companydetails[0].address);
      this.doc.text(130, 55, this.workOrderPDFModel[0].companydetails[0].pincode);
      this.doc.text(130, 60, 'India ');
      this.doc.text(130, 65, 'Ph No:' + this.workOrderPDFModel[0].companydetails[0].phNo);
      this.doc.setFontType('bold');
      this.doc.text(10, 30, data[0].companyName.toUpperCase());
      this.doc.text(10, 35, 'GST:' + ' ' + data[0].gstNumber);
      this.doc.setFontType('normal');
      this.doc.text(10, 40, data[0].companyAddress);
      this.doc.text(10, 45, data[0].city);
      this.doc.text(10, 50, data[0].state + ' ' + data[0].pincode);
      this.doc.text(10, 55, 'Ph No:' + data[0].mobileNumber.toString());
      this.doc.setFontType('bold');
      this.doc.text(10, 75, 'Invoice Details');
      this.doc.setFontType('normal');
      this.doc.text(10, 80, 'Invoice ID :' + this.invoice[0].invoiceID);
      this.doc.text(10, 85, ' Date :' + this.invoice[0].date);
      this.doc.text(10, 90, ' Expiry Date :' + this.invoice[0].expiryDate);
      this.doc.setFontType('bold');
      this.doc.text(130, 75, 'Bank Details');
      this.doc.setFontType('normal');
      this.doc.text(130, 80, 'Acc Name :' + this.workOrderPDFModel[0].bankdetails[0].accName);
      this.doc.text(130, 85, 'Acc No :' + this.workOrderPDFModel[0].bankdetails[0].accNo);
      this.doc.text(130, 90, 'Bank Name :' + this.workOrderPDFModel[0].bankdetails[0].bankName);
      this.doc.text(130, 95, this.workOrderPDFModel[0].bankdetails[0].branchName);
      this.doc.text(130, 100, 'Acc Type :' + this.workOrderPDFModel[0].bankdetails[0].accountType);
      this.doc.text(130, 105, 'IFSC Code :' + this.workOrderPDFModel[0].bankdetails[0].IFSC);
      this.doc.setFontType('bold');
      this.doc.setFontSize(10);
      this.doc.text(20, 220, 'Terms & Conditions');
      this.doc.setFontType('normal');
      this.doc.text(20, 225, this.workOrderPDFModel[0].terms);
      this.doc.setFontType('bold');
      this.doc.text(80, 270, this.workOrderPDFModel[0].footerdetails[0].companyName);
      this.doc.setFontType('bold');
      this.doc.setFontSize(10);
      this.doc.text(30, 275, this.workOrderPDFModel[0].footerdetails[0].address);
      this.doc.text(30, 280, this.workOrderPDFModel[0].footerdetails[0].website + ' ' + ' |' + ' ' +
        this.workOrderPDFModel[0].footerdetails[0].phNo + ' ' + ' |' + ' ' +
        this.workOrderPDFModel[0].footerdetails[0].emailId);
      this.doc.autoTable(columns, this.printArray, options, {
        theme: 'grid',
        bodyStyles: { lineColor: [0, 0, 0] }
      }
      );
      this.doc.setFontType('normal');
      this.doc.text(140, 180, 'Sub Total :Rs' + ' ' + this.invoice[0].subTotal.toString());
      this.doc.text(120, 185, 'SGST (' + this.workOrderPDFModel[0].sgst + '%) +' + ' ' +
      'CGST (' + this.workOrderPDFModel[0].cgst + '%) : Rs' + ' ' + this.invoice[0].tax.toString());
      this.doc.text(140, 190, 'Total :Rs' + ' ' + this.invoice[0].allTotal);
      this.doc.save('proper.pdf');
      
    }, err => {
      console.log(err);
    });
  }
  pdfGSTWithDiscountDigitalTerms() {
    this.viewCompanyDetails();
    this.invoiceService.singleCustomerDetails(this.invoice[0].customerID).subscribe(data => {
      this.customerModel = data;
      const options = {
        margin: {
          top: 120
        },
      };
      const options1 = {
        margin: {
          top: 80
        },
      };
      for (let i = 0; i <= this.invoice[0].requirements.length - 1; i++) {
        this.allValues.push(this.invoice[0].requirements[i]);
      }
      for (let i = 0; i <= this.allValues.length - 1; i++) {
        this.tempArray[i] = new Array();
        this.tempArray[i] .push(this.allValues[i].item, this.allValues[i].description,
          this.allValues[i].quantity, this.allValues[i].discount,
          this.allValues[i].price,  this.allValues[i].total);
          this.printArray.push(this.tempArray[i]);
      }
      const imgData = './../../../assets/images/logo.jpg';
      const columns = ['Item', 'Description', 'Quantity', 'Price', 'Discount %', 'Total'];
      const columns1 = ['Company No', 'Name', 'Address', 'Email', 'Phone No'];
      this.doc = new jspdf();
      
      this.doc.setFontSize(10);
      this.doc.setFont('Arial');
      this.doc.setFontType('bold');
      this.doc.text(130, 30, this.workOrderPDFModel[0].companydetails[0].companyName.toUpperCase());
      this.doc.setFontType('bold');
      this.doc.text(130, 35, 'TAX');
      this.doc.setFontType('normal');
      this.doc.text(140, 35, this.workOrderPDFModel[0].companydetails[0].TAX);
      this.doc.setFontType('bold');
      this.doc.text(130, 40, 'PAN');
      this.doc.setFontType('normal');
      this.doc.text(140, 40, this.workOrderPDFModel[0].companydetails[0].PAN);
      this.doc.setFontType('bold');
      this.doc.text(130, 45, 'SAC');
      this.doc.setFontType('normal');
      this.doc.text(140, 45, this.workOrderPDFModel[0].companydetails[0].SAC);
      this.doc.text(130, 50, this.workOrderPDFModel[0].companydetails[0].address);
      this.doc.text(130, 55, this.workOrderPDFModel[0].companydetails[0].pincode);
      this.doc.text(130, 60, 'India ');
      this.doc.text(130, 65, 'Ph No:' + this.workOrderPDFModel[0].companydetails[0].phNo);
      this.doc.setFontType('bold');
      this.doc.text(10, 30, data[0].companyName.toUpperCase());
      this.doc.text(10, 35, 'GST:' + ' ' + data[0].gstNumber);
      this.doc.setFontType('normal');
      this.doc.text(10, 40, data[0].companyAddress);
      this.doc.text(10, 45, data[0].city);
      this.doc.text(10, 50, data[0].state + ' ' + data[0].pincode);
      this.doc.text(10, 55, 'Ph No:' + data[0].mobileNumber.toString());
      this.doc.setFontType('bold');
      this.doc.text(10, 75, 'Invoice Details');
      this.doc.setFontType('normal');
      this.doc.text(10, 80, 'Invoice ID :' + this.invoice[0].invoiceID);
      this.doc.text(10, 85, ' Date :' + this.invoice[0].date);
      this.doc.text(10, 90, ' Expiry Date :' + this.invoice[0].expiryDate);
      this.doc.setFontType('bold');
      this.doc.text(130, 75, 'Bank Details');
      this.doc.setFontType('normal');
      this.doc.text(130, 80, 'Acc Name :' + this.workOrderPDFModel[0].bankdetails[0].accName);
      this.doc.text(130, 85, 'Acc No :' + this.workOrderPDFModel[0].bankdetails[0].accNo);
      this.doc.text(130, 90, 'Bank Name :' + this.workOrderPDFModel[0].bankdetails[0].bankName);
      this.doc.text(130, 95, this.workOrderPDFModel[0].bankdetails[0].branchName);
      this.doc.text(130, 100, 'Acc Type :' + this.workOrderPDFModel[0].bankdetails[0].accountType);
      this.doc.text(130, 105, 'IFSC Code :' + this.workOrderPDFModel[0].bankdetails[0].IFSC);
      this.doc.setFontType('bold');
      this.doc.setFontSize(10);
      this.doc.text(20, 220, 'Terms & Conditions');
      this.doc.setFontType('normal');
      this.doc.text(20, 225, this.workOrderPDFModel[0].digitalterms);
      this.doc.setFontType('bold');
      this.doc.text(80, 270, this.workOrderPDFModel[0].footerdetails[0].companyName);
      this.doc.setFontType('bold');
      this.doc.setFontSize(10);
      this.doc.text(30, 275, this.workOrderPDFModel[0].footerdetails[0].address);
      this.doc.text(30, 280, this.workOrderPDFModel[0].footerdetails[0].website + ' ' + ' |' + ' ' +
        this.workOrderPDFModel[0].footerdetails[0].phNo + ' ' + ' |' + ' ' +
        this.workOrderPDFModel[0].footerdetails[0].emailId);
      this.doc.autoTable(columns, this.printArray, options, {
        theme: 'grid',
        bodyStyles: { lineColor: [0, 0, 0] }
      }
      );
      this.doc.setFontType('normal');
      this.doc.text(140, 180, 'Sub Total :Rs' + ' ' + this.invoice[0].subTotal.toString());
      this.doc.text(120, 185, 'SGST (' + this.workOrderPDFModel[0].sgst + '%) +' + ' ' +
      'CGST (' + this.workOrderPDFModel[0].cgst + '%) : Rs' + ' ' + this.invoice[0].tax.toString());
      this.doc.text(140, 190, 'Total :Rs' + ' ' + this.invoice[0].allTotal);
      this.doc.save('proper.pdf');
      
    }, err => {
      console.log(err);
    });

  }
  pdfGSTWitouthDiscountDigitalTerms() {
    this.viewCompanyDetails();
    this.invoiceService.singleCustomerDetails(this.invoice[0].customerID).subscribe(data => {
      this.customerModel = data;
      const options = {
        margin: {
          top: 120
        },
      };
      const options1 = {
        margin: {
          top: 80
        },
      };
      for (let i = 0; i <= this.invoice[0].requirements.length - 1; i++) {
        this.allValues.push(this.invoice[0].requirements[i]);
      }
      for (let i = 0; i <= this.allValues.length - 1; i++) {
        this.tempArray[i] = new Array();
        this.tempArray[i] .push(this.allValues[i].item, this.allValues[i].description,
          this.allValues[i].quantity,
          this.allValues[i].price,  this.allValues[i].total);
          this.printArray.push(this.tempArray[i]);
      }
      const imgData = '../../../assets/images/logo.jpg';
      const columns = ['Item', 'Description', 'Quantity', 'Price',  'Total'];
      const columns1 = ['Company No', 'Name', 'Address', 'Email', 'Phone No'];
      this.doc = new jspdf();
      
      this.doc.setFontSize(10);
      this.doc.setFont('Arial');
      this.doc.setFontType('bold');
      this.doc.text(130, 30, this.workOrderPDFModel[0].companydetails[0].companyName.toUpperCase());
      this.doc.setFontType('bold');
      this.doc.text(130, 35, 'TAX');
      this.doc.setFontType('normal');
      this.doc.text(140, 35, this.workOrderPDFModel[0].companydetails[0].TAX);
      this.doc.setFontType('bold');
      this.doc.text(130, 40, 'PAN');
      this.doc.setFontType('normal');
      this.doc.text(140, 40, this.workOrderPDFModel[0].companydetails[0].PAN);
      this.doc.setFontType('bold');
      this.doc.text(130, 45, 'SAC');
      this.doc.setFontType('normal');
      this.doc.text(140, 45, this.workOrderPDFModel[0].companydetails[0].SAC);
      this.doc.text(130, 50, this.workOrderPDFModel[0].companydetails[0].address);
      this.doc.text(130, 55, this.workOrderPDFModel[0].companydetails[0].pincode);
      this.doc.text(130, 60, 'India ');
      this.doc.text(130, 65, 'Ph No:' + this.workOrderPDFModel[0].companydetails[0].phNo);
      this.doc.setFontType('bold');
      this.doc.text(10, 30, data[0].companyName.toUpperCase());
      this.doc.text(10, 35, 'GST:' + ' ' + data[0].gstNumber);
      this.doc.setFontType('normal');
      this.doc.text(10, 40, data[0].companyAddress);
      this.doc.text(10, 45, data[0].city);
      this.doc.text(10, 50, data[0].state + ' ' + data[0].pincode);
      this.doc.text(10, 55, 'Ph No:' + data[0].mobileNumber.toString());
      this.doc.setFontType('bold');
      this.doc.text(10, 75, 'Invoice Details');
      this.doc.setFontType('normal');
      this.doc.text(10, 80, 'Invoice ID :' + this.invoice[0].invoiceID);
      this.doc.text(10, 85, ' Date :' + this.invoice[0].date);
      this.doc.text(10, 90, ' Expiry Date :' + this.invoice[0].expiryDate);
      this.doc.setFontType('bold');
      this.doc.text(130, 75, 'Bank Details');
      this.doc.setFontType('normal');
      this.doc.text(130, 80, 'Acc Name :' + this.workOrderPDFModel[0].bankdetails[0].accName);
      this.doc.text(130, 85, 'Acc No :' + this.workOrderPDFModel[0].bankdetails[0].accNo);
      this.doc.text(130, 90, 'Bank Name :' + this.workOrderPDFModel[0].bankdetails[0].bankName);
      this.doc.text(130, 95, this.workOrderPDFModel[0].bankdetails[0].branchName);
      this.doc.text(130, 100, 'Acc Type :' + this.workOrderPDFModel[0].bankdetails[0].accountType);
      this.doc.text(130, 105, 'IFSC Code :' + this.workOrderPDFModel[0].bankdetails[0].IFSC);
      this.doc.setFontType('bold');
      this.doc.setFontSize(10);
      this.doc.text(20, 220, 'Terms & Conditions');
      this.doc.setFontType('normal');
      this.doc.text(20, 225, this.workOrderPDFModel[0].digitalterms);
      this.doc.setFontType('bold');
      this.doc.text(80, 270, this.workOrderPDFModel[0].footerdetails[0].companyName);
      this.doc.setFontType('bold');
      this.doc.setFontSize(10);
      this.doc.text(30, 275, this.workOrderPDFModel[0].footerdetails[0].address);
      this.doc.text(30, 280, this.workOrderPDFModel[0].footerdetails[0].website + ' ' + ' |' + ' ' +
        this.workOrderPDFModel[0].footerdetails[0].phNo + ' ' + ' |' + ' ' +
        this.workOrderPDFModel[0].footerdetails[0].emailId);
      this.doc.autoTable(columns, this.printArray, options, {
        theme: 'grid',
        bodyStyles: { lineColor: [0, 0, 0] }
      }
      );
      this.doc.setFontType('normal');
      this.doc.text(140, 180, 'Sub Total :Rs' + ' ' + this.invoice[0].subTotal.toString());
      this.doc.text(120, 185, 'SGST (' + this.workOrderPDFModel[0].sgst + '%) +' + ' ' +
      'CGST (' + this.workOrderPDFModel[0].cgst + '%) : Rs' + ' ' + this.invoice[0].tax.toString());
      this.doc.text(140, 190, 'Total :Rs' + ' ' + this.invoice[0].allTotal);
      this.doc.save('proper.pdf');
      
    }, err => {
      console.log(err);
    });

  }
  pdfGSTWithoutDiscountTerms() {
    this.viewCompanyDetails();
    this.invoiceService.singleCustomerDetails(this.invoice[0].customerID).subscribe(data => {
      this.customerModel = data;
      const options = {
        margin: {
          top: 120
        },
      };
      const options1 = {
        margin: {
          top: 80
        },
      };
      for (let i = 0; i <= this.invoice[0].requirements.length - 1; i++) {
        this.allValues.push(this.invoice[0].requirements[i]);
      }
      for (let i = 0; i <= this.allValues.length - 1; i++) {
        this.tempArray[i] = new Array();
        this.tempArray[i] .push(this.allValues[i].item, this.allValues[i].description,
          this.allValues[i].quantity,
          this.allValues[i].price,  this.allValues[i].total);
          this.printArray.push(this.tempArray[i]);
      }
      const imgData = '../../../assets/images/logo.jpg';
      const columns = ['Item', 'Description', 'Quantity', 'Price',  'Total'];
      const columns1 = ['Company No', 'Name', 'Address', 'Email', 'Phone No'];
      this.doc = new jspdf();
      
      this.doc.setFontSize(10);
      this.doc.setFont('Arial');
      this.doc.setFontType('bold');
      this.doc.text(130, 30, this.workOrderPDFModel[0].companydetails[0].companyName.toUpperCase());
      this.doc.setFontType('bold');
      this.doc.text(130, 35, 'TAX');
      this.doc.setFontType('normal');
      this.doc.text(140, 35, this.workOrderPDFModel[0].companydetails[0].TAX);
      this.doc.setFontType('bold');
      this.doc.text(130, 40, 'PAN');
      this.doc.setFontType('normal');
      this.doc.text(140, 40, this.workOrderPDFModel[0].companydetails[0].PAN);
      this.doc.setFontType('bold');
      this.doc.text(130, 45, 'SAC');
      this.doc.setFontType('normal');
      this.doc.text(140, 45, this.workOrderPDFModel[0].companydetails[0].SAC);
      this.doc.text(130, 50, this.workOrderPDFModel[0].companydetails[0].address);
      this.doc.text(130, 55, this.workOrderPDFModel[0].companydetails[0].pincode);
      this.doc.text(130, 60, 'India ');
      this.doc.text(130, 65, 'Ph No:' + this.workOrderPDFModel[0].companydetails[0].phNo);
      this.doc.setFontType('bold');
      this.doc.text(10, 30, data[0].companyName.toUpperCase());
      this.doc.text(10, 35, 'GST:' + ' ' + data[0].gstNumber);
      this.doc.setFontType('normal');
      this.doc.text(10, 40, data[0].companyAddress);
      this.doc.text(10, 45, data[0].city);
      this.doc.text(10, 50, data[0].state + ' ' + data[0].pincode);
      this.doc.text(10, 55, 'Ph No:' + data[0].mobileNumber.toString());
      this.doc.setFontType('bold');
      this.doc.text(10, 75, 'Invoice Details');
      this.doc.setFontType('normal');
      this.doc.text(10, 80, 'Invoice ID :' + this.invoice[0].invoiceID);
      this.doc.text(10, 85, ' Date :' + this.invoice[0].date);
      this.doc.text(10, 90, ' Expiry Date :' + this.invoice[0].expiryDate);
      this.doc.setFontType('bold');
      this.doc.text(130, 75, 'Bank Details');
      this.doc.setFontType('normal');
      this.doc.text(130, 80, 'Acc Name :' + this.workOrderPDFModel[0].bankdetails[0].accName);
      this.doc.text(130, 85, 'Acc No :' + this.workOrderPDFModel[0].bankdetails[0].accNo);
      this.doc.text(130, 90, 'Bank Name :' + this.workOrderPDFModel[0].bankdetails[0].bankName);
      this.doc.text(130, 95, this.workOrderPDFModel[0].bankdetails[0].branchName);
      this.doc.text(130, 100, 'Acc Type :' + this.workOrderPDFModel[0].bankdetails[0].accountType);
      this.doc.text(130, 105, 'IFSC Code :' + this.workOrderPDFModel[0].bankdetails[0].IFSC);
      this.doc.setFontType('bold');
      this.doc.setFontSize(10);
      this.doc.text(20, 220, 'Terms & Conditions');
      this.doc.setFontType('normal');
      this.doc.text(20, 225, this.workOrderPDFModel[0].terms);
      this.doc.setFontType('bold');
      this.doc.text(80, 270, this.workOrderPDFModel[0].footerdetails[0].companyName);
      this.doc.setFontType('bold');
      this.doc.setFontSize(10);
      this.doc.text(30, 275, this.workOrderPDFModel[0].footerdetails[0].address);
      this.doc.text(30, 280, this.workOrderPDFModel[0].footerdetails[0].website + ' ' + ' |' + ' ' +
        this.workOrderPDFModel[0].footerdetails[0].phNo + ' ' + ' |' + ' ' +
        this.workOrderPDFModel[0].footerdetails[0].emailId);
      this.doc.autoTable(columns, this.printArray, options, {
        theme: 'grid',
        bodyStyles: { lineColor: [0, 0, 0] }
      }
      );
      this.doc.setFontType('normal');
      this.doc.text(140, 180, 'Sub Total :Rs' + ' ' + this.invoice[0].subTotal.toString());
      this.doc.text(120, 185, 'SGST (' + this.workOrderPDFModel[0].sgst + '%) +' + ' ' +
      'CGST (' + this.workOrderPDFModel[0].cgst + '%) : Rs' + ' ' + this.invoice[0].tax.toString());
      this.doc.text(140, 190, 'Total :Rs' + ' ' + this.invoice[0].allTotal);
      this.doc.save('proper.pdf');
      
    }, err => {
      console.log(err);
    });
  }
  pdfGSTDiscountDigitalTerms() {
    this.viewCompanyDetails();
    this.invoiceService.singleCustomerDetails(this.invoice[0].customerID).subscribe(data => {
      this.customerModel = data;
      const options = {
        margin: {
          top: 120
        },
      };
      const options1 = {
        margin: {
          top: 80
        },
      };
      this.printArray.push(this.invoice.requirements[0].item, this.invoice[0].requirements[0].description,
        this.invoice.requirements[0].quantity,
        this.invoice.requirements[0].price, this.invoice[0].requirements[0].discount,
        this.invoice[0].requirements[0].total);
      console.log('table details in array', this.printArray);
      this.printArray1.push(this.printArray);
      const imgData = '../../../assets/images/logo.jpg';
      const columns = ['Item', 'Description', 'Quantity', 'Price', 'Discount %', 'Total'];
      const columns1 = ['Company No', 'Name', 'Address', 'Email', 'Phone No'];
      this.doc = new jspdf();
      
      this.doc.setFontSize(10);
      this.doc.setFont('Arial');
      this.doc.setFontType('bold');
      this.doc.text(130, 30, this.workOrderPDFModel[0].companydetails[0].companyName.toUpperCase());
      this.doc.setFontType('bold');
      this.doc.text(130, 35, 'TAX');
      this.doc.setFontType('normal');
      this.doc.text(140, 35, this.workOrderPDFModel[0].companydetails[0].TAX);
      this.doc.setFontType('bold');
      this.doc.text(130, 40, 'PAN');
      this.doc.setFontType('normal');
      this.doc.text(140, 40, this.workOrderPDFModel[0].companydetails[0].PAN);
      this.doc.setFontType('bold');
      this.doc.text(130, 45, 'SAC');
      this.doc.setFontType('normal');
      this.doc.text(140, 45, this.workOrderPDFModel[0].companydetails[0].SAC);
      this.doc.text(130, 50, this.workOrderPDFModel[0].companydetails[0].address);
      this.doc.text(130, 55, this.workOrderPDFModel[0].companydetails[0].pincode);
      this.doc.text(130, 60, 'India ');
      this.doc.text(130, 65, 'Ph No:' + this.workOrderPDFModel[0].companydetails[0].phNo);
      this.doc.setFontType('bold');
      this.doc.text(10, 30, data[0].companyName.toUpperCase());
      this.doc.text(10, 35, 'GST:' + ' ' + data[0].gstNumber);
      this.doc.setFontType('normal');
      this.doc.text(10, 40, data[0].companyAddress);
      this.doc.text(10, 45, data[0].city);
      this.doc.text(10, 50, data[0].state + ' ' + data[0].pincode);
      this.doc.text(10, 55, 'Ph No:' + data[0].mobileNumber.toString());
      this.doc.setFontType('bold');
      this.doc.text(10, 75, 'Invoice Details');
      this.doc.setFontType('normal');
      this.doc.text(10, 80, 'Invoice ID :' + this.invoice[0].invoiceID);
      this.doc.text(10, 85, ' Date :' + this.invoice[0].date);
      this.doc.text(10, 90, ' Expiry Date :' + this.invoice[0].expiryDate);
      this.doc.setFontType('bold');
      this.doc.text(130, 75, 'Bank Details');
      this.doc.setFontType('normal');
      this.doc.text(130, 80, 'Acc Name :' + this.workOrderPDFModel[0].bankdetails[0].accName);
      this.doc.text(130, 85, 'Acc No :' + this.workOrderPDFModel[0].bankdetails[0].accNo);
      this.doc.text(130, 90, 'Bank Name :' + this.workOrderPDFModel[0].bankdetails[0].bankName);
      this.doc.text(130, 95, this.workOrderPDFModel[0].bankdetails[0].branchName);
      this.doc.text(130, 100, 'Acc Type :' + this.workOrderPDFModel[0].bankdetails[0].accountType);
      this.doc.text(130, 105, 'IFSC Code :' + this.workOrderPDFModel[0].bankdetails[0].IFSC);
      this.doc.setFontType('bold');
      this.doc.setFontSize(10);
      this.doc.text(20, 220, 'Terms & Conditions');
      this.doc.setFontType('normal');
      this.doc.text(20, 225, this.workOrderPDFModel[0].digitalterms);
      this.doc.setFontType('bold');
      this.doc.text(80, 270, this.workOrderPDFModel[0].footerdetails[0].companyName);
      this.doc.setFontType('bold');
      this.doc.setFontSize(10);
      this.doc.text(30, 275, this.workOrderPDFModel[0].footerdetails[0].address);
      this.doc.text(30, 280, this.workOrderPDFModel[0].footerdetails[0].website + ' ' + ' |' + ' ' +
        this.workOrderPDFModel[0].footerdetails[0].phNo + ' ' + ' |' + ' ' +
        this.workOrderPDFModel[0].footerdetails[0].emailId);
      this.doc.autoTable(columns, this.printArray, options, {
        theme: 'grid',
        bodyStyles: { lineColor: [0, 0, 0] }
      }
      );
      this.doc.setFontType('normal');
      this.doc.text(140, 180, 'Sub Total :Rs' + ' ' + this.invoice[0].subTotal.toString());
      this.doc.text(120, 185, 'SGST (' + this.workOrderPDFModel[0].sgst + '%) +' + ' ' +
      'CGST (' + this.workOrderPDFModel[0].cgst + '%) : Rs' + ' ' + this.invoice[0].tax.toString());
      this.doc.text(140, 190, 'Total :Rs' + ' ' + this.invoice[0].allTotal);
      this.doc.save('proper.pdf');
      
    }, err => {
      console.log(err);
    });

  }
  savePDFWithDiscountTerms() {
    this.viewCompanyDetails();
    this.invoiceService.singleCustomerDetails(this.invoice[0].customerID).subscribe(data => {
      this.customerModel = data;
      const options = {
        margin: {
          top: 120
        },
      };
      const options1 = {
        margin: {
          top: 80
        },
      };
      for (let i = 0; i <= this.invoice[0].requirements.length - 1; i++) {
        this.allValues.push(this.invoice[0].requirements[i]);
      }
      for (let i = 0; i <= this.allValues.length - 1; i++) {
        this.tempArray[i] = new Array();
        this.tempArray[i] .push(this.allValues[i].item, this.allValues[i].description,
          this.allValues[i].quantity,
          this.allValues[i].price, this.allValues[i].discount, this.allValues[i].total);
          this.printArray.push(this.tempArray[i]);
      }
      const imgData = '../../../assets/images/logo.jpg';
      const columns = ['Item', 'Description', 'Quantity', 'Price', 'Discount %', 'Total'];
      const columns1 = ['Company No', 'Name', 'Address', 'Email', 'Phone No'];
      this.doc = new jspdf();
      
      this.doc.setFontSize(10);
      this.doc.setFont('Arial');
      this.doc.setFontType('bold');
      this.doc.text(130, 30, this.workOrderPDFModel[0].companydetails[0].companyName.toUpperCase());
      this.doc.setFontType('bold');
      this.doc.text(130, 35, 'TAX');
      this.doc.setFontType('normal');
      this.doc.text(140, 35, this.workOrderPDFModel[0].companydetails[0].TAX);
      this.doc.setFontType('bold');
      this.doc.text(130, 40, 'PAN');
      this.doc.setFontType('normal');
      this.doc.text(140, 40, this.workOrderPDFModel[0].companydetails[0].PAN);
      this.doc.setFontType('bold');
      this.doc.text(130, 45, 'SAC');
      this.doc.setFontType('normal');
      this.doc.text(140, 45, this.workOrderPDFModel[0].companydetails[0].SAC);
      this.doc.text(130, 50, this.workOrderPDFModel[0].companydetails[0].address);
      this.doc.text(130, 55, this.workOrderPDFModel[0].companydetails[0].pincode);
      this.doc.text(130, 60, 'India ');
      this.doc.text(130, 65, 'Ph No:' + this.workOrderPDFModel[0].companydetails[0].phNo);
      this.doc.setFontType('bold');
      this.doc.text(10, 30, data[0].companyName.toUpperCase());
      this.doc.text(10, 35, 'GST:' + ' ' + data[0].gstNumber);
      this.doc.setFontType('normal');
      this.doc.text(10, 40, data[0].companyAddress);
      this.doc.text(10, 45, data[0].city);
      this.doc.text(10, 50, data[0].state + ' ' + data[0].pincode);
      this.doc.text(10, 55, 'Ph No:' + data[0].mobileNumber.toString());
      this.doc.setFontType('bold');
      this.doc.text(10, 75, 'Invoice Details');
      this.doc.setFontType('normal');
      this.doc.text(10, 80, 'Invoice ID :' + this.invoice[0].invoiceID);
      this.doc.text(10, 85, ' Date :' + this.invoice[0].date);
      this.doc.text(10, 90, ' Expiry Date :' + this.invoice[0].expiryDate);
      this.doc.setFontType('bold');
      this.doc.text(130, 75, 'Bank Details');
      this.doc.setFontType('normal');
      this.doc.text(130, 80, 'Acc Name :' + this.workOrderPDFModel[0].bankdetails[0].accName);
      this.doc.text(130, 85, 'Acc No :' + this.workOrderPDFModel[0].bankdetails[0].accNo);
      this.doc.text(130, 90, 'Bank Name :' + this.workOrderPDFModel[0].bankdetails[0].bankName);
      this.doc.text(130, 95, this.workOrderPDFModel[0].bankdetails[0].branchName);
      this.doc.text(130, 100, 'Acc Type :' + this.workOrderPDFModel[0].bankdetails[0].accountType);
      this.doc.text(130, 105, 'IFSC Code :' + this.workOrderPDFModel[0].bankdetails[0].IFSC);
      this.doc.setFontType('bold');
      this.doc.setFontSize(10);
      this.doc.text(20, 220, 'Terms & Conditions');
      this.doc.setFontType('normal');
      this.doc.text(20, 225, this.workOrderPDFModel[0].digitalterms);
      this.doc.setFontType('bold');
      this.doc.text(80, 270, this.workOrderPDFModel[0].footerdetails[0].companyName);
      this.doc.setFontType('bold');
      this.doc.setFontSize(10);
      this.doc.text(30, 275, this.workOrderPDFModel[0].footerdetails[0].address);
      this.doc.text(30, 280, this.workOrderPDFModel[0].footerdetails[0].website + ' ' + ' |' + ' ' +
        this.workOrderPDFModel[0].footerdetails[0].phNo + ' ' + ' |' + ' ' +
        this.workOrderPDFModel[0].footerdetails[0].emailId);
      this.doc.autoTable(columns, this.printArray, options, {
        theme: 'grid',
        bodyStyles: { lineColor: [0, 0, 0] }
      }
      );
      this.doc.setFontType('normal');
      this.doc.text(140, 180, 'Sub Total :Rs' + ' ' + this.invoice[0].subTotal.toString());
      this.doc.text(140, 185, 'GST (' + this.workOrderPDFModel[0].gst + '%) :' + ' ' + this.invoice[0].tax);
      this.doc.text(140, 190, 'Total :Rs' + ' ' + this.invoice[0].allTotal);
      this.doc.save('proper.pdf');
      
    }, err => {
      console.log(err);
    });
  }
  savePDFWithoutDiscountTerms() {
    this.viewCompanyDetails();
    this.invoiceService.singleCustomerDetails(this.invoice[0].customerID).subscribe(data => {
      this.customerModel = data;
      const options = {
        margin: {
          top: 120
        },
      };
      const options1 = {
        margin: {
          top: 80
        },
      };
      for (let i = 0; i <= this.invoice[0].requirements.length - 1; i++) {
        this.allValues.push(this.invoice[0].requirements[i]);
      }
      for (let i = 0; i <= this.allValues.length - 1; i++) {
        this.tempArray[i] = new Array();
        this.tempArray[i] .push(this.allValues[i].item, this.allValues[i].description,
          this.allValues[i].quantity,
          this.allValues[i].price,  this.allValues[i].total);
          this.printArray.push(this.tempArray[i]);
      }
      const imgData = '../../../assets/images/logo.jpg';
      const columns = ['Item', 'Description', 'Quantity', 'Price',  'Total'];
      const columns1 = ['Company No', 'Name', 'Address', 'Email', 'Phone No'];
      this.doc = new jspdf();
      
      this.doc.setFontSize(10);
      this.doc.setFont('Arial');
      this.doc.setFontType('bold');
      this.doc.text(130, 30, this.workOrderPDFModel[0].companydetails[0].companyName.toUpperCase());
      this.doc.setFontType('bold');
      this.doc.text(130, 35, 'TAX');
      this.doc.setFontType('normal');
      this.doc.text(140, 35, this.workOrderPDFModel[0].companydetails[0].TAX);
      this.doc.setFontType('bold');
      this.doc.text(130, 40, 'PAN');
      this.doc.setFontType('normal');
      this.doc.text(140, 40, this.workOrderPDFModel[0].companydetails[0].PAN);
      this.doc.setFontType('bold');
      this.doc.text(130, 45, 'SAC');
      this.doc.setFontType('normal');
      this.doc.text(140, 45, this.workOrderPDFModel[0].companydetails[0].SAC);
      this.doc.text(130, 50, this.workOrderPDFModel[0].companydetails[0].address);
      this.doc.text(130, 55, this.workOrderPDFModel[0].companydetails[0].pincode);
      this.doc.text(130, 60, 'India ');
      this.doc.text(130, 65, 'Ph No:' + this.workOrderPDFModel[0].companydetails[0].phNo);
      this.doc.setFontType('bold');
      this.doc.text(10, 30, data[0].companyName.toUpperCase());
      this.doc.text(10, 35, 'GST:' + ' ' + data[0].gstNumber);
      this.doc.setFontType('normal');
      this.doc.text(10, 40, data[0].companyAddress);
      this.doc.text(10, 45, data[0].city);
      this.doc.text(10, 50, data[0].state + ' ' + data[0].pincode);
      this.doc.text(10, 55, 'Ph No:' + data[0].mobileNumber.toString());
      this.doc.setFontType('bold');
      this.doc.text(10, 75, 'Invoice Details');
      this.doc.setFontType('normal');
      this.doc.text(10, 80, 'Invoice ID :' + this.invoice[0].invoiceID);
      this.doc.text(10, 85, ' Date :' + this.invoice[0].date);
      this.doc.text(10, 90, ' Expiry Date :' + this.invoice[0].expiryDate);
      this.doc.setFontType('bold');
      this.doc.text(130, 75, 'Bank Details');
      this.doc.setFontType('normal');
      this.doc.text(130, 80, 'Acc Name :' + this.workOrderPDFModel[0].bankdetails[0].accName);
      this.doc.text(130, 85, 'Acc No :' + this.workOrderPDFModel[0].bankdetails[0].accNo);
      this.doc.text(130, 90, 'Bank Name :' + this.workOrderPDFModel[0].bankdetails[0].bankName);
      this.doc.text(130, 95, this.workOrderPDFModel[0].bankdetails[0].branchName);
      this.doc.text(130, 100, 'Acc Type :' + this.workOrderPDFModel[0].bankdetails[0].accountType);
      this.doc.text(130, 105, 'IFSC Code :' + this.workOrderPDFModel[0].bankdetails[0].IFSC);
      this.doc.setFontType('bold');
      this.doc.setFontSize(10);
      this.doc.text(20, 220, 'Terms & Conditions');
      this.doc.setFontType('normal');
      this.doc.text(20, 225, this.workOrderPDFModel[0].terms);
      this.doc.setFontType('bold');
      this.doc.text(80, 270, this.workOrderPDFModel[0].footerdetails[0].companyName);
      this.doc.setFontType('bold');
      this.doc.setFontSize(10);
      this.doc.text(30, 275, this.workOrderPDFModel[0].footerdetails[0].address);
      this.doc.text(30, 280, this.workOrderPDFModel[0].footerdetails[0].website + ' ' + ' |' + ' ' +
        this.workOrderPDFModel[0].footerdetails[0].phNo + ' ' + ' |' + ' ' +
        this.workOrderPDFModel[0].footerdetails[0].emailId);
      this.doc.autoTable(columns, this.printArray, options, {
        theme: 'grid',
        bodyStyles: { lineColor: [0, 0, 0] }
      }
      );
      this.doc.setFontType('normal');
      this.doc.text(140, 180, 'Sub Total :Rs' + ' ' + this.invoice[0].subTotal.toString());
      this.doc.text(140, 185, 'GST (' + this.workOrderPDFModel[0].gst + '%) :' + ' ' + this.invoice.tax);
      this.doc.text(140, 190, 'Total :Rs' + ' ' + this.invoice[0].allTotal);
      this.doc.save('proper.pdf');
      
    }, err => {
      console.log(err);
    });
  }
  savePDFWithDiscountDigtalTerms() {
    this.viewCompanyDetails();
    this.invoiceService.singleCustomerDetails(this.invoice[0].customerID).subscribe(data => {
      this.customerModel = data;
      const options = {
        margin: {
          top: 120
        },
      };
      const options1 = {
        margin: {
          top: 80
        },
      };
      for (let i = 0; i <= this.invoice[0].requirements.length - 1; i++) {
        this.allValues.push(this.invoice[0].requirements[i]);
      }
      for (let i = 0; i <= this.allValues.length - 1; i++) {
        this.tempArray[i] = new Array();
        this.tempArray[i] .push(this.allValues[i].item, this.allValues[i].description,
          this.allValues[i].quantity,
          this.allValues[i].price, this.allValues[i].discount,  this.allValues[i].total);
          this.printArray.push(this.tempArray[i]);
      }
      const imgData = '../../../assets/images/logo.jpg';
      const columns = ['Item', 'Description', 'Quantity', 'Price', 'Discount %', 'Total'];
      const columns1 = ['Company No', 'Name', 'Address', 'Email', 'Phone No'];
      this.doc = new jspdf();
      
      this.doc.setFontSize(10);
      this.doc.setFont('Arial');
      this.doc.setFontType('bold');
      this.doc.text(130, 30, this.workOrderPDFModel[0].companydetails[0].companyName.toUpperCase());
      this.doc.setFontType('bold');
      this.doc.text(130, 35, 'TAX');
      this.doc.setFontType('normal');
      this.doc.text(140, 35, this.workOrderPDFModel[0].companydetails[0].TAX);
      this.doc.setFontType('bold');
      this.doc.text(130, 40, 'PAN');
      this.doc.setFontType('normal');
      this.doc.text(140, 40, this.workOrderPDFModel[0].companydetails[0].PAN);
      this.doc.setFontType('bold');
      this.doc.text(130, 45, 'SAC');
      this.doc.setFontType('normal');
      this.doc.text(140, 45, this.workOrderPDFModel[0].companydetails[0].SAC);
      this.doc.text(130, 50, this.workOrderPDFModel[0].companydetails[0].address);
      this.doc.text(130, 55, this.workOrderPDFModel[0].companydetails[0].pincode);
      this.doc.text(130, 60, 'India ');
      this.doc.text(130, 65, 'Ph No:' + this.workOrderPDFModel[0].companydetails[0].phNo);
      this.doc.setFontType('bold');
      this.doc.text(10, 30, data[0].companyName.toUpperCase());
      this.doc.text(10, 35, 'GST:' + ' ' + data[0].gstNumber);
      this.doc.setFontType('normal');
      this.doc.text(10, 40, data[0].companyAddress);
      this.doc.text(10, 45, data[0].city);
      this.doc.text(10, 50, data[0].state + ' ' + data[0].pincode);
      this.doc.text(10, 55, 'Ph No:' + data[0].mobileNumber.toString());
      this.doc.setFontType('bold');
      this.doc.text(10, 75, 'Invoice Details');
      this.doc.setFontType('normal');
      this.doc.text(10, 80, 'Invoice ID :' + this.invoice.invoiceID);
      this.doc.text(10, 85, ' Date :' + this.invoice.date);
      this.doc.text(10, 90, ' Expiry Date :' + this.invoice.expiryDate);
      this.doc.setFontType('bold');
      this.doc.text(130, 75, 'Bank Details');
      this.doc.setFontType('normal');
      this.doc.text(130, 80, 'Acc Name :' + this.workOrderPDFModel[0].bankdetails[0].accName);
      this.doc.text(130, 85, 'Acc No :' + this.workOrderPDFModel[0].bankdetails[0].accNo);
      this.doc.text(130, 90, 'Bank Name :' + this.workOrderPDFModel[0].bankdetails[0].bankName);
      this.doc.text(130, 95, this.workOrderPDFModel[0].bankdetails[0].branchName);
      this.doc.text(130, 100, 'Acc Type :' + this.workOrderPDFModel[0].bankdetails[0].accountType);
      this.doc.text(130, 105, 'IFSC Code :' + this.workOrderPDFModel[0].bankdetails[0].IFSC);
      this.doc.setFontType('bold');
      this.doc.setFontSize(10);
      this.doc.text(20, 220, 'Terms & Conditions');
      this.doc.setFontType('normal');
      this.doc.text(20, 225, this.workOrderPDFModel[0].digitalterms);
      this.doc.setFontType('bold');
      this.doc.text(80, 270, this.workOrderPDFModel[0].footerdetails[0].companyName);
      this.doc.setFontType('bold');
      this.doc.setFontSize(10);
      this.doc.text(30, 275, this.workOrderPDFModel[0].footerdetails[0].address);
      this.doc.text(30, 280, this.workOrderPDFModel[0].footerdetails[0].website + ' ' + ' |' + ' ' +
        this.workOrderPDFModel[0].footerdetails[0].phNo + ' ' + ' |' + ' ' +
        this.workOrderPDFModel[0].footerdetails[0].emailId);
      this.doc.autoTable(columns, this.printArray, options, {
        theme: 'grid',
        bodyStyles: { lineColor: [0, 0, 0] }
      }
      );
      this.doc.setFontType('normal');
      this.doc.text(140, 180, 'Sub Total :Rs' + ' ' + this.invoice[0].subTotal.toString());
      this.doc.text(140, 185, 'GST (' + this.workOrderPDFModel[0].gst + '%) :' + ' ' + this.invoice.tax);
      this.doc.text(140, 190, 'Total :Rs' + ' ' + this.invoice[0].allTotal);
      this.doc.save('proper.pdf');
      
    }, err => {
      console.log(err);
    });
  }
  savePDFWithoutDiscountDigtalTerms() {
    this.viewCompanyDetails();
    this.invoiceService.singleCustomerDetails(this.invoice[0].customerID).subscribe(data => {
      this.customerModel = data;
      const options = {
        margin: {
          top: 120
        },
      };
      const options1 = {
        margin: {
          top: 80
        },
      };
      this.printArray.push(this.invoice.requirements[0].item, this.invoice[0].requirements[0].description,
        this.invoice.requirements[0].quantity,
        this.invoice.requirements[0].price,  this.invoice[0].requirements[0].total);
      console.log('table details in array', this.printArray);
      this.printArray1.push(this.printArray);
      const imgData = '../../../assets/images/logo.jpg';
      const columns = ['Item', 'Description', 'Quantity', 'Price',  'Total'];
      const columns1 = ['Company No', 'Name', 'Address', 'Email', 'Phone No'];
      this.doc = new jspdf();
      
      this.doc.setFontSize(10);
      this.doc.setFont('Arial');
      this.doc.setFontType('bold');
      this.doc.text(130, 30, this.workOrderPDFModel[0].companydetails[0].companyName.toUpperCase());
      this.doc.setFontType('bold');
      this.doc.text(130, 35, 'TAX');
      this.doc.setFontType('normal');
      this.doc.text(140, 35, this.workOrderPDFModel[0].companydetails[0].TAX);
      this.doc.setFontType('bold');
      this.doc.text(130, 40, 'PAN');
      this.doc.setFontType('normal');
      this.doc.text(140, 40, this.workOrderPDFModel[0].companydetails[0].PAN);
      this.doc.setFontType('bold');
      this.doc.text(130, 45, 'SAC');
      this.doc.setFontType('normal');
      this.doc.text(140, 45, this.workOrderPDFModel[0].companydetails[0].SAC);
      this.doc.text(130, 50, this.workOrderPDFModel[0].companydetails[0].address);
      this.doc.text(130, 55, this.workOrderPDFModel[0].companydetails[0].pincode);
      this.doc.text(130, 60, 'India ');
      this.doc.text(130, 65, 'Ph No:' + this.workOrderPDFModel[0].companydetails[0].phNo);
      this.doc.setFontType('bold');
      this.doc.text(10, 30, data[0].companyName.toUpperCase());
      this.doc.text(10, 35, 'GST:' + ' ' + data[0].gstNumber);
      this.doc.setFontType('normal');
      this.doc.text(10, 40, data[0].companyAddress);
      this.doc.text(10, 45, data[0].city);
      this.doc.text(10, 50, data[0].state + ' ' + data[0].pincode);
      this.doc.text(10, 55, 'Ph No:' + data[0].mobileNumber.toString());
      this.doc.setFontType('bold');
      this.doc.text(10, 75, 'Invoice Details');
      this.doc.setFontType('normal');
      this.doc.text(10, 80, 'Invoice ID :' + this.invoice[0].invoiceID);
      this.doc.text(10, 85, ' Date :' + this.invoice[0].date);
      this.doc.text(10, 90, ' Expiry Date :' + this.invoice[0].expiryDate);
      this.doc.setFontType('bold');
      this.doc.text(130, 75, 'Bank Details');
      this.doc.setFontType('normal');
      this.doc.text(130, 80, 'Acc Name :' + this.workOrderPDFModel[0].bankdetails[0].accName);
      this.doc.text(130, 85, 'Acc No :' + this.workOrderPDFModel[0].bankdetails[0].accNo);
      this.doc.text(130, 90, 'Bank Name :' + this.workOrderPDFModel[0].bankdetails[0].bankName);
      this.doc.text(130, 95, this.workOrderPDFModel[0].bankdetails[0].branchName);
      this.doc.text(130, 100, 'Acc Type :' + this.workOrderPDFModel[0].bankdetails[0].accountType);
      this.doc.text(130, 105, 'IFSC Code :' + this.workOrderPDFModel[0].bankdetails[0].IFSC);
      this.doc.setFontType('bold');
      this.doc.setFontSize(10);
      this.doc.text(20, 220, 'Terms & Conditions');
      this.doc.setFontType('normal');
      this.doc.text(20, 225, this.workOrderPDFModel[0].digitalterms);
      this.doc.setFontType('bold');
      this.doc.text(80, 270, this.workOrderPDFModel[0].footerdetails[0].companyName);
      this.doc.setFontType('bold');
      this.doc.setFontSize(10);
      this.doc.text(30, 275, this.workOrderPDFModel[0].footerdetails[0].address);
      this.doc.text(30, 280, this.workOrderPDFModel[0].footerdetails[0].website + ' ' + ' |' + ' ' +
        this.workOrderPDFModel[0].footerdetails[0].phNo + ' ' + ' |' + ' ' +
        this.workOrderPDFModel[0].footerdetails[0].emailId);
      this.doc.autoTable(columns, this.printArray, options, {
        theme: 'grid',
        bodyStyles: { lineColor: [0, 0, 0] }
      }
      );
      this.doc.setFontType('normal');
      this.doc.text(140, 180, 'Sub Total :Rs' + ' ' + this.invoice[0].subTotal.toString());
      this.doc.text(140, 185, 'GST (' + this.workOrderPDFModel[0].gst + '%) :' + ' ' + this.invoice[0].tax);
      this.doc.text(140, 190, 'Total :Rs' + ' ' + this.invoice[0].allTotal);
      this.doc.save('proper.pdf');
    }, err => {
      console.log(err);
    });
  } */
}
