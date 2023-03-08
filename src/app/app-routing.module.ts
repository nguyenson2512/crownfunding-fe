import { SignupComponent } from '#components/auth/signup/signup.component';
import { ClientLayoutComponent } from '#components/layout/client-layout/client-layout.component';
import { AuthGuard } from '#guards/auth.guard';
import { NgModule } from '@angular/core';
import { Route, RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { MainLayoutComponent } from './components/layout/main-layout/main-layout.component';
import { WishlistResolver } from './resolve/wishlist.resolver';

const routes: Routes = [
  {
    path: '',
    component: ClientLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('#components/pages/home/home.module').then(
            (m) => m.HomeModule
          ),
        resolve: { wishlist: WishlistResolver },
      },
      {
        path: 'wishlist',
        loadChildren: () =>
          import('#components/pages/home/wishlist/wishlist.module').then(
            (m) => m.WishlistModule
          ),
      },
      {
        path: 'chats',
        loadChildren: () =>
          import('#components/pages/home/chats/chats.module').then(
            (m) => m.ChatsModule
          ),
      },
    ],
  },
  {
    path: 'admin',
    component: MainLayoutComponent,
    children: [
      {
        path: 'user',
        loadChildren: () =>
          import(
            './components/pages/management/user-management/user-management.module'
          ).then((m) => m.UserManagementModule),
      },
      {
        path: 'category',
        loadChildren: () =>
          import(
            './components/pages/management/category-management/category-management.module'
          ).then((m) => m.CategoryManagementModule),
      },
      {
        path: 'campaign',
        loadChildren: () =>
          import(
            './components/pages/management/campaign-management/campaign-management.module'
          ).then((m) => m.CampaignManagementModule),
      },
      {
        path: 'my-campaign',
        loadChildren: () =>
          import(
            './components/pages/management/my-campaign-management/my-campaign-management.module'
          ).then((m) => m.MyCampaignManagementModule),
      },
    ],
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./components/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: '**',
    redirectTo: '',
    component: AuthComponent,
  },
];

const setGuard = (
  r: Routes,
  guard: any,
  condition: (route: Route) => boolean
) => {
  if (!r) {
    return;
  }
  for (const route of r) {
    if (!route.canActivate) {
      route.canActivate = [];
    }

    const result = condition(route);
    if (result) {
      route.canActivate.push(guard);
    }
    if (route.children) {
      setGuard(route.children, guard, condition);
    }
  }
};

const setAuthGuard = (r: Routes) => {
  setGuard(r, AuthGuard, (route: Route) => {
    switch (route.path) {
      case 'login':
      case '**':
        return false;
      default:
        return true;
    }
  });
};

setAuthGuard(routes);

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      onSameUrlNavigation: 'reload',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
