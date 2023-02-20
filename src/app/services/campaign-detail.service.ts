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
  itemsOffering$: BehaviorSubject<Set<string>> = new BehaviorSubject<
    Set<string>
  >(new Set());

  get campaignInfoValue() {
    return this.campaignInfo$.getValue();
  }
  get commentsValue() {
    return this.comments$.getValue();
  }
  get itemsOfferingValue() {
    return Array.from(this.itemsOffering$.getValue());
  }
  constructor() {}

  setItemsOffering(value) {
    this.itemsOffering$.next(value);
  }
}
