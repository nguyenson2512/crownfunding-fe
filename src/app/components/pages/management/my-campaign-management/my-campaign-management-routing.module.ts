import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyCampaignManagementComponent } from './my-campaign-management.component';

const routes: Routes = [
  { path: '', component: MyCampaignManagementComponent },
  {
    path: ':id/detail',
    loadChildren: () =>
      import('./my-campaign-detail/my-campaign-detail.module').then(
        (m) => m.MyCampaignDetailModule
      ),
  },
  {
    path: ':id/edit',
    loadChildren: () =>
      import('./my-campaign-edit/my-campaign-edit.module').then(
        (m) => m.MyCampaignEditModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyCampaignManagementRoutingModule {}
