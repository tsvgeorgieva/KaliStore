import {I18N} from 'aurelia-i18n';
import {inject} from 'aurelia-framework';
//import {accessRight} from 'enum/access-right';

@inject(I18N)
export class RoutesConfig {
  constructor(i18n) {
    this.i18n = i18n;
  }

  getRoutes() {
    return [{
      route: '',
      redirect: 'products'
    }, {
      route: 'products',
      name: 'products',
      moduleId: './area/products/products-index',
      nav: true,
      title: this.i18n.tr('home.title')
    }, {
      route: 'about-us',
      name: 'about-us',
      moduleId: './area/about-us/about-us',
      nav: true,
      title: this.i18n.tr('aboutUs.title')
    }, {
      route: 'contacts',
      name: 'contacts',
      moduleId: './area/contacts/contacts',
      nav: true,
      title: this.i18n.tr('contacts.title')
    }, {
      route: 'login',
      name: 'login',
      moduleId: './area/login/login',
      nav: false,
      title: this.i18n.tr('login.title')
    }, {
      route: 'register',
      name: 'register',
      moduleId: './area/register/register',
      nav: false,
      title: this.i18n.tr('register.title')
    }, {
      route: 'cart',
      name: 'cart',
      moduleId: './area/cart/cart',
      nav: false,
      title: this.i18n.tr('cart.title')
    }];
  }
}
