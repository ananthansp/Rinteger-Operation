
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { QuotationManagementService} from './../quotation-management.service';
import { Quotation } from './../../shared/quotation.model';

@Component({
  selector: 'app-view-quotation',
  templateUrl: './view-quotation.component.html',
  styleUrls: ['./view-quotation.component.css']
})
export class ViewQuotationComponent implements OnInit {
  leadId;
  quotation: Quotation[];
  
  constructor(
    private quotationManagementService: QuotationManagementService,
     private route: ActivatedRoute,
     private router: Router
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(
      (params: ParamMap) => {
        this.leadId = params.get('leadId');
      });
    this.getAllQuotation();
  }
  
  getViewQuotation(data)   {
    this.router.navigate(['quotation/viewsinglequotation', data._id]);
  }
  getEditQuotation(data)   {
    this.router.navigate(['quotation/editquotation',  data._id]);
  }
  getAllQuotation() {
    this.quotationManagementService.viewAllQuotation(this.leadId).subscribe(data => {
      this.quotation = data;
      console.log('all work order', this.quotation);
    }, error => {
      console.log(error);
    });
  }
  getDeleteSingleQuotation(row)   {
    this.quotationManagementService.deleteSingleQuotation(row._id).subscribe(data => {
      this.quotation = data;
      console.log('all view', this.quotation);
    }, error => {
      console.log(error);
    });
  }
}
