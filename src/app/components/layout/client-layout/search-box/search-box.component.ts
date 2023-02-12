import { BaseComponent } from '#components/core/base/base.component';
import { ComponentService } from '#services/component.service';
import { HomeService } from '#services/home.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss'],
})
export class SearchBoxComponent extends BaseComponent implements OnInit {
  searchItems: string[];
  constructor(
    private componentService: ComponentService,
    private fb: FormBuilder,
    private homeService: HomeService
  ) {
    super(componentService);
  }

  form: FormGroup = this.fb.group({
    searchInput: [''],
  });

  ngOnInit(): void {}

  handleSearch() {
    const { searchInput } = this.form.value;
    this.homeService.setSearchText(searchInput);

    // const search = {
    //   perPage: 12,
    //   like: {
    //     name: searchInput,
    //   },
    //   in: {
    //     categoryId: [],
    //   },
    // };
    // this.productStore.getList(search);
    // if (searchInput?.trim()) {
    //   this.searchItemsService.addSearchItem(searchInput);
    // }
    // if (this.router.url !== '/') {
    //   this.router.navigate(['/']);
    // }
    // this.productStore.categoryId = 0;
  }

  handleReSearch(value) {
    // const search = {
    //   perPage: 12,
    //   like: {
    //     name: value,
    //   },
    // };
    // this.productStore.getList(search);
    // if (this.router.url !== '/') {
    //   this.router.navigate(['/']);
    // }
  }
}
