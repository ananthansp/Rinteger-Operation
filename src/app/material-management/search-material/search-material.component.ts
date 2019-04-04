import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MaterialModel } from '../../shared/material-management.model';
@Component({
  selector: 'app-search-material',
  templateUrl: './search-material.component.html',
  styleUrls: ['./search-material.component.css']
})
export class SearchMaterialComponent implements OnInit {
  materialDetailsForm: FormGroup;
  @Input() materialModel: MaterialModel;
  @Output() searchMaterial = new EventEmitter<any>()
  constructor(private fb: FormBuilder) { }
  ngOnInit() {
    this.materialDetailsForm = this.fb.group({
      srchterm: [''],
    });
  }
  searchBy(materialData, search) {
    const filterData = materialData.filter(data =>
      data.customerName.toUpperCase().indexOf(search.toUpperCase()) > -1);
    this.searchMaterial.emit(filterData);
  }
}
