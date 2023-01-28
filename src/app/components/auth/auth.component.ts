import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ComponentService } from 'src/app/services/component.service';
import { BaseComponent } from '../core/base/base.component';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent extends BaseComponent implements OnInit {
  loginForm = this.fb.group({
    // username: ['', [Validators.required, notEmpty]],
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });
  constructor(
    protected componentService: ComponentService,
    private fb: FormBuilder
  ) // private authService: AuthService
  {
    super(componentService);
    // const { extras } = this.router.getCurrentNavigation();
    // if (extras && extras.state && extras.state.expired) {
    //   this.authService.endSession();
    // } else {
    //   this.verifyToken();
    // }
  }

  async verifyToken() {
    // const isLoggedIn = await this.authService.isAuthenticated();
    // if (isLoggedIn) {
    //   this.authService.loggedIn();
    // }
  }

  async signIn() {
    if (this.loginForm.invalid) {
      return;
    }

    // this.subscribeOnce(
    //   this.authService.signIn(this.loginForm?.value),
    //   () => { }
    // );
  }
}
