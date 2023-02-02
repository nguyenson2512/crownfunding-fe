import { Observable } from 'rxjs';
import { User } from '#models/user.model';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { DataClientService, ResponseResult } from './http-client.service';

@Injectable({
  providedIn: 'root',
})
export class UserProfileService {
  public current: User;

  constructor(private dataClientService: DataClientService) {}

  //TODO: FIX
  getMyInfo(): Observable<User> {
    return this.dataClientService.get('/users/details').pipe(
      map((res: ResponseResult) => {
        this.current = new User(res.data);
        return this.current;
      })
    );
  }
}
