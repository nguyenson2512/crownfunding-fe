import { BaseComponent } from '#components/core/base/base.component';
import { Campaign } from '#models/campaign.model';
import { ComponentService } from '#services/component.service';
import { CampaignService } from '#services/http/campaign.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-campaign-box',
  templateUrl: './campaign-box.component.html',
  styleUrls: ['./campaign-box.component.scss'],
})
export class CampaignBoxComponent extends BaseComponent implements OnInit {
  @Input() campaign: Campaign;

  constructor(
    componentService: ComponentService,
    private campaignService: CampaignService
  ) {
    super(componentService);
  }

  ngOnInit(): void {}

  navigateDetail(event) {
    event.stopPropagation();
    this.redirect([`/campaign/${this.campaign?._id}`]);
  }
}
