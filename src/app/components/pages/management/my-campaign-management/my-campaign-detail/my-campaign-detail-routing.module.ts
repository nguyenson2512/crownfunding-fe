import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyCampaignDetailComponent } from './my-campaign-detail.component';

const routes: Routes = [
  {
    path: '',
    component: MyCampaignDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyCampaignDetailRoutingModule {}
