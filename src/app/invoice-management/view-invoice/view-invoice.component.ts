
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { InvoiceService } from './../invoice.service';
import { Invoice } from './../../shared/invoice.model';

@Component({
  selector: 'app-view-invoice',
  templateUrl: './view-invoice.component.html',
  styleUrls: ['./view-invoice.component.css']
})
export class ViewInvoiceComponent implements OnInit {
  leadId;
  workId;
  invoice: Invoice[];
  constructor(
    private invoiceService: InvoiceService, private route: ActivatedRoute,
     private router: Router
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(
      (params: ParamMap) => {
        this.leadId = params.get('leadId');
        this.workId = params.get('workId');
      }
    );
    this.getAllInvoice();
  }
  getViewInvoice(data)   {
    this.router.navigate(['invoice/viewsingleinvoice', data._id]);
  }
  getEditInvoice(data)   {
    this.router.navigate(['invoice/editinvoice', data._id]);
  }
  getAllInvoice() {
    this.invoiceService.viewAllInvoice(this.workId).subscribe(data => {
      this.invoice = data;
    }, error => {
      console.log(error);
    });
  }
  getDeleteSingleInvoice(row)   {
    this.invoiceService.deleteSingleInvoice(row._id).subscribe(data => {
      this.invoice = data;
    }, error => {
      console.log(error);
    });
  }
}
