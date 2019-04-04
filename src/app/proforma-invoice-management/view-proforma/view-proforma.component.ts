import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ProformaInvoiceService } from './../proforma-invoice.service';
import { ProformaInvoice } from './../../shared/proformaInvoice.model';

@Component({
  selector: 'app-view-proforma',
  templateUrl: './view-proforma.component.html',
  styleUrls: ['./view-proforma.component.css']
})
export class ViewProformaComponent implements OnInit {
  leadId;
  workId;
  proformaInvoice: ProformaInvoice[];
  constructor(
    private proformaInvoiceService: ProformaInvoiceService, private route: ActivatedRoute,
     private router: Router
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(
      (params: ParamMap) => {
        this.leadId = params.get('leadId');
        this.workId = params.get('workId');
      }
    );
    this.getAllProformaInvoice();
  }
  getViewProformaInvoice(data)   {
    this.router.navigate(['proformainvoice/viewsingleproformainvoice',
    data._id]);
  }
  getEditProfomaInvoice(data)   {
    this.router.navigate(['proformainvoice/editprofomainvoice',  data._id]);
  }

  getAllProformaInvoice() {
    this.proformaInvoiceService.viewAllProformaInvoice(this.workId).subscribe(data => {
      this.proformaInvoice = data;
      console.log('all proformainvoice', this.proformaInvoice);
    }, error => {
      console.log(error);
    });
  }
  getDeleteSingleProformaInvoice(row)   {
    this.proformaInvoiceService.deleteSingleProformaInvoice(row._id).subscribe(data => {
      this.proformaInvoice = data;
      console.log('all view', this.proformaInvoice);
    }, error => {
      console.log(error);
    });
  }
}
