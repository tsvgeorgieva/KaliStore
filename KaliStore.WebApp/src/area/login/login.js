import {inject} from 'aurelia-framework';
import {I18N} from 'aurelia-i18n';
import {Router} from 'aurelia-router';
import {Session, Logger} from 'service';
import {UsersRepository, FacebookRepository} from 'repository';
import {accessRight} from 'enum';

@inject(Session, Logger, I18N, Router, UsersRepository, FacebookRepository)
export class Login {
  userName;
  password;

  constructor(session, logger, i18n, router, usersRepository, facebookRepository) {
    this.session = session;
    this.logger = logger;
    this.i18n = i18n;
    this.router = router;
    this.usersRepository = usersRepository;
    this.facebookRepository = new FacebookRepository(usersRepository, session, router);
  }

  attached() {
    this.facebookRepository.init();
  }

  login() {
    //let user = this.usersRepository.getByUserName(this.userName);
    this.usersRepository.login({username: this.userName, password: this.password})
      .then(userId => {
        this.session.loginUser(userId);
        // if (this.session.userHasAccessRight(accessRight.adminPanel)) {
        //   this.router.navigate('admin');
        // } else {
        this.router.navigate('');
        // }
      }).catch(x => {
      if (x.statusCode === 401) {
        this.logger.error(this.i18n.tr('login.loginUnsuccessful'));
      }
    });
  }

  fblogin() {
    this.facebookRepository.login();
  }
}

