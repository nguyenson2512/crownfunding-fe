import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShareModule } from '#components/share/share.module';
import { MyCampaignDetailRoutingModule } from './my-campaign-detail-routing.module';
import { MyCampaignDetailComponent } from './my-campaign-detail.component';

@NgModule({
  declarations: [MyCampaignDetailComponent],
  imports: [CommonModule, ShareModule, MyCampaignDetailRoutingModule],
})
export class MyCampaignDetailModule {}
