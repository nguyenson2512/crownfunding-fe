import { TablePageComponent } from '#components/core/table-page/table-page.component';
import { DatatablePagination } from '#interfaces/pagination.interface';
import { Campaign } from '#models/campaign.model';
import { ComponentService } from '#services/component.service';
import { CampaignService } from '#services/http/campaign.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-campaign-management',
  templateUrl: './campaign-management.component.html',
  styleUrls: ['./campaign-management.component.scss'],
})
export class CampaignManagementComponent
  extends TablePageComponent<Campaign>
  implements OnInit
{
  ColumnMode = ColumnMode;

  formSearch = this.fb.group({
    title: '',
  });
  constructor(
    componentService: ComponentService,
    private fb: FormBuilder,
    private campaignService: CampaignService
  ) {
    super(componentService);
  }

  protected requestData(): Observable<DatatablePagination<Campaign>> | any {
    return this.campaignService.getAdminCampaignList(this.paginateOption);
  }

  handleSearch(): void {
    const { username } = this.formSearch.value;

    const searchUser = {
      like: {
        name: username,
      },
    };
    this.onSearch(searchUser);
  }

  handleReset() {
    this.formSearch.setValue({
      username: '',
    });
    this.resetSearch();
  }
}
