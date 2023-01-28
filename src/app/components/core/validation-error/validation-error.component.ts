import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-validation-error',
  templateUrl: './validation-error.component.html',
  styleUrls: ['./validation-error.component.scss'],
})
export class ValidationErrorComponent implements OnInit {
  @Input() control: FormControl;

  constructor() {}

  ngOnInit() {}

  getMessage() {
    let message = '';
    if (this.control.errors) {
      if (this.control.errors.required) {
        message = 'This field is required';
      }
      if (this.control.errors.email) {
        message = 'Oops that doesn’t look like a valid email. Please try again';
      }
      if (this.control.errors.minLength) {
        message = 'This value is too short';
      }
      if (this.control.errors.maxLength) {
        message = 'This value is too long';
      }
      if (this.control.errors.pattern) {
        message = 'This field is invalid format';
      }
    }
    return message;
  }
}
