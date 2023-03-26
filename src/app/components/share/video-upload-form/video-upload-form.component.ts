import { BaseComponent } from '#components/core/base/base.component';
import { ComponentService } from '#services/component.service';
import { CampaignService } from '#services/http/campaign.service';
import { LoaderService } from '#services/loader.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-video-upload-form',
  templateUrl: './video-upload-form.component.html',
  styleUrls: ['./video-upload-form.component.scss'],
})
export class VideoUploadFormComponent extends BaseComponent implements OnInit {
  url: string;

  constructor(
    componentService: ComponentService,
    public campaignService: CampaignService,
    private loaderService: LoaderService,
    public dialogRef: MatDialogRef<VideoUploadFormComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: any
  ) {
    super(componentService);
  }

  ngOnInit(): void {
    if (this.data) {
      this.url = this.data?.videoInfo;
    }
  }

  selectFile(event) {
    this.loaderService.spinnerOn();
    this.loaderService.lock();
    const formData = new FormData();
    formData.append('video', event.target.files[0]);
    this.subscribeOnce(
      this.campaignService.uploadVideo(formData).pipe(
        catchError((e) => {
          return throwError(e);
        })
      ),
      (res: any) => {
        this.url = res?.['secure_url'];
      },
      () => {
        this.loaderService.unlock();
        this.loaderService.spinnerOff();
      }
    );
  }

  handleClose() {
    this.dialogRef.close();
  }

  onSubmit() {
    this.dialogRef.close(this.url);
  }
}
