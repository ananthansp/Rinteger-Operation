import {Detail} from './detail.model';
import {FollowUp} from './follow-up.model';

export class Lead {
    _id: string;
    leadID: string;
    mobileNumber: number;
    emailId: string;
    name: string;
    leadOwner: string;
    leadSource: string;
    leadStatus: string;
    leadType: [string];
    leadService: [string];
    leadUnit: string;
    requirements: [Detail];
    workOrder?: [string];
    invoice?: [string];
    proformaInvoice?: [string];
    quotation?: [string];
    date: Date;
    remarks: string;
    allTotal: number;
    subTotal: number;
    tax: number;
    followUp: [FollowUp];
    constructor(
        leadID: string,
        mobileNumber: number,
        emailId: string,
        name: string,
        leadOwner: string,
        leadType: [string],
        leadSource: string,
        leadStatus: string,
        leadService: [string],
        leadUnit: string,
        requirements: [Detail],
        date: Date,
        remarks: string,
        allTotal: number,
        subTotal: number,
        tax: number
) {
        this.leadID = leadID;
        this.mobileNumber = mobileNumber;
        this.emailId = emailId;
        this.name = name;
        this.leadOwner = leadOwner;
        this.leadType = leadType;
        this.leadSource = leadSource;
        this.leadStatus = leadStatus;
        this.leadService = leadService;
        this.leadUnit = leadUnit;
        this.requirements = requirements;
        this.date = date;
        this.remarks = remarks;
        this.allTotal = allTotal;
        this.subTotal = subTotal;
        this.tax = tax;
    }
}
