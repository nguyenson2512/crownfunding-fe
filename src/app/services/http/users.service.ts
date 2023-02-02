import { User } from '#models/user.model';
import { paginationMapper } from '#utils/helpers';
import { Injectable } from '@angular/core';
import {
  DatatablePagination,
  PaginateOption,
} from '#interfaces/pagination.interface';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { DataClientService } from '#services/http-client.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private dataClientService: DataClientService) {}

  getListUser(
    pagination?: PaginateOption
  ): Observable<DatatablePagination<User>> {
    return this.dataClientService
      .get('/users', pagination)
      .pipe(pluck('result', 'data'), paginationMapper(User));
  }
}
