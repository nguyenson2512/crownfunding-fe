import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyCampaignManagementComponent } from './my-campaign-management.component';
import { ShareModule } from '#components/share/share.module';
import { MyCampaignManagementRoutingModule } from './my-campaign-management-routing.module';

@NgModule({
  declarations: [MyCampaignManagementComponent],
  imports: [CommonModule, ShareModule, MyCampaignManagementRoutingModule],
})
export class MyCampaignManagementModule {}
