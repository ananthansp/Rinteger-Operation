import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CreateMarketcustomerComponent } from './create-marketcustomer.component';
import { MarketCustomer } from './marketCustomer.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CreateMarketcustomerService {
  dialogRef: MatDialogRef<CreateMarketcustomerComponent>;
  constructor(private dialog: MatDialog) { }

  openMarketCustomer(data?: MarketCustomer): Observable<boolean> {
    this.dialogRef = this.dialog.open(CreateMarketcustomerComponent,
       { disableClose: true, backdropClass: 'light-backdrop',
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
