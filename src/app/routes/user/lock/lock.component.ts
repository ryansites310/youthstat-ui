import { Component, OnInit, Injector } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { Router } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Component({
  selector: 'app-lock',
  templateUrl: './lock.component.html',
  styleUrls: ['./lock.component.scss']
})
export class LockComponent implements OnInit {

    router: Router;
    lockForm: FormGroup;

    constructor(fb: FormBuilder, private inj: Injector, private oidcSecurityService: OidcSecurityService) {

        this.lockForm = fb.group({
            'password': [null, Validators.required]
        });

        this.oidcSecurityService.logoff();
    }

    submitForm($ev, form: FormGroup) {
        $ev.preventDefault();
        let value = form.value;
        for (let c in form.controls) {
            form.controls[c].markAsTouched();
        }
        if (form.valid) {
            this.router.navigate(['/dashboard']);
        }
        // console.log(value);
    }

    ngOnInit() {
        this.router = this.inj.get(Router);
    }

}
