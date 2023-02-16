import { BaseComponent } from '#components/core/base/base.component';
import { Campaign } from '#models/campaign.model';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, forkJoin } from 'rxjs';
import { Comment } from '#models/comment.model';
import { ComponentService } from '#services/component.service';
import { CampaignService } from '#services/http/campaign.service';
import { getDaysRemaining } from '#utils/helpers';

@Component({
  selector: 'app-my-campaign-detail',
  templateUrl: './my-campaign-detail.component.html',
  styleUrls: ['./my-campaign-detail.component.scss'],
})
export class MyCampaignDetailComponent extends BaseComponent implements OnInit {
  campaignId: string;
  campaignInfo$: BehaviorSubject<Campaign> = new BehaviorSubject<Campaign>(
    null
  );
  comments$: BehaviorSubject<Comment[]> = new BehaviorSubject<Comment[]>([]);

  get campaignInfoValue(): Campaign {
    return this.campaignInfo$.getValue();
  }

  get daysRemaining(): number {
    return getDaysRemaining(this.campaignInfoValue.duration);
  }

  constructor(
    componentService: ComponentService,
    private campaignService: CampaignService
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
}
