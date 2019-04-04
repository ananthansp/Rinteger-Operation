import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IncomeModel } from '../../shared/income.model';

@Component({
  selector: 'app-search-income',
  templateUrl: './search-income.component.html',
  styleUrls: ['./search-income.component.css']
})
export class SearchIncomeComponent implements OnInit {
  incomeDetailsForm: FormGroup;
  @Input() incomeModel: IncomeModel;
  @Output() searchIncome = new EventEmitter<any>() 
  constructor(private fb:FormBuilder) { }
  ngOnInit() {
    this.incomeDetailsForm = this.fb.group({
      srchterm: [''],
    })
  }
  searchBy(incomeData, search){
    const filterData = incomeData.filter(data=>
      data.customerName.toUpperCase().indexOf(search.toUpperCase())>-1);
    this.searchIncome.emit(filterData);
  }
}
