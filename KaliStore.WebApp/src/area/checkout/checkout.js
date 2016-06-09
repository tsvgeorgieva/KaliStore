import {inject} from 'aurelia-framework';
import {CitiesRepository, OfficesRepository, CartRepository, ProductsRepository} from 'repository';

@inject(CitiesRepository, OfficesRepository, CartRepository, ProductsRepository)
export class Checkout {
  differentShipmentAddress = false;
  toAddress;
  cities = [];
  offices = [];
  userInfo = {};
  differentShipmentInfo = {};
  officeInfo = {};

  constructor(citiesRepository, officesRepository, cartRepository, productsRepository) {
    this.citiesRepository = citiesRepository;
    this.officesRepository = officesRepository;
    this.cartRepository = cartRepository;
    this.productsRepository = productsRepository;

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
}
