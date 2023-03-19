import { LoginUserData, User } from '#models/user.model';
import { ROLE_OPTIONS } from '#utils/const';
import { checkPermission } from '#utils/helpers';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import {
  DataClientService,
  DataSet,
  ResponseResult,
} from './http-client.service';
import { UnauthenticatedException } from './http-error-handler.service';
import { UserService } from './http/users.service';
import { LocalStorageService } from './storage.service';
import { UserProfileService } from './user-profile.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn = false;
  accessToken = '';
  public currentUser$: BehaviorSubject<User> = new BehaviorSubject<User>(null);

  // store the URL so we can redirect after logging in
  redirectUrl: string = '/';

  constructor(
    private storageService: LocalStorageService,
    private router: Router,
    private userProfileService: UserProfileService,
    private dataClientService: DataClientService,
    private userService: UserService
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

  signUp(body: any) {
    return this.dataClientService
      .post('/register', body, {
        headers: {
          'Content-Type': undefined,
        },
      })
      .pipe(
        map((res: any) => res?.result),
        map((res: ResponseResult) => res.data)
      );
  }

  endSession(mustAuth: boolean = true): void {
    this.isLoggedIn = false;
    this.userProfileService.current = null;
    this.storageService.unset('access_token');
    this.storageService.unset('cart');
    this.storageService.unset('user_profile');
    this.currentUser$.next(null);
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

  isLogInUser() {
    const data = this.storageService.get('user_profile');
    if (data) {
      this.currentUser$.next(JSON.parse(data));
    }
    return this.currentUser$.getValue() !== null;
  }

  isForAdmin() {
    const user = this.currentUser$.getValue();
    return (
      user &&
      checkPermission([ROLE_OPTIONS.ADMIN, ROLE_OPTIONS.CREATOR], user.roles)
    );
  }

  isAdminRole() {
    const data = this.storageService.get('user_profile');
    const user = JSON.parse(data);
    return user?.roles.some((role) => role.name === ROLE_OPTIONS.ADMIN);
  }

  isBanker() {
    const user = this.currentUser$.getValue();
    return user && user?.roles.length === 0;
  }

  async verifyToken() {
    return new Promise((resolve, reject) => {
      const token = this.storageService.get('access_token');
      if (token) {
        this.accessToken = token;
        this.userService
          .getUserInfo()
          .toPromise()
          .then((user: User) => {
            this.userProfileService.current = user;
            this.isLoggedIn;
            resolve(true);
          })
          .catch((error: any) => {
            if (error instanceof UnauthenticatedException) {
              this.endSession();
            }
            resolve(false);
          });
      } else {
        resolve(false);
      }
    });
  }
}
