import { BaseComponent } from '#components/core/base/base.component';
import { ComponentService } from '#services/component.service';
import { CampaignService } from '#services/http/campaign.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { notEmpty } from 'src/app/validators/not-empty.validator';

@Component({
  selector: 'app-document-form',
  templateUrl: './document-form.component.html',
  styleUrls: ['./document-form.component.scss'],
})
export class DocumentFormComponent extends BaseComponent implements OnInit {
  form = this.fb.group({
    description: ['', [Validators.required, notEmpty]],
    name: [''],
  });
  url: string;
  constructor(
    componentService: ComponentService,
    private fb: FormBuilder,
    public campaignService: CampaignService,
    public dialogRef: MatDialogRef<DocumentFormComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      isEdit: boolean;
      document?: any;
    }
  ) {
    super(componentService);
  }

  ngOnInit(): void {
    if (this.data.isEdit) {
      const { url, name, description } = this.data.document;
      this.form.patchValue({
        name,
        description,
      });
      this.url = url;
    }
  }

  selectFile(event) {
    const formData = new FormData();
    formData.append('files', event.target.files[0]);
    this.subscribeOnce(
      this.campaignService.uploadDocument(formData).pipe(
        catchError((e) => {
          return throwError(e);
        })
      ),
      (res) => {
        this.form.patchValue({ name: res?.['public_id'] });
        this.url = res?.['url'];
      }
    );
  }

  handleClose() {
    this.dialogRef.close();
  }

  onSubmit() {
    this.dialogRef.close({ ...this.form.value, url: this.url });
  }
}
