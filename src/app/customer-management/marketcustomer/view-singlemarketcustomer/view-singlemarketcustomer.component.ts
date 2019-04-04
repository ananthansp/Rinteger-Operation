import { Component, OnInit, Inject, Optional, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-view-singlemarketcustomer',
  templateUrl: './view-singlemarketcustomer.component.html',
  styleUrls: ['./view-singlemarketcustomer.component.css']
})
export class ViewSinglemarketcustomerComponent implements OnInit {
  constructor( @Optional() public dialogRef: MatDialogRef<ViewSinglemarketcustomerComponent>,
  @Optional() @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }
}
