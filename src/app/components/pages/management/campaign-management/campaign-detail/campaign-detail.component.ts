import { BaseComponent } from '#components/core/base/base.component';
import { CampaignDetailService } from '#services/campaign-detail.service';
import { ComponentService } from '#services/component.service';
import { CampaignService } from '#services/http/campaign.service';
import {
  CommentType,
  STATUS_CAMPAIGN_APPROVED,
  STATUS_CAMPAIGN_REJECTED,
  STATUS_CAMPAIGN_REVIEWING,
} from '#utils/const';
import { getDaysRemaining } from '#utils/helpers';
import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-campaign-detail',
  templateUrl: './campaign-detail.component.html',
  styleUrls: ['./campaign-detail.component.scss'],
})
export class CampaignDetailComponent extends BaseComponent implements OnInit {
  campaignId: string;

  constructor(
    componentService: ComponentService,
    private campaignService: CampaignService,
    public campaignDetailService: CampaignDetailService
  ) {
    super(componentService);
  }

  get daysRemaining(): number {
    return getDaysRemaining(
      this.campaignDetailService.campaignInfoValue.duration
    );
  }

  get isShowEvaluateBtn(): boolean {
    return (
      this.campaignDetailService.campaignInfoValue?.status ===
      STATUS_CAMPAIGN_REVIEWING
    );
  }
  ngOnInit(): void {
    this.campaignId = this.routeParams?.id;

    forkJoin([
      this.campaignService.getDetail(this.campaignId),
      this.campaignService.getEvaluationComment(this.campaignId),
    ]).subscribe(([campaign, comments]) => {
      this.campaignDetailService.campaignInfo$.next(campaign);
      this.campaignDetailService.comments$.next(comments);
    });
  }

  approve() {
    this.subscribeOnce(
      this.campaignService.evaluate(this.campaignId, STATUS_CAMPAIGN_APPROVED),
      (res) => {
        if (res) {
          this.service.message.showMessage('Approve campaign success.');
          this.redirect(['/admin/campaign']);
        }
      }
    );
  }

  reject() {
    this.subscribeOnce(
      this.campaignService.evaluate(this.campaignId, STATUS_CAMPAIGN_REJECTED),
      (res) => {
        if (res) {
          this.service.message.showMessage('Rejected campaign.');
          this.redirect(['/admin/campaign']);
        }
      }
    );
  }

  handleComment(newComment) {
    this.subscribeOnce(
      this.campaignService.createComment(
        this.campaignId,
        newComment.content,
        CommentType.EVALUATE
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
}
