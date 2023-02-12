import { BaseComponent } from '#components/core/base/base.component';
import { Campaign } from '#models/campaign.model';
import { Category } from '#models/category.model';
import { ComponentService } from '#services/component.service';
import { HomeService } from '#services/home.service';
import { CampaignService } from '#services/http/campaign.service';
import { CategoryService } from '#services/http/category.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent extends BaseComponent implements OnInit {
  constructor(
    private categoryService: CategoryService,
    componentService: ComponentService,
    private campaignService: CampaignService,
    private homeService: HomeService
  ) {
    super(componentService);
  }
  categories$: Observable<Category[]>;
  campaigns$;

  ngOnInit(): void {
    this.categories$ = this.categoryService.getPublicCategoryList();
    this.campaigns$ = this.campaignService.getPublicCampaignList();
    this.subscribeUntilDestroy(this.homeService.selectedCategoryId$, (id) => {
      if (id) {
        this.campaigns$ = this.campaignService.getPublicCampaignList({
          equal: {
            categoryId: id,
          },
        });
      }
    });
    this.subscribeUntilDestroy(this.homeService.searchText$, (text) => {
      this.campaigns$ = this.campaignService.getPublicCampaignList({
        like: {
          title: text,
        },
      });
    });
  }
}
