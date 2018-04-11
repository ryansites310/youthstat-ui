import { Component, OnInit, OnDestroy } from '@angular/core';

import { Router, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';

import { AuthService } from '../../../shared/auth.service'
import { AlertService } from '../../../shared/alert.service'


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
        private alertService: AlertService
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
        this.authService.doFacebookLogin()
            .then(res => {
                this.router.navigate(['/dashboard']);
            }).catch(err => {
                console.log('fb error' + err.message);
                this.alertService.showFailure('', err.message);
            })
    }   

    tryGoogleLogin() {
        this.authService.doGoogleLogin()
            .then(res => {
                this.router.navigate(['/dashboard']);
            })
            .catch(err => {
                this.alertService.showFailure('', err.message);
            })
    }

    tryLogin(value) {
        this.authService.doLogin(value)
            .then(res => {
                this.router.navigate(['/dashboard']);
            }, err => {               
                this.alertService.showFailure('', err.message);
            })
    }

    

}
