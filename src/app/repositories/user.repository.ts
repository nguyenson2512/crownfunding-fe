import { Repository } from './repository';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model';
import { AppHttpClient } from '../services/http-client.service';

@Injectable()
export class UserRepository extends Repository {
  constructor(httpClient: AppHttpClient) {
    super(httpClient);
  }

  login(authInfo: any) {
    return this.httpClient.post('/login', authInfo).pipe(
      map((res: any) => {
        res.user = this.parseResponse(res.user);
        return res;
      })
    );
  }

  userInfo() {
    return this.httpClient.get('/me').pipe(
      map((res: any) => {
        return this.parseResponse(res.data);
      })
    );
  }

  parseResponse(data: any): User {
    const user = new User();
    user.fill(data);
    return user;
  }
}
