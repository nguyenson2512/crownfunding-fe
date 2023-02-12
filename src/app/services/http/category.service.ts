import { DatatablePagination } from '#interfaces/pagination.interface';
import { Category } from '#models/category.model';
import { DataClientService, DataSet } from '#services/http-client.service';
import { paginationMapper } from '#utils/helpers';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, pluck } from 'rxjs/operators';

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

  getPublicCategoryList(): Observable<Category[]> {
    return this.dataClientService.get('/public-categories').pipe(
      pluck('result', 'data'),
      map((data: DataSet[]) => {
        return data.map((item) => new Category(item));
      })
    );
  }

  getParentCategories(): Observable<Category[]> {
    return this.dataClientService.get('/categories/parents').pipe(
      pluck('result', 'data'),
      map((data: DataSet[]) => {
        return data.map((item) => new Category(item));
      })
    );
  }

  delete(id: string) {
    return this.dataClientService
      .delete(`/categories/${id}`)
      .pipe(pluck('result'));
  }

  edit(category: Category) {
    return this.dataClientService
      .put(`/categories/${category?._id}`, { ...category })
      .pipe(pluck('result'));
  }

  create(category: Category) {
    return this.dataClientService
      .post(`/categories`, { ...category })
      .pipe(pluck('result'));
  }
}
