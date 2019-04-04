import { Component, OnInit, ElementRef } from '@angular/core';
import { WorkOrderService } from './../work-order.service';
import { WorkOrder } from './../../shared/workorder.model';
import { WorkOrderPdf } from './../../shared/workorderpdf.model';
import { Customer } from './../../shared/customer.model';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-view-single-workorder',
  templateUrl: './view-single-workorder.component.html',
  styleUrls: ['./view-single-workorder.component.css']
})
export class ViewSingleWorkorderComponent implements OnInit {
  singleWorkorderDetailsForm: FormGroup;
  workOrderPDFModel: WorkOrderPdf;
  workOrder: WorkOrder;
  leadId: string;
  workId: string;
  customerID;
  customerModel: Customer;
  tempArray = new Array;
  allValues = new Array;
  printArray = new Array;
  printArray1 = new Array;
  doc;
  templateOption: boolean;
  selected = 'withDiscount';
  TypesOfTerms = ['Production Terms', 'Digital Marketing Terms'];
  templates = ['With Discount + GST', 'Without Discount + GST'];
  imgData = './../../../assets/images/logo.jpg';
  constructor(private workOrderService: WorkOrderService, private route: ActivatedRoute,
    private router: Router, private fb: FormBuilder) { }
      ngOnInit() {
    this.route.paramMap.subscribe(
      (params: ParamMap) => {
        this.workId = params.get('workId');
      }
    );
    this.viewWorkOrder();
    this.createForm();
  }
  createForm() {
    this.singleWorkorderDetailsForm = this.fb.group({
      termsType: [''],
    });
  }
  viewWorkOrder() {
    this.workOrderService.viewSingleWorkOrder(this.workId).subscribe(data => {
      this.workOrder = data;
      this.customerID = this.workOrder[0].customerID;
      this.customerDetails();
      this.viewCompanyDetails();
    }, error => {
      console.log(error);
    });
  }
  viewCompanyDetails() {
    this.workOrderService.workorderPDFDetails().subscribe(data => {
      this.workOrderPDFModel = data;
    }, error => {
      console.log(error);
    });
  }
  showTemplate() {
    this.templateOption = true;
  }
  cancelWorkorder()   {
    this.router.navigate(['workorder/viewallworkorder']);
  }
  /* templateType(val) {
    const TYPE = this.singleWorkorderDetailsForm.controls.termsType.value;
    if (val === 'With Discount + GST' && TYPE === 'Production Terms') {
      this.savePDFWithDiscountTerms();
    } else if (val === 'With Discount + GST' && TYPE === 'Digital Marketing Terms') {
      this.savePDFWithDiscountDigtalTerms();
    } else if (val === 'Without Discount + GST' && TYPE === 'Production Terms') {
      this.savePDFWithoutDiscountTerms();
    } else if (val === 'Without Discount + GST' && TYPE === 'Digital Marketing Terms') {
      this.savePDFWithoutDiscountDigtalTerms();
    }
  } */

  customerDetails() {
    this.workOrderService.singleCustomerDetails(this.workOrder[0].customerID).subscribe(data => {
      this.customerModel = data; }, error => {
        console.log(error);
      });
  }

 /*  savePDFWithDiscountTerms() {
    this.viewCompanyDetails();
    this.workOrderService.singleCustomerDetails(this.workOrder[0].customerID).subscribe(data => {
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
      for (let i = 0; i <= this.workOrder[0].requirements.length - 1; i++) {
        this.allValues.push(this.workOrder[0].requirements[i]);
      }
      for (let i = 0; i <= this.allValues.length - 1; i++) {
        this.tempArray[i] = new Array();
        this.tempArray[i] .push(this.allValues[i].item, this.allValues[i].description,
          this.allValues[i].quantity,
          this.allValues[i].price, this.allValues[i].discount, this.allValues[i].total);
          this.printArray.push(this.tempArray[i]);
      }
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
      this.doc.text(10, 75, 'Work Order Details');
      this.doc.setFontType('normal');
      this.doc.text(10, 80, 'Work Order ID :' + this.workOrder[0].workOrderID);
      this.doc.text(10, 85, ' Date :' + this.workOrder[0].date);
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
      this.doc.text(140, 180, 'Sub Total :Rs' + ' ' + this.workOrder[0].subTotal.toString());
      this.doc.text(140, 185, 'GST (' + this.workOrderPDFModel[0].gst + '%) :' + ' ' + this.workOrder.tax);
      this.doc.text(140, 190, 'Total :Rs' + ' ' + this.workOrder[0].allTotal);
      this.doc.save('proper.pdf');
    }, err => {
      console.log(err);
    });

  }
  savePDFWithDiscountDigtalTerms() {
    this.viewCompanyDetails();
    this.workOrderService.singleCustomerDetails(this.workOrder[0].customerID).subscribe(data => {
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
      for (let i = 0; i <= this.workOrder[0].requirements.length - 1; i++) {
        this.allValues.push(this.workOrder[0].requirements[i]);
      }
      for (let i = 0; i <= this.allValues.length - 1; i++) {
        this.tempArray[i] = new Array();
        this.tempArray[i] .push(this.allValues[i].item, this.allValues[i].description,
          this.allValues[i].quantity,
          this.allValues[i].price, this.allValues[i].discount, this.allValues[i].total);
          this.printArray.push(this.tempArray[i]);
      }
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
      this.doc.text(10, 75, 'Work Order Details');
      this.doc.setFontType('normal');
      this.doc.text(10, 80, 'Work Order ID :' + this.workOrder[0].workOrderID);
      this.doc.text(10, 85, ' Date :' + this.workOrder[0].date);
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
      this.doc.text(140, 180, 'Sub Total :Rs' + ' ' + this.workOrder[0].subTotal.toString());
      this.doc.text(140, 185, 'GST (' + this.workOrderPDFModel[0].gst + '%) :' + ' ' + this.workOrder[0].tax);
      this.doc.text(140, 190, 'Total :Rs' + ' ' + this.workOrder[0].allTotal);
      this.doc.save('proper.pdf');
    }, err => {
      console.log(err);
    });

  }
  savePDFWithoutDiscountTerms() {
    this.viewCompanyDetails();
    this.workOrderService.singleCustomerDetails(this.workOrder[0].customerID).subscribe(data => {
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
      for (let i = 0; i <= this.workOrder[0].requirements.length - 1; i++) {
        this.allValues.push(this.workOrder[0].requirements[i]);
      }
      for (let i = 0; i <= this.allValues.length - 1; i++) {
        this.tempArray[i] = new Array();
        this.tempArray[i] .push(this.allValues[i].item, this.allValues[i].description,
          this.allValues[i].quantity,
          this.allValues[i].price, this.allValues[i].discount, this.allValues[i].total);
          this.printArray.push(this.tempArray[i]);
      }
      const columns = ['Item', 'Description', 'Quantity', 'Price', 'Total'];
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
      this.doc.text(10, 75, 'Work Order Details');
      this.doc.setFontType('normal');
      this.doc.text(10, 80, 'Work Order ID :' + this.workOrder[0].workOrderID);
      this.doc.text(10, 85, ' Date :' + this.workOrder[0].date);
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
      this.doc.text(140, 180, 'Sub Total :Rs' + ' ' + this.workOrder[0].subTotal.toString());
      this.doc.text(140, 185, 'GST (' + this.workOrderPDFModel[0].gst + '%) :' + ' ' + this.workOrder.tax);
      this.doc.text(140, 190, 'Total :Rs' + ' ' + this.workOrder[0].allTotal);
      this.doc.save('proper.pdf');
    }, err => {
      console.log(err);
    });

  }
  savePDFWithoutDiscountDigtalTerms() {
    this.viewCompanyDetails();
    this.workOrderService.singleCustomerDetails(this.workOrder[0].customerID).subscribe(data => {
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
      for (let i = 0; i <= this.workOrder[0].requirements.length - 1; i++) {
        this.allValues.push(this.workOrder[0].requirements[i]);
      }
      for (let i = 0; i <= this.allValues.length - 1; i++) {
        this.tempArray[i] = new Array();
        this.tempArray[i] .push(this.allValues[i].item, this.allValues[i].description,
          this.allValues[i].quantity,
          this.allValues[i].price, this.allValues[i].discount, this.allValues[i].total);
          this.printArray.push(this.tempArray[i]);
      }
      const columns = ['Item', 'Description', 'Quantity', 'Price', 'Total'];
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
      this.doc.text(10, 75, 'Work Order Details');
      this.doc.setFontType('normal');
      this.doc.text(10, 80, 'Work Order ID :' + this.workOrder[0].workOrderID);
      this.doc.text(10, 85, ' Date :' + this.workOrder[0].date);
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
      this.doc.text(140, 180, 'Sub Total :Rs' + ' ' + this.workOrder[0].subTotal.toString());
      this.doc.text(140, 185, 'GST (' + this.workOrderPDFModel[0].gst + '%) :' + ' ' + this.workOrder.tax);
      this.doc.text(140, 190, 'Total :Rs' + ' ' + this.workOrder[0].allTotal);
      this.doc.save('proper.pdf');
    }, err => {
      console.log(err);
    });
  }*/
}
