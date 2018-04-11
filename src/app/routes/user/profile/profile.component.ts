import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/user.service';
import { AuthService } from '../../../shared/auth.service';
import { AlertService } from '../../../shared/alert.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseUserModel } from '../../../shared/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: FirebaseUserModel = new FirebaseUserModel();
  profileForm: FormGroup;

   constructor(
    public userService: UserService,
    public authService: AuthService,
    private route: ActivatedRoute,
    private location : Location,
    private fb: FormBuilder,
    private alertService: AlertService
  ) {

  }

  ngOnInit(): void {
    this.route.data.subscribe(routeData => {
      let data = routeData['data'];
      if (data) {
        this.user = data;
        this.createForm(this.user.name);
      }
    })
  }

  createForm(name) {
    this.profileForm = this.fb.group({
      name: [name, Validators.required ]
    });
  }

  save(value){
    this.userService.updateCurrentUser(value)
    .then(res => {
      this.alertService.showSuccess('', 'Profile updated successfully!');
    }, err => this.alertService.showFailure('', err))
  }

}
