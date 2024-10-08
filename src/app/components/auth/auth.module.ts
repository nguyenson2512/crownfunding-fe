import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShareModule } from '../share/share.module';
import { AuthRoutingModule } from './auth-routing.module';
import { SignupComponent } from './signup/signup.component';

@NgModule({
  declarations: [AuthComponent, SignupComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ShareModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class AuthModule {}
