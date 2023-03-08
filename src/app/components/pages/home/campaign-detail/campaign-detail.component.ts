import { BaseComponent } from '#components/core/base/base.component';
import { Campaign, IReward } from '#models/campaign.model';
import { Comment } from '#models/comment.model';
import { ComponentService } from '#services/component.service';
import { CampaignService } from '#services/http/campaign.service';
import { PaymentService } from '#services/http/payment.service';
import { Component, OnInit } from '@angular/core';
import { IPayPalConfig } from 'ngx-paypal';
import { BehaviorSubject, forkJoin } from 'rxjs';
import { RewardConfirmComponent } from './reward-confirm/reward-confirm.component';

@Component({
  selector: 'app-campaign-detail',
  templateUrl: './campaign-detail.component.html',
  styleUrls: ['./campaign-detail.component.scss'],
})
export class CampaignDetailComponent extends BaseComponent implements OnInit {
  campaignId: string;

  campaignInfo$: BehaviorSubject<Campaign> = new BehaviorSubject<Campaign>(
    null
  );
  comments$: BehaviorSubject<Comment[]> = new BehaviorSubject<Comment[]>([]);
  public payPalConfig?: IPayPalConfig;

  constructor(
    componentService: ComponentService,
    private campaignService: CampaignService,
    private paymentService: PaymentService
  ) {
    super(componentService);
  }

  ngOnInit(): void {
    this.campaignId = this.routeParams?.id;

    forkJoin([
      this.campaignService.getDetail(this.campaignId),
      this.campaignService.getEvaluationComment(this.campaignId),
    ]).subscribe(([campaignInfo, comments]) => {
      this.campaignInfo$.next(campaignInfo);
      this.comments$.next(comments);
    });
  }

  handleComment(newComment) {
    // this.productStore.createBuyerComment(
    //   +this.routeParams.id,
    //   newComment.title,
    //   newComment.commentId
    // );
  }

  handleChooseReward(reward: IReward) {
    this.dialogService
      .showDialog(RewardConfirmComponent, {
        data: { reward, campaignDetail: this.campaignInfo$.getValue() },
        width: '30%',
        maxHeight: '90vh',
        autoFocus: false,
      })
      .afterClosed()
      .subscribe((res) => {
        console.log(res);
        if (!res) return;
      });
  }
}
