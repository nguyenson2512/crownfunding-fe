import { ClientLayoutComponent } from '#components/layout/client-layout/client-layout.component';
import { AuthGuard } from '#guards/auth.guard';
import { NgModule } from '@angular/core';
import { Route, RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { MainLayoutComponent } from './components/layout/main-layout/main-layout.component';

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
      },
    ],
  },
  {
    path: 'admin',
    component: MainLayoutComponent,
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('./components/pages/home/home.module').then(
            (m) => m.HomeModule
          ),
      },
    ],
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./components/auth/auth.module').then((m) => m.AuthModule),
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
