
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs';
import { ViewSinglemarketcustomerComponent } from './view-singlemarketcustomer.component';
import { MarketCustomer } from '../create-marketcustomer/marketCustomer.model';


@Injectable({
  providedIn: 'root'
})
export class ViewsinglemarketcustomerService {
  dialogRef: MatDialogRef<ViewSinglemarketcustomerComponent>;
  constructor(private dialog: MatDialog) { }

  openSingleMarketCustomer(data?: MarketCustomer): Observable<boolean> {
    this.dialogRef = this.dialog.open(ViewSinglemarketcustomerComponent,
      {
        disableClose: true, backdropClass: 'light-backdrop',
        width: '900px',
        data: data
      });
    return this.dialogRef.afterClosed();
  }
  closeMarketCustomer() {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }
}
