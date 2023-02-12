import { BaseComponent } from '#components/core/base/base.component';
import { Category } from '#models/category.model';
import { ComponentService } from '#services/component.service';
import { HomeService } from '#services/home.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
})
export class CategoryListComponent extends BaseComponent implements OnInit {
  @Input() categories: Category[];

  constructor(
    componentService: ComponentService,
    private homeService: HomeService
  ) {
    super(componentService);
  }

  ngOnInit(): void {}

  handleClick(id: string) {
    this.homeService.setSelectedCategoryId(id);
  }
}
