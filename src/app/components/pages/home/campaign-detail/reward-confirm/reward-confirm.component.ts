import { BaseComponent } from '#components/core/base/base.component';
import { Campaign, IReward } from '#models/campaign.model';
import { ComponentService } from '#services/component.service';
import { onlyNumberInput } from '#utils/helpers';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ICreateOrderRequest, IPayPalConfig } from 'ngx-paypal';

@Component({
  selector: 'app-reward-confirm',
  templateUrl: './reward-confirm.component.html',
  styleUrls: ['./reward-confirm.component.scss'],
})
export class RewardConfirmComponent extends BaseComponent implements OnInit {
  form;
  isSubmit = false;
  public payPalConfig?: IPayPalConfig;

  constructor(
    private componentService: ComponentService,
    private dialogRef: MatDialogRef<RewardConfirmComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA)
    public data: { reward: IReward; campaignDetail: Campaign }
  ) {
    super(componentService);
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      amount: [
        this.data.reward?.amount,
        [
          Validators.required,
          Validators.min(this.data.reward?.amount),
          Validators.max(9999999),
        ],
      ],
    });
  }

  numberOnly(event): boolean {
    return onlyNumberInput(event);
  }

  handleClose() {
    this.dialogRef.close();
  }

  handleSubmitAmount() {
    if (!this.form.invalid) {
      this.isSubmit = true;
      this.initConfig();
    }
  }

  private initConfig(): void {
    const amount = Number(this.form.value.amount).toFixed(2);
    this.payPalConfig = {
      currency: 'USD',
      clientId:
        'AapSKW9z_77TJPKvhvsYGkGv7BB3erF1yfgNVm1W8ybQHH7K7cFM0P-rUNmJcQKPNDBdWxCdPszTftZx',
      createOrderOnClient: (data) =>
        <ICreateOrderRequest>{
          intent: 'AUTHORIZE',
          purchase_units: [
            {
              amount: {
                currency_code: 'USD',
                value: amount,
                breakdown: {
                  item_total: {
                    currency_code: 'USD',
                    value: amount,
                  },
                },
              },
              items: [
                {
                  name: this.data.campaignDetail?._id,
                  quantity: '1',
                  unit_amount: {
                    currency_code: 'USD',
                    value: amount,
                  },
                },
              ],
            },
          ],
        },
      advanced: {
        commit: 'true',
        extraQueryParams: [
          {
            name: 'intent',
            value: 'authorize',
          },
        ],
      },
      style: {
        label: 'paypal',
        layout: 'vertical',
      },
      onApprove: (data, actions) => {
        console.log(
          'onApprove - transaction was approved, but not authorized',
          data,
          actions
        );
        actions.order.get().then((details) => {
          console.log(
            'onApprove - you can get full order details inside onApprove: ',
            details
          );
        });
      },
      onClientAuthorization: (data) => {
        console.log(
          'onClientAuthorization - you should probably inform your server about completed transaction at this point',
          data
        );
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
      },
      onError: (err) => {
        console.log('OnError', err);
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
      },
    };
  }
}
