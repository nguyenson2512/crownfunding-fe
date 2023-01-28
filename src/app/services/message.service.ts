import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private isDisplay = new Subject<any>();
  private popupMessageDisplayStatus = new Subject<any>();
  public message: string;

  isDisplay$ = this.isDisplay.asObservable();
  showPopupMessage$ = this.popupMessageDisplayStatus.asObservable();

  constructor(private snackBar: MatSnackBar) {}

  showMessage(message: string) {
    this.snackBar.open(message, null, {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  showPopupMessage(message: string) {
    this.message = message;
    this.isDisplay.next(new Date());
  }

  hidePopupMessage() {
    this.isDisplay.next(false);
  }
}
