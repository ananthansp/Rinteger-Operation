import { Component, OnInit, Input } from '@angular/core';
import { Lead } from './../../shared/lead.model';

@Component({
  selector: 'app-view-requirements',
  templateUrl: './view-requirements.component.html',
  styleUrls: ['./view-requirements.component.css']
})
export class ViewRequirementsComponent implements OnInit {
  @Input() requirementsData: Lead;
  @Input() subTotal: number;
  @Input() allTotal: number;
  @Input() tax: number;
  constructor() { }

  ngOnInit() {
  }
}
