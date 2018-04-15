import * as _api from './generated/index';

export class FirebaseUserModel {
    image: string;
    name: string;
    provider: string;
    userProfile: _api.UserProfile
  
    constructor(){
      this.image = "";
      this.name = "";
      this.provider = "";
    }
  }