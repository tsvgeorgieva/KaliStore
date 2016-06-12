import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {UserLoggedInEvent} from './event/user-logged-in-event';
import {UserLoggedOutEvent} from './event/user-logged-out-event';
import {UsersRepository} from 'repository';
import {localStorageManager} from './local-storage-manager';

const currentUserKey = 'currentUser';

@inject(EventAggregator, UsersRepository)
export class Session {

  constructor(eventAggregator, usersRepository) {
    this.eventAggregator = eventAggregator;
    this.usersRepository = usersRepository;

    this.initUserData();

    if (this.userRemembered()) {
      this.restoreData();
    }
  }

  initUserData() {
    this.user = {};
    this.userAccessRights = [];

    this.isLoggedIn = false;
    this.isBusy = false;
  }

  loginUser(userId) {
    this.user = this.usersRepository.get(userId);
    localStorageManager.save(currentUserKey, this.user);
    this.restoreData();
  }

  logoutUser() {
    localStorageManager.clear(currentUserKey);
    this.initUserData();
    this.eventAggregator.publish(new UserLoggedOutEvent());
  }

  userHasAccessRight(requiredAccessRight) {
    return this.userAccessRights[requiredAccessRight] === true;
  }

  userHasAllAccessRights(requiredAccessRights) {
    return requiredAccessRights.every(accessRight => {
      return this.userHasAccessRight(accessRight);
    });
  }

  isUserLoggedIn() {
    return this.isLoggedIn === true;
  }

  userRemembered() {
    return localStorageManager.has(currentUserKey);
  }

  restoreData(data) {
    data = data || localStorageManager.get(currentUserKey);

    this.user = data;
    this.userAccessRights = this._reduceToHash(data.userAccessRights);

    this.isLoggedIn = true;
    this.eventAggregator.publish(new UserLoggedInEvent());
  }

  getUserName() {
    return this.user.userName;
  }

  getUserId() {
    return this.user.id;
  }
  
  _reduceToHash(array){
    return array.reduce((hash, item) => {
      hash[item] = true;
      return hash;
    }, {});
  }
}

