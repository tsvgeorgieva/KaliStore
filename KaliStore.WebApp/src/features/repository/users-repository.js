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
    user.userAccessRights = [];
    this.users.push(user);

    localStorageManager.save(usersKey, this.users);
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
  userAccessRights: []
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
  userAccessRights: [accessRight.adminPanel]
}];
