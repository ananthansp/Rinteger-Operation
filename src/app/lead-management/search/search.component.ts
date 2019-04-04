import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LeadSettings } from './../../shared/lead-settings.model';
import { Lead } from './../../shared/lead.model';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @Input() searchDetails: LeadSettings;
  @Input() leadModel: Lead[];
  @Output() searchFilter = new EventEmitter<any>();


  constructor() { }

  ngOnInit() {
  }
  selected(ev, leadData) {
    const selectedIndex = ev.target.selectedIndex;
    const selectedValue = ev.target.value;
    const optGroupLabel = ev.target.options[selectedIndex].parentNode.getAttribute('label');
    switch (optGroupLabel) {
      case 'Lead Source': {
        this.selectedSearch(selectedValue, leadData);
        break;
      }
      case 'Lead Service': {
        this.selectedService(selectedValue, leadData);
        break;
      }
      case 'Lead Status': {
        this.selectedStatus(selectedValue, leadData);
        break;
      }
      case 'Lead Type': {
        this.selectedType(selectedValue, leadData);
        break;
      }
      case 'All': {
        this.selectedAll(selectedValue, leadData);
        break;
      }
    }
  }

  selectedSearch(source, leadData) {
    const filterData = leadData.filter(data => data.leadSource === source);
    this.searchFilter.emit(filterData);
  }
  selectedAll(source, leadData)   {
    this.searchFilter.emit(leadData);
  }

  selectedStatus(source, leadData) {
    const filterData = leadData.filter(data => data.leadStatus === source);
    this.searchFilter.emit(filterData);
  }

  selectedService(source, leadData) {
    const filterData = leadData.filter(data => data.leadService.some(newData =>
      newData === source));
    this.searchFilter.emit(filterData);
  }
  selectedType(source, leadData) {
    const filterData = leadData.filter(data => data.leadType.some(newData =>
      newData === source));
    this.searchFilter.emit(filterData);
  }
}
