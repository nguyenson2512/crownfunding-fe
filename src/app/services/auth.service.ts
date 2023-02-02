import { LoginUserData, User } from '#models/user.model';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import {
  DataClientService,
  DataSet,
  ResponseResult,
} from './http-client.service';
import { LocalStorageService } from './storage.service';
import { UserProfileService } from './user-profile.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn = false;
  accessToken = '';

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  constructor(
    private storageService: LocalStorageService,
    private router: Router,
    private userProfileService: UserProfileService,
    private dataClientService: DataClientService
  ) {}

  signIn(body: any) {
    return this.dataClientService.post('/login', body).pipe(
      map((res: any) => res?.result),
      map((res: ResponseResult) => res.data),
      map((res: DataSet) => new LoginUserData(res)),
      tap((data) => {
        if (data && data?.accessToken && data?.user) {
          this.userProfileService.current = new User(data?.user);
          this.setUserProfile(data?.user);
          this.setToken(data?.accessToken);
          this.loggedIn();
        }
      })
    );
  }

  endSession(mustAuth: boolean = true): void {
    this.isLoggedIn = false;
    this.userProfileService.current = null;
    this.storageService.unset('access_token');
    this.storageService.unset('cart');
    this.storageService.unset('user_profile');
    mustAuth ? this.router.navigate(['/login']) : null;
  }

  setToken(token: string) {
    if (token) {
      this.accessToken = token;
      this.storageService.set('access_token', token);
    }
  }

  setUserProfile(user: User) {
    this.storageService.set('user_profile', JSON.stringify(user));
  }

  loggedIn(): void {
    this.isLoggedIn = true;
    const redirectUrl =
      this.redirectUrl && this.redirectUrl != '/login'
        ? this.router.parseUrl(this.redirectUrl)
        : '/';
    this.router.navigateByUrl(redirectUrl);
  }

  isAuthenticated(): boolean {
    const token = this.storageService.get('access_token');
    return !!token;
  }

  getRoles() {
    const data = this.storageService.get('user_profile');
    const roles = JSON.parse(data).roles;
    return roles;
  }
}
