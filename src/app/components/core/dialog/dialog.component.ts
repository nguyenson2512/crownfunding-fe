import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  @Input() dialogTitle: string;
  @Input() actionAlign: 'start' | 'center' | 'end';
  @Input() backButton = 'button.ok';
  @Input() displayButton = true;
  @ViewChild('dialogElement', { read: ElementRef, static: true })
  dialogContent: ElementRef;

  constructor(public dialogRef: MatDialogRef<DialogComponent>) {}

  ngOnInit() {}

  onDismiss(): void {
    this.dialogRef.close(false);
  }

  scrollTop() {
    this.dialogContent.nativeElement.children[1].scrollTo({ top: 0 });
  }
}
