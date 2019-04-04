import { Product } from './product.model';

export class MaterialModel {
    _id: number;
    workOrderID?: string;
    DCnumber: string;
    date: Date;
    customerName: string;
    receivedBy: string;
    unit: string;
    /* productType: string;
    noOfProduct: number; */
    /* shootType: string; */
    shootStatus: string;
    paymentStatus?: string;
    modeOfInward: string;
    modeOfOutward: string;
    dispatchType: string;
    materialStatus: string;
    remark: string;
    product: [Product];
}
