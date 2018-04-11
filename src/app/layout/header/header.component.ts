import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { Router } from "@angular/router";

import { SettingsService } from '../../shared/settings/settings.service';
import { PagetitleService } from '../../core/pagetitle/pagetitle.service';
import { AuthService } from '../../shared/auth.service';
import { UserService } from '../../shared/user.service';
import { ActivatedRoute } from '@angular/router';
import { FirebaseUserModel } from '../../shared/user.model';
import { Subscription } from 'rxjs/Subscription';

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
        private userService: UserService) { }
        
    ngOnInit() {      
        this.getUser();
        this.subscription = this.authService.userChanged().subscribe(any => {
            console.log('user changed in header')
            this.getUser();
        })
    }

    getUser() {
        console.log('calling get current user from header');
        this.userService.getCurrentUser().then(res => {
            this.user = new FirebaseUserModel();
            this.showit = true;
            if (res.providerData[0].providerId == 'password') {
                this.user.image = 'http://dsi-vd.github.io/patternlab-vd/images/fpo_avatar.png';
                this.user.name = res.displayName;
                this.user.provider = res.providerData[0].providerId;
            }
            else {
                this.user.image = res.photoURL;
                this.user.name = res.displayName;
                this.user.provider = res.providerData[0].providerId;
            }                      
        }).catch(err => {
            console.log('error caught - ' + err);
            this.user = null;
            this.showit = false;
        });
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
            this.router.navigate(['/user/signin']);
        })
    }

}
