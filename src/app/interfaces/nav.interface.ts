export interface Expandable<T> {
  id?: number;
  level?: number;
  expandable?: boolean;
  children?: T[];
  parentId?: number;
}
export interface NavMenuItem extends Expandable<NavMenuItem> {
  href: string;
  icon?: string;
  label: string;
  roleIds: number[];
}

export interface MenuNode {
  href?: string;
  icon?: string;
  children?: MenuNode[];
  opened?: boolean;
  activeLinks?: string[];
  level: number;
  label: string;
  roles?: string[];
}
