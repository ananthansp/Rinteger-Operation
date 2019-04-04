import {Detail} from './detail.model';
export class Quotation {
    customerID: string;
    quotationID: string;
    customerName: string;
    companyName: string;
    mobileNumber: number;
    emailId: string;
    leadID: string;
    date: Date;
    expiryDate: Date;
    companyAddress: string;
    status: string;
    requirements: [Detail];
    subTotal: number;
    allTotal: number;
    tax: number;
    constructor(
        customerID: string,
        customerName: string,
        companyName: string,
        companyAddress: string,
        mobileNumber: number,
        emailId: string,
        leadID: string,
        date: Date,
        requirements: [Detail],
        subTotal: number,
        allTotal: number,
        tax: number
    ) {
        this.customerID = customerID;
        this.customerName = customerName;
        this.companyName = companyName;
        this.companyAddress = companyAddress;
        this.mobileNumber = mobileNumber;
        this.emailId = emailId;
        this.leadID = leadID;
        this.date = date;
        this.requirements = requirements;
        this.subTotal = subTotal;
        this.allTotal = allTotal;
        this.tax = tax;
    }
}
