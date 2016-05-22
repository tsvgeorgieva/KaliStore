import {inject} from 'aurelia-framework';
import {I18N} from 'aurelia-i18n';
import {Router} from 'aurelia-router';
import {Session, Logger} from 'service';

@inject(Session, Logger, I18N, Router)
export class Login {
  userName;
  password;

  constructor(session, logger, i18n, router) {
    this.session = session;
    this.logger = logger;
    this.i18n = i18n;
    this.router = router;
  }

  login() {
    if (this.userName === 'pesho' && this.password === '123') {
      this.session.loginUser({
        userName: this.userName
      });
      this.logger.success(this.i18n.tr('login.loginSuccessful'));
      this.router.navigate('');
    } else {
      this.logger.error(this.i18n.tr('login.loginUnsuccessful'));
    }
  }
}

