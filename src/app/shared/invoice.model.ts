import { Detail } from './detail.model';
export class Invoice {
    invoiceID: string;
    _id: string;
    customerID: string;
    customerName: string;
    companyName: string;
    companyAddress: string;
    mobileNumber: string;
    emailId: string;
    leadID: string;
    requirements: [Detail];
    workOrderID: string;
    date: Date;
    expiryDate: Date;
    allTotal: number;
    subTotal: number;
    tax: number;
    constructor(
        customerID: string,
        customerName: string,
        companyName: string,
        companyAddress: string,
        mobileNumber: string,
        emailId: string,
        leadID: string,
        requirements: [Detail],
        workOrderID: string,
        date: Date,
        expiryDate: Date,
        allTotal: number,
        subTotal: number,
        tax?: number,
    ) {
        this.customerID = customerID;
        this.customerName = customerName;
        this.companyName = companyName;
        this.companyAddress = companyAddress;
        this.mobileNumber = mobileNumber;
        this.emailId = emailId;
        this.leadID = leadID;
        /* this.invoiceID = invoiceID; */
        this.requirements = requirements;
        this.workOrderID = workOrderID;
        this.date = date;
        this.expiryDate = expiryDate;
        this.allTotal = allTotal;
        this.subTotal = subTotal;
        this.tax = tax;
    }
}
