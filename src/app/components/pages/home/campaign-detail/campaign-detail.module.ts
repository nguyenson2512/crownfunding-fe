import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CampaignDetailComponent } from './campaign-detail.component';
import { CampaignDetailRoutingModule } from './campaign-detail-routing.module';
import { ShareModule } from '#components/share/share.module';

@NgModule({
  declarations: [CampaignDetailComponent],
  imports: [CommonModule, CampaignDetailRoutingModule, ShareModule],
})
export class CampaignDetailModule {}
