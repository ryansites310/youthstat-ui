import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, ValidatorFn } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';

import { Router } from "@angular/router";

import { AuthService } from '../../../shared/auth.service';
import { AlertService } from '../../../shared/alert.service';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

    regForm: FormGroup;

    constructor(fb: FormBuilder, private authService: AuthService, private router: Router, private alertService: AlertService) {

        let loginPassword = new FormControl('', Validators.required);
        let loginPasswordConfirm = new FormControl('', CustomValidators.equalTo(loginPassword));

        this.regForm = fb.group({
            'email': [null, Validators.compose([Validators.required, CustomValidators.email])],
            'password': loginPassword,
            'confirmPassword': loginPasswordConfirm
        });
    }

    submitForm($ev, form: FormGroup) {
        $ev.preventDefault();
        let value = form.value;
        for (let c in form.controls) {
            form.controls[c].markAsTouched();
        }
        if (form.valid) {
            this.authService.doRegister(value).then(res => {
                this.alertService.showSuccess('', 'User created successfully!')
                this.router.navigate(['/user/profile']);
            }).catch(err => {
                this.alertService.showFailure('', err.message)
            });
        }
    }

    ngOnInit() {
    }

}
