import { BaseComponent } from '#components/core/base/base.component';
import { ComponentService } from '#services/component.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-image-view',
  templateUrl: './image-view.component.html',
  styleUrls: ['./image-view.component.scss'],
})
export class ImageViewComponent extends BaseComponent implements OnInit {
  constructor(
    componentService: ComponentService,
    public dialogRef: MatDialogRef<ImageViewComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      url: string;
    }
  ) {
    super(componentService);
  }

  ngOnInit(): void {}
}
