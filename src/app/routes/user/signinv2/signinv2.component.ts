import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';

@Component({
    selector: 'app-signinv2',
    templateUrl: './signinv2.component.html',
    styleUrls: ['./signinv2.component.scss']
})
export class Signinv2Component implements OnInit {

    loginForm: FormGroup;

    constructor(fb: FormBuilder) {

        this.loginForm = fb.group({
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
            console.log('Valid!');
        }
        console.log(value);
    }

    ngOnInit() {
    }

}
