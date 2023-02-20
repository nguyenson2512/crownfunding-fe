import { BaseComponent } from '#components/core/base/base.component';
import { ComponentService } from '#services/component.service';
import { CampaignService } from '#services/http/campaign.service';
import { LocalStorageService } from '#services/storage.service';
import { DATE_CAMPAIGN_FORMAT } from '#utils/const';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-campaign-create',
  templateUrl: './campaign-create.component.html',
  styleUrls: ['./campaign-create.component.scss'],
})
export class CampaignCreateComponent extends BaseComponent implements OnInit {
  constructor(
    protected componentService: ComponentService,
    private campaignService: CampaignService,
    private localStorageService: LocalStorageService
  ) {
    super(componentService);
  }

  ngOnInit(): void {}

  handleSubmit(data: any) {
    const {
      title,
      subTitle,
      categoryId,
      location,
      fundingGoal,
      currency,
      targetLaunchDate,
      story,
      risk,
      duration,
      selectedFiles,
      selectedFileName,
      rewards,
    } = data;
    const formData = new FormData();
    formData.append('title', title);
    formData.append('subTitle', subTitle);
    formData.append('category', categoryId);
    formData.append('location', location);
    formData.append('fundingGoal', fundingGoal);
    formData.append('currency', currency);
    formData.append(
      'targetLaunchDate',
      moment(new Date(targetLaunchDate)).format(DATE_CAMPAIGN_FORMAT)
    );
    formData.append('story', story);
    formData.append('risk', risk);
    formData.append('rewards', JSON.stringify(rewards));
    formData.append(
      'duration',
      moment(new Date(duration)).format(DATE_CAMPAIGN_FORMAT)
    );
    formData.append('rewards', JSON.stringify([]));
    formData.append('image', selectedFiles[0], selectedFileName);
    this.subscribeOnce(this.campaignService.create(formData), (res) => {
      if (res) {
        this.updateCreatorRole();
        this.componentService.message.showMessage('Create Campaign Success');
        this.redirect(['/admin/my-campaign']);
      }
    });
  }

  private updateCreatorRole() {
    const userProfile = this.localStorageService.get('user_profile');
    const roles: any[] = JSON.parse(userProfile).roles;
    if (!roles?.some((role) => role?.name === 'creator')) {
      const updatedRoles = [...roles, { name: 'creator' }];
      const updatedProfile = {
        ...JSON.parse(userProfile),
        roles: updatedRoles,
      };
      this.localStorageService.set(
        'user_profile',
        JSON.stringify(updatedProfile)
      );
    }
  }
}
