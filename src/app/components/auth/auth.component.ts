import { AuthService } from '#services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ComponentService } from 'src/app/services/component.service';
import { notEmpty } from 'src/app/validators/not-empty.validator';
import { BaseComponent } from '../core/base/base.component';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent extends BaseComponent implements OnInit {
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email, notEmpty]],
    password: ['', [Validators.required, notEmpty]],
  });
  constructor(
    protected componentService: ComponentService,
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    super(componentService);
    const { extras } = this.router.getCurrentNavigation();
    if (extras && extras.state && extras.state.expired) {
      this.authService.endSession();
    } else {
      this.verifyToken();
    }
  }

  async verifyToken() {
    const isLoggedIn = await this.authService.isAuthenticated();
    if (isLoggedIn) {
      this.authService.loggedIn();
    }
  }

  async signIn() {
    if (this.loginForm.invalid) {
      return;
    }

    this.subscribeOnce(
      this.authService.signIn(this.loginForm?.value),
      () => {}
    );
  }

  navigateSignup() {
    this.redirect(['/signup']);
  }
}
