import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CampaignManagementComponent } from './campaign-management.component';
import { CampaignManagementRoutingModule } from './campaign-management-routing.module';
import { ShareModule } from '#components/share/share.module';

@NgModule({
  declarations: [CampaignManagementComponent],

  imports: [CommonModule, CampaignManagementRoutingModule, ShareModule],
})
export class CampaignManagementModule {}
