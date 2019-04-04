import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ProformaInvoiceService } from './../proforma-invoice.service';
import { ProformaInvoice } from './../../shared/proformaInvoice.model';
import { MatPaginator, MatTableDataSource , MatSort} from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { DateSearch} from './dateSearch.model';

@Component({
  selector: 'app-view-all-proforma',
  templateUrl: './view-all-proforma.component.html',
  styleUrls: ['./view-all-proforma.component.css']
})
export class ViewAllProformaComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  proformaInvoice: any;
  proformaInvoiceModel: ProformaInvoice;
  public pageSize = 50;
  public currentPage = 0;
  public totalSize = 0;
  public array: any;
  public displayedColumns = ['', '', '', '', ''];
  proformaDetailsForm: FormGroup;
  public dataSource: any;
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
  constructor(private proformaInvoiceService: ProformaInvoiceService, private route: ActivatedRoute,
    private router: Router, private fb: FormBuilder) { }

  ngOnInit() {
    this.getAllProformaInvoice();
    this.createForm();
  }
  
  createForm() {
    this.proformaDetailsForm = this.fb.group({
      fromDate: ['', Validators.required],
      toDate: ['', Validators.required],
      monthData: ['', Validators.required],
      yearData: ['', Validators.required]
    });
  }
  filterProformaInvoice(data) {
    this.proformaInvoice = new MatTableDataSource<ProformaInvoice>(data);
    this.proformaInvoice.paginator = this.paginator;
    this.proformaInvoice = data;
  }

  searchDate(leadForm) {
    this.dateSearch = new DateSearch();
    this.dateSearch.fromDate = leadForm.controls.fromDate.value;
    this.dateSearch.toDate = leadForm.controls.toDate.value;
    this.proformaInvoiceService.proformaInvoiceDateSearch(this.dateSearch).subscribe(data => {
      this.proformaInvoice = new MatTableDataSource<ProformaInvoice>(data);
      this.proformaInvoice.paginator = this.paginator;
      this.proformaInvoiceModel = data;
      this.proformaInvoice = data;
    }, error => {
      console.log(error);
    });
  }
  searchMonth(leadForm) {
    this.dateSearch = new DateSearch();
    this.dateSearch.month = leadForm.controls.monthData.value;
    this.dateSearch.year = leadForm.controls.yearData.value;
    this.proformaInvoiceService.proformaInvoiceMonthSearch(this.dateSearch).subscribe(data => {
      this.proformaInvoice = new MatTableDataSource<ProformaInvoice>(data);
      this.proformaInvoice.paginator = this.paginator;
      this.proformaInvoice = data;
      this.proformaInvoiceModel = data;
      this.array = data;
      this.totalSize = this.array.length;
      this.iterator();
    }, error => {
      console.log(error);
    });
  }
  getAllProformaInvoice() {
    this.proformaInvoiceService.allAllProfomaInvoice().subscribe(data => {
      this.proformaInvoice = new MatTableDataSource<ProformaInvoice>(data);
      this.proformaInvoice.paginator = this.paginator;
      this.proformaInvoice = data;
      this.proformaInvoiceModel = data;
      this.array = data;
      this.totalSize = this.array.length;
      this.iterator();
    }, error => {
      console.log(error);
    }
    );
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
    this.proformaInvoice = part;
  }
  getViewProformaInvoice(data)   {
    this.router.navigate(['proformainvoice/viewsingleproformainvoice',
    data._id]);
  }
  getEditProfomaInvoice(data)   {
    this.router.navigate(['proformainvoice/editprofomainvoice',  data._id]);
  }

  getDeleteSingleProformaInvoice(row)   {
    this.proformaInvoiceService.deleteSingleProformaInvoice(row._id).subscribe(data => {
      this.proformaInvoice.paginator = this.paginator;
      this.proformaInvoice = data;
      this.proformaInvoiceModel = data;
      this.array = data;
      this.totalSize = this.array.length;
      this.iterator();
    }, error => {
      console.log(error);
    });
  }
}
