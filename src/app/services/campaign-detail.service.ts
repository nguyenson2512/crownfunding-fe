import { Campaign } from '#models/campaign.model';
import { Comment } from '#models/comment.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CampaignDetailService {
  campaignInfo$: BehaviorSubject<Campaign> = new BehaviorSubject<Campaign>(
    null
  );
  comments$: BehaviorSubject<Comment[]> = new BehaviorSubject<Comment[]>([]);

  get commentsValue() {
    return this.comments$.getValue();
  }
  constructor() {}
}
