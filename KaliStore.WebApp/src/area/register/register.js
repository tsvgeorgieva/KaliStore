import {inject} from 'aurelia-framework';
import {I18N} from 'aurelia-i18n';
import {Router} from 'aurelia-router';
import {Session, Logger} from 'service';
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

    this.user = {};
    this.citiesRepository.getAll().then(cities => {
      this.cities = cities;
    });
  }

  register() {
    if (!this.user.password || !this.user.userName) {
      this.logger.error(this.i18n.tr('register.fillAllRequiredFields'));
      return;
    }


    if (this.user.password !== this.confirmPassword) {
      this.logger.error(this.i18n.tr('register.passwordsDoNotMatch'));
      return;
    }

    this.usersRepository.save(this.user).then(response => {
      this.usersRepository.login(this.user).then(userId => {
          this.session.loginUser(userId);
          this.router.navigate('');
        });
    });
  }
}

