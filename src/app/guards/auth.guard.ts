import { AuthService } from '#services/auth.service';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivate,
  Router,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const url = state.url;
    const validRequest = this.checkLogin(url);
    if (validRequest) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

  checkLogin(url: string): boolean {
    this.authService.redirectUrl = url;
    if (
      window.location.href.includes('/admin') &&
      this.authService.isAuthenticated()
    ) {
      return true;
    } else if (!window.location.href.includes('/admin')) {
      return true;
    }
    return false;
  }
}
