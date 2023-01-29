import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { BaseComponent } from './components/core/base/base.component';
import { DialogComponent } from './components/core/dialog/dialog.component';
import { MessageComponent } from './components/core/message/message.component';
import { AuthComponent } from './components/layout/auth/auth.component';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

import { ShareModule } from './components/share/share.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MainLayoutComponent } from './components/layout/main-layout/main-layout.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { MainNavComponent } from './components/layout/main-nav/main-nav.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TranslocoRootModule } from './transloco/transloco-root.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    DialogComponent,
    BaseComponent,
    MessageComponent,
    AuthComponent,
    MainLayoutComponent,
    HeaderComponent,
    MainNavComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    ShareModule,
    MatFormFieldModule,
    MatInputModule,
    MatSidenavModule,
    MatListModule,
    MatTooltipModule,
    MatToolbarModule,
    TranslocoRootModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
