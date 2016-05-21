import {inject} from 'aurelia-framework';
import {I18N} from 'aurelia-i18n';
import {Router} from 'aurelia-router';
import {Session, Logger} from 'service';
import {User} from 'models';

@inject(Session, Logger, I18N, Router)
export class Register {
  confirmPassword;
  cities = [
    {id: 1, name: "София"},
    {id: 2, name: "Пловдив"},
    {id: 3, name: "Варна"},
    {id: 4, name: "Бургас"},
    {id: 5, name: "Плевен"},
    {id: 6, name: "Стара Загора"},
    {id: 7, name: "Шумен"}
  ];

  constructor(session, logger, i18n, router) {
    this.session = session;
    this.logger = logger;
    this.i18n = i18n;
    this.router = router;

    this.user = new User();
  }

  register() {
    if(this.user.password === this.confirmPassword){
      this.session.loginUser(this.user.getData());
      this.router.navigate('');
    }
  }
}

