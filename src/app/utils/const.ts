import { IReward } from '#models/campaign.model';
import { MenuNode } from '../interfaces/nav.interface';

export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export enum ROLE_OPTIONS {
  ADMIN = 'admin',
  CREATOR = 'creator',
}

export const MENU_TREE: MenuNode[] = [
  {
    icon: 'supervisor_account',
    label: 'navigation.userManagement',
    level: 1,
    href: 'user',
    roles: [ROLE_OPTIONS.ADMIN],
    // children: [
    //   {
    //     label: 'navigation.adminDashboard',
    //     href: 'home',
    //     icon: 'bar_chart',
    //     level: 2,
    //   },
    // ],
  },
  {
    label: 'navigation.categoryManagement',
    href: 'category',
    icon: 'category',
    level: 1,
    roles: [ROLE_OPTIONS.ADMIN],
  },
  {
    label: 'navigation.campaigns',
    href: 'campaign',
    icon: 'inventory_2',
    level: 1,
    roles: [ROLE_OPTIONS.ADMIN],
  },
  {
    label: 'navigation.myCampaign',
    href: 'my-campaign',
    icon: 'pending_actions',
    level: 1,
    roles: [ROLE_OPTIONS.CREATOR],
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

export const DEFAULT_START_PAGE = 1;
export const DEFAULT_PAGE_SIZE = 10;

export enum CampaignStatus {
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  REVIEWING = 'REVIEWING',
}

export const COMMENT_TYPE_PUBLIC = 'PUBLIC';
export const COMMENT_TYPE_EVALUATE = 'EVALUATE';
export enum CommentType {
  PUBLIC = 'PUBLIC',
  EVALUATE = 'EVALUATE',
}

export const DATETIME_FORMAT = 'yyyy/MM/dd H:mm';
export const DATE_CAMPAIGN_FORMAT = 'MM/DD/YYYY HH:mm';

export const STATUS_CAMPAIGN_APPROVED = 'APPROVED';
export const STATUS_CAMPAIGN_REJECTED = 'REJECTED';
export const STATUS_CAMPAIGN_REVIEWING = 'REVIEWING';

export const NOTIFICATION_TITLE = {
  REJECTED_CAMPAIGN: 'Rejected Campaign',
  APPROVED_CAMPAIGN: 'Approved Campaign',
  CREATED_CAMPAIGN: 'Create Campaign Request',
  UPDATED_CAMPAIGN: 'Updated Campaign Request',
};

export const NOTIFICATION_NAVIGATOR = {
  [NOTIFICATION_TITLE.REJECTED_CAMPAIGN]: '/admin/my-campaign',
  [NOTIFICATION_TITLE.APPROVED_CAMPAIGN]: '/admin/my-campaign',
  [NOTIFICATION_TITLE.CREATED_CAMPAIGN]: '/admin/campaign',
  [NOTIFICATION_TITLE.UPDATED_CAMPAIGN]: '/admin/campaign',
};

export const NOTIFICATION_INFO_MAP = {
  TaskCreatorApply: {
    redirect: (taskId: number) => `/admin/job-creator/${taskId}/detail`,
    title: 'notification.taskCreatorApplyTitle',
    content: 'notification.taskCreatorApplyContent',
  },
};

export const DEFAULT_REWARD: IReward = {
  title: 'Pledge without a reward',
  amount: 10,
  description: 'No reward, I just want to support the project',
  currency: 'USD',
  estimatedDelivery: '03/2023',
};
