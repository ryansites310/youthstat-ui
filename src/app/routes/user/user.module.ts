import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { LockComponent } from './lock/lock.component';
import { RecoverComponent } from './recover/recover.component';
import { Signupv2Component } from './signupv2/signupv2.component';
import { Signinv2Component } from './signinv2/signinv2.component';

// const routes: Routes = [
//     { path: 'signin', component: SigninComponent },
//     { path: 'signup', component: SignupComponent },
//     { path: 'lock', component: LockComponent },
//     { path: 'recover', component: RecoverComponent },
// ];

@NgModule({
    imports: [
        SharedModule,
        // RouterModule.forChild(routes)
    ],
    declarations: [
        SigninComponent,
        SignupComponent,
        LockComponent,
        RecoverComponent,
        Signupv2Component,
        Signinv2Component
    ],
    exports: [
        RouterModule,
        SigninComponent,
        SignupComponent,
        LockComponent,
        RecoverComponent
    ]
})
export class UserModule { }