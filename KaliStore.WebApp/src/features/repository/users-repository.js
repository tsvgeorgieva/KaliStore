import {localStorageManager} from 'service';
import {accessRight} from 'enum';

const usersKey = 'users';

export class UsersRepository {
  lastId = 0;

  constructor() {
    this.users = localStorageManager.get(usersKey);
    if (this.users === undefined) {
      this.initialize();
    }
    
    this.lastId = this.users.length;
  }

  initialize() {
    this.users = initialUsers;

    localStorageManager.save(usersKey, this.users);
  }

  get(id) {
    return this.users.find(u => u.id === id);
  }

  getByUserName(userName){
    return this.users.find(u => u.userName === userName);
  }

  getAll() {
    return this.users;
  }

  save(user) {
    user.id = ++this.lastId;
    user.userAccessRights = [accessRight.userProfile];
    this.users.push(user);

    localStorageManager.save(usersKey, this.users);
    return user.id;
  }

  edit(user){
    let currentUser = this.get(user.id);
    //currentUser.password = user.password || currentUser.password;
    currentUser.city = user.city || currentUser.city;
    currentUser.fullName = user.fullName || currentUser.fullName;
    currentUser.address = user.address || currentUser.address;
    currentUser.phone = user.phone || currentUser.phone;
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

const initialUsers = [{
  id: 1,
  userName: 'pesho',
  password: '123',
  fullName: 'Pesho Peshev',
  city: {
    id: 1,
    name: 'София'
  },
  address: 'ул. Пършевица 5',
  phone: '2873278',
  userAccessRights: [accessRight.userProfile]
}, {
  id: 2,
  userName: 'admin',
  password: 'admin',
  fullName: 'Admin Adminski',
  city: {
    id: 2,
    name: 'Пловдив'
  },
  address: 'ул. Пършевица 5',
  phone: '2873278',
  userAccessRights: [accessRight.userProfile, accessRight.adminPanel]
}];
