import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { LeadManagementService } from './../lead-management.service';
import { NavheaderService } from './../../shared/navheader/navheader.service';
import { CreateCustomerService } from './../../customer-management/customer/create-customer/create-customer.service';
import { Router } from '@angular/router';
import { Lead } from './../../shared/lead.model';
import { DateSearch } from './search.model';
import { LeadAddComponent } from './../lead-add/lead-add.component';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { WorkOrder } from './../../shared/workorder.model';
import { Quotation } from './../../shared/quotation.model';
import { LeadSettings } from './../../shared/lead-settings.model';

@Component({
  selector: 'app-view-lead',
  templateUrl: './view-lead.component.html',
  styleUrls: ['./view-lead.component.css'],
  providers: [CreateCustomerService, LeadManagementService]
})
export class ViewLeadComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  leadModel: any;
  leadModelCheck: Lead;
  workOrder: WorkOrder[];
  quotation: Quotation[];
  leadStatusModel: LeadSettings;
  leadModeldata;
  public pageSize = 50;
  public currentPage = 0;
  public totalSize = 0;
  public array: any;
  public displayedColumns = ['', '', '', '', ''];
  public dataSource: any;
  leadForm: FormGroup;
  dateSearch: DateSearch;
  matdatasource = new MatTableDataSource([]);
  allMonth = [{ month: 'January' }, { month: 'February' }, { month: 'March' }, { month: 'April' },
  { month: 'May' }, { month: 'June' }, { month: 'July' }, { month: 'August' },
  { month: 'September' }, { month: 'October' }, { month: 'November' }, { month: 'October' }
  ];
  allYear = [
    { year: 2018 },
    { year: 2019 },
    { year: 2020 },
    { year: 2021 },
    { year: 2022 },
    { year: 2023 },
    { year: 2024 },
    { year: 2025 },
    { year: 2026 },
    { year: 2027 },
    { year: 2028 },
  ];
  constructor(private fb: FormBuilder,
    private leadManagementService: LeadManagementService,
    private navheaderService: NavheaderService,
    private createCustomerService: CreateCustomerService, private dialog: MatDialog,
    private router: Router) {
  }
  ngOnInit() {
    this.getAllLeads();
    this.navheaderService.hideMenuTrans();
    this.navheaderService.menuItems();
    this.createForm();
  }
  createForm() {
    this.leadForm = this.fb.group({
      fromDate: ['', Validators.required],
      toDate: ['', Validators.required],
      monthData: ['', Validators.required],
      yearData: ['', Validators.required]
    });
  }
  searchAll(data)   {
    this.leadModel = new MatTableDataSource<Lead>(data);
    this.leadModel.paginator = this.paginator;
    this.leadModel = data;
  }
  searchDate(leadForm) {
    this.dateSearch = new DateSearch();
    this.dateSearch.fromDate = leadForm.controls.fromDate.value;
    this.dateSearch.toDate = leadForm.controls.toDate.value;
    this.leadManagementService.leadDateSearch(this.dateSearch).subscribe(data => {
      this.leadModel = new MatTableDataSource<Lead>(data);
      this.leadModel.paginator = this.paginator;
      this.leadModel = data;
    }, error => {
      console.log(error);
    });
  }
  getSearch(data) {
    this.leadModel = new MatTableDataSource<Lead>(data);
    this.leadModel.paginator = this.paginator;
    this.leadModel = data;
  }
  leadStatus() {
    this.leadManagementService.leadSource().subscribe(data => {
      this.leadStatusModel = data;
    }, error => {
      console.log(error);
    });
  }
  selectedSource(source) {
    const filterData = this.leadModel.filter(data => data.leadSource === source);
    return filterData;
  }
  searchMonth(leadForm) {
    this.dateSearch = new DateSearch();
    this.dateSearch.month = leadForm.controls.monthData.value;
    this.dateSearch.year = leadForm.controls.yearData.value;
    this.leadManagementService.leadMonthSearch(this.dateSearch).subscribe(data => {
      this.leadModel = new MatTableDataSource<Lead>(data);
      this.leadModel.paginator = this.paginator;
      this.leadModel = data;
      this.array = data;
      this.totalSize = this.array.length;
      this.iterator();
      this.leadStatus();
    }, error => {
      console.log(error);
    });
  }
  getViewLead(data) {
    this.router.navigate(['lead/viewsinglelead', data._id]);
  }
  createWorkOrder(row) {
    this.leadManagementService.checkWorkOrder(row).subscribe(data => {
      this.leadModelCheck = data;
      if (data.length === 0) {
        this.createCustomerService.openCustomer(row);
      } else {
        this.router.navigate(['workorder/creatework', data[0]._id, row._id]);
      }
    }, error => {
      console.log(error);
    });
  }
  createQuotation(row) {
    this.leadManagementService.checkWorkOrder(row).subscribe(data => {
      this.leadModelCheck = data;
      console.log('check', this.leadModelCheck);
      if (data.length === 0) {
        this.createCustomerService.openCustomer(row);
      } else {
        this.router.navigate(['quotation/createquotation', data[0]._id, row._id]);
      }
    }, error => {
      console.log(error);
    });
  }
  addLead() {
    this.router.navigate(['lead/leadadd']);
  }
  getEditLead(id) {
    this.router.navigate(['lead/leadedit', id]);
  }
  getDeleteLead(row) {
    this.leadManagementService.deleteLead(row).subscribe(data => {
      this.leadModel = new MatTableDataSource<Lead>(data);
      this.leadModel.paginator = this.paginator;
      this.leadModel = data;
      this.array = data;
      this.totalSize = this.array.length;
      this.iterator();
    }, error => {
      console.log(error);
    });
  }
  viewWorkOrder(id) {
    this.leadManagementService.viewAllWorkOrder(id.leadID).subscribe(data => {
      this.workOrder = data;
      if (this.workOrder.length !== 0) {
        this.router.navigate(['workorder/viewworkorder', id.leadID]);
      } else {
        this.createWorkOrder(id);
      }
      /* console.log('leads', this.leadModel); */
    }, error => {
      console.log(error);
    });
  }
  viewQuotation(id) {
    this.leadManagementService.viewAllQuotation(id.leadID).subscribe(data => {
      this.quotation = data;
      if (this.quotation.length !== 0) {
        this.router.navigate(['quotation/viewquotation', id.leadID]);
      } else {
        this.createWorkOrder(id);
      }
      /* console.log('leads', this.leadModel); */
    }, error => {
      console.log(error);
    });
  }
  getAllLeads() {
    this.leadManagementService.allLead().subscribe(data => {
      this.leadModel = new MatTableDataSource<Lead>(data);
      this.leadModel.paginator = this.paginator;
      this.array = data;
      this.totalSize = this.array.length;
      this.iterator();
      this.leadStatus();
    }, error => {
      console.log(error);
    });
  }
  public handlePage(e: any) {
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.iterator();
  }
  private iterator() {
    const end = (this.currentPage + 1) * this.pageSize;
    const start = this.currentPage * this.pageSize;
    const part = this.array.slice(start, end);
    this.leadModel = part;
  }
}
