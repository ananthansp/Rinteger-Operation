import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { ExpenseManagementService } from './../expense-management.service';
import { ActivatedRoute } from '@angular/router';
import { Expense } from '../../shared/expense.model';
import { Router, ParamMap } from '@angular/router';
@Component({
  selector: 'app-view-single-expense',
  templateUrl: './view-single-expense.component.html',
  styleUrls: ['./view-single-expense.component.css']
})
export class ViewSingleExpenseComponent implements OnInit {
  /* fb: FormBuilder; */
  expenseDetailsForm: FormGroup;
  expenseModel: Expense;
  id;
  constructor(private expenseManagementService: ExpenseManagementService,
    private route: ActivatedRoute, private router: Router, private fb: FormBuilder) {
  }
  ngOnInit() {
    /* this.createForm(); */
    this.route.paramMap.subscribe(
      (params: ParamMap) => {
        this.id = params.get('id');
      }
    );
    this.getSingleLeads();
    this.createForm();
  }
  createForm() {
    this.expenseDetailsForm = this.fb.group({
      mobileNumber: ['', Validators.required],
      name: ['', Validators.required],
      companyName: ['', Validators.required],
      expenseType: ['', Validators.required],
      modeOfPayment: ['', Validators.required],
      location: ['', Validators.required],
      date: ['', Validators.required],
      totalAmount: ['', Validators.required],
      paid: [''],
      vouNo: [''],
      expensesDescription: [''],
      gst: ['']
    });
  }
  getSingleLeads() {
    this.expenseManagementService.singleExpense(this.id).subscribe(data => {
      this.expenseModel = data;
      console.log('expense', this.expenseModel);
    }, error => {
      console.log(error);
    });
  }
  cancel() {

    this.router.navigate(['expense/viewExpense']);
  }
  getEdit(row) {

    this.router.navigate(['expense/editExpense', row._id]);
  }
}
