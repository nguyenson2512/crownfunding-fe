import { BaseComponent } from '#components/core/base/base.component';
import { Campaign } from '#models/campaign.model';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Comment } from '#models/comment.model';
import { ComponentService } from '#services/component.service';
import { CampaignService } from '#services/http/campaign.service';

@Component({
  selector: 'app-my-campaign-detail',
  templateUrl: './my-campaign-detail.component.html',
  styleUrls: ['./my-campaign-detail.component.scss'],
})
export class MyCampaignDetailComponent extends BaseComponent implements OnInit {
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
}
