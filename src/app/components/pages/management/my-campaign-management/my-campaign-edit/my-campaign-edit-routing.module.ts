import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyCampaignEditComponent } from './my-campaign-edit.component';

const routes: Routes = [
  {
    path: '',
    component: MyCampaignEditComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyCampaignEditRoutingModule {}
