import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'campaigns/create',
    loadChildren: () =>
      import('./campaign-create/campaign-create.module').then(
        (m) => m.CampaignCreateModule
      ),
  },
  {
    path: 'campaign/:id',
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
export class HomeRoutingModule {}
