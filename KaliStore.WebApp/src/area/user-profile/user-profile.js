import {inject} from 'aurelia-framework';
import {I18N} from 'aurelia-i18n';
import {Router} from 'aurelia-router';
import {Session, Logger} from 'service';
import {User} from 'models';
import {CitiesRepository, UsersRepository} from 'repository';

@inject(Session, Logger, I18N, Router, CitiesRepository, UsersRepository)
export class UserProfile {
  confirmPassword;
  cities = [];
  user;

  constructor(session, logger, i18n, router, citiesRepository, usersRepository) {
    this.session = session;
    this.logger = logger;
    this.i18n = i18n;
    this.citiesRepository = citiesRepository;
    this.usersRepository = usersRepository;

    this.citiesRepository.getAll().then(cities =>{
      this.cities = cities;
    });

    this.user = new User(this.session.getUser());
  }

  save() {
    this.user.id = this.usersRepository.edit(this.user.getData());
  }
}

