import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { TicketModel } from './../ticket/ticket.Model';
import { TicketService } from './../ticket.service';
import {Register} from './../../user-management/registration/register.model';
import { Customer } from './../../customer-management/customer/create-customer/customer.model';
@Component({
  selector: 'app-ticket-edit',
  templateUrl: './ticket-edit.component.html',
  styleUrls: ['./ticket-edit.component.css']
})
export class TicketEditComponent implements OnInit {

  department;
  assignedto;
  assignedby;
  customerdetail;
  registerterdetail: Register[];
  units = ['studio', 'BSS', 'technology'];
  priority = ['low', 'medium', 'high', 'critical'];
  ticketform: FormGroup;
  ticketholder: any;
  customerModel: Customer;
  selectedData: Customer;
  departmentData;
  assignedBy;
  assignedTo;
  taskname: Register[];
  userId: string;
  userRole: string;
  id: any;
  ticketEdit: any;
  editview: string;
  constructor(private ts: TicketService, private fb: FormBuilder, private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(
      (params: ParamMap) => {
        this.id = params.get('id');
        this.editview = params.get('editview');
      });
      this.createticket();
      this.getAllTicket();
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

  /* onSubmit(ticketform:FormGroup) {
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
    this.ts.updateTicket(this.ticketholder).subscribe(data => {
      this.ticketholder = data;
      this.router.navigate(['ticket/ticketview', this.editview]);
    }, error => {
      console.log(error);
    });
  } */



  getAllTicket() {

    this.ts.retriveTicket().subscribe(data => {
    this.ticketholder = data;
    this.ticketholder.forEach((customer) => {
      if (this.id === customer._id) {
        this.ticketEdit = customer;

      console.log(this.ticketEdit);
// tslint:disable-next-line: no-unused-expression
    } error => {
      console.log(error);
    };

  });
});
}
onSubmit(value) {
  this.ts.updateTicket(value).subscribe(data => {
    this.ticketEdit = data;
    this.router.navigate(['ticket/ticketview', this.editview]);
  }, error => {
    console.log(error);
  });
}

cancel() {
  this.router.navigate(['ticket/ticketview', this.editview]);
}

}
