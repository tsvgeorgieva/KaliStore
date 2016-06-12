import {inject} from 'aurelia-framework';
import {I18N} from 'aurelia-i18n';
import {Router} from 'aurelia-router';
import {Session, Logger} from 'service';
import {User} from 'models';
import {CitiesRepository, UsersRepository} from 'repository';

@inject(Session, Logger, I18N, Router, CitiesRepository, UsersRepository)
export class Register {
  confirmPassword;
  cities = [];
  user;

  constructor(session, logger, i18n, router, citiesRepository, usersRepository) {
    this.session = session;
    this.logger = logger;
    this.i18n = i18n;
    this.router = router;
    this.citiesRepository = citiesRepository;
    this.usersRepository = usersRepository;

    this.user = new User();
    this.cities = this.citiesRepository.getAll();
  }

  register() {
    if (!this.user.password || !this.user.userName) {
      this.logger.error(this.i18n.tr('register.fillAllRequiredFields'));
      return;
    }

    let sameUser = this.usersRepository.getByUserName(this.user.userName);
    if (sameUser !== undefined) {
      this.logger.error(this.i18n.tr('register.userNameTaken'));
      return;
    }

    if (this.user.password !== this.confirmPassword) {
      this.logger.error(this.i18n.tr('register.passwordsDoNotMatch'));
      return;
    }

    this.user.id = this.usersRepository.save(this.user.getData());
    this.session.loginUser(this.user.id);
    this.router.navigate('');
  }
}

