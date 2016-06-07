import {inject} from 'aurelia-framework';
import {I18N} from 'aurelia-i18n';
import {Session, Logger} from 'service';
import {User} from 'models';
import {UsersRepository} from 'repository';

@inject(Session, Logger, I18N, UsersRepository)
export class UsersManagement {
  users = [];

  constructor(session, logger, i18n, usersRepository) {
    this.session = session;
    this.logger = logger;
    this.i18n = i18n;
    this.usersRepository = usersRepository;

    this.users = this.usersRepository.getAll().map(u => new User(u));
  }
  
  block(user){
    user.isBlocked = true;
    this.usersRepository.block(user.id);
  }

  unblock(user){
    user.isBlocked = false;
    this.usersRepository.unblock(user.id);
  }
}
