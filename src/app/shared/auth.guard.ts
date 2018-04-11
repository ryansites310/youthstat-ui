import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, Router} from "@angular/router";
import { AngularFireAuth } from 'angularfire2/auth';
import { UserService } from './user.service';


@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    public afAuth: AngularFireAuth,
    public userService: UserService,
    private router: Router
  ) {}

  canActivate(): Promise<boolean>{
    console.log('calling get current user from auth guard');
    return new Promise((resolve, reject) => {
      this.userService.getCurrentUser()
      .then(user => {        
        return resolve(true);
      })
      .catch(err => {
        this.router.navigate(['/user/signin']);
        return resolve(false);
      })      
    });
  }
}