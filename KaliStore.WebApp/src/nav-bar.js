import {bindable} from 'aurelia-framework';
import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {Session, HttpSessionTimedOutMessage} from 'service';
import {AddProductToCartEvent} from 'events';
import {Router} from 'aurelia-router';
import {I18N} from 'aurelia-i18n';
import {Http, Logger} from 'service';
import {DialogService} from 'dialog';
import {LocalStorageManager} from 'service';

@inject(Session, I18N, Http, Logger, DialogService, EventAggregator, LocalStorageManager, Router)
export class NavBar {
  @bindable router = null;

  constructor(session, i18n, http, logger, dialogService, eventAggregator, localStorageManager, router) {
    this.session = session;
    this.router = router;
    this.i18n = i18n;
    this.http = http;
    this.logger = logger;
    this.dialogService = dialogService;
    this.localStorageManager = localStorageManager;
    
    this.searchQuery = '';

    this.cartProducts = this.localStorageManager.get('cartProducts') || [];
    this.cartProductsCount = this.cartProducts.length;

    eventAggregator.subscribe(HttpSessionTimedOutMessage, function () {
      this.logout();
    }.bind(this));

    eventAggregator.subscribe(AddProductToCartEvent, (event) => {
      this.addToCart(event.product, event.quantity);
    });

    window.navbar = this;
  }

  get isUserLoggedIn() {
    return this.session.isLoggedIn === true;
  }

  get userName() {
    return this.session.getUserName();
  }

  search() {
    this.router.navigate('#/products/all-products/' + this.searchQuery);
  }

  hoverSettings(isHovered) {
    this.hovered = isHovered;
  }

  checkAccess(navModel) {
    if (navModel.config.accessRight) {
      return this.session.userHasAccessRight(navModel.config.accessRight);
    }

    return true;
  }

  logout() {
    this.session.logoutUser();
    //this.router.navigate('login');
  }

  addToCart(product, quantity) {
    this.cartProductsCount += quantity;
    this.cartProducts.push(product);

    this.localStorageManager.save('cartProducts', this.cartProducts);
  }
}

