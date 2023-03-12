import { BaseComponent } from '#components/core/base/base.component';
import { User } from '#models/user.model';
import { ComponentService } from '#services/component.service';
import { UserService } from '#services/http/users.service';
import { LoaderService } from '#services/loader.service';
import { LocalStorageService } from '#services/storage.service';
import { onlyNumberInput } from '#utils/helpers';
import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-verify-account-dialog',
  templateUrl: './verify-account-dialog.component.html',
  styleUrls: ['./verify-account-dialog.component.scss'],
})
export class VerifyAccountDialogComponent
  extends BaseComponent
  implements OnInit
{
  showEmailOtpInput: boolean = false;
  showPhoneOtpInput: boolean = true;
  emailOtp: string;
  phoneOtpRequestId: any = '74d7762091124a8a963ebdb1600b8408';
  form = this.fb.group({
    emailOtp: ['', []],
    phoneOtp: ['', []],
    phone: ['', [Validators.required]],
  });
  constructor(
    componentService: ComponentService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<VerifyAccountDialogComponent>,
    private userService: UserService,
    private loaderService: LoaderService,
    private cd: ChangeDetectorRef,
    private localStorageService: LocalStorageService,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      user: User;
    }
  ) {
    super(componentService);
  }

  ngOnInit(): void {}

  sendEmailOtp() {
    this.loaderService.spinnerOn();
    this.loaderService.lock();
    this.subscribeOnce(
      this.userService.sendOtpEmail(this.data.user.email),
      (res) => {
        if (res) {
          this.service.message.showMessage('Email Verification Code Sent');
          this.showEmailOtpInput = true;
        }
      },
      () => {
        this.loaderService.unlock();
        this.loaderService.spinnerOff();
      }
    );
  }
  verifyEmail() {
    this.loaderService.spinnerOn();
    this.loaderService.lock();
    this.subscribeOnce(
      this.userService.verifyOtpEmail(
        this.data.user.email,
        this.form.value.emailOtp
      ),
      (res: any) => {
        if (res) {
          this.data.user.isVerifyEmail = true;
          this.updateUserMailVerified();
          this.cd.markForCheck();
        } else {
          this.service.message.showMessage('Invalid code. Please try again.');
        }
      },
      () => {
        this.loaderService.unlock();
        this.loaderService.spinnerOff();
        this.navigateToCreate();
      }
    );
  }

  numberOnly(event): boolean {
    return onlyNumberInput(event);
  }

  sendPhoneOtp() {
    this.loaderService.spinnerOn();
    this.loaderService.lock();
    this.subscribeOnce(
      // this.data.user.email
      this.userService.sendOtpPhone('+84 387 946 856'),
      (res) => {
        if (res) {
          console.log({ res });
          this.phoneOtpRequestId = res;
          this.service.message.showMessage('Phone Verification Code Sent');
          this.showEmailOtpInput = true;
        }
      },
      () => {
        this.loaderService.unlock();
        this.loaderService.spinnerOff();
      }
    );
    this.showPhoneOtpInput = true;
    this.service.message.showMessage('Phone Verification Code Sent');
  }

  verifyPhone() {
    this.loaderService.spinnerOn();
    this.loaderService.lock();
    this.subscribeOnce(
      this.userService.verifyOtpPhone(
        this.phoneOtpRequestId,
        this.form.value.phoneOtp,
        '+84 387 946 856'
      ),
      (res: any) => {
        if (res) {
          this.data.user.phone = '+84 387 946 856';
          this.updateUserPhoneVerified('+84 387 946 856');
          this.cd.markForCheck();
        } else {
          this.service.message.showMessage('Invalid code. Please try again.');
        }
      },
      () => {
        this.loaderService.unlock();
        this.loaderService.spinnerOff();
        this.navigateToCreate();
      }
    );
  }

  updateUserMailVerified() {
    const userProfile = this.localStorageService.get('user_profile');
    const updatedProfile = {
      ...JSON.parse(userProfile),
      isVerifyEmail: true,
    };
    this.localStorageService.set(
      'user_profile',
      JSON.stringify(updatedProfile)
    );
  }

  updateUserPhoneVerified(phone) {
    const userProfile = this.localStorageService.get('user_profile');
    const updatedProfile = {
      ...JSON.parse(userProfile),
      phone,
    };
    this.localStorageService.set(
      'user_profile',
      JSON.stringify(updatedProfile)
    );
  }

  handleClose() {
    this.dialogRef.close();
  }

  navigateToCreate() {
    if (this.data?.user?.phone && this.data?.user?.isVerifyEmail) {
      this.handleClose();
      this.redirect(['/campaigns/create']);
    }
  }
}
