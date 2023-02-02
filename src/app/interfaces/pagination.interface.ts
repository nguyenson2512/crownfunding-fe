import { ResponsePagination } from '#services/http-client.service';

export type PaginateSearchValue = string | number | boolean | any[];

export type PaginateDirection = 'asc' | 'desc';

export interface DatatableSortTarget {
  prop: string;
  dir: PaginateDirection;
}

export interface PaginateOption {
  page?: number;
  limit?: number;
  total?: number;
  equal?: { [key: string]: PaginateSearchValue };
  like?: { [key: string]: PaginateSearchValue };
  sort?: DatatableSortTarget;
  in?: { [key: string]: PaginateSearchValue[] };
}
export interface DatatablePageInfo {
  offset?: number;
  limit?: number;
}

export interface DatatableSortInfo {
  sorts: DatatableSortTarget[];
}

export interface PaginateSearchBody {
  equal?: { [key: string]: PaginateSearchValue };
  like?: { [key: string]: PaginateSearchValue };
}

export interface DatatablePagination<T> {
  pagination?: ResponsePagination;
  data: T[];
  total?: number;
}

export interface ListPagination<T> {
  pagination?: ResponsePagination;
  data: T[];
}
