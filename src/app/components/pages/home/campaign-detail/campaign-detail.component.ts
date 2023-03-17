import { BaseComponent } from '#components/core/base/base.component';
import { Campaign, IReward } from '#models/campaign.model';
import { Comment } from '#models/comment.model';
import { CampaignDetailService } from '#services/campaign-detail.service';
import { ComponentService } from '#services/component.service';
import { CampaignService } from '#services/http/campaign.service';
import { PaymentService } from '#services/http/payment.service';
import { CommentType } from '#utils/const';
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
  selectedTab = 0;
  tabsAmount = 3;
  campaignInfo$: BehaviorSubject<Campaign> = new BehaviorSubject<Campaign>(
    null
  );
  public payPalConfig?: IPayPalConfig;

  constructor(
    componentService: ComponentService,
    private campaignService: CampaignService,
    private paymentService: PaymentService,
    public campaignDetailService: CampaignDetailService
  ) {
    super(componentService);
  }

  ngOnInit(): void {
    this.campaignId = this.routeParams?.id;

    forkJoin([
      this.campaignService.getDetail(this.campaignId),
      this.campaignService.getPublicComment(this.campaignId),
    ]).subscribe(([campaignInfo, comments]) => {
      this.campaignInfo$.next(campaignInfo);
      this.campaignDetailService.comments$.next(comments);
    });
  }

  handleComment(newComment) {
    this.subscribeOnce(
      this.campaignService.createComment(
        this.campaignId,
        newComment.content,
        CommentType.PUBLIC
      ),
      (res) => {
        if (res) {
          this.campaignDetailService.comments$.next([
            ...this.campaignDetailService.commentsValue,
            res,
          ]);
          this.service.message.showMessage(
            this.trans('successMessage.addComment')
          );
        }
      }
    );
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

  backCampaign() {
    this.selectedTab = 1;
    setTimeout(() => {
      window.scrollTo(0, document.body.scrollHeight);
    }, 0);
  }
}
