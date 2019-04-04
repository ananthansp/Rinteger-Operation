import { Component, OnInit, Input } from '@angular/core';
import { Lead } from './../../shared/lead.model';
@Component({
  selector: 'app-view-followup',
  templateUrl: './view-followup.component.html',
  styleUrls: ['./view-followup.component.css']
})
export class ViewFollowupComponent implements OnInit {
  @Input() followupData: Lead;
  constructor() { }

  ngOnInit() {
  }

}
