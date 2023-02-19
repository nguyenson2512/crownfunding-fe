import { TablePageComponent } from '#components/core/table-page/table-page.component';
import { DatatablePagination } from '#interfaces/pagination.interface';
import { Campaign } from '#models/campaign.model';
import { ComponentService } from '#services/component.service';
import { CampaignService } from '#services/http/campaign.service';
import { Component, OnInit } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss'],
})
export class WishlistComponent
  extends TablePageComponent<Campaign>
  implements OnInit
{
  ColumnMode = ColumnMode;
  constructor(
    private componentService: ComponentService,
    private campaignService: CampaignService
  ) {
    super(componentService);
  }

  protected requestData(): Observable<DatatablePagination<Campaign>> | any {
    return this.campaignService.getWishlist();
  }

  redirectDetail(row: Campaign): void {
    this.redirect(`/campaign/${row?._id}`);
  }
}
