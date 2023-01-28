import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../components/share/dialog/confirm-dialog/confirm-dialog.component';
import { WarningDialogComponent } from '../components/share/dialog/warning-dialog/warning-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(public dialog: MatDialog) {}

  showDialog(component: any, options?: any) {
    return this.dialog.open(component, options);
  }

  confirm(message: string) {
    const data = { content: message };
    const dialogRef = this.dialog.open(ConfirmDialogComponent, { data });
    return new Promise((resolve) => {
      dialogRef.afterClosed().subscribe((result) => {
        resolve(result);
      });
    });
  }

  warning(message: string) {
    const data = { content: message };
    this.dialog.open(WarningDialogComponent, { data });
  }
}
