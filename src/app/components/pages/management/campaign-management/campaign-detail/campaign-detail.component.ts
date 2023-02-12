import { BaseComponent } from '#components/core/base/base.component';
import { CampaignDetailService } from '#services/campaign-detail.service';
import { ComponentService } from '#services/component.service';
import { CampaignService } from '#services/http/campaign.service';
import { CommentType } from '#utils/const';
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

  ngOnInit(): void {
    this.campaignId = this.routeParams?.id;

    forkJoin([
      this.campaignService.getDetail(this.campaignId),
      this.campaignService.getEvaluationComment(this.campaignId),
    ]).subscribe(([campaign, comments]) => {
      console.log({ campaign });
      this.campaignDetailService.campaignInfo$.next(campaign);
      this.campaignDetailService.comments$.next(comments);
    });
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
