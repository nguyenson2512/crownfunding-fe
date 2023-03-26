import { getAmountCertainElement } from '#utils/helpers';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { NotificationService } from './http/notification.service';
import { LocalStorageService } from './storage.service';
import { Notification } from '#models/notification.model';
import { CampaignService } from './http/campaign.service';
import { DatatablePagination } from '#interfaces/pagination.interface';
import { Campaign } from '#models/campaign.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private _searchText: BehaviorSubject<string> = new BehaviorSubject('');
  private _selectedCategoryId: BehaviorSubject<string> = new BehaviorSubject(
    ''
  );
  public _notificationList: BehaviorSubject<Notification[]> =
    new BehaviorSubject<Notification[]>([]);

  public _amountUnreadNotification: BehaviorSubject<number> =
    new BehaviorSubject<number>(0);

  public _notificationStatus: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(true);
  public wishlist$: BehaviorSubject<DatatablePagination<Campaign>> =
    new BehaviorSubject<DatatablePagination<Campaign>>(null);

  public readonly notificationList$: Observable<Notification[]> =
    this._notificationList.asObservable();
  public readonly amountUnreadNotification$: Observable<number> =
    this._amountUnreadNotification.asObservable();
  public readonly notificationStatus$: Observable<boolean> =
    this._notificationStatus.asObservable();

  get selectedCategoryId$() {
    return this._selectedCategoryId.asObservable();
  }

  get searchText$() {
    return this._searchText.asObservable();
  }

  get notificationList(): Notification[] {
    return this._notificationList.getValue();
  }

  get amountUnreadNotification(): number {
    return this._amountUnreadNotification.getValue();
  }

  get wishlist(): DatatablePagination<Campaign> {
    return this.wishlist$.getValue();
  }

  setSelectedCategoryId(id: string) {
    this._selectedCategoryId.next(id);
  }

  setSearchText(text: string) {
    this._searchText.next(text);
  }

  constructor(
    private notificationService: NotificationService,
    private campaignService: CampaignService
  ) {}

  getNotificationList(): Observable<Notification[]> {
    this.notificationService.getList().subscribe((data) => {
      this._notificationList.next(data || []);
      this._amountUnreadNotification.next(
        getAmountCertainElement(data || [], 'isRead', false)
      );
    });
    return this.notificationList$;
  }

  seenNotification(ids: string[]) {
    this.notificationService.seenNotification(ids).subscribe((data) => {
      if (data) {
        let notificationIndex;
        notificationIndex = this.notificationList.findIndex(
          (notification) => ids.includes(notification._id) === true
        );
        let updatedNotificationItem = new Notification({
          ...this.notificationList[notificationIndex],
          isRead: true,
        });
        const updatedNotificationList = [
          ...this.notificationList.slice(0, notificationIndex),
          updatedNotificationItem,
          ...this.notificationList.slice(notificationIndex + 1),
        ];
        this._notificationList.next([...updatedNotificationList]);
        this._amountUnreadNotification.next(
          getAmountCertainElement(updatedNotificationList, 'isRead', false)
        );
      }
    });
  }

  getWishlist() {
    return this.campaignService.getWishlist().pipe(
      map((data) => {
        this.wishlist$.next(data);
        return data;
      })
    );
  }
}
