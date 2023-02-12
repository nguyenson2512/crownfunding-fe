import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CampaignDetailComponent } from './campaign-detail.component';
import { ShareModule } from '#components/share/share.module';
import { CampaignDetailRoutingModule } from './campaign-detail-routing.module';

@NgModule({
  declarations: [CampaignDetailComponent],
  imports: [CommonModule, ShareModule, CampaignDetailRoutingModule],
})
export class CampaignDetailModule {}
