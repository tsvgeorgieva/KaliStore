import {bindable, inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {EventAggregator} from 'aurelia-event-aggregator';
import {Session, HttpSessionTimedOutMessage, localStorageManager} from 'service';
import {AddProductToCartEvent, RemoveProductFromCartEvent, OrderComplete} from 'events';
import {CategoriesRepository, CartRepository} from 'repository';
import {accessRight} from 'enum';

@inject(Session, EventAggregator, Router, CategoriesRepository, CartRepository)
export class NavBar {
  @bindable router = null;
  categories = [];
  searchQuery = '';
  cartProducts = [];
  cartProductsCount = 0;

  constructor(session, eventAggregator, router, categoriesRepository, cartRepository) {
    this.session = session;
    this.router = router;
    this.categoriesRepository = categoriesRepository;
    this.cartRepository = cartRepository;

    this.categories = this.categoriesRepository.getAll();

    this.loadCartProducts();

    eventAggregator.subscribe(HttpSessionTimedOutMessage, () => this.logout());

    eventAggregator.subscribe(AddProductToCartEvent, (event) => {
      this.loadCartProducts();
    });

    eventAggregator.subscribe(RemoveProductFromCartEvent, () => {
      this.loadCartProducts();
    });

    eventAggregator.subscribe(OrderComplete, () => {
      this.loadCartProducts();
    });

    eventAggregator.subscribe('router:navigation:complete', () => {
      this.checkIfInAdminPanel();
    });

    window.navBar = this;
  }

  get isUserLoggedIn() {
    return this.session.isLoggedIn === true;
  }

  get userName() {
    return this.session.getUserName();
  }

  get isUserAdmin() {
    return this.session.userHasAccessRight(accessRight.adminPanel);
  }

  checkIfInAdminPanel() {
    // FIXME: huge hack...
    this.isInAdminPanel = this.router.currentInstruction.config.name === 'admin';
  }

  search() {
    this.router.navigate('#/products/search/' + this.searchQuery);
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
    this.router.navigate('');
  }

  loadCartProducts() {
    const cart = this.cartRepository.getAll();
    this.cartProducts = Object.keys(cart).map(k => {
      return {productId: parseInt(k), quantity: cart[k]}
    });
    this.cartProductsCount = this.cartProducts.reduce((sum, cartProduct) => sum + cartProduct.quantity, 0);
  }
}

