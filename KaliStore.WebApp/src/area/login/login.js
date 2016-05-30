import {inject} from 'aurelia-framework';
import {I18N} from 'aurelia-i18n';
import {Router} from 'aurelia-router';
import {Session, Logger} from 'service';
import {UsersRepository} from 'repository';

@inject(Session, Logger, I18N, Router, UsersRepository)
export class Login {
  userName;
  password;

  constructor(session, logger, i18n, router, usersRepository) {
    this.session = session;
    this.logger = logger;
    this.i18n = i18n;
    this.router = router;
    this.usersRepository = usersRepository;
  }

  login() {
    let user = this.usersRepository.getByUserName(this.userName);
    if (user !== undefined && this.password === user.password) {
      this.session.loginUser(user);
      this.router.navigate('');
    } else {
      this.logger.error(this.i18n.tr('login.loginUnsuccessful'));
    }
  }
}

