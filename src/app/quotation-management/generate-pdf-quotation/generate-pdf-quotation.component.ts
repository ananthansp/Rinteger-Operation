import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { Quotation } from './../../shared/quotation.model';
import { WorkOrderPdf } from './../../shared/workorderpdf.model';
import { Detail } from './../../shared/detail.model';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-generate-pdf-quotation',
  templateUrl: './generate-pdf-quotation.component.html',
  styleUrls: ['./generate-pdf-quotation.component.css']
})
export class GeneratePdfQuotationComponent implements OnInit {
  @Input() quotationDetails: any;
  @Input() customer: any;
  @Input() companyDetails: any;
  noRequirementError = false;
  singleQuotationDetailsForm: FormGroup;
  arrayNew;
  quotationReq: Detail[];
  quotation: Quotation[];
  workOrderPdf: WorkOrderPdf[];
  customerData;
  companyData;
  TypesOfTerms = ['Production Terms', 'Digital Marketing Terms'];
  templates = ['With Discount + GST', 'Without Discount + GST'];
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.singleQuotationDetailsForm = this.fb.group({
      termsType: [''],
    });
  }

  newValue() {
    const newTestArray = [];
    const headerArray = [{ text: 'Item', style: 'tableHeaderRow' },
    { text: 'Quantity', style: 'tableHeaderRow' },
    { text: 'Price', style: 'tableHeaderRow' }, { text: 'Discount (%)', style: 'tableHeaderRow' },
    { text: 'Total', style: 'tableHeaderTotal' }];
    newTestArray.push(headerArray);
    for (let i = 0; i < this.quotationReq.length; i++) {
      newTestArray.push([{ text: this.quotationReq[i].item, style: 'rowStyle' }, { text: this.quotationReq[i].quantity, style: 'rowStyle' },
      { text: this.quotationReq[i].price.toFixed(2), style: 'rowStyle' },
      { text: this.quotationReq[i].discount, style: 'rowStyle' },
      { text: this.quotationReq[i].total.toFixed(2), style: 'rowTotal' }]);
    }
    return newTestArray;
  }

  discountNull() {
    const newTestArray = [];
    const headerArray = [{ text: 'Item', style: 'tableHeaderRow' },
    { text: 'Quantity', style: 'tableHeaderRow' },
    { text: 'Price', style: 'tableHeaderRow' },
    { text: 'Total', style: 'tableHeaderTotal' }];
    newTestArray.push(headerArray);
    for (let i = 0; i < this.quotationReq.length; i++) {
      newTestArray.push([{ text: this.quotationReq[i].item, style: 'rowStyle' }, { text: this.quotationReq[i].quantity, style: 'rowStyle' },
      { text: this.quotationReq[i].price.toFixed(2), style: 'rowStyle' },
      { text: this.quotationReq[i].total.toFixed(2), style: 'rowTotal' }]);
    }
    return newTestArray;
  }


  viewSingleQuotationPdf(work, customer, company, temp) {
    this.quotation = work;
    this.quotationReq = work[0].requirements;
    this.customerData = customer;
    this.companyData = company;
    this.workOrderPdf = company;
    const type = this.singleQuotationDetailsForm.controls.termsType.value;
    if (temp === 'With Discount + GST' && type === 'Production Terms') {
      this.pdfWithDiscountandProduct();
    } else if (temp === 'With Discount + GST' && type === 'Digital Marketing Terms') {
      this.pdfWithDiscountDigtalTerms();
    } else if (temp === 'Without Discount + GST' && type === 'Production Terms') {
      this.pdfWithoutDiscountTerms();
    } else if (temp === 'Without Discount + GST' && type === 'Digital Marketing Terms') {
      this.pdfWithoutDiscountDigtalTerms();
    }
  }
  pdfWithDiscountDigtalTerms() {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    const dd = {
      footer: {
        columns: [
          {
            text: this.companyData[0].footerdetails[0].companyName.toUpperCase() + ' \n '
              + this.companyData[0].footerdetails[0].address + ' | '
              + this.companyData[0].footerdetails[0].email + ' | '
              + this.companyData[0].footerdetails[0].phNo + ' | '
              + this.companyData[0].footerdetails[0].website, style: 'footerHeader'
          },
        ]
      },
        content: [{
          columns: [{
            // tslint:disable-next-line:max-line-length
            image: 'data:image/jpeg;base64,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rIAZN4o8dNu5+vqruHFHjpt3P19VdxrIAZN4o8dNu5+vqruHFHjpt3P19VdxrIAZN4o8dNu5+vqruHFHjpt3P19VdxrIAZN4o8dNu5+vqruHFHjpt3P19VdxrIAZN4o8dNu5+vqruHFHjpt3P19VdxrIAZN4o8dNu5+vqruHFHjpt3P19VdxrIAZN4o8dNu5+vqruHFHjpt3P19VdxrIAZN4o8dNu5+vqruHFHjpt3P19VdxrIAZN4o8dNu5+vqruHFHjpt3P19VdxrIAZN4o8dNu5+vqruHFHjpt3P19VdxrIAZN4o8dNu5+vqruHFHjpt3P19VdxrIAZN4o8dNu5+vqruHFHjpt3P19VdxrIAZN4o8dNu5+vqruHFHjpt3P19VdxrIAZN4o8dNu5+vqruHFHjpt3P19VdxrIAZN4o8dNu5+vqruHFHjpt3P19VdxrIAZN4o8dNu5+vqruHFHjpt3P19VdxrIAZN4o8dNu5+vqruHFHjpt3P19VdxrIAZN4o8dNu5+vqruHFHjpt3P19VdxrIAZN4o8dNu5+vqruHFHjpt3P19VdxrIAZN4o8dNu5+vqruHFHjpt3P19VdxrIAZN4o8dNu5+vqruHFHjpt3P19VdxrIAZN4o8dNu5+vqruHFHjpt3P19VdxrIAZN4o8dNu5+vqruHFHjpt3P19VdxrIAZN4o8dNu5+vqruHFHjpt3P19VdxrIAZN4o8dNu5+vqruHFHjpt3P19VdxrIAZN4o8dNu5+vqruHFHjpt3P19VdxrIAZN4o8dNu5+vqruHFHjpt3P19VdxrIAZN4o8dNu5+vqruHFHjpt3P19VdxrIAZN4o8dNu5+vqruHFHjpt3P19VdxrIAZN4o8dNu5+vqruHFHjpt3P19VdxrIAZN4o8dNu5+vqruHFHjpt3P19VdxrIAZN4o8dNu5+vqruHFHjpt3P19VdxrIAZN4o8dNu5+vqruHFHjpt3P19VdxrIAZN4o8dNu5+vqruHFHjpt3P19VdxrIAZN4o8dNu5+vqruHFHjpt3P19VdxrIAZN4o8dNu5+vqruHFHjpt3P19VdxrIAZN4o8dNu5+vqruHFHjpt3P19VdxrIAZN4o8dNu5+vqruHFHjpt3P19VdxrIAZN4o8dNu5+vqruHFHjpt3P19VdxrIAZN4o8dNu5+vqruHFHjpt3P19Vdx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rzCqgCVaPmGGzPb6rzBo+YYbM9vqvMKqAJVo+YYbM9vqvMGj5hhsz2+q8wqoAlWj5hhsz2+q8waPmGGzPb6rzCqgCVaPmGGzPb6rzBo+YYbM9vqvMKqAJVo+YYbM9vqvMGj5hhsz2+q8wqoAlWj5hhsz2+q8waPmGGzPb6rzCqgCVaPmGGzPb6rzBo+YYbM9vqvMKqAJVo+YYbM9vqvMGj5hhsz2+q8wqoAlWj5hhsz2+q8waPmGGzPb6rzCqgCVaPmGGzPb6rzBo+YYbM9vqvMKqAJVo+YYbM9vqvMGj5hhsz2+q8wqoAlWj5hhsz2+q8waPmGGzPb6rzCqgCVaPmGGzPb6rzBo+YYbM9vqvMKqAJVo+YYbM9vqvMGj5hhsz2+q8wqoAlWj5hhsz2+q8waPmGGzPb6rzCqgCVaPmGGzPb6rzBo+YYbM9vqvMKqAJVo+YYbM9vqvMGj5hhsz2+q8wqoAlWj5hhsz2+q8waPmGGzPb6rzCqgCVaPmGGzPb6rzBo+YYbM9vqvMKqAJVo+YYbM9vqvMGj5hhsz2+q8wqoAlWj5hhsz2+q8waPmGGzPb6rzCqgCVaPmGGzPb6rzBo+YYbM9vqvMKqAJVo+YYbM9vqvMGj5hhsz2+q8wqoAlWj5hhsz2+q8waPmGGzPb6rzCqgCVaPmGGzPb6rzBo+YYbM9vqvMKqAJVo+YYbM9vqvMGj5hhsz2+q8wqoAlWj5hhsz2+q8waPmGGzPb6rzCqgCVaPmGGzPb6rzBo+YYbM9vqvMKqAJVo+YYbM9vqvMGj5hhsz2+q8wqoAlWj5hhsz2+q8waPmGGzPb6rzCqgCVaPmGGzPb6rzBo+YYbM9vqvMKqAJVo+YYbM9vqvMGj5hhsz2+q8wqoAlWj5hhsz2+q8waPmGGzPb6rzCqgCVaPmGGzPb6rzBo+YYbM9vqvMKqAJVo+YYbM9vqvMGj5hhsz2+q8wqoAlWj5hhsz2+q8waPmGGzPb6rzCqgCVaPmGGzPb6rzBo+YYbM9vqvMKqAJVo+YYbM9vqvMGj5hhsz2+q8wqoAlWj5hhsz2+q8waPmGGzPb6rzCqgCVaPmGGzPb6rzBo+YYbM9vqvMKqAJVo+YYbM9vqvMGj5hhsz2+q8wqoAlWj5hhsz2+q8waPmGGzPb6rzCqgCVaPmGGzPb6rzBo+YYbM9vqvMKqAJVo+YYbM9vqvMGj5hhsz2+q8wqoAlWj5hhsz2+q8waPmGGzPb6rzCqgCVaPmGGzPb6rzBo+YYbM9vqvMKqAJVo+YYbM9vqvMGj5hhsz2+q8wqoAlWj5hhsz2+q8waPmGGzPb6rzCqgCVaPmGGzPb6rzBo+YYbM9vqvMKqAJVo+YYbM9vqvMGj5hhsz2+q8wqoAlWj5hhsz2+q8waPmGGzPb6rzCqgCVaPmGGzPb6rzBo+YYbM9vqvMKqAJVo+YYbM9vqvMGj5hhsz2+q8wqoAlWj5hhsz2+q8waPmGGzPb6rzCqgCVaPmGGzPb6rzBo+YYbM9vqvMKqAJVo+YYbM9vqvMGj5hhsz2+q8wqoAlWj5hhsz2+q8wpdk2fS2RZVHZtnxcDRUcLKeCPfK7eRsajWpmqqq5Iia1XM5QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/9k=',	
                  width: 500,
                  height: 100,
                  style: 'headerStyle'
                }
                ],
              },
        {
          columns: [
            {
              type: 'none',
              width: 350,
              ul: [
                { text: this.customerData[0].companyName.toUpperCase(), style: 'textHeader' },
                { text: 'GST : ' + this.customerData[0].gstNumber.toUpperCase(), style: 'textGst' },
                { text: this.customerData[0].companyAddress.toUpperCase(), style: 'address' },
                { text: this.customerData[0].location.toUpperCase(), style: 'address' },
                { text: this.customerData[0].state.toUpperCase(), style: 'address' },
                { text: this.customerData[0].pincode, style: 'address' },
                { text: 'Phone: ' + this.customerData[0].mobileNumber, style: 'phone' },
              ]
            },
            {
              type: 'none',
              width: '*',
              ul: [
                { text: this.companyData[0].companydetails[0].companyName.toUpperCase(), style: 'textHeader' },
                { text: 'GST : ' + this.companyData[0].companydetails[0].TAX.toUpperCase(), style: 'textGst' },
                { text: 'PAN : ' + this.companyData[0].companydetails[0].PAN.toUpperCase(), style: 'textGst' },
                /* {text: this.customerData[0].companyAddress.toUpperCase(), style: 'address'}, */
                { text: this.companyData[0].companydetails[0].location, style: 'address' },
                { text: this.companyData[0].companydetails[0].address.toUpperCase(), style: 'address' },
                { text: this.companyData[0].companydetails[0].pincode, style: 'address' },
                { text: 'Phone: ' + this.companyData[0].companydetails[0].phNo, style: 'phone' },
              ]
            }
          ],
        },
        {
          columns: [
            {
              type: 'none',
              width: 350,
              ul: [
                { text: 'QUOTATION DETAILS', style: 'orderStyle' },
                { text: 'Quotation ID:  ' + this.quotation[0].quotationID.toUpperCase(), style: 'textGst' },
                { text: 'Quotation Date: ' +
                new Date(this.quotation[0].date).toLocaleDateString(), style: 'address' },
                { text: 'Total Amount: ' + this.quotation[0].allTotal.toFixed(2), style: 'address' }
              ]
            },
            {
              type: 'none',
              width: '*',
              ul: [
                { text: 'BANK DETAILS', style: 'orderStyle' },
                { text: this.companyData[0].bankdetails[0].accName.toUpperCase(), style: 'textGst' },
                { text: 'A/C No : ' + this.companyData[0].bankdetails[0].accNo.toUpperCase(), style: 'textGst' },
                { text: 'A/C Type : ' + this.companyData[0].bankdetails[0].accountType.toUpperCase(), style: 'textGst' },
                /* {text: this.customerData[0].companyAddress.toUpperCase(), style: 'address'}, */
                { text: 'Bank Name : ' + this.companyData[0].bankdetails[0].bankName, style: 'address' },
                { text: 'Branch Name: ' + this.companyData[0].bankdetails[0].branchName.toUpperCase(), style: 'address' },
                { text: 'IFSC: ' + this.companyData[0].bankdetails[0].IFSC, style: 'address' },
              ]
            }
          ],
        },
        {
          style: 'tableExample',
          table: {
            headerRows: 1,
            widths: ['*', '*', '*', '*', '*'],
            body: this.newValue()
          },
          layout: {
            fillColor: function (rowIndex, node, columnIndex) {
              return (rowIndex % 2 === 0) ? '#CCCCCC' : null;
            },
          }
        }, {
          style: 'tableExample',
          table: {
            headerRows: 1,
            widths: ['*', '*', '*', '*', '*'],
            body: [[{ text: '', style: 'rowStyle', border: [false, false, false, false] },
            { text: '', style: 'rowStyle', border: [false, false, false, false] }, {
              text: '',
              style: 'rowStyle', border: [false, false, false, false]
            }, { text: 'GST ( ' + this.workOrderPdf[0].gst + ' % )', style: 'rowStyle' },
            { text: this.quotation[0].tax.toFixed(2), style: 'rowTotal' }],
            [{ text: '', style: 'rowStyle', border: [false, false, false, false] },
            { text: '', style: 'rowStyle', border: [false, false, false, false] }, {
              text: '',
              style: 'rowStyle', border: [false, false, false, false]
            }, { text: 'Amount', style: 'rowStyle' },
            { text: this.quotation[0].allTotal.toFixed(2), style: 'rowTotal' }]
            ]
          },
        },  {
          type: 'none',
          width: '*',
          ul: [
            { text: 'Terms and Conditions', style: 'textHeaderTerms' },
            { text: this.workOrderPdf[0].digitalterms, style: 'textTerms' },
          ]
      }
      ],
      styles: {
        headerStyle: {
          margin: [0, 0, 0, 50]
        },

textHeaderTerms: {
          fontSize: 8,
          bold: true,
          margin: [0, 50, 0, 0]
        },
textTerms: {
          fontSize: 8,
          margin: [0, 10, 0, 0]
        },
        footer: {
          bold: true,
          alignment: 'center',
          margin: [0, 50, 10, 10],
          border: [1, 0, 0, 0]
        },
        tableExample: {
          margin: [10, 10, 10, 10]
        },
        tableHeader: {
          alignment: 'center'
        },
        subheader: {
          fontSize: 14
        },
        tableHeaderRow: {
          bold: true,
          alignment: 'center'
        },
        footerHeader: {
          alignment: 'center',
          fontSize: 8,
          margin: [10, 10, 10, 10]
        },
        footerSub: {
          alignment: 'center'
        },
        tableHeaderTotal: {
          alignment: 'right'
        },
        textHeader: {
          bold: true,
          fontSize: 9
        },
        textGst: {
          fontSize: 8,
          margin: [0, 5, 0, 0]
        },
        phone: {
          margin: [0, 5, 0, 0],
          fontSize: 8,
        },
        address: {
          margin: [0, 5, 0, 0],
          fontSize: 8,
        },
        superMargin: {
          margin: [20, 0, 40, 0],
          fontSize: 14
        },
        orderStyle:
        {
          fontSize: 9,
          margin: [0, 20, 0, 0],
        },
        rowStyle: {
          fontSize: 8,
          alignment: 'center'
        },
        termsStyle: {
          fontSize: 8,
          alignment: 'left'
        },
        rowTotal: {
          fontSize: 8,
          alignment: 'right'
        }

      }
    };
    pdfMake.createPdf(dd).download(this.quotation[0].quotationID);
  }

  pdfWithDiscountandProduct() {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    const dd = {
      footer: {
        columns: [
          {
            text: this.companyData[0].footerdetails[0].companyName.toUpperCase() + ' \n '
              + this.companyData[0].footerdetails[0].address + ' | '
              + this.companyData[0].footerdetails[0].email + ' | '
              + this.companyData[0].footerdetails[0].phNo + ' | '
              + this.companyData[0].footerdetails[0].website, style: 'footerHeader'
          },
        ]
      },
      content: [
        {
          columns: [{
            // tslint:disable-next-line:max-line-length
            image: 'data:image/jpeg;base64,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rIAZN4o8dNu5+vqruHFHjpt3P19VdxrIAZN4o8dNu5+vqruHFHjpt3P19VdxrIAZN4o8dNu5+vqruHFHjpt3P19VdxrIAZN4o8dNu5+vqruHFHjpt3P19VdxrIAZN4o8dNu5+vqruHFHjpt3P19VdxrIAZN4o8dNu5+vqruHFHjpt3P19VdxrIAZN4o8dNu5+vqruHFHjpt3P19VdxrIAZN4o8dNu5+vqruHFHjpt3P19VdxrIAZN4o8dNu5+vqruHFHjpt3P19VdxrIAZN4o8dNu5+vqruHFHjpt3P19VdxrIAZN4o8dNu5+vqruHFHjpt3P19VdxrIAZN4o8dNu5+vqruHFHjpt3P19VdxrIAZN4o8dNu5+vqruHFHjpt3P19VdxrIAZN4o8dNu5+vqruHFHjpt3P19VdxrIAZN4o8dNu5+vqruHFHjpt3P19VdxrIAZN4o8dNu5+vqruHFHjpt3P19VdxrIAZN4o8dNu5+vqruHFHjpt3P19VdxrIAZN4o8dNu5+vqruHFHjpt3P19VdxrIAZN4o8dNu5+vqruHFHjpt3P19VdxrIAZN4o8dNu5+vqruHFHjpt3P19VdxrIAZN4o8dNu5+vqruHFHjpt3P19VdxrIAZN4o8dNu5+vqruHFHjpt3P19VdxrIAZN4o8dNu5+vqruHFHjpt3P19VdxrIAZN4o8dNu5+vqruHFHjpt3P19VdxrIAZN4o8dNu5+vqruHFHjpt3P19VdxrIAZN4o8dNu5+vqruHFHjpt3P19VdxrIAZN4o8dNu5+vqruHFHjpt3P19VdxrIAZN4o8dNu5+vqruHFHjpt3P19VdxrIAZN4o8dNu5+vqruHFHjpt3P19VdxrIAZN4o8dNu5+vqruHFHjpt3P19VdxrIAZN4o8dNu5+vqruHFHjpt3P19VdxrIAZN4o8dNu5+vqruHFHjpt3P19VdxrIAZN4o8dNu5+vqruHFHjpt3P19VdxrIAZN4o8dNu5+vqruHFHjpt3P19VdxrIAZN4o8dNu5+vqruHFHjpt3P19VdxrIAZN4o8dNu5+vqruHFHjpt3P19VdxrIAZN4o8dNu5+vqruHFHjpt3P19VdxrIAZN4o8dNu5+vqruHFHjpt3P19VdxrIAZN4o8dNu5+vqruHFHjpt3P19VdxrIAZN4o8dNu5+vqruHFHjpt3P19Vdx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rzCqgCVaPmGGzPb6rzBo+YYbM9vqvMKqAJVo+YYbM9vqvMGj5hhsz2+q8wqoAlWj5hhsz2+q8waPmGGzPb6rzCqgCVaPmGGzPb6rzBo+YYbM9vqvMKqAJVo+YYbM9vqvMGj5hhsz2+q8wqoAlWj5hhsz2+q8waPmGGzPb6rzCqgCVaPmGGzPb6rzBo+YYbM9vqvMKqAJVo+YYbM9vqvMGj5hhsz2+q8wqoAlWj5hhsz2+q8waPmGGzPb6rzCqgCVaPmGGzPb6rzBo+YYbM9vqvMKqAJVo+YYbM9vqvMGj5hhsz2+q8wqoAlWj5hhsz2+q8waPmGGzPb6rzCqgCVaPmGGzPb6rzBo+YYbM9vqvMKqAJVo+YYbM9vqvMGj5hhsz2+q8wqoAlWj5hhsz2+q8waPmGGzPb6rzCqgCVaPmGGzPb6rzBo+YYbM9vqvMKqAJVo+YYbM9vqvMGj5hhsz2+q8wqoAlWj5hhsz2+q8waPmGGzPb6rzCqgCVaPmGGzPb6rzBo+YYbM9vqvMKqAJVo+YYbM9vqvMGj5hhsz2+q8wqoAlWj5hhsz2+q8waPmGGzPb6rzCqgCVaPmGGzPb6rzBo+YYbM9vqvMKqAJVo+YYbM9vqvMGj5hhsz2+q8wqoAlWj5hhsz2+q8waPmGGzPb6rzCqgCVaPmGGzPb6rzBo+YYbM9vqvMKqAJVo+YYbM9vqvMGj5hhsz2+q8wqoAlWj5hhsz2+q8waPmGGzPb6rzCqgCVaPmGGzPb6rzBo+YYbM9vqvMKqAJVo+YYbM9vqvMGj5hhsz2+q8wqoAlWj5hhsz2+q8waPmGGzPb6rzCqgCVaPmGGzPb6rzBo+YYbM9vqvMKqAJVo+YYbM9vqvMGj5hhsz2+q8wqoAlWj5hhsz2+q8waPmGGzPb6rzCqgCVaPmGGzPb6rzBo+YYbM9vqvMKqAJVo+YYbM9vqvMGj5hhsz2+q8wqoAlWj5hhsz2+q8waPmGGzPb6rzCqgCVaPmGGzPb6rzBo+YYbM9vqvMKqAJVo+YYbM9vqvMGj5hhsz2+q8wqoAlWj5hhsz2+q8waPmGGzPb6rzCqgCVaPmGGzPb6rzBo+YYbM9vqvMKqAJVo+YYbM9vqvMGj5hhsz2+q8wqoAlWj5hhsz2+q8waPmGGzPb6rzCqgCVaPmGGzPb6rzBo+YYbM9vqvMKqAJVo+YYbM9vqvMGj5hhsz2+q8wqoAlWj5hhsz2+q8waPmGGzPb6rzCqgCVaPmGGzPb6rzBo+YYbM9vqvMKqAJVo+YYbM9vqvMGj5hhsz2+q8wqoAlWj5hhsz2+q8waPmGGzPb6rzCqgCVaPmGGzPb6rzBo+YYbM9vqvMKqAJVo+YYbM9vqvMGj5hhsz2+q8wqoAlWj5hhsz2+q8waPmGGzPb6rzCqgCVaPmGGzPb6rzBo+YYbM9vqvMKqAJVo+YYbM9vqvMGj5hhsz2+q8wqoAlWj5hhsz2+q8waPmGGzPb6rzCqgCVaPmGGzPb6rzBo+YYbM9vqvMKqAJVo+YYbM9vqvMGj5hhsz2+q8wqoAlWj5hhsz2+q8wpdk2fS2RZVHZtnxcDRUcLKeCPfK7eRsajWpmqqq5Iia1XM5QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/9k=',	
                  width: 500,
                  height: 100,
                  style: 'headerStyle'
                }
                ],
              },
        {
          columns: [
            {
              type: 'none',
              width: 325,
              ul: [
                { text: this.customerData[0].companyName.toUpperCase(), style: 'textHeader' },
                { text: 'GST : ' + this.customerData[0].gstNumber.toUpperCase(), style: 'textGst' },
                { text: this.customerData[0].companyAddress.toUpperCase(), style: 'address' },
                { text: this.customerData[0].location.toUpperCase(), style: 'address' },
                { text: this.customerData[0].state.toUpperCase(), style: 'address' },
                { text: this.customerData[0].pincode, style: 'address' },
                { text: 'Phone: ' + this.customerData[0].mobileNumber, style: 'phone' },
              ]
            },
            {
              type: 'none',
              width: '*',
              ul: [
                { text: this.companyData[0].companydetails[0].companyName.toUpperCase(), style: 'textHeader' },
                { text: 'GST : ' + this.companyData[0].companydetails[0].TAX.toUpperCase(), style: 'textGst' },
                { text: 'PAN : ' + this.companyData[0].companydetails[0].PAN.toUpperCase(), style: 'textGst' },
                /* {text: this.customerData[0].companyAddress.toUpperCase(), style: 'address'}, */
                { text: this.companyData[0].companydetails[0].location, style: 'address' },
                { text: this.companyData[0].companydetails[0].address.toUpperCase(), style: 'address' },
                { text: this.companyData[0].companydetails[0].pincode, style: 'address' },
                { text: 'Phone: ' + this.companyData[0].companydetails[0].phNo, style: 'phone' },
              ]
            }
          ],
        },
        {
          columns: [
            {
              type: 'none',
              width: 325,
              ul: [
                { text: 'QUOTATION DETAILS', style: 'orderStyle' },
                { text: 'Quotation ID:  ' + this.quotation[0].quotationID.toUpperCase(), style: 'textGst' },
                { text: 'Quotation Date: ' + new Date(this.quotation[0].date).toLocaleDateString(), style: 'address' },
                { text: 'Total Amount: ' + this.quotation[0].allTotal.toFixed(2), style: 'address' }
              ]
            },
            {
              type: 'none',
              width: '*',
              ul: [
                { text: 'BANK DETAILS', style: 'orderStyle' },
                { text: this.companyData[0].bankdetails[0].accName.toUpperCase(), style: 'textGst' },
                { text: 'A/C No : ' + this.companyData[0].bankdetails[0].accNo.toUpperCase(), style: 'textGst' },
                { text: 'A/C Type : ' + this.companyData[0].bankdetails[0].accountType.toUpperCase(), style: 'textGst' },
                /* {text: this.customerData[0].companyAddress.toUpperCase(), style: 'address'}, */
                { text: 'Bank Name : ' + this.companyData[0].bankdetails[0].bankName, style: 'address' },
                { text: 'Branch Name: ' + this.companyData[0].bankdetails[0].branchName.toUpperCase(), style: 'address' },
                { text: 'IFSC: ' + this.companyData[0].bankdetails[0].IFSC, style: 'address' },
              ]
            }
          ],
        },
        {
          style: 'tableExample',
          table: {
            headerRows: 1,
            widths: ['*', '*', '*', '*', '*'],
            body: this.newValue()
          },
          layout: {
            fillColor: function (rowIndex, node, columnIndex) {
              return (rowIndex % 2 === 0) ? '#CCCCCC' : null;
            },
          }
        }, {
          style: 'tableExample',
          table: {
            headerRows: 1,
            widths: ['*', '*', '*', '*', '*'],
            body: [[{ text: '', style: 'rowStyle', border: [false, false, false, false] },
            { text: '', style: 'rowStyle', border: [false, false, false, false] }, {
              text: '',
              style: 'rowStyle', border: [false, false, false, false]
            }, { text: 'GST ( ' + this.workOrderPdf[0].gst + ' % )', style: 'rowStyle' },
            { text: this.quotation[0].tax.toFixed(2), style: 'rowTotal' }],
            [{ text: '', style: 'rowStyle', border: [false, false, false, false] },
            { text: '', style: 'rowStyle', border: [false, false, false, false] }, {
              text: '',
              style: 'rowStyle', border: [false, false, false, false]
            }, { text: 'Amount', style: 'rowStyle' },
            { text: this.quotation[0].allTotal.toFixed(2), style: 'rowTotal' }]
            ]
          },
        }, {
          type: 'none',
          width: '*',
          ul: [
            { text: 'Terms and Conditions', style: 'textHeaderTerms' },
            { text: this.workOrderPdf[0].terms, style: 'textTerms' },
          ]
      }
      ],
      styles: {
        headerStyle: {
          margin: [0, 0, 0, 50]
        },

textHeaderTerms: {
          fontSize: 8,
          bold: true,
          margin: [0, 50, 0, 0]
        },
textTerms: {
          fontSize: 8,
          margin: [0, 10, 0, 0]
        },
        header: {
          fontSize: 18,
          bold: true,
          alignment: 'right',
          margin: [0, 50, 0, 80]
        },
        footer: {
          bold: true,
          alignment: 'center',
          margin: [0, 50, 10, 10],
          border: [1, 0, 0, 0]
        },
        tableExample: {
          margin: [10, 10, 10, 10]
        },
        tableHeader: {
          alignment: 'center'
        },
        subheader: {
          fontSize: 14
        },
        tableHeaderRow: {
          bold: true,
          alignment: 'center'
        },
        footerHeader: {
          alignment: 'center',
          fontSize: 8,
          margin: [10, 10, 10, 10]
        },
        footerSub: {
          alignment: 'center'
        },
        tableHeaderTotal: {
          alignment: 'right'
        },
        textHeader: {
          bold: true,
          fontSize: 9
        },
        textGst: {
          fontSize: 8,
          margin: [0, 5, 0, 0]
        },
        phone: {
          margin: [0, 5, 0, 0],
          fontSize: 8,
        },
        address: {
          margin: [0, 5, 0, 0],
          fontSize: 8,
        },
        superMargin: {
          margin: [20, 0, 40, 0],
          fontSize: 14
        },
        orderStyle:
        {
          fontSize: 9,
          margin: [0, 20, 0, 0],
        },
        rowStyle: {
          fontSize: 8,
          alignment: 'center'
        },
        termsStyle: {
          fontSize: 8,
          alignment: 'left'
        },
        rowTotal: {
          fontSize: 8,
          alignment: 'right'
        }

      }
    };
    pdfMake.createPdf(dd).download(this.quotation[0].quotationID);
  }

  pdfWithoutDiscountTerms() {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    const dd = {
      footer: {
        columns: [
          {
            text: this.companyData[0].footerdetails[0].companyName.toUpperCase() + ' \n '
              + this.companyData[0].footerdetails[0].address + ' | '
              + this.companyData[0].footerdetails[0].email + ' | '
              + this.companyData[0].footerdetails[0].phNo + ' | '
              + this.companyData[0].footerdetails[0].website, style: 'footerHeader'
          },
        ]
      },
      content: [
        {
          columns: [{
            // tslint:disable-next-line:max-line-length
            image: 'data:image/jpeg;base64,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rIAZN4o8dNu5+vqruHFHjpt3P19VdxrIAZN4o8dNu5+vqruHFHjpt3P19VdxrIAZN4o8dNu5+vqruHFHjpt3P19VdxrIAZN4o8dNu5+vqruHFHjpt3P19VdxrIAZN4o8dNu5+vqruHFHjpt3P19VdxrIAZN4o8dNu5+vqruHFHjpt3P19VdxrIAZN4o8dNu5+vqruHFHjpt3P19VdxrIAZN4o8dNu5+vqruHFHjpt3P19VdxrIAZN4o8dNu5+vqruHFHjpt3P19VdxrIAZN4o8dNu5+vqruHFHjpt3P19VdxrIAZN4o8dNu5+vqruHFHjpt3P19VdxrIAZN4o8dNu5+vqruHFHjpt3P19VdxrIAZN4o8dNu5+vqruHFHjpt3P19VdxrIAZN4o8dNu5+vqruHFHjpt3P19VdxrIAZN4o8dNu5+vqruHFHjpt3P19VdxrIAZN4o8dNu5+vqruHFHjpt3P19VdxrIAZN4o8dNu5+vqruHFHjpt3P19VdxrIAZN4o8dNu5+vqruHFHjpt3P19VdxrIAZN4o8dNu5+vqruHFHjpt3P19VdxrIAZN4o8dNu5+vqruHFHjpt3P19VdxrIAZN4o8dNu5+vqruHFHjpt3P19VdxrIAZN4o8dNu5+vqruHFHjpt3P19VdxrIAZN4o8dNu5+vqruHFHjpt3P19VdxrIAZN4o8dNu5+vqruHFHjpt3P19VdxrIAZN4o8dNu5+vqruHFHjpt3P19VdxrIAZN4o8dNu5+vqruHFHjpt3P19VdxrIAZN4o8dNu5+vqruHFHjpt3P19VdxrIAZN4o8dNu5+vqruHFHjpt3P19VdxrIAZN4o8dNu5+vqruHFHjpt3P19VdxrIAZN4o8dNu5+vqruHFHjpt3P19VdxrIAZN4o8dNu5+vqruHFHjpt3P19VdxrIAZN4o8dNu5+vqruHFHjpt3P19VdxrIAZN4o8dNu5+vqruHFHjpt3P19VdxrIAZN4o8dNu5+vqruHFHjpt3P19VdxrIAZN4o8dNu5+vqruHFHjpt3P19VdxrIAZN4o8dNu5+vqruHFHjpt3P19VdxrIAZN4o8dNu5+vqruHFHjpt3P19VdxrIAZN4o8dNu5+vqruHFHjpt3P19VdxrIAZN4o8dNu5+vqruHFHjpt3P19VdxrIAZN4o8dNu5+vqruHFHjpt3P19Vdx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rzCqgCVaPmGGzPb6rzBo+YYbM9vqvMKqAJVo+YYbM9vqvMGj5hhsz2+q8wqoAlWj5hhsz2+q8waPmGGzPb6rzCqgCVaPmGGzPb6rzBo+YYbM9vqvMKqAJVo+YYbM9vqvMGj5hhsz2+q8wqoAlWj5hhsz2+q8waPmGGzPb6rzCqgCVaPmGGzPb6rzBo+YYbM9vqvMKqAJVo+YYbM9vqvMGj5hhsz2+q8wqoAlWj5hhsz2+q8waPmGGzPb6rzCqgCVaPmGGzPb6rzBo+YYbM9vqvMKqAJVo+YYbM9vqvMGj5hhsz2+q8wqoAlWj5hhsz2+q8waPmGGzPb6rzCqgCVaPmGGzPb6rzBo+YYbM9vqvMKqAJVo+YYbM9vqvMGj5hhsz2+q8wqoAlWj5hhsz2+q8waPmGGzPb6rzCqgCVaPmGGzPb6rzBo+YYbM9vqvMKqAJVo+YYbM9vqvMGj5hhsz2+q8wqoAlWj5hhsz2+q8waPmGGzPb6rzCqgCVaPmGGzPb6rzBo+YYbM9vqvMKqAJVo+YYbM9vqvMGj5hhsz2+q8wqoAlWj5hhsz2+q8waPmGGzPb6rzCqgCVaPmGGzPb6rzBo+YYbM9vqvMKqAJVo+YYbM9vqvMGj5hhsz2+q8wqoAlWj5hhsz2+q8waPmGGzPb6rzCqgCVaPmGGzPb6rzBo+YYbM9vqvMKqAJVo+YYbM9vqvMGj5hhsz2+q8wqoAlWj5hhsz2+q8waPmGGzPb6rzCqgCVaPmGGzPb6rzBo+YYbM9vqvMKqAJVo+YYbM9vqvMGj5hhsz2+q8wqoAlWj5hhsz2+q8waPmGGzPb6rzCqgCVaPmGGzPb6rzBo+YYbM9vqvMKqAJVo+YYbM9vqvMGj5hhsz2+q8wqoAlWj5hhsz2+q8waPmGGzPb6rzCqgCVaPmGGzPb6rzBo+YYbM9vqvMKqAJVo+YYbM9vqvMGj5hhsz2+q8wqoAlWj5hhsz2+q8waPmGGzPb6rzCqgCVaPmGGzPb6rzBo+YYbM9vqvMKqAJVo+YYbM9vqvMGj5hhsz2+q8wqoAlWj5hhsz2+q8waPmGGzPb6rzCqgCVaPmGGzPb6rzBo+YYbM9vqvMKqAJVo+YYbM9vqvMGj5hhsz2+q8wqoAlWj5hhsz2+q8waPmGGzPb6rzCqgCVaPmGGzPb6rzBo+YYbM9vqvMKqAJVo+YYbM9vqvMGj5hhsz2+q8wqoAlWj5hhsz2+q8waPmGGzPb6rzCqgCVaPmGGzPb6rzBo+YYbM9vqvMKqAJVo+YYbM9vqvMGj5hhsz2+q8wqoAlWj5hhsz2+q8waPmGGzPb6rzCqgCVaPmGGzPb6rzBo+YYbM9vqvMKqAJVo+YYbM9vqvMGj5hhsz2+q8wqoAlWj5hhsz2+q8waPmGGzPb6rzCqgCVaPmGGzPb6rzBo+YYbM9vqvMKqAJVo+YYbM9vqvMGj5hhsz2+q8wqoAlWj5hhsz2+q8waPmGGzPb6rzCqgCVaPmGGzPb6rzBo+YYbM9vqvMKqAJVo+YYbM9vqvMGj5hhsz2+q8wqoAlWj5hhsz2+q8wpdk2fS2RZVHZtnxcDRUcLKeCPfK7eRsajWpmqqq5Iia1XM5QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/9k=',	
                  width: 500,
                  height: 100,
                  style: 'headerStyle'
                }
                ],
              },
        {
          columns: [
            {
              type: 'none',
              width: 350,
              ul: [
                { text: this.customerData[0].companyName.toUpperCase(), style: 'textHeader' },
                { text: 'GST : ' + this.customerData[0].gstNumber.toUpperCase(), style: 'textGst' },
                { text: this.customerData[0].companyAddress.toUpperCase(), style: 'address' },
                { text: this.customerData[0].location.toUpperCase(), style: 'address' },
                { text: this.customerData[0].state.toUpperCase(), style: 'address' },
                { text: this.customerData[0].pincode, style: 'address' },
                { text: 'Phone: ' + this.customerData[0].mobileNumber, style: 'phone' },
              ]
            },
            {
              type: 'none',
              width: '*',
              ul: [
                { text: this.companyData[0].companydetails[0].companyName.toUpperCase(), style: 'textHeader' },
                { text: 'GST : ' + this.companyData[0].companydetails[0].TAX.toUpperCase(), style: 'textGst' },
                { text: 'PAN : ' + this.companyData[0].companydetails[0].PAN.toUpperCase(), style: 'textGst' },
                /* {text: this.customerData[0].companyAddress.toUpperCase(), style: 'address'}, */
                { text: this.companyData[0].companydetails[0].location, style: 'address' },
                { text: this.companyData[0].companydetails[0].address.toUpperCase(), style: 'address' },
                { text: this.companyData[0].companydetails[0].pincode, style: 'address' },
                { text: 'Phone: ' + this.companyData[0].companydetails[0].phNo, style: 'phone' },
              ]
            }
          ],
        },
        {
          columns: [
            {
              type: 'none',
              width: 350,
              ul: [
                { text: 'QUOTATION DETAILS', style: 'orderStyle' },
                { text: 'Quotation ID:  ' + this.quotation[0].quotationID.toUpperCase(), style: 'textGst' },
                { text: 'Quotation Date: ' + new Date(this.quotation[0].date).toLocaleDateString(), style: 'address' },
                { text: 'Total Amount: ' + this.quotation[0].allTotal.toFixed(2), style: 'address' }
              ]
            },
            {
              type: 'none',
              width: '*',
              ul: [
                { text: 'BANK DETAILS', style: 'orderStyle' },
                { text: this.companyData[0].bankdetails[0].accName.toUpperCase(), style: 'textGst' },
                { text: 'A/C No : ' + this.companyData[0].bankdetails[0].accNo.toUpperCase(), style: 'textGst' },
                { text: 'A/C Type : ' + this.companyData[0].bankdetails[0].accountType.toUpperCase(), style: 'textGst' },
                /* {text: this.customerData[0].companyAddress.toUpperCase(), style: 'address'}, */
                { text: 'Bank Name : ' + this.companyData[0].bankdetails[0].bankName, style: 'address' },
                { text: 'Branch Name: ' + this.companyData[0].bankdetails[0].branchName.toUpperCase(), style: 'address' },
                { text: 'IFSC: ' + this.companyData[0].bankdetails[0].IFSC, style: 'address' },
              ]
            }
          ],
        },
        {
          style: 'tableExample',
          table: {
            headerRows: 1,
            widths: ['*', '*', '*', '*'],
            body: this.discountNull()
          },
          layout: {
            fillColor: function (rowIndex, node, columnIndex) {
              return (rowIndex % 2 === 0) ? '#CCCCCC' : null;
            },
          }
        }, {
          style: 'tableExample',
          table: {
            headerRows: 1,
            widths: ['*', '*', '*', '*'],
            body: [[
              { text: '', style: 'rowStyle', border: [false, false, false, false] }, {
                text: '',
                style: 'rowStyle', border: [false, false, false, false]
              }, { text: 'GST ( ' + this.workOrderPdf[0].gst + ' % )', style: 'rowStyle' },
              { text: this.quotation[0].tax.toFixed(2), style: 'rowTotal' }],
            [
              { text: '', style: 'rowStyle', border: [false, false, false, false] }, {
                text: '',
                style: 'rowStyle', border: [false, false, false, false]
              }, { text: 'Amount', style: 'rowStyle' },
              { text: this.quotation[0].allTotal.toFixed(2), style: 'rowTotal' }]
            ]
          },
        }, {
          type: 'none',
          width: '*',
          ul: [
            { text: 'Terms and Conditions', style: 'textHeaderTerms' },
            { text: this.workOrderPdf[0].terms, style: 'textTerms' },
          ]
      }
      ],
      styles: {
        headerStyle: {
          margin: [0, 0, 0, 50]
        },

textHeaderTerms: {
          fontSize: 8,
          bold: true,
          margin: [0, 50, 0, 0]
        },
textTerms: {
          fontSize: 8,
          margin: [0, 10, 0, 0]
        },
        footer: {
          bold: true,
          alignment: 'center',
          margin: [0, 50, 10, 10],
          border: [1, 0, 0, 0]
        },
        tableExample: {
          margin: [10, 10, 10, 10]
        },
        tableHeader: {
          alignment: 'center'
        },
        subheader: {
          fontSize: 14
        },
        tableHeaderRow: {
          bold: true,
          alignment: 'center'
        },
        footerHeader: {
          alignment: 'center',
          fontSize: 8,
          margin: [10, 10, 10, 10]
        },
        footerSub: {
          alignment: 'center'
        },
        tableHeaderTotal: {
          alignment: 'right'
        },
        textHeader: {
          bold: true,
          fontSize: 9
        },
        textGst: {
          fontSize: 8,
          margin: [0, 5, 0, 0]
        },
        phone: {
          margin: [0, 5, 0, 0],
          fontSize: 8,
        },
        address: {
          margin: [0, 5, 0, 0],
          fontSize: 8,
        },
        superMargin: {
          margin: [20, 0, 40, 0],
          fontSize: 14
        },
        orderStyle:
        {
          fontSize: 9,
          margin: [0, 20, 0, 0],
        },
        rowStyle: {
          fontSize: 8,
          alignment: 'center'
        },
        termsStyle: {
          fontSize: 8,
          alignment: 'left'
        },
        rowTotal: {
          fontSize: 8,
          alignment: 'right'
        }

      }
    };
    pdfMake.createPdf(dd).download(this.quotation[0].quotationID);

  }

  /* pdf with discount digital */
  pdfWithoutDiscountDigtalTerms() {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    const dd = {
      footer: {
        columns: [
          {
            text: this.companyData[0].footerdetails[0].companyName.toUpperCase() + ' \n '
              + this.companyData[0].footerdetails[0].address + ' | '
              + this.companyData[0].footerdetails[0].email + ' | '
              + this.companyData[0].footerdetails[0].phNo + ' | '
              + this.companyData[0].footerdetails[0].website, style: 'footerHeader'
          },
        ]
      },
      content: [
        {
          columns: [{
            // tslint:disable-next-line:max-line-length
            image: 'data:image/jpeg;base64,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rIAZN4o8dNu5+vqruHFHjpt3P19VdxrIAZN4o8dNu5+vqruHFHjpt3P19VdxrIAZN4o8dNu5+vqruHFHjpt3P19VdxrIAZN4o8dNu5+vqruHFHjpt3P19VdxrIAZN4o8dNu5+vqruHFHjpt3P19VdxrIAZN4o8dNu5+vqruHFHjpt3P19VdxrIAZN4o8dNu5+vqruHFHjpt3P19VdxrIAZN4o8dNu5+vqruHFHjpt3P19VdxrIAZN4o8dNu5+vqruHFHjpt3P19VdxrIAZN4o8dNu5+vqruHFHjpt3P19VdxrIAZN4o8dNu5+vqruHFHjpt3P19VdxrIAZN4o8dNu5+vqruHFHjpt3P19VdxrIAZN4o8dNu5+vqruHFHjpt3P19VdxrIAZN4o8dNu5+vqruHFHjpt3P19VdxrIAZN4o8dNu5+vqruHFHjpt3P19VdxrIAZN4o8dNu5+vqruHFHjpt3P19VdxrIAZN4o8dNu5+vqruHFHjpt3P19VdxrIAZN4o8dNu5+vqruHFHjpt3P19VdxrIAZN4o8dNu5+vqruHFHjpt3P19VdxrIAZN4o8dNu5+vqruHFHjpt3P19VdxrIAZN4o8dNu5+vqruHFHjpt3P19VdxrIAZN4o8dNu5+vqruHFHjpt3P19VdxrIAZN4o8dNu5+vqruHFHjpt3P19VdxrIAZN4o8dNu5+vqruHFHjpt3P19VdxrIAZN4o8dNu5+vqruHFHjpt3P19VdxrIAZN4o8dNu5+vqruHFHjpt3P19VdxrIAZN4o8dNu5+vqruHFHjpt3P19VdxrIAZN4o8dNu5+vqruHFHjpt3P19VdxrIAZN4o8dNu5+vqruHFHjpt3P19VdxrIAZN4o8dNu5+vqruHFHjpt3P19VdxrIAZN4o8dNu5+vqruHFHjpt3P19VdxrIAZN4o8dNu5+vqruHFHjpt3P19VdxrIAZN4o8dNu5+vqruHFHjpt3P19VdxrIAZN4o8dNu5+vqruHFHjpt3P19VdxrIAZN4o8dNu5+vqruHFHjpt3P19VdxrIAZN4o8dNu5+vqruHFHjpt3P19VdxrIAZN4o8dNu5+vqruHFHjpt3P19VdxrIAZN4o8dNu5+vqruHFHjpt3P19VdxrIAZN4o8dNu5+vqruHFHjpt3P19VdxrIAZN4o8dNu5+vqruHFHjpt3P19Vdx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rzCqgCVaPmGGzPb6rzBo+YYbM9vqvMKqAJVo+YYbM9vqvMGj5hhsz2+q8wqoAlWj5hhsz2+q8waPmGGzPb6rzCqgCVaPmGGzPb6rzBo+YYbM9vqvMKqAJVo+YYbM9vqvMGj5hhsz2+q8wqoAlWj5hhsz2+q8waPmGGzPb6rzCqgCVaPmGGzPb6rzBo+YYbM9vqvMKqAJVo+YYbM9vqvMGj5hhsz2+q8wqoAlWj5hhsz2+q8waPmGGzPb6rzCqgCVaPmGGzPb6rzBo+YYbM9vqvMKqAJVo+YYbM9vqvMGj5hhsz2+q8wqoAlWj5hhsz2+q8waPmGGzPb6rzCqgCVaPmGGzPb6rzBo+YYbM9vqvMKqAJVo+YYbM9vqvMGj5hhsz2+q8wqoAlWj5hhsz2+q8waPmGGzPb6rzCqgCVaPmGGzPb6rzBo+YYbM9vqvMKqAJVo+YYbM9vqvMGj5hhsz2+q8wqoAlWj5hhsz2+q8waPmGGzPb6rzCqgCVaPmGGzPb6rzBo+YYbM9vqvMKqAJVo+YYbM9vqvMGj5hhsz2+q8wqoAlWj5hhsz2+q8waPmGGzPb6rzCqgCVaPmGGzPb6rzBo+YYbM9vqvMKqAJVo+YYbM9vqvMGj5hhsz2+q8wqoAlWj5hhsz2+q8waPmGGzPb6rzCqgCVaPmGGzPb6rzBo+YYbM9vqvMKqAJVo+YYbM9vqvMGj5hhsz2+q8wqoAlWj5hhsz2+q8waPmGGzPb6rzCqgCVaPmGGzPb6rzBo+YYbM9vqvMKqAJVo+YYbM9vqvMGj5hhsz2+q8wqoAlWj5hhsz2+q8waPmGGzPb6rzCqgCVaPmGGzPb6rzBo+YYbM9vqvMKqAJVo+YYbM9vqvMGj5hhsz2+q8wqoAlWj5hhsz2+q8waPmGGzPb6rzCqgCVaPmGGzPb6rzBo+YYbM9vqvMKqAJVo+YYbM9vqvMGj5hhsz2+q8wqoAlWj5hhsz2+q8waPmGGzPb6rzCqgCVaPmGGzPb6rzBo+YYbM9vqvMKqAJVo+YYbM9vqvMGj5hhsz2+q8wqoAlWj5hhsz2+q8waPmGGzPb6rzCqgCVaPmGGzPb6rzBo+YYbM9vqvMKqAJVo+YYbM9vqvMGj5hhsz2+q8wqoAlWj5hhsz2+q8waPmGGzPb6rzCqgCVaPmGGzPb6rzBo+YYbM9vqvMKqAJVo+YYbM9vqvMGj5hhsz2+q8wqoAlWj5hhsz2+q8waPmGGzPb6rzCqgCVaPmGGzPb6rzBo+YYbM9vqvMKqAJVo+YYbM9vqvMGj5hhsz2+q8wqoAlWj5hhsz2+q8waPmGGzPb6rzCqgCVaPmGGzPb6rzBo+YYbM9vqvMKqAJVo+YYbM9vqvMGj5hhsz2+q8wqoAlWj5hhsz2+q8waPmGGzPb6rzCqgCVaPmGGzPb6rzBo+YYbM9vqvMKqAJVo+YYbM9vqvMGj5hhsz2+q8wqoAlWj5hhsz2+q8waPmGGzPb6rzCqgCVaPmGGzPb6rzBo+YYbM9vqvMKqAJVo+YYbM9vqvMGj5hhsz2+q8wqoAlWj5hhsz2+q8wpdk2fS2RZVHZtnxcDRUcLKeCPfK7eRsajWpmqqq5Iia1XM5QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/9k=',	
                  width: 500,
                  height: 100,
                  style: 'headerStyle'
                }
                ],
              },
        {
          columns: [
            {
              type: 'none',
              width: 350,
              ul: [
                { text: this.customerData[0].companyName.toUpperCase(), style: 'textHeader' },
                { text: 'GST : ' + this.customerData[0].gstNumber.toUpperCase(), style: 'textGst' },
                { text: this.customerData[0].companyAddress.toUpperCase(), style: 'address' },
                { text: this.customerData[0].location.toUpperCase(), style: 'address' },
                { text: this.customerData[0].state.toUpperCase(), style: 'address' },
                { text: this.customerData[0].pincode, style: 'address' },
                { text: 'Phone: ' + this.customerData[0].mobileNumber, style: 'phone' },
              ]
            },
            {
              type: 'none',
              width: '*',
              ul: [
                { text: this.companyData[0].companydetails[0].companyName.toUpperCase(), style: 'textHeader' },
                { text: 'GST : ' + this.companyData[0].companydetails[0].TAX.toUpperCase(), style: 'textGst' },
                { text: 'PAN : ' + this.companyData[0].companydetails[0].PAN.toUpperCase(), style: 'textGst' },
                /* {text: this.customerData[0].companyAddress.toUpperCase(), style: 'address'}, */
                { text: this.companyData[0].companydetails[0].location, style: 'address' },
                { text: this.companyData[0].companydetails[0].address.toUpperCase(), style: 'address' },
                { text: this.companyData[0].companydetails[0].pincode, style: 'address' },
                { text: 'Phone: ' + this.companyData[0].companydetails[0].phNo, style: 'phone' },
              ]
            }
          ],
        },
        {
          columns: [
            {
              type: 'none',
              width: 350,
              ul: [
                { text: 'Quotation Details', style: 'orderStyle' },
                { text: 'Quotation ID:  ' + this.quotation[0].quotationID.toUpperCase(), style: 'textGst' },
                { text: 'Quotation Date: ' + new Date(this.quotation[0].date).toLocaleDateString(), style: 'address' },
                { text: 'Total Amount: ' + this.quotation[0].allTotal.toFixed(2), style: 'address' }
              ]
            },
            {
              type: 'none',
              width: '*',
              ul: [
                { text: 'BANK DETAILS', style: 'orderStyle' },
                { text: this.companyData[0].bankdetails[0].accName.toUpperCase(), style: 'textGst' },
                { text: 'A/C No : ' + this.companyData[0].bankdetails[0].accNo.toUpperCase(), style: 'textGst' },
                { text: 'A/C Type : ' + this.companyData[0].bankdetails[0].accountType.toUpperCase(), style: 'textGst' },
                /* {text: this.customerData[0].companyAddress.toUpperCase(), style: 'address'}, */
                { text: 'Bank Name : ' + this.companyData[0].bankdetails[0].bankName, style: 'address' },
                { text: 'Branch Name: ' + this.companyData[0].bankdetails[0].branchName.toUpperCase(), style: 'address' },
                { text: 'IFSC: ' + this.companyData[0].bankdetails[0].IFSC, style: 'address' },
              ]
            }
          ],
        },
        {
          style: 'tableExample',
          table: {
            headerRows: 1,
            widths: ['*', '*', '*', '*'],
            body: this.discountNull()
          },
          layout: {
            fillColor: function (rowIndex, node, columnIndex) {
              return (rowIndex % 2 === 0) ? '#CCCCCC' : null;
            },
          }
        }, {
          style: 'tableExample',
          table: {
            headerRows: 1,
            widths: ['*', '*', '*', '*'],
            body: [[
              { text: '', style: 'rowStyle', border: [false, false, false, false] }, {
                text: '',
                style: 'rowStyle', border: [false, false, false, false]
              }, { text: 'GST ( ' + this.workOrderPdf[0].gst + ' % )', style: 'rowStyle' },
              { text: this.quotation[0].tax.toFixed(2), style: 'rowTotal' }],
            [
              { text: '', style: 'rowStyle', border: [false, false, false, false] }, {
                text: '',
                style: 'rowStyle', border: [false, false, false, false]
              }, { text: 'Amount', style: 'rowStyle' },
              { text: this.quotation[0].allTotal.toFixed(2), style: 'rowTotal' }]
            ]
          },
        },
          {
            type: 'none',
            width: '*',
            ul: [
              { text: 'Terms and Conditions', style: 'textHeaderTerms' },
              { text: this.workOrderPdf[0].digitalterms, style: 'textTerms' },
            ]
        }
      ],
      styles: {
        headerStyle: {
          margin: [0, 0, 0, 50]
        },

textHeaderTerms: {
          fontSize: 8,
          bold: true,
          margin: [0, 50, 0, 0]
        },
textTerms: {
          fontSize: 8,
          margin: [0, 10, 0, 0]
        },
        footer: {
          bold: true,
          alignment: 'center',
          margin: [0, 50, 10, 10],
          border: [1, 0, 0, 0]
        },
        tableExample: {
          margin: [10, 10, 10, 10]
        },
        tableHeader: {
          alignment: 'center'
        },
        subheader: {
          fontSize: 14
        },
        tableHeaderRow: {
          bold: true,
          alignment: 'center'
        },
        footerHeader: {
          alignment: 'center',
          fontSize: 8,
          margin: [10, 10, 10, 10]
        },
        footerSub: {
          alignment: 'center'
        },
        tableHeaderTotal: {
          alignment: 'right'
        },
        textHeader: {
          bold: true,
          fontSize: 9
        },
        textGst: {
          fontSize: 8,
          margin: [0, 5, 0, 0]
        },
        phone: {
          margin: [0, 5, 0, 0],
          fontSize: 8,
        },
        address: {
          margin: [0, 5, 0, 0],
          fontSize: 8,
        },
        superMargin: {
          margin: [20, 0, 40, 0],
          fontSize: 14
        },
        orderStyle:
        {
          fontSize: 9,
          margin: [0, 20, 0, 0],
        },
        rowStyle: {
          fontSize: 8,
          alignment: 'center'
        },
        termsStyle: {
          fontSize: 8,
          alignment: 'left'
        },
        rowTotal: {
          fontSize: 8,
          alignment: 'right'
        }

      }
    };
    pdfMake.createPdf(dd).download(this.quotation[0].quotationID);
  }
}
