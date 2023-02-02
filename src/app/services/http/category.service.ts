import { DatatablePagination } from '#interfaces/pagination.interface';
import { Category } from '#models/category.model';
import { DataClientService } from '#services/http-client.service';
import { paginationMapper } from '#utils/helpers';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private dataClientService: DataClientService) {}

  getAdminCategoryList(): Observable<DatatablePagination<Category>> {
    return this.dataClientService
      .get('/categories')
      .pipe(pluck('result'), paginationMapper(Category));
  }
}
