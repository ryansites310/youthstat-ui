import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, ValidatorFn } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';

@Component({
    selector: 'app-signupv2',
    templateUrl: './signupv2.component.html',
    styleUrls: ['./signupv2.component.scss']
})
export class Signupv2Component implements OnInit {

    regForm: FormGroup;

    constructor(fb: FormBuilder) {

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
            console.log('Valid!');
        }
        console.log(value);
    }

    ngOnInit() {
    }

}
