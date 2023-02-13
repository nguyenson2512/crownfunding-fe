import { BaseComponent } from '#components/core/base/base.component';
import { AuthService } from '#services/auth.service';
import { ComponentService } from '#services/component.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { notEmpty } from 'src/app/validators/not-empty.validator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent extends BaseComponent implements OnInit {
  selectedFileName: string;
  selectedFiles;
  form = this.fb.group({
    username: ['', [Validators.required, notEmpty]],
    email: ['', [Validators.required, Validators.email, notEmpty]],
    password: ['', [Validators.required, notEmpty]],
    confirmPassword: ['', [Validators.required, notEmpty]],
  });
  constructor(
    protected componentService: ComponentService,
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    super(componentService);
  }

  async signUp() {
    if (this.form.invalid) {
      return;
    }
    const { email, username, password, confirmPassword } = this.form.value;
    const formData = new FormData();
    formData.append('name', username);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('confirmPassword', confirmPassword);
    formData.append('image', this.selectedFiles[0], this.selectedFileName);
    this.subscribeOnce(this.authService.signUp(formData), (res) => {
      if (res) {
        this.componentService.message.showMessage(
          'Register account success. Please login'
        );
        this.redirect(['/login']);
      }
    });
  }

  selectFile(event) {
    //TODO:  add loader
    this.selectedFileName = null;
    const fileList = event.target.files;
    const file = fileList[0];
    if (fileList && file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.selectedFiles = [file];
        this.selectedFileName = this.selectedFiles[0].name;
      };
    }
  }

  navigateLogin() {
    this.redirect(['/login']);
  }
}
