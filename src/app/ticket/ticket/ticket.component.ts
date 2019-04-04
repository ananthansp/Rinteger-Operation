import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { TicketModel } from './ticket.Model';
import { TicketService } from './../ticket.service';
import { from } from 'rxjs';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { Customer } from './../../customer-management/customer/create-customer/customer.model';
import {Register} from './../../user-management/registration/register.model';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {
  department;
  assignedto;
  assignedby;
  customerdetail;
  registerterdetail: Register[];
  units = ['studio', 'BSS', 'technology'];
  priority = ['low', 'medium', 'high', 'critical'];
  ticketform: FormGroup;
  ticketholder: TicketModel;
  customerModel: Customer;
  selectedData: Customer;
  departmentData;
  assignedBy;
  assignedTo;
  taskname: Register[];
  userId: string;
  userRole: string;
  constructor(private ts: TicketService, private fb: FormBuilder, private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {

    this.route.paramMap.subscribe((params: ParamMap) => {
      this.userId = params.get('id');
      /* this.userRole = params.get ('role'); */
    });


    this.createticket();
    this.getAllCustomer();
    this.getDepartment();
    this.getAllRegisteres();

}
  createticket() {
    this.ticketform = this.fb.group({
      ticketno: [''],
      datetime: [''],
      customername: [''],
      requirement: [''],
      units: [''],
      priority: [''],
      department: [''],
      assignedto: [''],
      userId: [''],
      assignedby: [''],
      status: [''],
      toclosedate: [''],
      closeddate: ['']
    });
  }


  onSubmit() {
    this.ticketholder = new TicketModel();
    this.ticketholder.ticketno = this.ticketform.controls.ticketno.value;
    this.ticketholder.datetime = this.ticketform.controls.datetime.value;
    this.ticketholder.customername = this.ticketform.controls.customername.value;
    this.ticketholder.requirement = this.ticketform.controls.requirement.value;
    this.ticketholder.units = this.ticketform.controls.units.value;
    this.ticketholder.priority = this.ticketform.controls.priority.value;
    this.ticketholder.department = this.ticketform.controls.department.value;
    this.ticketholder.assignedto = this.ticketform.controls.assignedto.value.userName;
    this.ticketholder.userId = this.ticketform.controls.assignedto.value._id;
    this.ticketholder.assignedby = this.ticketform.controls.assignedby.value;
    this.ticketholder.status = this.ticketform.controls.status.value;
    this.ticketholder.toclosedate = this.ticketform.controls.toclosedate.value;
    this.ticketholder.closeddate = this.ticketform.controls.closeddate.value;
    this.ts.getfieldValue(this.ticketholder).subscribe(data => {
      this.ticketholder = data;
      this.router.navigate(['ticket/ticketview', this.userId]);
    }, error => {
      console.log(error);
    });
  }

  getDepartment() {
    this.ts.getDepartment().subscribe(data => {
      this.ticketholder = data;
      this.department = this.ticketholder;
      this.departmentData = this.ticketholder[0].department;
      this.assignedBy = this.ticketholder[0].assignedby;
      this.assignedTo = this.ticketholder[0].assignedto;
    });
  }



  getReset() {
    this.router.navigate(['ticket/ticketview', this.userId]);
    this.ticketform.reset();
  }


  getAllCustomer() {
    this.ts.allCustomer().subscribe(data => {
      this.customerdetail = data;
    }, error => {
      console.log(error);
    });
  }
  filterCustomer(data) {
    this.customerModel = data;

  }
  getAllRegisteres() {
    this.ts.getAllRegisteres().subscribe(regdata => {
      this.registerterdetail = regdata;
    }, error => {
      console.log(error);
    });

  }
  changed(e) {
    console.log(this.registerterdetail.filter(data => data.unit === e.value));
     this.taskname = this.registerterdetail.filter(data => data.unit === e.value);
  }
}
