import { BaseComponent } from '#components/core/base/base.component';
import { Campaign } from '#models/campaign.model';
import { Comment } from '#models/comment.model';
import { ComponentService } from '#services/component.service';
import { CampaignService } from '#services/http/campaign.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-campaign-detail',
  templateUrl: './campaign-detail.component.html',
  styleUrls: ['./campaign-detail.component.scss'],
})
export class CampaignDetailComponent extends BaseComponent implements OnInit {
  campaignId: string;
  campaignInfo$: Observable<Campaign>;
  comments$: Observable<Comment[]>;

  constructor(
    componentService: ComponentService,
    private campaignService: CampaignService
  ) {
    super(componentService);
  }

  ngOnInit(): void {
    this.campaignId = this.routeParams?.id;
    this.campaignInfo$ = this.campaignService.getDetail(this.campaignId);
    this.comments$ = this.campaignService.getEvaluationComment(this.campaignId);
  }

  handleComment(newComment) {
    // this.productStore.createBuyerComment(
    //   +this.routeParams.id,
    //   newComment.title,
    //   newComment.commentId
    // );
  }
}
