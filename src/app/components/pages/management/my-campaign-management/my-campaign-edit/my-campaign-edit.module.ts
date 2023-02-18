import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyCampaignEditComponent } from './my-campaign-edit.component';
import { ShareModule } from '#components/share/share.module';
import { MyCampaignEditRoutingModule } from './my-campaign-edit-routing.module';

@NgModule({
  declarations: [MyCampaignEditComponent],
  imports: [CommonModule, ShareModule, MyCampaignEditRoutingModule],
})
export class MyCampaignEditModule {}
