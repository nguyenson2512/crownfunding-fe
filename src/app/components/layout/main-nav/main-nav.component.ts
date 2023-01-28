import { Component, Input, OnInit } from '@angular/core';
import { NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { MenuNode } from 'src/app/interfaces/nav.interface';
import { ComponentService } from 'src/app/services/component.service';
import { LocalStorageService } from 'src/app/services/storage.service';
import { MENU_TREE } from 'src/app/utils/const';
import { BaseComponent } from '../../core/base/base.component';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss'],
})
export class MainNavComponent extends BaseComponent implements OnInit {
  @Input() isMinimized: boolean;
  public roles = [];
  public menuTree: MenuNode[] = [];
  public currentRoute: string;

  constructor(
    componentService: ComponentService,
    private localStorageService: LocalStorageService
  ) {
    super(componentService);
  }

  ngOnInit(): void {
    //TODO: update role
    const data = this.localStorageService.get('user_profile');
    // this.roles = JSON.parse(data).roles;
    this.menuTree = MENU_TREE.map((treeNode) =>
      this.insertActiveLinks(treeNode)
    );
    this.currentRoute = this.router.url;
    this.subscribeUntilDestroy(
      this.router.events.pipe(
        filter((event) => event instanceof NavigationEnd)
      ),
      (event: NavigationEnd) => {
        this.currentRoute = event.url;
      }
    );
  }

  toggleMenu(level: number, index: number): void {
    let levelTemp = level;
    let menuTreeTemp = [...this.menuTree];
    while (levelTemp > 1) {
      menuTreeTemp = menuTreeTemp[levelTemp].children;
      levelTemp--;
    }

    if (menuTreeTemp) {
      menuTreeTemp[index].opened = !menuTreeTemp[index].opened;
    }
    this.menuTree = menuTreeTemp;
  }

  shouldShowMenuNode(roleIds: number[] = []): boolean {
    if (!roleIds.length) {
      return true;
    }
    return this.roles.some((role) => roleIds?.includes(role?.id));
  }

  isParentNodeActive(parentActiveLinks?: string[]): boolean {
    return parentActiveLinks?.some((link) => this.currentRoute.includes(link));
  }

  private insertActiveLinks(treeNode: MenuNode): MenuNode {
    const treeNodeTemp = { ...treeNode };
    const activeLinks = [];
    if (treeNodeTemp.children) {
      treeNodeTemp.children = treeNodeTemp.children?.map((child) => {
        if (child.href) {
          activeLinks.push(child.href);
        }
        if (child.children) {
          return this.insertActiveLinks(child);
        }
        return child;
      });
    }
    treeNodeTemp.activeLinks = activeLinks;
    return treeNodeTemp;
  }
}
