import { BaseComponent } from '#components/core/base/base.component';
import { User } from '#models/user.model';
import { ComponentService } from '#services/component.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss'],
})
export class UserDialogComponent extends BaseComponent implements OnInit {
  constructor(
    componentService: ComponentService,
    public dialogRef: MatDialogRef<UserDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: User
  ) {
    super(componentService);
  }

  ngOnInit(): void {}

  handleClose() {
    this.dialogRef.close();
  }
}
