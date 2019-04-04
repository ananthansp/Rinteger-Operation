import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { QuotationManagementService} from './../quotation-management.service';
import { Quotation } from './../../shared/quotation.model';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { MatPaginator, MatTableDataSource , MatSort} from '@angular/material';
import { DateSearch} from './dateSearch.model';

@Component({
  selector: 'app-view-all-quotation',
  templateUrl: './view-all-quotation.component.html',
  styleUrls: ['./view-all-quotation.component.css']
})
export class ViewAllQuotationComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  quotation: any;
  quotationModel: Quotation;
  quotationDetailsForm: FormGroup;
  dateSearch: DateSearch;
  public pageSize = 50;
  public currentPage = 0;
  public totalSize = 0;
  public array: any;
  public displayedColumns = ['', '', '', '', ''];
  public dataSource: any;
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
  matdatasource = new MatTableDataSource([]);
  constructor(private quotationManagementService: QuotationManagementService,
    private route: ActivatedRoute,
    private router: Router, private fb: FormBuilder) { }

  ngOnInit() {
    this.createForm();
    this.getAllQuotation();
  }
  getViewQuotation(data)   {
    this.router.navigate(['quotation/viewsinglequotation', data._id]);
  }
  getEditQuotation(data)   {
    this.router.navigate(['quotation/editquotation',  data._id]);
  }
  searchDate(leadForm) {
    this.dateSearch = new DateSearch();
    this.dateSearch.fromDate = leadForm.controls.fromDate.value;
    this.dateSearch.toDate = leadForm.controls.toDate.value;
    this.quotationManagementService.quotationDateSearch(this.dateSearch).subscribe(data => {
      this.quotation = new MatTableDataSource<Quotation>(data);
      this.quotationModel = data;
      this.quotation.paginator = this.paginator;
      this.quotation = data;
    }, error => {
      console.log(error);
    });
  }
  searchMonth(leadForm) {
    this.dateSearch = new DateSearch();
    this.dateSearch.month = leadForm.controls.monthData.value;
    this.dateSearch.year = leadForm.controls.yearData.value;
    this.quotationManagementService.quotationMonthSearch(this.dateSearch).subscribe(data => {
      this.quotation = new MatTableDataSource<Quotation>(data);
      this.quotation.paginator = this.paginator;
      this.quotation = data;
      this.quotationModel = data;
      this.array = data;
      this.totalSize = this.array.length;
      this.iterator();
    }, error => {
      console.log(error);
    });
  }
  createForm() {
    this.quotationDetailsForm = this.fb.group({
      fromDate: ['', Validators.required],
      toDate: ['', Validators.required],
      monthData: ['', Validators.required],
      yearData: ['', Validators.required]
    });
  }
  getAllQuotation() {
    this.quotationManagementService.allQuotation().subscribe(data => {
      this.quotation = new MatTableDataSource<Quotation>(data);
      this.quotation.paginator = this.paginator;
      this.quotation = data;
      this.quotationModel = data;
      this.array = data;
      this.totalSize = this.array.length;
      this.iterator();
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
    this.quotation = part;
  }
  getDeleteSingleQuotation(row)   {
    this.quotationManagementService.deleteSingleQuotation(row._id).subscribe(data => {
      this.quotation = new MatTableDataSource<Quotation>(data);
      this.quotation.paginator = this.paginator;
      this.quotation = data;
      this.quotationModel = data;
      this.array = data;
      this.totalSize = this.array.length;
      this.iterator();
    }, error => {
      console.log(error);
    });
  }
  filterQuotation(data) {
    this.quotation = new MatTableDataSource<Quotation>(data);
    this.quotation.paginator = this.paginator;
    this.quotation = data;
  }

}
