import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Expense } from '../../shared/expense.model';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  expenseDetailsForm: FormGroup;
@Input() expenseModel: Expense;
@Output() searchCustomer = new EventEmitter<any>();
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.expenseDetailsForm = this.fb.group({
      srchterm: [''],
    });
  }
  searchBy(expenseData, search){

    const filterData = expenseData.filter(data => data.companyName.toUpperCase().indexOf(search.toUpperCase()) > -1);
        this.searchCustomer.emit(filterData);
  }

}
