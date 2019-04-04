import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs';
import { ViewSingleSubcribecustomerComponent } from './view-single-subcribecustomer.component';
import { Customer } from '../../customer/create-customer/customer.model';


@Injectable({
  providedIn: 'root'
})
export class ViewSingleSubscribecustomerService {
  dialogRef: MatDialogRef<ViewSingleSubcribecustomerComponent>;
  constructor(private dialog: MatDialog) { }

  openSingleSubscribeCustomer(data?: Customer): Observable<boolean> {
    this.dialogRef = this.dialog.open(ViewSingleSubcribecustomerComponent,
      {
        disableClose: true, backdropClass: 'light-backdrop',
        width: '900px',
        data: data
      });
    return this.dialogRef.afterClosed();
  }
  closeSubscribeCustomer() {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }
}
