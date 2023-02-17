import { AuthService } from '#services/auth.service';
import { HomeService } from '#services/home.service';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class WishlistResolver implements Resolve<boolean> {
  constructor(
    private authService: AuthService,
    private homeService: HomeService
  ) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    if (this.authService.isLogInUser()) {
      return this.homeService.getWishlist().pipe(
        catchError((error) => {
          return of([]);
        })
      );
    }
  }
}
