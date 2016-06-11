import {inject} from 'aurelia-framework';
import {I18N} from 'aurelia-i18n';
import {Router} from 'aurelia-router';
import {Logger, Session} from 'service';
import {EventAggregator} from 'aurelia-event-aggregator';
import {CitiesRepository, OfficesRepository, CartRepository, ProductsRepository, OrdersRepository} from 'repository';
import {OrderComplete} from 'events';

@inject(I18N, Router, Logger, Session, EventAggregator, CitiesRepository, OfficesRepository, CartRepository, ProductsRepository, OrdersRepository)
export class Checkout {
  currentCheckoutStep = 1;
  differentShipmentAddress = false;
  toAddress;
  paymentAtDelivery;
  cities = [];
  offices = [];
  userInfo = {};
  differentShipmentInfo = {};
  officeInfo = {};
  deliveryInfo = {};
  paymentInfo = {};

  constructor(i18n, router, logger, session, eventAggregator, citiesRepository, officesRepository, cartRepository, productsRepository, ordersRepository) {
    this.citiesRepository = citiesRepository;
    this.officesRepository = officesRepository;
    this.cartRepository = cartRepository;
    this.productsRepository = productsRepository;
    this.ordersRepository = ordersRepository;
    this.i18n = i18n;
    this.router = router;
    this.logger = logger;
    this.session = session;
    this.eventAggregator = eventAggregator;

    this.cities = this.citiesRepository.getAll();
    this.offices = this.officesRepository.getAll();
    this.cart = this.cartRepository.getAll();
    this.loadProducts();
    this.calculatePrices();
    
    this.deliveryPrice = {
      amount: 3.70,
      currency: 'BGN'
    };
  }

  loadProducts() {
    this.cartProducts = Object.keys(this.cart).map(k => {
      return {product: this.productsRepository.get(parseInt(k)), quantity: this.cart[k]}
    });
  }

  calculatePrices() {
    this.totalProductsPrice = {
      amount: this.cartProducts.reduce((total, cartProduct) => total + (cartProduct.quantity * cartProduct.product.price.amount), 0),
      currency: 'BGN'
    };
    this.deliveryPrice = {
      amount: 3.70,
      currency: 'BGN'
    };
    this.totalPrice = {
      amount: this.totalProductsPrice.amount + this.deliveryPrice.amount,
      currency: 'BGN'
    };
  }

  proceed() {
    this.currentCheckoutStep = 2;

    if (this.toAddress) {
      this.deliveryInfo.type = this.i18n.tr('checkout.deliveryInfo.toAddress');
      this.deliveryInfo.client = {};
      if (this.differentShipmentAddress) {
        this.deliveryInfo.city = this.differentShipmentInfo.city;
        this.deliveryInfo.address = this.differentShipmentInfo.address;
        this.deliveryInfo.client.name = this.differentShipmentInfo.clientName;
        this.deliveryInfo.client.phoneNumber = this.differentShipmentInfo.phoneNumber;
      } else {
        this.deliveryInfo.city = this.userInfo.city;
        this.deliveryInfo.address = this.userInfo.address;
        this.deliveryInfo.client.name = this.userInfo.fullName;
        this.deliveryInfo.client.phoneNumber = this.userInfo.phoneNumber;
      }
    } else if (this.toAddress === false) {
      this.deliveryInfo.type = this.i18n.tr('checkout.deliveryInfo.toOffice');
      this.deliveryInfo.city = this.officeInfo.city;
      this.deliveryInfo.address = this.officeInfo.office.name;
      this.deliveryInfo.client.name = this.userInfo.fullName;
      this.deliveryInfo.client.phoneNumber = this.userInfo.phoneNumber;
    }
    
    if (this.paymentAtDelivery) {
      this.paymentInfo.method = this.i18n.tr('checkout.paymentInfo.atDelivery.title');
      this.paymentInfo.description = this.i18n.tr('checkout.paymentInfo.atDelivery.description');
    } else if (this.paymentAtDelivery === false) {
      this.paymentInfo.method = this.i18n.tr('checkout.paymentInfo.withCard.title');
      this.paymentInfo.description = this.i18n.tr('checkout.paymentInfo.withCard.description');
    }
  }
  
  back() {
    this.currentCheckoutStep = 1;
  }

  order() {
    if (this.session.isUserLoggedIn()) {
      this.userInfo.id = this.session.getUserId();
      this.userInfo.userName = this.session.getUserName();
    } else {
      this.userInfo.id = "-1";
      this.userInfo.userName = "anonymous";
    }

    const order = {
      user: this.userInfo,
      delivery: this.deliveryInfo,
      products: this.cart,
      totalPrice: this.totalPrice,
      status: "Потвърдена поръчка"
    };
    this.ordersRepository.save(order);
    if (this.paymentAtDelivery) {
      this.logger.success(this.i18n.tr('order.successful'));
      this.router.navigate('');
      this.cartRepository.empty();
      this.eventAggregator.publish(new OrderComplete({}));
    } else if (this.paymentAtDelivery === false) {
      this.router.navigate('#/payment');
    }
  }
}
