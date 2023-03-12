import { BaseComponent } from '#components/core/base/base.component';
import { ComponentService } from '#services/component.service';
import { onlyNumberInput } from '#utils/helpers';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { notEmpty } from 'src/app/validators/not-empty.validator';

@Component({
  selector: 'app-milestone-form',
  templateUrl: './milestone-form.component.html',
  styleUrls: ['./milestone-form.component.scss'],
})
export class MilestoneFormComponent extends BaseComponent implements OnInit {
  form;
  constructor(
    componentService: ComponentService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<MilestoneFormComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      isEdit: boolean;
      milestone?: any;
      maximumAmount?: any;
    }
  ) {
    super(componentService);
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      description: ['', [Validators.required, notEmpty]],
      title: ['', [Validators.required, notEmpty]],
      amount: [
        '',
        [Validators.required],
        // Validators.max(this.data.maximumAmount),
      ],
      estimateDeadline: ['', [Validators.required]],
    });
    if (this.data.isEdit) {
      const { amount, title, description } = this.data.milestone;
      this.form.patchValue({
        title,
        description,
        amount,
        estimateDeadline: new Date(this.data.milestone?.estimateDeadline),
      });
    }
  }

  handleClose() {
    this.dialogRef.close();
  }

  onSubmit() {
    this.dialogRef.close(this.form.value);
  }

  numberOnly(event): boolean {
    return onlyNumberInput(event);
  }
}
