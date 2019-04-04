import { Component, OnInit, Inject } from '@angular/core';
import { IncomeModel } from '../../shared/income.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IncomeManagementService } from './../income-management.service';
import { ActivatedRoute } from '@angular/router';
import { Router, ParamMap } from '@angular/router';
import { element } from '@angular/core/src/render3';

@Component({
  selector: 'app-edit-income-sheet',
  templateUrl: './edit-income-sheet.component.html',
  styleUrls: ['./edit-income-sheet.component.css']
})
export class EditIncomeSheetComponent implements OnInit {
  incomeForm: FormGroup;
  incomeModel: IncomeModel[];
  incomeValue: IncomeModel;
  incomeEdit: any;
  
  id;
  paymode;
  gstOption;
  constructor(private incomemagagementservice: IncomeManagementService, private router: Router,
    private fb: FormBuilder,private route: ActivatedRoute) { }
  ngOnInit() {
    this.route.paramMap.subscribe((params:ParamMap)=> {
      this.id = params.get('id');
    })
    this.createForm();
    this.getAllIncome();
    this.getPayMode();
    this.getGst();
  }
  createForm(){
    this.incomeForm = this.fb.group({
      workOrderID: ['', Validators.required],
      customerName: ['', Validators.required],
      date: ['', Validators.required],
      companyName: [''],
      modeOfPayment: [''],
      allTotal: [''],
      paidAmount: [''],     
      gst: [''],
      tds: ['']
    });
  }
  getAllIncome(){
    this.incomemagagementservice.getFindAll().subscribe(data=>{
      this.incomeModel = data;
      this.incomeModel.forEach((element)=>{
        if(this.id === element._id){
          this.incomeValue = element;
        }
      })
    },error =>{
      console.log(error);
    })
  }
  updateIncomeSheet(data){
  
    this.incomemagagementservice.EditIncomeSheet(data).subscribe(data =>{
      this.incomeValue = data;

      this.router.navigate(['income/viewincomesheet']);
    })
  }
  cancel(){
    this.router.navigate(['income/viewincomesheet']);
  }
  getPayMode(){
    this.incomemagagementservice.getincomesetting().subscribe(data => {
      this.incomeEdit = data[0].modeOfPayment;
      this.paymode = this.incomeEdit;
  })
}
getGst(){
  this.incomemagagementservice.getincomesetting().subscribe(data => {
    this.incomeEdit = data[0].gst;
    this.gstOption = this.incomeEdit;
  })
}
}
