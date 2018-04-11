import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';

import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { LockComponent } from './lock/lock.component';
import { RecoverComponent } from './recover/recover.component';
import { ProfileComponent } from './profile/profile.component';
import { Profile } from 'selenium-webdriver/firefox';

import { AuthGuard } from '../../shared/auth.guard';
import { UserResolver } from '../../shared/user.resolver';

const routes: Routes = [
    { path: 'signin', component: SigninComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'profile', component: ProfileComponent, resolve: { data: UserResolver} }   
];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        SigninComponent,
        SignupComponent,
        LockComponent,
        RecoverComponent,
        ProfileComponent
    ],
    exports: [
        RouterModule
    ]
})
export class UserModule { }