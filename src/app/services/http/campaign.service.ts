import { paginationMapper } from '#utils/helpers';
import { Injectable } from '@angular/core';
import {
  DatatablePagination,
  PaginateOption,
} from '#interfaces/pagination.interface';
import { Observable } from 'rxjs';
import { map, pluck } from 'rxjs/operators';
import { DataClientService } from '#services/http-client.service';
import { Campaign } from '#models/campaign.model';
import { Comment } from '#models/comment.model';
import { CommentType } from '#utils/const';

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

  getPublicCampaignList(
    pagination?: PaginateOption
  ): Observable<DatatablePagination<Campaign>> {
    return this.dataClientService
      .get('/public-campaigns', pagination)
      .pipe(pluck('result'), paginationMapper(Campaign));
  }

  getMyCampaignList(
    pagination?: PaginateOption
  ): Observable<DatatablePagination<Campaign>> {
    return this.dataClientService
      .get('/my-campaigns', pagination)
      .pipe(pluck('result'), paginationMapper(Campaign));
  }

  getDetail(id: string): Observable<Campaign> {
    return this.dataClientService
      .get(`/campaigns/${id}`)
      .pipe(map((res: any) => new Campaign(res?.result?.data)));
  }

  getEvaluationComment(campaignId: string) {
    return this.dataClientService
      .get(`/campaigns/${campaignId}/comment?type=EVALUATE`)
      .pipe(
        pluck('result', 'data'),
        map((data: any) => data.map((item) => new Comment(item)))
      );
  }

  createComment(
    campaignId: string,
    content: string,
    type: CommentType,
    parentId = null
  ) {
    return this.dataClientService
      .post(`/campaigns/${campaignId}/comment`, {
        parentId,
        content,
        type,
      })
      .pipe(
        pluck('result'),
        map((res: any) => new Comment(res?.data))
      );
  }
}
