import { Detail } from './detail.model';
export class WorkOrder {
    _id?: string;
    workOrderID?: string;
    customerID: string;
    customerName: string;
    companyName: string;
    companyAddress: string;
    leadID: number;
    leadUnit: String;
    mobileNumber: string;
    emailId: string;
    date: Date;
    requirements: [Detail];
    allTotal: number;
    subTotal: number;
    tax: number;
    totalAmount: number;
    constructor(
        customerID: string,
        customerName: string,
        companyName: string,
        companyAddress: string,
        leadID: number,
        leadUnit: String,
        mobileNumber: string,
        emailId: string,
        date: Date,
        requirements: [Detail],
        allTotal: number,
        subTotal: number,
        tax: number
    ) {
        this.customerID = customerID;
        this.customerName = customerName;
        this.companyName = companyName;
        this.companyAddress = companyAddress;
        this.leadID = leadID;
        this.leadUnit = leadUnit;
        this.mobileNumber = mobileNumber;
        this.emailId = emailId;
        this.date = date;
        this.requirements = requirements;
        this.allTotal = allTotal;
        this.subTotal = subTotal;
        this.tax = tax;
    }
}
