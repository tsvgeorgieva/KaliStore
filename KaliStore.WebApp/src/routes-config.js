import {I18N} from 'aurelia-i18n';
import {inject} from 'aurelia-framework';
import {accessRight} from 'enum';

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
    }, {
      route: 'profile',
      name: 'profile',
      moduleId: './area/user-profile/user-profile',
      nav: false,
      title: this.i18n.tr('userProfile.title'),
      accessRight: accessRight.userProfile
    }, {
      route: 'checkout',
      name: 'checkout',
      moduleId: './area/checkout/checkout',
      nav: false,
      title: this.i18n.tr('checkout.title')
    }, {
      route: 'payment',
      name: 'payment',
      moduleId: './area/payment/payment',
      nav: false,
      title: this.i18n.tr('payment.title')
    }, {
      route: 'my-orders',
      name: 'my-orders',
      moduleId: './area/my-orders/my-orders',
      nav: false,
      title: this.i18n.tr('myOrders.title'),
      accessRight: accessRight.userProfile
    }, {
      route: 'admin',
      name: 'admin',
      moduleId: './area/admin/admin-index',
      nav: false,
      title: this.i18n.tr('admin.title'),
      accessRight: accessRight.adminPanel
    }];
  }
}
