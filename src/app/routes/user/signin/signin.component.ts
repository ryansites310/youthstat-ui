import { Component, OnInit, OnDestroy } from '@angular/core';

import { Router, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';

import { AuthService } from '../../../shared/auth.service'
import { AlertService } from '../../../shared/alert.service'

import { FirebaseUserModel } from '../../../shared/user.model';

import * as _api from '../../../shared/generated/index';

import { NgxPermissionsService } from 'ngx-permissions';

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.scss']
})
export class SigninComponent {
    loginForm: FormGroup;

    constructor(
        public authService: AuthService,
        private router: Router,
        private fb: FormBuilder,
        private alertService: AlertService,
        private userService: _api.UserService,
        private permissionsService: NgxPermissionsService
    ) {
        this.createForm();
    }

    createForm() {
        this.loginForm = this.fb.group({
            'email': [null, Validators.compose([Validators.required, CustomValidators.email])],
            'password': [null, Validators.required]
        });
    }

    submitForm($ev, form: FormGroup) {
        $ev.preventDefault();
        let value = form.value;
        for (let c in form.controls) {
            form.controls[c].markAsTouched();
        }
        if (form.valid) {
            this.tryLogin(value);
        }
    }

    tryFacebookLogin() {
        console.log('1')
        this.authService.doFacebookLogin()
            .then(res => {
                console.log('3')               
                this.saveUser(res);               
            }).catch(err => {
                this.alertService.showFailure('', err.message);
            })
    }

    tryGoogleLogin() {
        this.authService.doGoogleLogin()
            .then(res => {
                
                this.saveUser(res);
                this.router.navigate(['/dashboard']);
            })
            .catch(err => {
                this.alertService.showFailure('', err.message);
            })
    }

    tryLogin(value) {
        this.authService.doLogin(value)
            .then(res => {
                this.saveUser(res);
                this.router.navigate(['/dashboard']);
            }, err => {
                this.alertService.showFailure('', err.message);
            })
    }

    saveUser(res) {
        const user = new FirebaseUserModel();       
       
        this.userService.apiUserLoginPost(JSON.stringify(res.user.email)).subscribe(body => {
            this.permissionsService.loadPermissions(body.subscriptions[0].permissions);     
            user.userProfile = body;

            if (res.user.providerData[0].providerId == 'password') {
                user.image = 'http://dsi-vd.github.io/patternlab-vd/images/fpo_avatar.png';
                user.name = res.user.displayName;
                user.provider = res.user.providerData[0].providerId;
            }
            else {
                user.image = res.user.photoURL;
                user.name = res.user.displayName;
                user.provider = res.user.providerData[0].providerId;
            }              
           
            localStorage.setItem('user', JSON.stringify(user));

            this.authService.authChanged('Facebook');
            this.router.navigate(['/dashboard']);
        })
    }
}
