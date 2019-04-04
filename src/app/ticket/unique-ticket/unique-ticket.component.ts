import { Component, OnInit } from '@angular/core';
import { TicketModel } from './../ticket/ticket.Model';
import { TicketService } from './../ticket.service';
import { from } from 'rxjs';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'app-unique-ticket',
  templateUrl: './unique-ticket.component.html',
  styleUrls: ['./unique-ticket.component.css']
})
export class UniqueTicketComponent implements OnInit {
  ticketholder: TicketModel[];
  id: string;
  constructor(private ts: TicketService, private route: ActivatedRoute,
    private router: Router) {

    this.route.paramMap.subscribe(
      (params: ParamMap) => {
        this.id = params.get('id');
      }
    );


  }

  ngOnInit() {

    this.uniqTicket();
  }


  uniqTicket() {

    this.ts.uniqTicket(this.id).subscribe(data => {
    this.ticketholder = data;
      console.log(this.ticketholder);
    }, error => { console.log(error); }
    );
  }

}
