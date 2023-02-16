import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CampaignCreateComponent } from './campaign-create.component';

const routes: Routes = [
  {
    path: '',
    component: CampaignCreateComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CampaignCreateRoutingModule {}
