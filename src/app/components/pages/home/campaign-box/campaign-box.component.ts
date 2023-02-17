import { BaseComponent } from '#components/core/base/base.component';
import { Campaign } from '#models/campaign.model';
import { ComponentService } from '#services/component.service';
import { HomeService } from '#services/home.service';
import { CampaignService } from '#services/http/campaign.service';
import { Component, Input, OnInit } from '@angular/core';
import { iif } from 'rxjs';

@Component({
  selector: 'app-campaign-box',
  templateUrl: './campaign-box.component.html',
  styleUrls: ['./campaign-box.component.scss'],
})
export class CampaignBoxComponent extends BaseComponent implements OnInit {
  @Input() campaign: Campaign;
  isInWishList: boolean = false;

  constructor(
    componentService: ComponentService,
    private campaignService: CampaignService,
    private homeService: HomeService
  ) {
    super(componentService);
  }

  ngOnInit(): void {
    this.isInWishList = this.homeService.wishlist.data.some((item) => {
      return item._id === this.campaign?._id;
    });
  }

  navigateDetail(event) {
    event.stopPropagation();
    this.redirect([`/campaign/${this.campaign?._id}`]);
  }

  handleWishlist(event) {
    event.stopPropagation();
    this.subscribeOnce(
      iif(
        () => this.isInWishList,
        this.campaignService.removeWishlist(this.campaign?._id),
        this.campaignService.addWishlist(this.campaign?._id)
      ),
      (data) => {
        if (data) {
          this.isInWishList = !this.isInWishList;
          this.service.message.showMessage(
            this.isInWishList
              ? 'Added campaign into wishlist.'
              : 'Removed campaign from wishlist.'
          );
        }
      }
    );
  }
}
