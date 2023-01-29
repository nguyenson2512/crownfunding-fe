import { MenuNode } from '../interfaces/nav.interface';

export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export const MENU_TREE: MenuNode[] = [
  {
    icon: 'supervisor_account',
    label: 'navigation.userManagement',
    level: 1,
    href: 'home',
    // children: [
    //   {
    //     label: 'navigation.adminDashboard',
    //     href: 'home',
    //     icon: 'bar_chart',
    //     level: 2,
    //   },
    // ],
  },
  // {
  //   icon: 'person',
  //   label: 'users',
  //   level: 1,
  //   children: [
  //     {
  //       label: 'userManagement',
  //       href: 'user-management',
  //       icon: 'people',
  //       level: 2,
  //     },
  //     {
  //       label: 'permissionManagement',
  //       href: 'permission-management',
  //       icon: 'admin_panel_settings',
  //       level: 2,
  //     },
  //   ],
  // },
];
