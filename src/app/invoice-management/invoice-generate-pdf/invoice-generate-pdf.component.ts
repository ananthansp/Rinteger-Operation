import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { Invoice } from './../../shared/invoice.model';
import { WorkOrderPdf } from './../../shared/workorderpdf.model';
import { Detail } from './../../shared/detail.model';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-invoice-generate-pdf',
  templateUrl: './invoice-generate-pdf.component.html',
  styleUrls: ['./invoice-generate-pdf.component.css']
})
export class InvoiceGeneratePdfComponent implements OnInit {
  @Input() invoiceDetails: any;
  @Input() customer: any;
  @Input() companyDetails: any;
  noRequirementError = false;
  singleInvoiceDetailsForm: FormGroup;
  arrayNew;
  invoiceReq: Detail[];
  invoice: Invoice[];
  workOrderPdf: WorkOrderPdf[];
  customerData;
  companyData;
  templates = ['With Discount + GST', 'Without Discount + GST',
   'With Discount + SGST + CGST' ,
    'Without Discount + SGST + CGST'];
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.singleInvoiceDetailsForm = this.fb.group({
      termsType: [''],
    });
  }

  newValue() {
    const newTestArray = [];
    const headerArray = [{ text: 'Item', style: 'tableHeaderRow' },
    { text: 'Quantity', style: 'tableHeaderRow' },
    { text: 'Price', style: 'tableHeaderRow' }, { text: 'Discount (%)',
     style: 'tableHeaderRow' },
    { text: 'Total', style: 'tableHeaderTotal' }];
    newTestArray.push(headerArray);
    for (let i = 0; i < this.invoiceReq.length; i++) {
      newTestArray.push([{ text: this.invoiceReq[i].item, style: 'rowStyle' },
      { text: this.invoiceReq[i].quantity, style: 'rowStyle' },
      { text: this.invoiceReq[i].price.toFixed(2), style: 'rowStyle' },
      { text: this.invoiceReq[i].discount, style: 'rowStyle' },
      { text: this.invoiceReq[i].total.toFixed(2), style: 'rowTotal' }]);
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
    for (let i = 0; i < this.invoiceReq.length; i++) {
      newTestArray.push([{ text: this.invoiceReq[i].item, style: 'rowStyle' },
       { text: this.invoiceReq[i].quantity, style: 'rowStyle' },
      { text: this.invoiceReq[i].price.toFixed(2), style: 'rowStyle' },
      { text: this.invoiceReq[i].total.toFixed(2), style: 'rowTotal' }]);
    }
    return newTestArray;
  }


  viewSingleProInvoicePdf(invoice, customer, company, temp) {
    this.invoice = invoice;
    this.invoiceReq = invoice[0].requirements;
    this.customerData = customer;
    this.companyData = company;
    this.workOrderPdf = company;
        if (temp === 'With Discount + GST') {
          this.pdfWithDiscountGst();
      }  else if (temp === 'Without Discount + GST') {
            this.pdfWithoutDiscountGst();
          } else  if (temp === 'With Discount + SGST + CGST') {
            this.pdfWithDiscountSgstCgst();
          } else  if (temp === 'Without Discount + SGST + CGST') {
            this.pdfWithoutDiscountSgstCgst();
          }
    }
    pdfWithDiscountGst() {
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
                      image: 	'data:image/jpeg;base64,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jpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBH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AEq1fMMNme31XmDV8ww2Z7fVeYVUASrV8ww2Z7fVeYNXzDDZnt9V5hVQBKtXzDDZnt9V5g1fMMNme31XmFVAEq1fMMNme31XmDV8ww2Z7fVeYVUASrV8ww2Z7fVeYNXzDDZnt9V5hVQBKtXzDDZnt9V5g1fMMNme31XmFVAEq1fMMNme31XmDV8ww2Z7fVeYVUASrV8ww2Z7fVeYNXzDDZnt9V5hVQBKtXzDDZnt9V5g1fMMNme31XmFVAEq1fMMNme31XmDV8ww2Z7fVeYVUASrV8ww2Z7fVeYNXzDDZnt9V5hVQBKtXzDDZnt9V5g1fMMNme31XmFVAEq1fMMNme31XmDV8ww2Z7fVeYVUASrV8ww2Z7fVeYNXzDDZnt9V5hVQBKtXzDDZnt9V5g1fMMNme31XmFVAEq1fMMNme31XmDV8ww2Z7fVeYVUASrV8ww2Z7fVeYNXzDDZnt9V5hVQBKtXzDDZnt9V5g1fMMNme31XmFVAEq1fMMNme31XmDV8ww2Z7fVeYVUASrV8ww2Z7fVeYNXzDDZnt9V5hVQBKtXzDDZnt9V5g1fMMNme31XmFVAEq1fMMNme31XmDV8ww2Z7fVeYVUASrV8ww2Z7fVeYNXzDDZnt9V5hVQBKtXzDDZnt9V5g1fMMNme31XmFVAEq1fMMNme31XmDV8ww2Z7fVeYVUASrV8ww2Z7fVeYNXzDDZnt9V5hVQBKtXzDDZnt9V5g1fMMNme31XmFVAEq1fMMNme31XmDV8ww2Z7fVeYVUASrV8ww2Z7fVeYNXzDDZnt9V5hVQBKtXzDDZnt9V5g1fMMNme31XmFVAEq1fMMNme31XmDV8ww2Z7fVeYVUASrV8ww2Z7fVeYNXzDDZnt9V5hVQBKtXzDDZnt9V5g1fMMNme31XmFVAEq1fMMNme31XmDV8ww2Z7fVeYVUASrV8ww2Z7fVeYNXzDDZnt9V5hVQBKtXzDDZnt9V5g1fMMNme31XmFVAEq1fMMNme31XmDV8ww2Z7fVeYVUASrV8ww2Z7fVeYNXzDDZnt9V5hVQBKtXzDDZnt9V5g1fMMNme31XmFVAEq1fMMNme31XmDV8ww2Z7fVeYVUASrV8ww2Z7fVeYNXzDDZnt9V5hVQBKtXzDDZnt9V5g1fMMNme31XmFVAEq1fMMNme31XmDV8ww2Z7fVeYVUASrV8ww2Z7fVeYNXzDDZnt9V5hVQBKtXzDDZnt9V5g1fMMNme31XmFVAEq1fMMNme31XmDV8ww2Z7fVeYVUASrV8ww2Z7fVeYNXzDDZnt9V5hVQBKtXzDDZnt9V5g1fMMNme31XmFVAEq1fMMNme31XmDV8ww2Z7fVeYVUASrV8ww2Z7fVeYNXzDDZnt9V5hVQBKtXzDDZnt9V5g1fMMNme31XmFVAEq1fMMNme31XmDV8ww2Z7fVeYVUASrV8ww2Z7fVeYNXzDDZnt9V5hVQBKtXzDDZnt9V5g1fMMNme31XmFVAEq1fMMNme31XmDV8ww2Z7fVeYVUASrV8ww2Z7fVeYNXzDDZnt9V5hVQBKtXzDDZnt9V5g1fMMNme31XmFVAEq1fMMNme31XmDV8ww2Z7fVeYVUASrV8ww2Z7fVeYNXzDDZnt9V5hVQBKtXzDDZnt9V5g1fMMNme31XmFVAEq1fMMNme31XmDV8ww2Z7fVeYVUASrV8ww2Z7fVeYNXzDDZnt9V5hVQBKtXzDDZnt9V5g1fMMNme31XmFVAEq1fMMNme31XmDV8ww2Z7fVeYVUASrV8ww2Z7fVeYUuybPpbIsqjs2z4t5oqOFlPBHpK7QjY1GtTNVVVyRE41XM+oAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB//Z',
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
                { text: 'PRODOMA INVOICE DETAILS', style: 'orderStyle' },
                { text: 'Invoice ID:  ' + this.invoice[0].invoiceID.toUpperCase(), style: 'textGst' },
                { text: 'Date: ' + new Date(this.invoice[0].date).toLocaleDateString(), style: 'address' },
                { text: 'Expiry Date: ' + this.invoice[0].expiryDate, style: 'address' },
                { text: 'Total Amount: ' + this.invoice[0].allTotal.toFixed(2), style: 'address' }
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
            { text: this.invoice[0].tax.toFixed(2), style: 'rowTotal' }],
            [{ text: '', style: 'rowStyle', border: [false, false, false, false] },
            { text: '', style: 'rowStyle', border: [false, false, false, false] }, {
              text: '',
              style: 'rowStyle', border: [false, false, false, false]
            }, { text: 'Amount', style: 'rowStyle' },
            { text: this.invoice[0].allTotal.toFixed(2), style: 'rowTotal' }]
            ]
          },
        }
      ],
      styles: {
        headerStyle: {
          margin: [0, 0, 0, 50]
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
    pdfMake.createPdf(dd).download(this.invoice[0].invoiceID);
  }

  pdfWithDiscountSgstCgst() {
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
          image: 	'data:image/jpeg;base64,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jpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBH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AEq1fMMNme31XmDV8ww2Z7fVeYVUASrV8ww2Z7fVeYNXzDDZnt9V5hVQBKtXzDDZnt9V5g1fMMNme31XmFVAEq1fMMNme31XmDV8ww2Z7fVeYVUASrV8ww2Z7fVeYNXzDDZnt9V5hVQBKtXzDDZnt9V5g1fMMNme31XmFVAEq1fMMNme31XmDV8ww2Z7fVeYVUASrV8ww2Z7fVeYNXzDDZnt9V5hVQBKtXzDDZnt9V5g1fMMNme31XmFVAEq1fMMNme31XmDV8ww2Z7fVeYVUASrV8ww2Z7fVeYNXzDDZnt9V5hVQBKtXzDDZnt9V5g1fMMNme31XmFVAEq1fMMNme31XmDV8ww2Z7fVeYVUASrV8ww2Z7fVeYNXzDDZnt9V5hVQBKtXzDDZnt9V5g1fMMNme31XmFVAEq1fMMNme31XmDV8ww2Z7fVeYVUASrV8ww2Z7fVeYNXzDDZnt9V5hVQBKtXzDDZnt9V5g1fMMNme31XmFVAEq1fMMNme31XmDV8ww2Z7fVeYVUASrV8ww2Z7fVeYNXzDDZnt9V5hVQBKtXzDDZnt9V5g1fMMNme31XmFVAEq1fMMNme31XmDV8ww2Z7fVeYVUASrV8ww2Z7fVeYNXzDDZnt9V5hVQBKtXzDDZnt9V5g1fMMNme31XmFVAEq1fMMNme31XmDV8ww2Z7fVeYVUASrV8ww2Z7fVeYNXzDDZnt9V5hVQBKtXzDDZnt9V5g1fMMNme31XmFVAEq1fMMNme31XmDV8ww2Z7fVeYVUASrV8ww2Z7fVeYNXzDDZnt9V5hVQBKtXzDDZnt9V5g1fMMNme31XmFVAEq1fMMNme31XmDV8ww2Z7fVeYVUASrV8ww2Z7fVeYNXzDDZnt9V5hVQBKtXzDDZnt9V5g1fMMNme31XmFVAEq1fMMNme31XmDV8ww2Z7fVeYVUASrV8ww2Z7fVeYNXzDDZnt9V5hVQBKtXzDDZnt9V5g1fMMNme31XmFVAEq1fMMNme31XmDV8ww2Z7fVeYVUASrV8ww2Z7fVeYNXzDDZnt9V5hVQBKtXzDDZnt9V5g1fMMNme31XmFVAEq1fMMNme31XmDV8ww2Z7fVeYVUASrV8ww2Z7fVeYNXzDDZnt9V5hVQBKtXzDDZnt9V5g1fMMNme31XmFVAEq1fMMNme31XmDV8ww2Z7fVeYVUASrV8ww2Z7fVeYNXzDDZnt9V5hVQBKtXzDDZnt9V5g1fMMNme31XmFVAEq1fMMNme31XmDV8ww2Z7fVeYVUASrV8ww2Z7fVeYNXzDDZnt9V5hVQBKtXzDDZnt9V5g1fMMNme31XmFVAEq1fMMNme31XmDV8ww2Z7fVeYVUASrV8ww2Z7fVeYNXzDDZnt9V5hVQBKtXzDDZnt9V5g1fMMNme31XmFVAEq1fMMNme31XmDV8ww2Z7fVeYVUASrV8ww2Z7fVeYNXzDDZnt9V5hVQBKtXzDDZnt9V5g1fMMNme31XmFVAEq1fMMNme31XmDV8ww2Z7fVeYVUASrV8ww2Z7fVeYNXzDDZnt9V5hVQBKtXzDDZnt9V5g1fMMNme31XmFVAEq1fMMNme31XmDV8ww2Z7fVeYVUASrV8ww2Z7fVeYNXzDDZnt9V5hVQBKtXzDDZnt9V5g1fMMNme31XmFVAEq1fMMNme31XmDV8ww2Z7fVeYVUASrV8ww2Z7fVeYNXzDDZnt9V5hVQBKtXzDDZnt9V5g1fMMNme31XmFVAEq1fMMNme31XmDV8ww2Z7fVeYVUASrV8ww2Z7fVeYUuybPpbIsqjs2z4t5oqOFlPBHpK7QjY1GtTNVVVyRE41XM+oAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB//Z',
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
                { text: 'INVOICE DETAILS', style: 'orderStyle' },
                { text: 'Invoice ID:  ' + this.invoice[0].invoiceID.toUpperCase(), style: 'textGst' },
                { text: 'Date: ' + new Date(this.invoice[0].date).toLocaleDateString(), style: 'address' },
                { text: 'Expiry Date: ' + this.invoice[0].date, style: 'address' },
                { text: 'Total Amount: ' + this.invoice[0].allTotal.toFixed(2), style: 'address' }
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
            body: [[
              { text: '', style: 'rowStyle', border: [false, false, false, false] }, {
                text: '',
                style: 'rowStyle', border: [false, false, false, false]
              }, { text: '', style: 'rowStyle', border: [false, false, false, false] },
              { text: 'SGST ( ' + this.workOrderPdf[0].sgst + ' % )', style: 'rowStyle' }
              ,
              { text: ((100 / this.workOrderPdf[0].gst * this.invoice[0].tax) *
                (this.workOrderPdf[0].sgst / 100 )).toFixed(2), style: 'rowTotal' }],
              [
                { text: '', style: 'rowStyle', border: [false, false, false, false] }, {
                  text: '',
                  style: 'rowStyle', border: [false, false, false, false]
                },
                { text: '', style: 'rowStyle', border: [false, false, false, false] }
                , { text: 'CGST ( ' + this.workOrderPdf[0].cgst + ' % )', style: 'rowStyle' },
                { text: ((100 / this.workOrderPdf[0].gst * this.invoice[0].tax) *
                   (this.workOrderPdf[0].cgst / 100 )).toFixed(2), style: 'rowTotal' }],
            [
              { text: '', style: 'rowStyle', border: [false, false, false, false] },
              { text: '', style: 'rowStyle', border: [false, false, false, false] }, {
                text: '',
                style: 'rowStyle', border: [false, false, false, false]
              }, { text: 'Amount', style: 'rowStyle' },
              { text: this.invoice[0].allTotal.toFixed(2), style: 'rowTotal' }]
            ]
          },
        }, {
          style: 'tableExample',
          table: {
            headerRows: 1,
            widths: ['*', '*', '200'],
            body: [
              [{ text: this.workOrderPdf[0].terms, style: 'termsStyle', border: [false, false, false, false] },
              {
                text: '',
                style: 'rowStyle', border: [false, false, false, false]
              }]
            ]
          },
        }
      ],
      styles: {
        headerStyle: {
          margin: [0, 0, 0, 50]
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
    pdfMake.createPdf(dd).download(this.invoice[0].invoiceID);
  }

  pdfWithoutDiscountGst() {
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
            image: 	'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCADyBdwDASIAAhEBAxEB/8QAHQABAQEAAwEBAQEAAAAAAAAAAAcIBQYJBAECA//EAFsQAAEDAQQDDAIMCwYEBQMFAAABAgMEBQYHERIYVggTFyExVZSVpNHS0xRBFSIyNjdRU2FxkbGzNUZyc3R1hJOhssQWI0JSgZIzVLTBJDRiY4MmQ6NFZoKl4//EABkBAQEBAQEBAAAAAAAAAAAAAAABAgQFA//EACIRAQEAAgMBAAICAwAAAAAAAAABERQVUlMCAxIEBRMhUf/aAAwDAQACEQMRAD8A1SAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAM17sq8duXf8A7IewNs2lZm/+mb76FVPg3zR3jR0tFUzyzXLPkzU67T4UY4zwRysv1UaL2o5M7dqs8lT6D7N3P+JP7d/TmoLK/BlJ+ZZ9iAZX4I8dNu5+vqruHBHjpt3P19VdxrIAZN4I8dNu5+vqruHBHjpt3P19VdxrIAZN4I8dNu5+vqruHBHjpt3P19VdxrIAZN4I8dNu5+vqruHBHjpt3P19VdxrIAZN4I8dNu5+vqruHBHjpt3P19VdxrIAZN4I8dNu5+vqruHBHjpt3P19VdxrIAZN4I8dNu5+vqruHBHjnt3P19VdxrIAZN4I8c9u6jr6q7j94I8c9u6jr6q7jWIAydwR457dz9e1XcOCPHPbufr2q7jWIAydwR45bdz9fVXcOCPHLbufr2q7jWIAydwR45bd1HXtV3Dgjxy27n69qu41iAMncEeOW3c/X1V3Dgjxy27qOvaruNYgDJ3BHjnt3P17Vdw4I8c9u5+vqruNYgDJ3BHjnt3P19Vdw4I8c9u5+vqruNYgDJvBHjnt3UdfVXcOCPHPbuo6+qu41kAMm8EeOe3dR19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBH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AEq1fMMNme31XmDV8ww2Z7fVeYVUASrV8ww2Z7fVeYNXzDDZnt9V5hVQBKtXzDDZnt9V5g1fMMNme31XmFVAEq1fMMNme31XmDV8ww2Z7fVeYVUASrV8ww2Z7fVeYNXzDDZnt9V5hVQBKtXzDDZnt9V5g1fMMNme31XmFVAEq1fMMNme31XmDV8ww2Z7fVeYVUASrV8ww2Z7fVeYNXzDDZnt9V5hVQBKtXzDDZnt9V5g1fMMNme31XmFVAEq1fMMNme31XmDV8ww2Z7fVeYVUASrV8ww2Z7fVeYNXzDDZnt9V5hVQBKtXzDDZnt9V5g1fMMNme31XmFVAEq1fMMNme31XmDV8ww2Z7fVeYVUASrV8ww2Z7fVeYNXzDDZnt9V5hVQBKtXzDDZnt9V5g1fMMNme31XmFVAEq1fMMNme31XmDV8ww2Z7fVeYVUASrV8ww2Z7fVeYNXzDDZnt9V5hVQBKtXzDDZnt9V5g1fMMNme31XmFVAEq1fMMNme31XmDV8ww2Z7fVeYVUASrV8ww2Z7fVeYNXzDDZnt9V5hVQBKtXzDDZnt9V5g1fMMNme31XmFVAEq1fMMNme31XmDV8ww2Z7fVeYVUASrV8ww2Z7fVeYNXzDDZnt9V5hVQBKtXzDDZnt9V5g1fMMNme31XmFVAEq1fMMNme31XmDV8ww2Z7fVeYVUASrV8ww2Z7fVeYNXzDDZnt9V5hVQBKtXzDDZnt9V5g1fMMNme31XmFVAEq1fMMNme31XmDV8ww2Z7fVeYVUASrV8ww2Z7fVeYNXzDDZnt9V5hVQBKtXzDDZnt9V5g1fMMNme31XmFVAEq1fMMNme31XmDV8ww2Z7fVeYVUASrV8ww2Z7fVeYNXzDDZnt9V5hVQBKtXzDDZnt9V5g1fMMNme31XmFVAEq1fMMNme31XmDV8ww2Z7fVeYVUASrV8ww2Z7fVeYNXzDDZnt9V5hVQBKtXzDDZnt9V5g1fMMNme31XmFVAEq1fMMNme31XmDV8ww2Z7fVeYVUASrV8ww2Z7fVeYNXzDDZnt9V5hVQBKtXzDDZnt9V5g1fMMNme31XmFVAEq1fMMNme31XmDV8ww2Z7fVeYVUASrV8ww2Z7fVeYNXzDDZnt9V5hVQBKtXzDDZnt9V5g1fMMNme31XmFVAEq1fMMNme31XmDV8ww2Z7fVeYVUASrV8ww2Z7fVeYNXzDDZnt9V5hVQBKtXzDDZnt9V5g1fMMNme31XmFVAEq1fMMNme31XmDV8ww2Z7fVeYVUASrV8ww2Z7fVeYNXzDDZnt9V5hVQBKtXzDDZnt9V5g1fMMNme31XmFVAEq1fMMNme31XmDV8ww2Z7fVeYVUASrV8ww2Z7fVeYNXzDDZnt9V5hVQBKtXzDDZnt9V5g1fMMNme31XmFVAEq1fMMNme31XmDV8ww2Z7fVeYVUASrV8ww2Z7fVeYNXzDDZnt9V5hVQBKtXzDDZnt9V5g1fMMNme31XmFVAEq1fMMNme31XmDV8ww2Z7fVeYVUASrV8ww2Z7fVeYNXzDDZnt9V5hVQBKtXzDDZnt9V5g1fMMNme31XmFVAEq1fMMNme31XmDV8ww2Z7fVeYVUASrV8ww2Z7fVeYNXzDDZnt9V5hVQBKtXzDDZnt9V5g1fMMNme31XmFVAEq1fMMNme31XmDV8ww2Z7fVeYVUASrV8ww2Z7fVeYNXzDDZnt9V5hVQBKtXzDDZnt9V5g1fMMNme31XmFVAEq1fMMNme31XmDV8ww2Z7fVeYVUASrV8ww2Z7fVeYUuybPpbIsqjs2z4t5oqOFlPBHpK7QjY1GtTNVVVyRE41XM+oAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB//Z',
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
                { text: 'INVOICE DETAILS', style: 'orderStyle' },
                { text: 'Invoice ID:  ' + this.invoice[0].invoiceID.toUpperCase(), style: 'textGst' },
                { text: 'Date: ' + new Date(this.invoice[0].date).toLocaleDateString(), style: 'address' },
                { text: 'Expiry Date: ' + this.invoice[0].expiryDate, style: 'address' },
                { text: 'Total Amount: ' + this.invoice[0].allTotal.toFixed(2), style: 'address' }
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
              { text: this.invoice[0].tax.toFixed(2), style: 'rowTotal' }],
            [
              { text: '', style: 'rowStyle', border: [false, false, false, false] }, {
                text: '',
                style: 'rowStyle', border: [false, false, false, false]
              }, { text: 'Amount', style: 'rowStyle' },
              { text: this.invoice[0].allTotal.toFixed(2), style: 'rowTotal' }]
            ]
          },
        }, {
          style: 'tableExample',
          table: {
            headerRows: 1,
            widths: ['*', '*', '200'],
            body: [
              [{ text: this.workOrderPdf[0].terms, style: 'termsStyle', border: [false, false, false, false] },
              {
                text: '',
                style: 'rowStyle', border: [false, false, false, false]
              }]
            ]
          },
        }
      ],
      styles: {
        headerStyle: {
          margin: [0, 0, 0, 50]
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
    pdfMake.createPdf(dd).download(this.invoice[0].invoiceID);

  }

  /* pdf with discount digital */
  pdfWithoutDiscountSgstCgst() {
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
            image: 	'data:image/jpeg;base64,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jpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBHjpt3P19Vdw4I8dNu5+vqruNZADJvBH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AEq1fMMNme31XmDV8ww2Z7fVeYVUASrV8ww2Z7fVeYNXzDDZnt9V5hVQBKtXzDDZnt9V5g1fMMNme31XmFVAEq1fMMNme31XmDV8ww2Z7fVeYVUASrV8ww2Z7fVeYNXzDDZnt9V5hVQBKtXzDDZnt9V5g1fMMNme31XmFVAEq1fMMNme31XmDV8ww2Z7fVeYVUASrV8ww2Z7fVeYNXzDDZnt9V5hVQBKtXzDDZnt9V5g1fMMNme31XmFVAEq1fMMNme31XmDV8ww2Z7fVeYVUASrV8ww2Z7fVeYNXzDDZnt9V5hVQBKtXzDDZnt9V5g1fMMNme31XmFVAEq1fMMNme31XmDV8ww2Z7fVeYVUASrV8ww2Z7fVeYNXzDDZnt9V5hVQBKtXzDDZnt9V5g1fMMNme31XmFVAEq1fMMNme31XmDV8ww2Z7fVeYVUASrV8ww2Z7fVeYNXzDDZnt9V5hVQBKtXzDDZnt9V5g1fMMNme31XmFVAEq1fMMNme31XmDV8ww2Z7fVeYVUASrV8ww2Z7fVeYNXzDDZnt9V5hVQBKtXzDDZnt9V5g1fMMNme31XmFVAEq1fMMNme31XmDV8ww2Z7fVeYVUASrV8ww2Z7fVeYNXzDDZnt9V5hVQBKtXzDDZnt9V5g1fMMNme31XmFVAEq1fMMNme31XmDV8ww2Z7fVeYVUASrV8ww2Z7fVeYNXzDDZnt9V5hVQBKtXzDDZnt9V5g1fMMNme31XmFVAEq1fMMNme31XmDV8ww2Z7fVeYVUASrV8ww2Z7fVeYNXzDDZnt9V5hVQBKtXzDDZnt9V5g1fMMNme31XmFVAEq1fMMNme31XmDV8ww2Z7fVeYVUASrV8ww2Z7fVeYNXzDDZnt9V5hVQBKtXzDDZnt9V5g1fMMNme31XmFVAEq1fMMNme31XmDV8ww2Z7fVeYVUASrV8ww2Z7fVeYNXzDDZnt9V5hVQBKtXzDDZnt9V5g1fMMNme31XmFVAEq1fMMNme31XmDV8ww2Z7fVeYVUASrV8ww2Z7fVeYNXzDDZnt9V5hVQBKtXzDDZnt9V5g1fMMNme31XmFVAEq1fMMNme31XmDV8ww2Z7fVeYVUASrV8ww2Z7fVeYNXzDDZnt9V5hVQBKtXzDDZnt9V5g1fMMNme31XmFVAEq1fMMNme31XmDV8ww2Z7fVeYVUASrV8ww2Z7fVeYNXzDDZnt9V5hVQBKtXzDDZnt9V5g1fMMNme31XmFVAEq1fMMNme31XmDV8ww2Z7fVeYVUASrV8ww2Z7fVeYNXzDDZnt9V5hVQBKtXzDDZnt9V5g1fMMNme31XmFVAEq1fMMNme31XmDV8ww2Z7fVeYVUASrV8ww2Z7fVeYNXzDDZnt9V5hVQBKtXzDDZnt9V5g1fMMNme31XmFVAEq1fMMNme31XmDV8ww2Z7fVeYVUASrV8ww2Z7fVeYNXzDDZnt9V5hVQBKtXzDDZnt9V5g1fMMNme31XmFVAEq1fMMNme31XmDV8ww2Z7fVeYVUASrV8ww2Z7fVeYNXzDDZnt9V5hVQBKtXzDDZnt9V5g1fMMNme31XmFVAEq1fMMNme31XmDV8ww2Z7fVeYVUASrV8ww2Z7fVeYNXzDDZnt9V5hVQBKtXzDDZnt9V5g1fMMNme31XmFVAEq1fMMNme31XmDV8ww2Z7fVeYVUASrV8ww2Z7fVeYNXzDDZnt9V5hVQBKtXzDDZnt9V5g1fMMNme31XmFVAEq1fMMNme31XmDV8ww2Z7fVeYVUASrV8ww2Z7fVeYUuybPpbIsqjs2z4t5oqOFlPBHpK7QjY1GtTNVVVyRE41XM+oAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB//Z',
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
                { text: 'INVOICE DETAILS', style: 'orderStyle' },
                { text: 'Invoice ID:  ' + this.invoice[0].invoiceID.toUpperCase(), style: 'textGst' },
                { text: 'Date: ' + new Date(this.invoice[0].date).toLocaleDateString(), style: 'address' },
                { text: 'Expiry Date: ' + this.invoice[0].expiryDate, style: 'address' },
                { text: 'Total Amount: ' + this.invoice[0].allTotal.toFixed(2), style: 'address' }
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
              }, { text: 'SGST ( ' + this.workOrderPdf[0].sgst + ' % )', style: 'rowStyle' },
              { text: ((100 / this.workOrderPdf[0].gst * this.invoice[0].tax) *
                (this.workOrderPdf[0].sgst / 100 )).toFixed(2), style: 'rowTotal' }],
              [
                { text: '', style: 'rowStyle', border: [false, false, false, false] }, {
                  text: '',
                  style: 'rowStyle', border: [false, false, false, false]
                }, { text: 'CGST ( ' + this.workOrderPdf[0].cgst + ' % )', style: 'rowStyle' },
                { text: ((100 / this.workOrderPdf[0].gst * this.invoice[0].tax) *
                   (this.workOrderPdf[0].cgst / 100 )).toFixed(2), style: 'rowTotal' }],
            [
              { text: '', style: 'rowStyle', border: [false, false, false, false] }, {
                text: '',
                style: 'rowStyle', border: [false, false, false, false]
              }, { text: 'Amount', style: 'rowStyle' },
              { text: this.invoice[0].allTotal.toFixed(2), style: 'rowTotal' }]
            ]
          },
        }, {
          style: 'tableExample',
          table: {
            headerRows: 1,
            widths: ['*', '*', '200'],
            body: [
              [{ text: this.workOrderPdf[0].digitalterms, style: 'termsStyle', border: [false, false, false, false] },
              {
                text: '',
                style: 'rowStyle', border: [false, false, false, false]
              }]
            ]
          },
        }
      ],
      styles: {
        headerStyle: {
          margin: [0, 0, 0, 50]
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
    pdfMake.createPdf(dd).download(this.invoice[0].invoiceID);
  }
}
