import {bindable, inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {EventAggregator} from 'aurelia-event-aggregator';
import {Session, HttpSessionTimedOutMessage, localStorageManager} from 'service';
import {AddProductToCartEvent} from 'events';
import {CategoriesRepository, CartRepository} from 'repository';

@inject(Session, EventAggregator, Router, CategoriesRepository, CartRepository)
export class NavBar {
  @bindable router = null;
  categories = [];
  searchQuery = '';

  constructor(session, eventAggregator, router, categoriesRepository, cartRepository) {
    this.session = session;
    this.router = router;
    this.categoriesRepository = categoriesRepository;
    this.cartRepository = cartRepository;

    this.categories = this.categoriesRepository.getAll();

    this.cartProducts = localStorageManager.get('cartProducts') || [];
    this.cartProductsCount = this.cartProducts.length;

    eventAggregator.subscribe(HttpSessionTimedOutMessage, () => this.logout());

    eventAggregator.subscribe(AddProductToCartEvent, (event) => {
      this.addToCart(event.product, event.quantity);
    });
  }

  get isUserLoggedIn() {
    return this.session.isLoggedIn === true;
  }

  get userName() {
    return this.session.getUserName();
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
    this.router.navigate('login');
  }

  addToCart(product, quantity) {
    //TODO: get this from cart repository
    this.cartProductsCount += quantity;
    this.cartProducts.push(product);

    this.cartRepository.add(product.id, quantity);
  }
}

