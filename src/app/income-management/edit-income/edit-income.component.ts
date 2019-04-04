import { Component, OnInit, Inject } from '@angular/core';
import { IncomeModel } from '../../shared/income.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IncomeManagementService } from './../income-management.service';
import { ActivatedRoute } from '@angular/router';
import { Router, ParamMap } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-edit-income',
  templateUrl: './edit-income.component.html',
  styleUrls: ['./edit-income.component.css']
})
export class EditIncomeComponent implements OnInit {
id;
incomeModel: IncomeModel[];
incomeValue: IncomeModel;
incomeForm: FormGroup;
incomeEdit: any;
Paymode;
gstOption;
message;
action;

  constructor(private incomeMangementService: IncomeManagementService, 
    private router: Router, private route: ActivatedRoute,private fb: FormBuilder,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap)=> {this.id = params.get('id');})
    this.createForm();
    this.getAllIncome();
    this.getPaymode();
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
      tds: [''],    
      gst: ['']     
    });
  }
  getAllIncome(){
    this.incomeMangementService.getFindAllwork().subscribe(data =>{
      this.incomeModel = data;
      this.incomeModel.forEach(element => {
        if(this.id === element._id){
          this.incomeValue = element;   
          console.log(this.incomeValue);       
        }        
      });
    },error=>{
      console.log(error);
    })
  }
  updateIncome(row) {
    this.message = "This file is already added "
    this.incomeMangementService.EditIncome(row).subscribe(data => {
      if(data === true ) 
      {
        this.snackBar.open(this.message,this.action,{
          duration: 3000
        })
      }
      else{
      this.incomeValue = data;
    }

      this.router.navigate(['income/viewincome']);
    }, error => {
      console.log(error);
    });
  }
  cancel(){
    this.router.navigate(['income/viewincome']);
  }
  getPaymode(){
    this.incomeMangementService.getincomesetting().subscribe(data => {
      this.incomeEdit = data[0].modeOfPayment;
      console.log(this.incomeValue);
      this.Paymode = this.incomeEdit;
    })
  }
  getGst(){
    this.incomeMangementService.getincomesetting().subscribe(data => {
      this.incomeEdit = data[0].gst;
      this.gstOption = this.incomeEdit;
    })
  }
}
