import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { ExpenseManagementService } from './../expense-management.service';
import { ActivatedRoute, RouterEvent } from '@angular/router';
import { Expense } from '../../shared/expense.model';
import { Router, ParamMap } from '@angular/router';
@Component({
  selector: 'app-amount-details',
  templateUrl: './amount-details.component.html',
  styleUrls: ['./amount-details.component.css']
})
export class AmountDetailsComponent implements OnInit {

  expenseDetailsForm: FormGroup;
  expenseModel: Expense;
  date;
  data;

  
  constructor(private expenseManagementService: ExpenseManagementService,
    private route: ActivatedRoute, private router: Router, private fb: FormBuilder) {
  }
  ngOnInit() {

    /*   this.route.paramMap.subscribe(
        (params: ParamMap) => {
          this.date = params.get('id');
        }
      ); */
    this.router.events.subscribe((event: RouterEvent) => console.log(event));
    this.createForm();
    /* this.getDateFilter(); */
    this.createForm();
    this.getAllExpense();
  }
  createForm() {
    this.expenseDetailsForm = this.fb.group({
      date: ['', Validators.required],
      name: ['', Validators.required],
      mobileNumber: ['', Validators.required],
      companyName: ['', Validators.required],
      totalAmount: ['', Validators.required],
      paid: ['']

    });

  }
  getAllExpense() {
    this.expenseManagementService.tdsFind().subscribe(data => {
      this.expenseModel = data;

    }, error => {
      console.log(error);
    });
  }
  back() {

    this.router.navigate(['expense/viewExpense']);
  }



}
