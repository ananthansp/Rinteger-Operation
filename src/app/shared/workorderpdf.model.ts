import { BankDetails } from './bankdetails.model';
import { CompanyDetails } from './companydetails.model';
import { FooterDetails } from './footerdetails.model';

export class WorkOrderPdf {
    gst: number;
    sgst: number;
    cgst: number;
    terms: String;
    digitalterms: String;
    bankdetails: BankDetails;
    companydetails: CompanyDetails;
    footerdetails: FooterDetails;
}
