import { BaseComponent } from '#components/core/base/base.component';
import { ComponentService } from '#services/component.service';
import { CampaignService } from '#services/http/campaign.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-campaign-edit',
  templateUrl: './my-campaign-edit.component.html',
  styleUrls: ['./my-campaign-edit.component.scss'],
})
export class MyCampaignEditComponent extends BaseComponent implements OnInit {
  isChanged: boolean;
  constructor(
    private componentService: ComponentService,
    private campaignService: CampaignService
  ) {
    super(componentService);
  }

  ngOnInit(): void {}

  handleEdit(data: any) {
    this.subscribeOnce(
      this.campaignService.update(data?.id, {
        ...data,
        category: data?.categoryId,
      }),
      (res) => {
        if (res) {
          this.componentService.message.showMessage('Update Campaign Success');
          this.redirect(['/admin/my-campaign']);
        }
      }
    );
  }
}
