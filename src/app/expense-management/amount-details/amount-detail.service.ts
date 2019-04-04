import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs';
import { AmountDetailsComponent } from './amount-details.component';
import { Expense } from '../../shared/expense.model';

@Injectable({
  providedIn: 'root'
})
export class AmountDetailService {
  dialogRef: MatDialogRef<AmountDetailsComponent>;
  constructor(private dialog: MatDialog) { }

  openCustomer(data?: Expense): Observable<boolean> {
    this.dialogRef = this.dialog.open(AmountDetailsComponent,
       { disableClose: true, backdropClass: 'light-backdrop',
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
