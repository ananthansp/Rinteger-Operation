import { Component, OnInit, Inject, Optional, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
@Component({
  selector: 'app-view-single-subcribecustomer',
  templateUrl: './view-single-subcribecustomer.component.html',
  styleUrls: ['./view-single-subcribecustomer.component.css']
})
export class ViewSingleSubcribecustomerComponent implements OnInit {

  constructor(@Optional() public dialogRef: MatDialogRef<ViewSingleSubcribecustomerComponent>,
  @Optional() @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

}
