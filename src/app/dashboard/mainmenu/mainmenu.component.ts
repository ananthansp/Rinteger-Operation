import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { Lead } from '../../shared/lead.model';
import { Invoice } from '../../shared/invoice.model';
import { WorkOrder } from '../../shared/workorder.model';
import { Quotation } from '../../shared/quotation.model';
import { ProformaInvoice } from '../../shared/proformaInvoice.model';
import {Customer} from '../../shared/customer.model';
@Component({
  selector: 'app-mainmenu',
  templateUrl: './mainmenu.component.html',
  styleUrls: ['./mainmenu.component.css']
})
export class MainmenuComponent implements OnInit {
  leadModel: Lead[] = [];
  customerModel: Customer[] = [];
  invoiceModel: Invoice[] = [];
  workOrderModel: WorkOrder[] = [];
  quotationModel: Quotation[] = [];
  proformaInvoice: ProformaInvoice[] = [];
  sumWorkOrder = 0;
  sumInvoice = 0;
  sumPerformaInvoice = 0;
  sumQuotation = 0;
  workOrderTotalAmount: WorkOrder;
  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
    this.getAllLeads();
    this.viewAllinvoice();
    this.getAllWorkOrder();
    this.getAllQuotation();
    this.getAllProformaInvoice();
    this.viewAllCustomers();
    this.getWorkOrderAmount();
  }
  viewAllinvoice() {
    this.dashboardService.allAllInvoice().subscribe(data => {
      this.invoiceModel = data;
      console.log(this.invoiceModel);
    }, error => {
      console.log(error);
    });
  }
  viewAllCustomers() {
    this.dashboardService.allCustomers().subscribe(data => {
      this.customerModel = data;
      console.log('customer data',  data);
    }, error => {
      console.log(error);
    }
    );
  }
  getAllLeads() {
    this.dashboardService.allLead().subscribe(data => {
      this.leadModel = data;
    }, error => {
      console.log(error);
    }
    );
  }
  getAllWorkOrder() {
    this.dashboardService.allWorkOrder().subscribe(data => {
      this.workOrderModel = data;
    }, error => {
      console.log(error);
    }
    );
  }
  getAllQuotation() {
    this.dashboardService.allQuotation().subscribe(data => {
      this.quotationModel = data;
    }, error => {
      console.log(error);
    }
    );
  }
  getAllProformaInvoice() {
    this.dashboardService.allAllProfomaInvoice().subscribe(data => {
      this.proformaInvoice = data;
    }, error => {
      console.log(error);
    }
    );
  }
  getWorkOrderAmount() {
    this.dashboardService.workOrderTotalAmount().subscribe(data => {
      this.workOrderTotalAmount = data;
    }, error => {
      console.log(error);
    }
    );
  }
}
