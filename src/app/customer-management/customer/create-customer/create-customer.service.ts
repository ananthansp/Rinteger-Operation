import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs';
import { CreateCustomerComponent } from './create-customer.component';
import { Customer } from './customer.model';


@Injectable({
  providedIn: 'root'
})
export class CreateCustomerService {
  dialogRef: MatDialogRef<CreateCustomerComponent>;
  constructor(private dialog: MatDialog) { }

  openCustomer(data?: Customer): Observable<boolean> {
    this.dialogRef = this.dialog.open(CreateCustomerComponent,
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
