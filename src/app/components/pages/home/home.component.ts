import { BaseComponent } from '#components/core/base/base.component';
import { Campaign } from '#models/campaign.model';
import { Category } from '#models/category.model';
import { ComponentService } from '#services/component.service';
import { HomeService } from '#services/home.service';
import { CampaignService } from '#services/http/campaign.service';
import { CategoryService } from '#services/http/category.service';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, forkJoin } from 'rxjs';

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
  categories$: BehaviorSubject<Category[]> = new BehaviorSubject<Category[]>(
    []
  );
  campaigns$: BehaviorSubject<Campaign[]> = new BehaviorSubject<Campaign[]>([]);

  ngOnInit(): void {
    forkJoin([
      this.categoryService.getPublicCategoryList(),
      this.campaignService.getPublicCampaignList(),
    ]).subscribe(([categories, campaigns]) => {
      this.categories$.next(categories);
      this.campaigns$.next(campaigns?.data);
    });

    this.subscribeUntilDestroy(this.homeService.selectedCategoryId$, (id) => {
      if (id) {
        this.subscribeOnce(
          this.campaignService.getPublicCampaignList({
            equal: {
              categoryId: id,
            },
          }),
          (res) => {
            if (res) {
              this.campaigns$.next(res?.data);
            }
          }
        );
      }
    });
    this.subscribeUntilDestroy(this.homeService.searchText$, (text) => {
      this.subscribeOnce(
        this.campaignService.getPublicCampaignList({
          like: {
            title: text,
          },
        }),
        (res) => {
          if (res) {
            this.campaigns$.next(res?.data);
          }
        }
      );
    });
  }

  navigateCreateCampaign() {
    this.redirect(['/campaigns/create']);
  }
}
