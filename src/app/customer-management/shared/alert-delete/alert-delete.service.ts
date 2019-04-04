import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material';
import { AlertDeleteComponent } from './alert-delete.component';

@Injectable({
  providedIn: 'root'
})
export class AlertDeleteService {

  constructor(private dialog: MatDialog) { }

  public confirm(): Observable<boolean> {
    let dialogRef: MatDialogRef<AlertDeleteComponent>;
    dialogRef = this.dialog.open(AlertDeleteComponent, {
      width: '360px',
      disableClose: true
    });
    return dialogRef.afterClosed();
  }
}
