import { Component, OnInit, Inject, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatSnackBar } from '@angular/material';
import { SettingsServiceService } from '../settings-service.service';
import { MaterialSetting } from './../../shared/material-settings.model';
@Component({
  selector: 'app-material-settings',
  templateUrl: './material-settings.component.html',
  styleUrls: ['./material-settings.component.css']
})
export class MaterialSettingsComponent implements OnInit {
  materialSettingsForm: FormGroup;
  settingModel: MaterialSetting;
  settingValue: MaterialSetting[];
  showShootType: boolean;
  showDispatchType: boolean;
  showMaterialStatus: boolean;
  message;
  action;
  constructor(private fb: FormBuilder, private settingsService: SettingsServiceService,
    private snackBar: MatSnackBar) { }
  ngOnInit() {
    this.createForm();
    this.viewMaterialSetting();
  }
  createForm() {
    this.materialSettingsForm = this.fb.group({
      shootType: [''],
      dispatchType: [''],
      materialStatus: ['']
    });
  }
  showShootTypeForm() {
    this.showShootType = true;
    this.showDispatchType = false;
    this.showMaterialStatus = false;
  }
  showDispatchTypeForm() {
    this.showShootType = false;
    this.showDispatchType = true;
    this.showMaterialStatus = false;
  }
  showMaterialStatusForm() {
    this.showShootType = false;
    this.showDispatchType = false;
    this.showMaterialStatus = true;
  }
  addShootType() {
    this.message = 'shootType mode added successfully';
    this.settingModel = new MaterialSetting();
    this.settingModel.shootType = this.materialSettingsForm.controls.shootType.value;
    this.settingsService.addShootType(this.settingModel).subscribe(data => {
      this.settingModel = data;
      this.settingValue = data;
      this.snackBar.open(this.message, this.action, {
        duration: 3000,
      });
      this.materialSettingsForm.reset();
    }, error => {
      console.log(error);
    })
  }
  viewMaterialSetting() {
    this.settingsService.getMaterial().subscribe(data => {
      this.settingModel = data;
      this.settingValue = data;
    }, error => {
      console.log(error);
    })
  }
  deleteShootType(data) {
    this.message = 'shootType mode deleted successfully';
    this.settingsService.deleteShootType(data).subscribe(value => {
      this.settingModel = value;
      this.settingValue = value;
      this.snackBar.open(this.message, this.action, {
        duration: 3000,
      });
      this.materialSettingsForm.reset();
    }, error => {
      console.log(error);
    })
  }
  addDispatchType() {
    this.message = 'dispatchType Option added successfully';
    this.settingModel = new MaterialSetting();
    this.settingModel.dispatchType = this.materialSettingsForm.controls.dispatchType.value;
    this.settingsService.addDispatchType(this.settingModel).subscribe(data => {
      this.settingModel = data;
      this.settingValue = data;
      this.snackBar.open(this.message, this.action, {
        duration: 3000,
      });
      this.materialSettingsForm.reset();
    }, error => {
      console.log(error);
    })
  }
  deleteDispatchType(test) {
    this.message = 'dispatchType option deleted successfully'
    this.settingsService.deleteDispatchType(test).subscribe(data => {
      this.settingModel = data;
      this.settingValue = data;
      this.snackBar.open(this.message, this.action, {
        duration: 3000,
      });
      this.materialSettingsForm.reset();
    }, error => {
      console.log(error);
    })
  }
  addMaterialStatus() {
    this.message = 'Material Status Option added successfully';
    this.settingModel = new MaterialSetting();
    this.settingModel.materialStatus = this.materialSettingsForm.controls.materialStatus.value;
    this.settingsService.addMaterialStatus(this.settingModel).subscribe(data => {
      this.settingModel = data;
      this.settingValue = data;
      this.snackBar.open(this.message, this.action, {
        duration: 3000,
      });
      this.materialSettingsForm.reset();
    }, error => {
      console.log(error);
    })
  }
  deleteMaterialStatus(test) {
    this.message = 'Material Status option deleted successfully'
    this.settingsService.deleteMaterialStatus(test).subscribe(data => {
      this.settingModel = data;
      this.settingValue = data;
      this.snackBar.open(this.message, this.action, {
        duration: 3000,
      });
      this.materialSettingsForm.reset();
    }, error => {
      console.log(error);
    })
  }
}