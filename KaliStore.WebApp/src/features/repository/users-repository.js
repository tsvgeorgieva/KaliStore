import {inject} from 'aurelia-framework';
import {localStorageManager} from 'service';
import {accessRight} from 'enum';
import {HaikuHttp} from './../service/http-client/haiku-http';

const usersKey = 'users';

@inject(HaikuHttp)
export class UsersRepository {
  lastId = 0;

  constructor(http) {
    this.http = http;

    this.users = localStorageManager.get(usersKey);
    if (this.users === undefined) {
      this.initialize();
    }

    this.lastId = this.users.length;
  }

  initialize() {
    this.users = [];

    localStorageManager.save(usersKey, this.users);
  }

  get(id) {
    return this.http.get('user/info', {userId: id}).then(response => {
      var user = response.user;
      user.userName = user.username;
      delete user.username;
      return user;
    });
  }

  login(user) {
    return this.http.post('user/login', {user: user});
  }
  
  facebookLogin(user){
    return this.http.post('user/facebook', {user: user});
  }

  save(user) {
    user.username = user.userName;
    return this.http.post('user/register', {user: user});
  }

  getByUserName(userName) {
    return this.users.find(u => u.userName === userName);
  }

  getAll() {
    return this.users;
  }

  edit(userData) {
    const user = this.get(userData.id);

    //TODO: separate method for changing password?
    //currentUser.password = user.password || currentUser.password;

    user.city = userData.city || user.city;
    user.fullName = userData.fullName || user.fullName;
    user.address = userData.address || user.address;
    user.phone = userData.phone || user.phone;
    localStorageManager.save(usersKey, this.users);
  }

  block(userId) {
    const user = this.get(userId);
    user.isBlocked = true;
    localStorageManager.save(usersKey, this.users);
  }

  unblock(userId) {
    const user = this.get(userId);
    user.isBlocked = false;
    localStorageManager.save(usersKey, this.users);
  }

  userHasAccessRight(userId, requiredAccessRight) {
    const user = this.get(userId);
    return user.userAccessRights[requiredAccessRight] === true;
  }

  userHasAllAccessRights(userId, requiredAccessRights) {
    const user = this.get(userId);
    return requiredAccessRights.every(accessRight => {
      return this.userHasAccessRight(userId, accessRight);
    });
  }
}
