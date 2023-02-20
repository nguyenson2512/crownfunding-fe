import { BaseComponent } from '#components/core/base/base.component';
import { ComponentService } from '#services/component.service';
import { onlyNumberInput } from '#utils/helpers';
import { Component, Inject, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { notEmpty } from 'src/app/validators/not-empty.validator';
// import {
//   MomentDateAdapter,
//   MAT_MOMENT_DATE_ADAPTER_OPTIONS,
// } from '@angular/material-moment-adapter';
import * as _moment from 'moment';
import { CampaignDetailService } from '#services/campaign-detail.service';
// import { Moment } from 'moment';
// import {
//   DateAdapter,
//   MAT_DATE_FORMATS,
//   MAT_DATE_LOCALE,
// } from '@angular/material/core';
// import { MatDatepicker } from '@angular/material/datepicker';

const moment = _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-reward-form',
  templateUrl: './reward-form.component.html',
  styleUrls: ['./reward-form.component.scss'],
  // providers: [
  //   {
  //     provide: DateAdapter,
  //     useClass: MomentDateAdapter,
  //     deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
  //   },

  //   { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  // ],
})
export class RewardFormComponent extends BaseComponent implements OnInit {
  form = this.fb.group({
    title: ['', [Validators.required, notEmpty]],
    description: ['', [Validators.required, notEmpty]],
    amount: [
      '',
      [Validators.required, Validators.min(10), Validators.max(9999999)],
    ],
    // estimateDelivery: [moment(), [Validators.required]],
    itemsOffering: new FormArray([]),
  });

  limitItems = 4;

  get itemsOffering(): FormArray {
    return this.form.get('itemsOffering') as FormArray;
  }
  constructor(
    componentService: ComponentService,
    private fb: FormBuilder,
    public campaignDetailService: CampaignDetailService,
    public dialogRef: MatDialogRef<RewardFormComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      isEdit: boolean;
      reward?: any;
    }
  ) {
    super(componentService);
  }

  ngOnInit(): void {
    if (this.data.isEdit) {
      const { title, description, amount, itemsOffering } = this.data.reward;
      this.form.patchValue({
        title,
        description,
        amount,
      });
      itemsOffering.forEach((item) => {
        this.itemsOffering.push(
          new FormGroup({
            name: new FormControl(item?.name, [Validators.required, notEmpty]),
            quantity: new FormControl(item?.quantity, [
              Validators.required,
              Validators.min(1),
              Validators.max(9999999),
            ]),
          })
        );
      });
    }
  }

  numberOnly(event): boolean {
    return onlyNumberInput(event);
  }

  handleClose() {
    this.dialogRef.close();
  }

  onSubmit() {
    this.dialogRef.close(this.form.value);
  }

  handleAddItem(event) {
    event.preventDefault();
    this.itemsOffering.push(
      new FormGroup({
        name: new FormControl('', [Validators.required, notEmpty]),
        quantity: new FormControl(1, [
          Validators.required,
          Validators.min(1),
          Validators.max(9999999),
        ]),
      })
    );
  }

  removeItem(index) {
    this.itemsOffering.removeAt(index);
  }

  // setMonthAndYear(
  //   normalizedMonthAndYear: Moment,
  //   datepicker: MatDatepicker<Moment>
  // ) {
  //   const ctrlValue = this.form.get('estimateDelivery')!.value;
  //   ctrlValue.month(normalizedMonthAndYear.month());
  //   ctrlValue.year(normalizedMonthAndYear.year());
  //   this.form.get('estimateDelivery')!.setValue(ctrlValue);
  //   datepicker.close();
  // }
}
