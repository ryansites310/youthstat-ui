import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { Router } from "@angular/router";

import { SettingsService } from '../../shared/settings/settings.service';
import { PagetitleService } from '../../core/pagetitle/pagetitle.service';
import { AuthService } from '../../shared/auth.service';
import { FirebaseService } from '../../shared/firebase.service';
import { ActivatedRoute } from '@angular/router';
import { FirebaseUserModel } from '../../shared/user.model';
import { Subscription } from 'rxjs/Subscription';

import { NgxPermissionsService } from 'ngx-permissions';

import * as _api from '../../shared/generated/index';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss', './header.menu-links.scss'],
    encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {

    sidebarVisible: true;
    user: FirebaseUserModel;
    showit: boolean;
    subscription : Subscription;

    constructor(public settings: SettingsService,
        public pt: PagetitleService,
        private authService: AuthService,
        private router: Router,
        private firebaseService: FirebaseService,
        private userService: _api.UserService,
        private permissionsService: NgxPermissionsService) { }
        
    ngOnInit() {      
        this.getUser();
        this.subscription = this.authService.userChanged().subscribe(any => {
            this.getUser();
        });
    }

    getUser() {
        this.user = JSON.parse(localStorage.getItem('user'));
        this.showit = this.user ? true : false;       
    }

    toggleSidebarCoverModeVisible() {
        this.settings.app.sidebar.coverModeVisible = !this.settings.app.sidebar.coverModeVisible;
    }

    toggleSidebar(state = null) {
        //  state === true -> open
        //  state === false -> close
        //  state === null -> toggle
        this.settings.app.sidebar.visible = state !== null ? state : !this.settings.app.sidebar.visible;
    }

    openModalSearch() {

    }

    openModalBar() {

    }

    logoff() {
        this.authService.doLogout().then(res => {
            localStorage.removeItem('user');
            this.authService.authChanged('Log Off');
            this.router.navigate(['/user/signin']);
        })
    }

}
