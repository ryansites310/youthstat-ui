import { Component, OnInit, Injector, ViewEncapsulation } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
declare var $: any;
import { Subscription } from 'rxjs/Subscription';

import { MenuService } from '../../core/menu/menu.service';
import { SettingsService } from '../../shared/settings/settings.service';
import { AuthService } from '../../shared/auth.service';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class SidebarComponent implements OnInit {

    menu: Array<any>;
    router: Router;
    subscription: Subscription;

    constructor(private menuService: MenuService,
        public settings: SettingsService,
        private injector: Injector,
        private authService: AuthService) {

        this.menu = menuService.getMenuSorted();
        this.setVisibility();
    }

    ngOnInit() {
        this.router = this.injector.get(Router);
        this.router.events
            .filter(event => event instanceof NavigationEnd)
            .subscribe((event) => {
                this.settings.app.sidebar.visible = false;
                this.settings.app.sidebar.coverModeVisible = false;
            });

        this.subscription = this.authService.userChanged().subscribe(any => {
            this.setVisibility();
        })
    }

    setVisibility() {
        let user = JSON.parse(localStorage.getItem('user'));
        let perm = user ? user.userProfile.subscriptions[0].permissions : [];
        this.menu.forEach(menu => {
            let hasRole = false
            menu.permissions.forEach(menupermission => {
                perm.forEach(permission => {
                    if (permission === menupermission) {
                        hasRole = true
                    }
                });                
            });
            menu.visibleByRole = hasRole;
        });     
    }

    closeSidebar() {
        this.settings.app.sidebar.coverModeVisible = false;
        this.settings.app.sidebar.visible = false;
    }

    handleSidebar(event) {
        let item = this.getItemElement(event);
        // check click is on a tag
        if (!item) return;

        let ele = $(item),
            liparent = ele.parent()[0];

        let lis = ele.parent().parent().children(); // markup: ul > li > a
        // remove .active from childs
        lis.find('li').removeClass('active');
        // remove .active from siblings ()
        $.each(lis, function (key, li) {
            if (li !== liparent)
                $(li).removeClass('active');
        });
        let next = ele.next();
        if (next.length && next[0].tagName === 'UL') {
            ele.parent().toggleClass('active');
            event.preventDefault();
        }
    }

    // find the a element in click context
    // doesn't check deeply, asumens two levels only
    getItemElement(event) {
        let element = event.target,
            parent = element.parentNode;
        if (element.tagName.toLowerCase() === 'a') {
            return element;
        }
        if (parent.tagName.toLowerCase() === 'a') {
            return parent;
        }
        if (parent.parentNode.tagName.toLowerCase() === 'a') {
            return parent.parentNode;
        }
    }
}
