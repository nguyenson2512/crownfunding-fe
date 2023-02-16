import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CampaignCreateComponent } from './campaign-create.component';
import { ShareModule } from '#components/share/share.module';
import { CampaignCreateRoutingModule } from './campaign-create-routing.module';

@NgModule({
  declarations: [CampaignCreateComponent],
  imports: [CommonModule, ShareModule, CampaignCreateRoutingModule],
})
export class CampaignCreateModule {}
