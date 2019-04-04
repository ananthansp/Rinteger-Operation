import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs';
import { ViewSinglecustomerComponent } from './view-singlecustomer.component';
import { Customer } from '../create-customer/customer.model';


@Injectable({
  providedIn: 'root'
})
export class ViewsinglecustomerService {
  dialogRef: MatDialogRef<ViewSinglecustomerComponent>;
  constructor(private dialog: MatDialog) { }

  openSingleCustomer(data?: Customer): Observable<boolean> {
    this.dialogRef = this.dialog.open(ViewSinglecustomerComponent,
      {
        disableClose: true, backdropClass: 'light-backdrop',
        width: '900px',
        data: data
      });
    return this.dialogRef.afterClosed();
  }
  closeCustomer() {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }
}
