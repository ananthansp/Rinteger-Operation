import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MatDialogRef, MatDialog } from '@angular/material';
import { ExistingCustomerComponent} from './existing-customer.component';

@Injectable({
  providedIn: 'root'
})
export class ExistingService {

  constructor(private dialog: MatDialog) { }

  public viewCustomer(): Observable<any> {
    let dialogRef: MatDialogRef<ExistingCustomerComponent>;
      dialogRef = this.dialog.open(ExistingCustomerComponent, {
      width: '360px',
      disableClose: true
    });
    return dialogRef.afterClosed();
  }
}
