import { BaseComponent } from '#components/core/base/base.component';
import { ComponentService } from '#services/component.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-paypal-payment',
  templateUrl: './paypal-payment.component.html',
  styleUrls: ['./paypal-payment.component.scss'],
})
export class PaypalPaymentComponent extends BaseComponent implements OnInit {
  @Input() config = null;
  constructor(private componentService: ComponentService) {
    super(componentService);
  }

  ngOnInit(): void {}
}
