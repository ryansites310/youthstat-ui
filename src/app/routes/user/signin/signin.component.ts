import { Component, OnInit, OnDestroy } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { CustomValidators } from 'ng2-validation';

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit, OnDestroy {
    lang: any;

    constructor(public oidcSecurityService: OidcSecurityService
    ) {
        this.oidcSecurityService.onModuleSetup.subscribe(() => { this.onModuleSetup(); });
    }

    ngOnInit() {
        if (this.oidcSecurityService.moduleSetup) {
            this.onModuleSetup();
        }
    }

    ngOnDestroy(): void {
        this.oidcSecurityService.onModuleSetup.unsubscribe();
    }

    private onModuleSetup() {
        console.log('signin component onModuleSetup()');
        this.oidcSecurityService.authorize();
    }

}
