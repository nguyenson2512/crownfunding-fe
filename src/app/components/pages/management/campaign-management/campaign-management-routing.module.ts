import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CampaignManagementComponent } from './campaign-management.component';

const routes: Routes = [
  { path: '', component: CampaignManagementComponent },
  {
    path: ':id/detail',
    loadChildren: () =>
      import('./campaign-detail/campaign-detail.module').then(
        (m) => m.CampaignDetailModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CampaignManagementRoutingModule {}
