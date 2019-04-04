import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { LeadManagementService } from './../lead-management.service';
import { ActivatedRoute } from '@angular/router';
import { Lead } from './../../shared/lead.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-single-lead',
  templateUrl: './view-single-lead.component.html',
  styleUrls: ['./view-single-lead.component.css']
})
export class ViewSingleLeadComponent implements OnInit {
  fb: FormBuilder;
  leadDetailsForm: FormGroup;
  leadModel: Lead;
  id;
  constructor(private leadManagementService: LeadManagementService,
     private route: ActivatedRoute) {
  }
  ngOnInit() {
    /* this.createForm(); */
    this.id = this.route.snapshot.params.id;
    this.getSingleLeads();
  }
  createForm() {
    this.leadDetailsForm = this.fb.group({
      leadID: [''],
      mobileNumber: ['', Validators.required],
      name: ['', Validators.required],
      leadOwner: ['', Validators.required],
      leadSource: ['', Validators.required],
      leadStatus: ['', Validators.required],
      service: ['', Validators.required],
      date: ['', Validators.required],
      remarks: ['', Validators.required],
      requirements: this.fb.array([])
    });
    this.addForm();
  }
  getSingleLeads() {
    this.leadManagementService.singleLead(this.id).subscribe(data => {
      this.leadModel = data;
      console.log('single leads', this.leadModel);
    }, error => {
      console.log(error);
    });
  }
  addForm() {
    const requirements = this.fb.group({
      item: [''],
      quantity: [''],
      price: [''],
      discount: [''],
      description: [''],
      total: ['']
    });
    this.requirementsForms.push(requirements);
  }
  get requirementsForms() {
    return this.leadDetailsForm.get('requirements') as FormArray;
  }
}
