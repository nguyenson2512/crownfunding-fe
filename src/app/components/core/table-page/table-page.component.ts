import { OnInit, ViewChild, Directive } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { takeUntil } from 'rxjs/operators';
import { BaseComponent } from '../base/base.component';
import { ComponentService } from '#services/component.service';
import { DEFAULT_START_PAGE, DEFAULT_PAGE_SIZE } from '#utils/const';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  DatatablePageInfo,
  PaginateOption,
  PaginateSearchBody,
} from '#interfaces/pagination.interface';
import { Model } from '#models/model';
import { ResponsePagination } from '#services/http-client.service';

interface TablePagination extends ResponsePagination {
  offset: number;
}

@Directive()
export abstract class TablePageComponent<T extends Model>
  extends BaseComponent
  implements OnInit
{
  @ViewChild(DatatableComponent) datatable: DatatableComponent;

  dataSource$ = new BehaviorSubject<T[]>(null);
  pagination$ = new BehaviorSubject<TablePagination>(null);

  dataSourceObs = this.dataSource$.asObservable();
  paginationObs = this.pagination$.asObservable();

  paginateOption: PaginateOption = {
    page: DEFAULT_START_PAGE,
    limit: DEFAULT_PAGE_SIZE,
    like: {},
    equal: {},
  };

  constructor(componentService: ComponentService) {
    super(componentService);
  }

  ngOnInit(): void {
    this.preInit();
    this.doInit();
  }

  protected abstract requestData(): Observable<any>;

  protected loadDataSource() {
    this.requestData()
      .pipe(takeUntil(this.reCreateSession()))
      .subscribe((paginateData) => {
        this.dataSource$.next(paginateData?.data);
        if (paginateData?.pagination) {
          this.pagination$.next(
            this.transformPaginationFromApi(paginateData?.pagination)
          );
        }

        if (!paginateData?.data?.length && paginateData?.pagination?.page > 1) {
          this.paginateOption.page -= 1;
          this.loadDataSource();
          return;
        }
      });
  }

  transformPaginationFromApi(
    paginationData: ResponsePagination
  ): TablePagination {
    return {
      ...paginationData,
      offset: paginationData.page - 1,
    };
  }

  protected doInit(): void {
    this.loadDataSource();
  }

  protected preInit(): void {}

  onPageChange(pageInfo: DatatablePageInfo): void {
    this.paginateOption.page = pageInfo.offset + 1;
    this.loadDataSource();
  }

  onSearch(searchBody: PaginateSearchBody): void {
    const searchBodyUpdated = {
      equal: {
        ...this.paginateOption?.equal,
        ...searchBody?.equal,
      },
      like: {
        ...this.paginateOption?.like,
        ...searchBody?.like,
      },
    };
    this.paginateOption = { ...this.paginateOption, ...searchBodyUpdated };
    this.resetPage();
  }

  resetPage(): void {
    this.paginateOption.page = 1;
    this.loadDataSource();
    if (this.datatable) {
      this.datatable.offset = 0;
    }
  }

  resetSearch(): void {
    this.paginateOption.like = {};
    this.paginateOption.equal = {};
    this.resetPage();
  }

  getRowClass = (row) => {
    return {
      clickable: true,
    };
  };

  get dataSource(): T[] {
    return this.dataSource$.getValue();
  }

  get pagination() {
    return this.pagination$?.getValue();
  }
}
