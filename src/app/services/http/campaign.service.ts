import { paginationMapper } from '#utils/helpers';
import { Injectable } from '@angular/core';
import {
  DatatablePagination,
  PaginateOption,
} from '#interfaces/pagination.interface';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { DataClientService } from '#services/http-client.service';
import { Campaign } from '#models/campaign.model';

@Injectable({
  providedIn: 'root',
})
export class CampaignService {
  constructor(private dataClientService: DataClientService) {}

  getAdminCampaignList(
    pagination?: PaginateOption
  ): Observable<DatatablePagination<Campaign>> {
    return this.dataClientService
      .get('/campaigns', pagination)
      .pipe(pluck('result'), paginationMapper(Campaign));
  }
}
