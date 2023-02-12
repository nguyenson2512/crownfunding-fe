import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private _searchText: BehaviorSubject<string> = new BehaviorSubject('');
  private _selectedCategoryId: BehaviorSubject<string> = new BehaviorSubject(
    ''
  );

  get selectedCategoryId$() {
    return this._selectedCategoryId.asObservable();
  }

  get searchText$() {
    return this._searchText.asObservable();
  }

  setSelectedCategoryId(id: string) {
    this._selectedCategoryId.next(id);
  }

  setSearchText(text: string) {
    this._searchText.next(text);
  }

  constructor() {}
}
