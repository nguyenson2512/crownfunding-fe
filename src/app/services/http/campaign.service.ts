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
import {
  CommentType,
  STATUS_CAMPAIGN_APPROVED,
  STATUS_CAMPAIGN_REJECTED,
} from '#utils/const';

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

  uploadImage(body: any) {
    return this.dataClientService
      .post(`/upload-image`, body, {
        headers: {
          'Content-Type': undefined,
        },
      })
      .pipe(pluck('result', 'data'));
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

  create(body: any) {
    return this.dataClientService
      .post(`/campaigns`, body, {
        headers: {
          'Content-Type': undefined,
        },
      })
      .pipe(
        pluck('result'),
        map((res: any) => new Campaign(res?.data))
      );
  }

  update(id: string, body: any) {
    return this.dataClientService
      .put(`/campaigns/${id}`, body)
      .pipe(pluck('result', 'data'));
  }

  evaluate(
    campaignId: string,
    status: typeof STATUS_CAMPAIGN_REJECTED | typeof STATUS_CAMPAIGN_APPROVED
  ) {
    return this.dataClientService
      .put(`/campaigns/${campaignId}/evaluate`, {
        status,
      })
      .pipe(pluck('result', 'data'));
  }

  resolveComment(commentId: string) {
    return this.dataClientService
      .put(`/comments/${commentId}/resolve`, {
        isResolved: true,
      })
      .pipe(pluck('result', 'data'));
  }

  getWishlist(): Observable<DatatablePagination<Campaign>> {
    return this.dataClientService.get('/wishlist').pipe(
      pluck('result', 'data'),
      map((res: any) => {
        return {
          data: res?.campaigns,
        };
      }),
      paginationMapper(Campaign)
    );
  }

  addWishlist(campaignId: string) {
    return this.dataClientService
      .post(`/wishlist`, {
        campaignId,
      })
      .pipe(pluck('result', 'data'));
  }

  removeWishlist(campaignId: string) {
    return this.dataClientService
      .delete(`/wishlist/${campaignId}`)
      .pipe(pluck('result', 'data'));
  }
}
