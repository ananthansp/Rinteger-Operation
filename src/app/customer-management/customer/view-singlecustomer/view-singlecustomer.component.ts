import { Component, OnInit, Inject, Optional, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'app-view-singlecustomer',
  templateUrl: './view-singlecustomer.component.html',
  styleUrls: ['./view-singlecustomer.component.css']
})
export class ViewSinglecustomerComponent implements OnInit {

  constructor( @Optional() public dialogRef: MatDialogRef<ViewSinglecustomerComponent>,
  @Optional() @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

}
